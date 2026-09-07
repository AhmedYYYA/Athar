# ATHAR | أثر — Pilot Tracker Data Dictionary

The CSV trackers are deliberately minimal and contain no child-name field.

## Session tracker
- `participant_code`: operator-issued pseudonymous code; do not encode the child's name/contact details.
- `age_band`: `7-9` or `10-12`.
- `primary_language`: `ar` or `en` for the pilot session.
- `device_class`: e.g. phone/tablet/laptop/desktop.
- `browser`: browser/version when known.
- `session_date`: date only unless finer timing is operationally necessary elsewhere.
- `session_number`: sequence for that participant code.
- `missions_tracks_attempted`: bounded identifiers/names, not raw answers.
- `approx_duration_minutes`: approximate bounded session duration.
- `completion_status`: completed/partial/stopped.
- `evidence_signal`: independent/supported/not-yet where relevant.
- `observation_codes`: NAV/LANG/COMP/JUDG/SAFE/SUP/ACC/TECH/ENG.
- `highest_issue_severity`: S0/S1/S2/S3.
- `defect_incident_refs`: IDs only; sensitive case narratives belong in the operator's approved system, not this tracker.

## Issue tracker
`issue_type` should distinguish product defect, usability, localization, accessibility, pedagogy, safety/privacy control, or other approved category. `summary` should be factual and minimal. Do not paste child disclosures or private conversations.

## Daily control
The daily tracker supports operational decisions and segmentation by language/age band without identifying children.

## Retention and access
Retention duration, storage location, access controls, deletion and any linkage key between participant code and real identity are external governance decisions and must be approved before pilot execution. They are not implemented by the ATHAR static website.
