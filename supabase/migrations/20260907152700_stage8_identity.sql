-- ATHAR | أثر — Stage 8 identity/consent foundation
-- Adult auth identities live in auth.users. Child profiles are NOT auth users.

create extension if not exists pgcrypto;

create type public.athar_role as enum ('parent_guardian','educator','school_admin');
create type public.consent_status as enum ('granted','withdrawn');
create type public.assent_status as enum ('assented','declined','withdrawn');

create table public.adult_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  preferred_language text not null default 'en' check (preferred_language in ('en','ar')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.role_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.athar_role not null,
  institution_id uuid,
  created_at timestamptz not null default now(),
  unique (user_id, role, institution_id)
);

create table public.child_profiles (
  id uuid primary key default gen_random_uuid(),
  nickname text not null check (char_length(nickname) between 1 and 40),
  age_band text not null check (age_band in ('7-9','10-12')),
  preferred_language text not null default 'en' check (preferred_language in ('en','ar')),
  created_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.adult_child_authorizations (
  adult_user_id uuid not null references auth.users(id) on delete cascade,
  child_profile_id uuid not null references public.child_profiles(id) on delete cascade,
  relationship text not null default 'parent_guardian',
  created_at timestamptz not null default now(),
  primary key (adult_user_id, child_profile_id)
);

create table public.policy_versions (
  id uuid primary key default gen_random_uuid(),
  policy_key text not null,
  version text not null,
  language text not null check (language in ('en','ar')),
  effective_at timestamptz not null,
  retired_at timestamptz,
  unique(policy_key, version, language)
);

create table public.consent_records (
  id uuid primary key default gen_random_uuid(),
  adult_user_id uuid not null references auth.users(id) on delete cascade,
  child_profile_id uuid not null references public.child_profiles(id) on delete cascade,
  policy_version_id uuid not null references public.policy_versions(id),
  purpose_key text not null,
  status public.consent_status not null,
  recorded_at timestamptz not null default now()
);

create table public.assent_records (
  id uuid primary key default gen_random_uuid(),
  child_profile_id uuid not null references public.child_profiles(id) on delete cascade,
  policy_version_id uuid not null references public.policy_versions(id),
  status public.assent_status not null,
  recorded_by_adult_user_id uuid not null references auth.users(id),
  recorded_at timestamptz not null default now()
);

-- No child email, phone, exact DOB, address or government ID fields.

alter table public.adult_profiles enable row level security;
alter table public.role_assignments enable row level security;
alter table public.child_profiles enable row level security;
alter table public.adult_child_authorizations enable row level security;
alter table public.policy_versions enable row level security;
alter table public.consent_records enable row level security;
alter table public.assent_records enable row level security;

create policy adult_profile_self_select on public.adult_profiles for select using (auth.uid() = user_id);
create policy adult_profile_self_update on public.adult_profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy role_self_select on public.role_assignments for select using (auth.uid() = user_id);

create policy child_authorized_select on public.child_profiles for select using (
  exists (select 1 from public.adult_child_authorizations a where a.child_profile_id=id and a.adult_user_id=auth.uid())
);
create policy authorization_self_select on public.adult_child_authorizations for select using (adult_user_id=auth.uid());
create policy consent_authorized_select on public.consent_records for select using (adult_user_id=auth.uid());
create policy assent_authorized_select on public.assent_records for select using (
  exists (select 1 from public.adult_child_authorizations a where a.child_profile_id=assent_records.child_profile_id and a.adult_user_id=auth.uid())
);
create policy policy_versions_authenticated_select on public.policy_versions for select to authenticated using (true);

-- Creation/withdrawal of child, authorization, consent and assent records should occur
-- through reviewed server-side functions/Edge Functions, not direct anonymous browser writes.
