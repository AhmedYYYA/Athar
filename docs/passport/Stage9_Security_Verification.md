# ATHAR | أثر — Stage 9 Security Verification

**Status:** Development verification complete on the deployed Supabase schema; repository CI pending the final PR head.  
**Verified:** 2026-09-08  
**Data rule:** Tests used synthetic adults/profiles inside rolled-back transactions. No test identity or learning record was retained.

## Deployed migration

Supabase recorded `stage9_rpc_boundary_and_contract` as migration version `20260908130058` after the migration first completed successfully inside an explicit rollback-only syntax transaction.

The corrective migration:

- removes authenticated browser mutation privileges and the interim write policies from all four Stage 9 tables;
- grants authenticated `SELECT` explicitly, independently of RLS;
- keeps the public sync RPC as a `security_invoker` wrapper;
- moves the privileged mutator to the non-exposed `athar_private` schema with an empty fixed `search_path`;
- derives the caller from `auth.uid()`, checks the adult-child authorization and rejects archived profiles;
- rejects unknown/oversized payloads and constrains mission, Passport and achievement identifiers to the reviewed v13 vocabulary; and
- records a successful explicit browser-local import as `athar.progress.v1`.

## Transaction-only authorization and contract test

Two synthetic adults and two child profiles were created, each with a different adult-child authorization. Under Adult A's authenticated JWT context, all of the following assertions passed:

| Assertion | Result |
|---|---|
| Authenticated role can read the RLS-scoped state table | PASS |
| Authenticated role cannot insert state directly | PASS |
| Authenticated role cannot update mission rows directly | PASS |
| Anonymous role cannot execute the sync RPC | PASS |
| Adult A can see Adult A's state | PASS |
| Adult A cannot see Adult B's state | PASS |
| Adult A cannot sync Adult B's profile | PASS |
| Payload with an unknown `raw_answer` key is rejected | PASS |
| `independent` evidence cannot be downgraded to `supported` | PASS |
| A stale expected revision returns a conflict without overwrite | PASS |
| Explicit local-import receipt is recorded | PASS |
| `athar_private` is absent from the exposed PostgREST schemas | PASS |

A separate rolled-back test confirmed that an authorized adult cannot sync an archived child profile. Both test transactions were rolled back.

## Advisor result

The Supabase security advisor returned **zero findings** after the corrective migration.

The performance advisor continues to report nine informational unindexed-foreign-key findings on Stage 8 identity/privacy tables. None was introduced by Stage 9. They do not block development progression, but the backend owner must assess/index them before load testing or scaled pilot use.

## Repository evidence

The Stage 9 integrity test passed locally with **77/77 checks**. It covers the persistence schema, RLS/grant boundary, RPC validation, explicit profile binding, bounded runtime payload, session-only profile identifier, deterministic conflict path, Stage 8 exception record and client integration. Full repository and Playwright evidence must be taken from the final PR head before Stage 9 merge approval.

## Decision boundary

This evidence supports continued Stage 9 development and review. It does not authorize production, child-pilot use or real child data, and it does not close the carried-forward Stage 8 Auth, UAE privacy/data-transfer, real-email, bilingual accessibility or privacy-operations gates.
