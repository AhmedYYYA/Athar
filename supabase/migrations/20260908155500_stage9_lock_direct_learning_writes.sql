-- Stage 9 hardening: browser roles read through RLS but cannot directly mutate cloud learning tables.
-- All learning-state mutations must pass through the authenticated synchronization RPC.
revoke insert, update, delete on public.child_learning_state from anon, authenticated;
revoke insert, update, delete on public.mission_progress from anon, authenticated;
revoke insert, update, delete on public.passport_evidence from anon, authenticated;
revoke insert, update, delete on public.child_achievements from anon, authenticated;
revoke select on public.child_learning_state from anon;
revoke select on public.mission_progress from anon;
revoke select on public.passport_evidence from anon;
revoke select on public.child_achievements from anon;