# Implementation status

## Feature: Full schema integration + auth modal

### What was requested
- Frontend modal (shared for create and edit) consumes all schema fields
- Email auth (OTP) as first step before profile fields are shown
- After OTP verify: generate session UUID, store `last_challenge = SHA256(session_uuid)` + `last_challenge_time` on designer row (or in sessions table for new registrations); return session UUID to client for use in POST/PUT
- Accordion sections to break up the form
- Gravatar for avatar (SHA256 of email, Gravatar now supports SHA256)
- Cloudflare Email Workers (`send_email` binding) for OTP delivery

---

### Status: COMPLETE
