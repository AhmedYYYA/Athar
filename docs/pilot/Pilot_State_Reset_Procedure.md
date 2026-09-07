# ATHAR | أثر — Browser-Local Pilot State Reset Procedure

ATHAR's current pilot stores bounded progress locally in the browser. Shared pilot devices therefore require deliberate state handling.

## When to reset
Reset before a new participant uses a shared browser when prior participant progress could affect mission locks, Passport evidence, age experience, companion selection or the integrity of observations.

## Preferred method
Use the browser's site-data/storage controls for the ATHAR GitHub Pages origin to clear local site data, then reload the site. The exact browser UI varies by platform.

## Verification after reset
- Journey shows clean expected starting state.
- Passport evidence/traces/badges from the prior participant are absent.
- Age experience and companion selection are at intended defaults or are freshly selected.
- Language may be selected again for the participant.

## Caution
Do not clear unrelated browser data on a participant's personal device without permission. For institution-owned/shared devices, follow the site's approved device-management process.

The current website does not provide centralized participant separation; operational reset is therefore part of the controlled pilot design.
