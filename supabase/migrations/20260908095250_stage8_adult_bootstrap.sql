create or replace function public.handle_new_adult_user()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  insert into public.adult_profiles(user_id,display_name,preferred_language)
  values(new.id,nullif(new.raw_user_meta_data->>'display_name',''),case when new.raw_user_meta_data->>'preferred_language'='ar' then 'ar' else 'en' end)
  on conflict (user_id) do nothing;
  insert into public.role_assignments(user_id,role)
  values(new.id,'parent_guardian')
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_adult_user();

revoke all on function public.handle_new_adult_user() from public, anon, authenticated;
