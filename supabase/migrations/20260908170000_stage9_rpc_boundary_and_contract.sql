-- Stage 9 corrective hardening.
-- Browser reads remain RLS-scoped. Every write is forced through a bounded,
-- authenticated RPC whose mutator lives in a non-exposed schema.

alter table public.child_learning_state
  add column if not exists local_import_version text;

alter table public.child_learning_state
  add constraint child_learning_state_curriculum_contract_check
    check (curriculum_version = 'foundation-v3') not valid,
  add constraint child_learning_state_active_mission_contract_check
    check (
      active_mission_id is null or active_mission_id = any (array[
        'what-is-ai','patterns','data','clear-asking','details','refine',
        'can-be-wrong','verify','fairness','private','not-human','my-idea',
        'credit','steps','rules','loops'
      ])
    ) not valid,
  add constraint child_learning_state_import_contract_check
    check (local_import_version is null or local_import_version = 'athar.progress.v1') not valid;

alter table public.mission_progress
  add constraint mission_progress_mission_contract_check
    check (mission_id = any (array[
      'what-is-ai','patterns','data','clear-asking','details','refine',
      'can-be-wrong','verify','fairness','private','not-human','my-idea',
      'credit','steps','rules','loops'
    ])) not valid;

alter table public.passport_evidence
  add constraint passport_evidence_key_contract_check
    check (
      (passport = 'skills' and evidence_key = any (array[
        'recognise-ai','patterns','verification','examples','uncertainty',
        'data-sources','data-relevance','label-quality','state-goal',
        'useful-details','pick-output','relevant-details','safe-details',
        'useful-limits','examine-result','compare-goal','refine-result',
        'spot-ai-error','confidence-not-proof','pause-before-trust',
        'choose-source','cross-check','use-evidence','spot-unfair-pattern',
        'check-representation','human-review','spot-private-info',
        'share-minimum','ask-before-sharing','tool-not-person',
        'spot-secrecy-pressure','choose-human-help','lead-with-own-idea',
        'direct-the-tool','describe-contribution','credit-sources',
        'disclose-ai-help','avoid-copying','order-steps','break-down-task',
        'debug-steps','spot-condition','choose-action','trace-rule',
        'spot-repeat','use-loop','stop-loop'
      ]))
      or
      (passport = 'safety' and evidence_key = any (array[
        'ai-is-tool','check-important','privacy','trusted-adult','no-secrets-with-ai'
      ]))
    ) not valid,
  add constraint passport_evidence_source_contract_check
    check (
      source_mission_id is null or source_mission_id = any (array[
        'what-is-ai','patterns','data','clear-asking','details','refine',
        'can-be-wrong','verify','fairness','private','not-human','my-idea',
        'credit','steps','rules','loops'
      ])
    ) not valid;

alter table public.child_achievements
  add constraint child_achievements_key_contract_check
    check (
      (achievement_type = 'badge' and achievement_key = any (array[
        'first-trace','pattern-spotter','example-detective','clear-communicator',
        'detail-designer','result-refiner','mistake-catcher','fact-checker','fairness-checker',
        'privacy-guardian','boundary-keeper','idea-leader','credit-keeper',
        'step-builder','rule-builder','loop-thinker'
      ]))
      or
      (achievement_type = 'trace' and achievement_key ~ '^(what-is-ai|patterns|data|clear-asking|details|refine|can-be-wrong|verify|fairness|private|not-human|my-idea|credit|steps|rules|loops):[1-5]$')
    ) not valid;

alter table public.child_learning_state
  validate constraint child_learning_state_curriculum_contract_check;
alter table public.child_learning_state
  validate constraint child_learning_state_active_mission_contract_check;
alter table public.child_learning_state
  validate constraint child_learning_state_import_contract_check;
alter table public.mission_progress
  validate constraint mission_progress_mission_contract_check;
alter table public.passport_evidence
  validate constraint passport_evidence_key_contract_check;
alter table public.passport_evidence
  validate constraint passport_evidence_source_contract_check;
alter table public.child_achievements
  validate constraint child_achievements_key_contract_check;

drop policy if exists learning_state_authorized_insert on public.child_learning_state;
drop policy if exists learning_state_authorized_update on public.child_learning_state;
drop policy if exists mission_progress_authorized_insert on public.mission_progress;
drop policy if exists mission_progress_authorized_update on public.mission_progress;
drop policy if exists passport_evidence_authorized_insert on public.passport_evidence;
drop policy if exists passport_evidence_authorized_update on public.passport_evidence;
drop policy if exists achievements_authorized_insert on public.child_achievements;

revoke all privileges on public.child_learning_state from anon, authenticated;
revoke all privileges on public.mission_progress from anon, authenticated;
revoke all privileges on public.passport_evidence from anon, authenticated;
revoke all privileges on public.child_achievements from anon, authenticated;
grant select on public.child_learning_state to authenticated;
grant select on public.mission_progress to authenticated;
grant select on public.passport_evidence to authenticated;
grant select on public.child_achievements to authenticated;
grant usage on type public.evidence_state to authenticated;

create schema if not exists athar_private;
revoke all on schema athar_private from public, anon;
grant usage on schema athar_private to authenticated;

create or replace function athar_private.sync_child_learning_state_internal(
  p_child_profile_id uuid,
  p_payload jsonb,
  p_expected_revision bigint default null
) returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_revision bigint;
  v_item jsonb;
  v_key text;
  v_mission_ids constant text[] := array[
    'what-is-ai','patterns','data','clear-asking','details','refine',
    'can-be-wrong','verify','fairness','private','not-human','my-idea',
    'credit','steps','rules','loops'
  ];
  v_skill_keys constant text[] := array[
    'recognise-ai','patterns','verification','examples','uncertainty',
    'data-sources','data-relevance','label-quality','state-goal',
    'useful-details','pick-output','relevant-details','safe-details',
    'useful-limits','examine-result','compare-goal','refine-result',
    'spot-ai-error','confidence-not-proof','pause-before-trust',
    'choose-source','cross-check','use-evidence','spot-unfair-pattern',
    'check-representation','human-review','spot-private-info',
    'share-minimum','ask-before-sharing','tool-not-person',
    'spot-secrecy-pressure','choose-human-help','lead-with-own-idea',
    'direct-the-tool','describe-contribution','credit-sources',
    'disclose-ai-help','avoid-copying','order-steps','break-down-task',
    'debug-steps','spot-condition','choose-action','trace-rule',
    'spot-repeat','use-loop','stop-loop'
  ];
  v_safety_keys constant text[] := array[
    'ai-is-tool','check-important','privacy','trusted-adult','no-secrets-with-ai'
  ];
  v_badge_keys constant text[] := array[
    'first-trace','pattern-spotter','example-detective','clear-communicator',
    'detail-designer','result-refiner','mistake-catcher','fact-checker','fairness-checker',
    'privacy-guardian','boundary-keeper','idea-leader','credit-keeper',
    'step-builder','rule-builder','loop-thinker'
  ];
begin
  if v_uid is null then raise exception 'authentication_required'; end if;
  if p_child_profile_id is null then raise exception 'child_profile_required'; end if;
  if p_expected_revision is not null and p_expected_revision < 0 then raise exception 'invalid_revision'; end if;
  if p_payload is null or jsonb_typeof(p_payload) <> 'object' then raise exception 'invalid_payload'; end if;
  if pg_column_size(p_payload) > 65536 then raise exception 'payload_too_large'; end if;

  for v_key in select jsonb_object_keys(p_payload) loop
    if v_key <> all (array[
      'curriculum_version','selected_companion','active_mission_id',
      'local_import_version','missions','evidence','achievements'
    ]) then raise exception 'unknown_payload_key'; end if;
  end loop;

  if coalesce(p_payload->>'curriculum_version','foundation-v3') <> 'foundation-v3' then
    raise exception 'invalid_curriculum_version';
  end if;
  if p_payload ? 'selected_companion'
     and p_payload->'selected_companion' <> 'null'::jsonb
     and not coalesce((p_payload->>'selected_companion') = any (array['hamdan','hessa','none']), false) then
    raise exception 'invalid_companion';
  end if;
  if p_payload ? 'active_mission_id'
     and p_payload->'active_mission_id' <> 'null'::jsonb
     and not coalesce((p_payload->>'active_mission_id') = any (v_mission_ids), false) then
    raise exception 'invalid_active_mission';
  end if;
  if p_payload ? 'local_import_version'
     and p_payload->'local_import_version' <> 'null'::jsonb
     and coalesce(p_payload->>'local_import_version','') <> 'athar.progress.v1' then
    raise exception 'invalid_import_version';
  end if;

  if p_payload ? 'missions' and jsonb_typeof(p_payload->'missions') <> 'array' then raise exception 'invalid_missions'; end if;
  if p_payload ? 'evidence' and jsonb_typeof(p_payload->'evidence') <> 'array' then raise exception 'invalid_evidence'; end if;
  if p_payload ? 'achievements' and jsonb_typeof(p_payload->'achievements') <> 'array' then raise exception 'invalid_achievements'; end if;
  if jsonb_array_length(coalesce(p_payload->'missions','[]'::jsonb)) > 16 then raise exception 'too_many_missions'; end if;
  if jsonb_array_length(coalesce(p_payload->'evidence','[]'::jsonb)) > 52 then raise exception 'too_many_evidence_items'; end if;
  if jsonb_array_length(coalesce(p_payload->'achievements','[]'::jsonb)) > 96 then raise exception 'too_many_achievements'; end if;

  for v_item in select value from jsonb_array_elements(coalesce(p_payload->'missions','[]'::jsonb)) loop
    if jsonb_typeof(v_item) <> 'object' then raise exception 'invalid_mission_item'; end if;
    for v_key in select jsonb_object_keys(v_item) loop
      if v_key <> all (array['mission_id','completed','evidence']) then raise exception 'unknown_mission_key'; end if;
    end loop;
    if not coalesce((v_item->>'mission_id') = any (v_mission_ids), false)
       or jsonb_typeof(v_item->'completed') <> 'boolean'
       or not coalesce((v_item->>'evidence') = any (array['not_yet','supported','independent']), false) then
      raise exception 'invalid_mission_item';
    end if;
  end loop;

  for v_item in select value from jsonb_array_elements(coalesce(p_payload->'evidence','[]'::jsonb)) loop
    if jsonb_typeof(v_item) <> 'object' then raise exception 'invalid_evidence_item'; end if;
    for v_key in select jsonb_object_keys(v_item) loop
      if v_key <> all (array['passport','evidence_key','state','source_mission_id']) then raise exception 'unknown_evidence_key'; end if;
    end loop;
    if not coalesce((v_item->>'passport') = any (array['skills','safety']), false)
       or not coalesce((v_item->>'state') = any (array['not_yet','supported','independent']), false)
       or (v_item->>'passport' = 'skills' and not coalesce((v_item->>'evidence_key') = any (v_skill_keys), false))
       or (v_item->>'passport' = 'safety' and not coalesce((v_item->>'evidence_key') = any (v_safety_keys), false))
       or (v_item ? 'source_mission_id' and v_item->'source_mission_id' <> 'null'::jsonb
           and not coalesce((v_item->>'source_mission_id') = any (v_mission_ids), false)) then
      raise exception 'invalid_evidence_item';
    end if;
  end loop;

  for v_item in select value from jsonb_array_elements(coalesce(p_payload->'achievements','[]'::jsonb)) loop
    if jsonb_typeof(v_item) <> 'object' then raise exception 'invalid_achievement_item'; end if;
    for v_key in select jsonb_object_keys(v_item) loop
      if v_key <> all (array['type','key']) then raise exception 'unknown_achievement_key'; end if;
    end loop;
    if not (
      (v_item->>'type' = 'badge' and coalesce((v_item->>'key') = any (v_badge_keys), false))
      or
      (v_item->>'type' = 'trace' and coalesce(v_item->>'key','') ~ '^(what-is-ai|patterns|data|clear-asking|details|refine|can-be-wrong|verify|fairness|private|not-human|my-idea|credit|steps|rules|loops):[1-5]$')
    ) then raise exception 'invalid_achievement_item'; end if;
  end loop;

  if not exists (
    select 1 from public.adult_child_authorizations
    where adult_user_id = v_uid and child_profile_id = p_child_profile_id
  ) then raise exception 'not_authorized'; end if;
  if not exists (select 1 from public.child_profiles where id = p_child_profile_id) then raise exception 'profile_not_found'; end if;
  if exists (select 1 from public.child_profiles where id = p_child_profile_id and archived_at is not null) then
    raise exception 'profile_archived';
  end if;

  insert into public.child_learning_state(child_profile_id)
  values (p_child_profile_id)
  on conflict do nothing;

  select revision into v_revision
  from public.child_learning_state
  where child_profile_id = p_child_profile_id
  for update;

  if p_expected_revision is not null and p_expected_revision <> v_revision then
    return jsonb_build_object('ok',false,'conflict',true,'revision',v_revision);
  end if;

  update public.child_learning_state
  set curriculum_version = 'foundation-v3',
      selected_companion = case
        when p_payload ? 'selected_companion' then nullif(p_payload->>'selected_companion','')
        else selected_companion
      end,
      active_mission_id = case
        when p_payload ? 'active_mission_id' then nullif(p_payload->>'active_mission_id','')
        else active_mission_id
      end,
      local_import_version = coalesce(local_import_version,nullif(p_payload->>'local_import_version','')),
      revision = revision + 1,
      updated_at = now()
  where child_profile_id = p_child_profile_id
  returning revision into v_revision;

  for v_item in select value from jsonb_array_elements(coalesce(p_payload->'missions','[]'::jsonb)) loop
    insert into public.mission_progress(
      child_profile_id,mission_id,completed,evidence,completed_at,updated_at
    ) values (
      p_child_profile_id,
      v_item->>'mission_id',
      (v_item->>'completed')::boolean,
      (v_item->>'evidence')::public.evidence_state,
      case when (v_item->>'completed')::boolean then now() else null end,
      now()
    )
    on conflict(child_profile_id,mission_id) do update
    set completed = mission_progress.completed or excluded.completed,
        evidence = case
          when mission_progress.evidence='independent' or excluded.evidence='independent' then 'independent'::public.evidence_state
          when mission_progress.evidence='supported' or excluded.evidence='supported' then 'supported'::public.evidence_state
          else 'not_yet'::public.evidence_state
        end,
        completed_at = coalesce(mission_progress.completed_at,excluded.completed_at),
        updated_at = now();
  end loop;

  for v_item in select value from jsonb_array_elements(coalesce(p_payload->'evidence','[]'::jsonb)) loop
    insert into public.passport_evidence(
      child_profile_id,passport,evidence_key,state,source_mission_id,updated_at
    ) values (
      p_child_profile_id,
      v_item->>'passport',
      v_item->>'evidence_key',
      (v_item->>'state')::public.evidence_state,
      nullif(v_item->>'source_mission_id',''),
      now()
    )
    on conflict(child_profile_id,passport,evidence_key) do update
    set state = case
          when passport_evidence.state='independent' or excluded.state='independent' then 'independent'::public.evidence_state
          when passport_evidence.state='supported' or excluded.state='supported' then 'supported'::public.evidence_state
          else 'not_yet'::public.evidence_state
        end,
        source_mission_id = coalesce(passport_evidence.source_mission_id,excluded.source_mission_id),
        updated_at = now();
  end loop;

  for v_item in select value from jsonb_array_elements(coalesce(p_payload->'achievements','[]'::jsonb)) loop
    insert into public.child_achievements(child_profile_id,achievement_type,achievement_key)
    values (p_child_profile_id,v_item->>'type',v_item->>'key')
    on conflict do nothing;
  end loop;

  return jsonb_build_object('ok',true,'conflict',false,'revision',v_revision);
end;
$$;

revoke all on function athar_private.sync_child_learning_state_internal(uuid,jsonb,bigint) from public, anon;
grant execute on function athar_private.sync_child_learning_state_internal(uuid,jsonb,bigint) to authenticated;

create or replace function public.sync_child_learning_state(
  p_child_profile_id uuid,
  p_payload jsonb,
  p_expected_revision bigint default null
) returns jsonb
language sql
security invoker
set search_path = ''
as $$
  select athar_private.sync_child_learning_state_internal($1,$2,$3)
$$;

revoke all on function public.sync_child_learning_state(uuid,jsonb,bigint) from public, anon;
grant execute on function public.sync_child_learning_state(uuid,jsonb,bigint) to authenticated;
alter function public.get_child_cloud_passport(uuid) security invoker;
revoke all on function public.get_child_cloud_passport(uuid) from public, anon;
grant execute on function public.get_child_cloud_passport(uuid) to authenticated;
