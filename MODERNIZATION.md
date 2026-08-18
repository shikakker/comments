# comments — Modernization Roadmap

The repository combines content posts with Next.js components/hooks and environment-driven functionality, making comment identity, persistence and moderation boundaries important.

## 10 tasks

1. Trace how comments are created, fetched and associated with `_posts` content; document the actual persistence/provider architecture.
2. Audit `.env.local.example` and ensure authentication/database/provider secrets are server-side and represented by placeholders.
3. Add input validation, length limits and output escaping/sanitization appropriate to the implemented comment format.
4. Define identity and authorization rules for create/edit/delete operations that actually exist.
5. Add abuse controls such as rate limiting/moderation hooks only at the relevant write boundaries.
6. Add loading, empty, submission-pending, validation-error and provider/database failure states.
7. Add tests for comment mapping, validation and authorization-sensitive behavior.
8. Add CI for lint, type-check/tests and production build.
9. Audit accessibility for comment forms, error announcements, focus management and threaded/list presentation.
10. Create a portfolio case explaining content + interaction architecture and trust/safety trade-offs without claiming a large-scale moderation platform.

## Portfolio value

A compact case for demonstrating user-generated-content UX and engineering, especially if security and moderation boundaries are documented precisely.