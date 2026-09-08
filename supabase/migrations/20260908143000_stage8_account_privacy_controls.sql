create type public.privacy_request_action as enum ('export','delete');
create type public.privacy_request_status as enum ('requested','processing','completed','rejected');

create table public.privacy_requests (
  id uuid primary key default gen_random_uuid(),
  adult_user_id uuid not null references auth.users(id) on delete cascade,
  child_profile_id uuid not null references public.child_profiles(id) on delete cascade,
  action public.privacy_request_action not null,
  status public.privacy_request_status not null default 'requested',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
alter table public.privacy_requests enable row level security;
create policy privacy_requests_self_select on public.privacy_requests for select to authenticated using ((select auth.uid()) = adult_user_id);

create or replace function public.withdraw_child_permissions(p_adult_user_id uuid,p_child_profile_id uuid,p_withdraw_consent boolean,p_withdraw_assent boolean)
returns jsonb language plpgsql security definer set search_path=public as $$
declare v_consent consent_records%rowtype; v_assent assent_records%rowtype;
begin
 if not exists(select 1 from adult_child_authorizations a where a.adult_user_id=p_adult_user_id and a.child_profile_id=p_child_profile_id) then raise exception 'not_authorized'; end if;
 if p_withdraw_consent then
   select * into v_consent from consent_records where adult_user_id=p_adult_user_id and child_profile_id=p_child_profile_id order by recorded_at desc limit 1;
   if v_consent.id is null then raise exception 'consent_record_missing'; end if;
   insert into consent_records(adult_user_id,child_profile_id,policy_version_id,purpose_key,status) values(p_adult_user_id,p_child_profile_id,v_consent.policy_version_id,v_consent.purpose_key,'withdrawn');
 end if;
 if p_withdraw_assent then
   select ar.* into v_assent from assent_records ar where ar.child_profile_id=p_child_profile_id order by ar.recorded_at desc limit 1;
   if v_assent.id is null then raise exception 'assent_record_missing'; end if;
   insert into assent_records(child_profile_id,policy_version_id,status,recorded_by_adult_user_id) values(p_child_profile_id,v_assent.policy_version_id,'withdrawn',p_adult_user_id);
 end if;
 if p_withdraw_consent or p_withdraw_assent then update child_profiles set archived_at=coalesce(archived_at,now()) where id=p_child_profile_id; end if;
 return jsonb_build_object('child_profile_id',p_child_profile_id,'archived',true);
end $$;

create or replace function public.create_privacy_request(p_adult_user_id uuid,p_child_profile_id uuid,p_action public.privacy_request_action)
returns uuid language plpgsql security definer set search_path=public as $$
declare v_id uuid;
begin
 if not exists(select 1 from adult_child_authorizations a where a.adult_user_id=p_adult_user_id and a.child_profile_id=p_child_profile_id) then raise exception 'not_authorized'; end if;
 insert into privacy_requests(adult_user_id,child_profile_id,action) values(p_adult_user_id,p_child_profile_id,p_action) returning id into v_id;
 return v_id;
end $$;

revoke all on function public.withdraw_child_permissions(uuid,uuid,boolean,boolean) from public,anon,authenticated;
revoke all on function public.create_privacy_request(uuid,uuid,public.privacy_request_action) from public,anon,authenticated;
grant execute on function public.withdraw_child_permissions(uuid,uuid,boolean,boolean) to service_role;
grant execute on function public.create_privacy_request(uuid,uuid,public.privacy_request_action) to service_role;

create or replace view public.child_profile_status as
select c.id,c.nickname,c.age_band,c.preferred_language,c.created_at,c.archived_at,a.adult_user_id,
 (select cr.status::text from consent_records cr where cr.adult_user_id=a.adult_user_id and cr.child_profile_id=c.id order by cr.recorded_at desc limit 1) consent_status,
 (select ar.status::text from assent_records ar where ar.child_profile_id=c.id order by ar.recorded_at desc limit 1) assent_status
from child_profiles c join adult_child_authorizations a on a.child_profile_id=c.id;
alter view public.child_profile_status set (security_invoker=true);
grant select on public.child_profile_status to authenticated;