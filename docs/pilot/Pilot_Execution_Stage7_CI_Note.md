# Stage 7 CI Expectation

The repository gate must run the existing smoke, mission regression and experience-hardening checks plus the new Stage 7 integrity test through `npm test`, followed by the established browser QA workflow. Stage 7 is not GREEN until the final PR head passes the configured workflow.
