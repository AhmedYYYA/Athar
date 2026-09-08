insert into public.policy_versions(policy_key,version,language,effective_at) values
('adult_child_participation','stage8-v1','en',now()),
('adult_child_participation','stage8-v1','ar',now()),
('child_assent','stage8-v1','en',now()),
('child_assent','stage8-v1','ar',now())
on conflict do nothing;

create or replace function public.create_authorized_child_profile(
  p_adult_user_id uuid,
  p_nickname text,
  p_age_band text,
  p_preferred_language text,
  p_adult_consent boolean,
  p_child_assent boolean
) returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  v_child public.child_profiles;
  v_consent_policy uuid;
  v_assent_policy uuid;
  v_lang text;
begin
  if not p_adult_consent or not p_child_assent then raise exception 'consent_required'; end if;
  if not exists(select 1 from public.role_assignments where user_id=p_adult_user_id and role='parent_guardian') then raise exception 'parent_guardian_required'; end if;
  if p_nickname is null or btrim(p_nickname)='' or char_length(btrim(p_nickname))>40 then raise exception 'invalid_nickname'; end if;
  if p_age_band not in ('7-9','10-12') then raise exception 'invalid_age_band'; end if;
  v_lang := case when p_preferred_language='ar' then 'ar' else 'en' end;
  select id into v_consent_policy from public.policy_versions where policy_key='adult_child_participation' and version='stage8-v1' and language=v_lang order by effective_at desc limit 1;
  select id into v_assent_policy from public.policy_versions where policy_key='child_assent' and version='stage8-v1' and language=v_lang order by effective_at desc limit 1;
  if v_consent_policy is null or v_assent_policy is null then raise exception 'policy_missing'; end if;
  insert into public.child_profiles(nickname,age_band,preferred_language) values(btrim(p_nickname),p_age_band,v_lang) returning * into v_child;
  insert into public.adult_child_authorizations(adult_user_id,child_profile_id,relationship) values(p_adult_user_id,v_child.id,'parent_guardian');
  insert into public.consent_records(adult_user_id,child_profile_id,policy_version_id,purpose_key,status) values(p_adult_user_id,v_child.id,v_consent_policy,'learning_participation','granted');
  insert into public.assent_records(child_profile_id,policy_version_id,status,recorded_by_adult_user_id) values(v_child.id,v_assent_policy,'assented',p_adult_user_id);
  return jsonb_build_object('id',v_child.id,'nickname',v_child.nickname,'age_band',v_child.age_band,'preferred_language',v_child.preferred_language);
end;
$$;
revoke all on function public.create_authorized_child_profile(uuid,text,text,text,boolean,boolean) from public, anon, authenticated;
grant execute on function public.create_authorized_child_profile(uuid,text,text,text,boolean,boolean) to service_role;