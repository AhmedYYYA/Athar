# ATHAR | أثر — Stage 9 Persistent Progress & Cloud Passport v13

**Status:** Active Stage 9 implementation candidate. Stage 8 is approved only as its technical dependency; production/pilot restrictions remain in force.

## Decision
Stage 9 introduces authenticated, child-profile-scoped cloud persistence while preserving ATHAR's evidence model and child-data minimisation.

The cloud record is a **learning state**, not a transcript or behavioural profile.

## Persisted data
- Curriculum version and bounded active mission reference.
- Optional approved companion choice (`hamdan`, `hessa`, `none`).
- Mission completion state.
- Mission evidence state: `not_yet`, `supported`, `independent`.
- Safety Passport evidence.
- Skills Passport evidence.
- Earned traces and badges.
- Revision number and operational timestamps needed for synchronization.

## Explicitly excluded
Stage 9 does not create fields for raw child answers, prompts, conversations, free-text reflections, AI transcripts, child email/phone, exact date of birth, home address, government identifiers, advertising identifiers or behavioural targeting.

## Authority and isolation
The authenticated adult remains the account holder. Every cloud learning record is keyed to a bounded `child_profile_id`. RLS permits reads only when the signed-in adult has an `adult_child_authorizations` relationship.

Browser roles have explicit `SELECT` grants only; direct table mutation grants and write policies are removed. The public synchronization RPC is a `security_invoker` wrapper. It calls a fixed-search-path `security_definer` mutator in the non-exposed `athar_private` schema. The internal mutator derives the caller from `auth.uid()`, independently checks the adult-child authorization, rejects missing or archived profiles, validates the full bounded contract, and owns the transaction. Anonymous execution is revoked.

## Evidence semantics
The three concepts remain separate:
1. lesson completion;
2. Passport evidence;
3. safety-gated access.

Evidence is monotonic during synchronization: `independent` outranks `supported`, and `supported` outranks `not_yet`. A stale device therefore cannot downgrade stronger evidence already in the cloud. Achievements are idempotent and cannot double-count on replay.

## Synchronization and conflicts
`child_learning_state.revision` is the optimistic-concurrency token. A client may submit `expected_revision`. If the cloud revision has moved, the server returns a conflict rather than silently overwriting the state.

Merge rules for bounded evidence are deterministic:
- completion: logical OR;
- evidence: strongest state wins;
- trace/badge: set union;
- scalar preferences: accepted only with a non-conflicting revision in the first implementation.

The browser adapter fetches the latest bounded record, merges only monotonic evidence on conflict, and retries once against the returned revision. A repeated conflict leaves progress safely on the device and requires retry; it is not silently overwritten.

## Local-to-cloud migration
Existing browser-local pilot progress must never be silently attached to an authenticated child profile. Migration requires an explicit adult action after selecting the intended child profile. Before upload, the adapter whitelists only the bounded Stage 9 schema and discards raw/unknown local keys. The successful import version is retained in `child_learning_state.local_import_version`; the selected profile and current binding remain session-scoped in the browser and are never copied to `localStorage`.

When a previously connected profile is reopened, its cloud state replaces the unscoped browser-local cache before the lesson engine starts. This prevents progress left by a different profile on a shared browser from being uploaded to the newly selected profile. First-time local/cloud merges still require the explicit adult action.

## Multi-device behavior
On authenticated entry, the client fetches the Cloud Passport. When both local and cloud bounded state exist for a first connection, it presents the deterministic migration/sync policy rather than using last-write-wins. After binding, bounded state changes are debounced and synchronized. Offline learning remains a later hardening concern; Stage 9 does not claim robust offline multi-device synchronization until a durable queue and extended interruption testing exist.

## Security gates
- RLS enabled on every Stage 9 table.
- No direct anonymous access.
- RPC authorization uses `auth.uid()` and a fixed `search_path`.
- No service-role credential in browser code.
- Archived child profiles cannot sync.
- Database checks and RPC validation constrain mission, Passport and achievement identifiers to the reviewed curriculum vocabulary; unknown payload keys and oversized arrays are rejected.
- Cross-adult isolation must be integration-tested.
- Supabase security advisor must remain clear after DDL changes.

## Stage 9 release gate
Stage 9 is GREEN only after repository tests, real database authorization/isolation tests, local-to-cloud migration tests, conflict tests, bilingual/mobile account integration, and browser QA pass. Production/pilot use remains subject to the Stage 8 legal/privacy/operator gates.
