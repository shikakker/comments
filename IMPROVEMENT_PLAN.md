# Completion plan

1. Reconcile the README with the Pages Router implementation, `_posts`, components, hooks and lib before describing the comment/blog product.
2. Audit `.env.local.example` and identify the actual external backend/provider used for comments.
3. Define typed post/comment/user records and validate all comment payloads server-side before persistence.
4. Add authentication/ownership rules for edit/delete actions and protect moderation/admin operations if implemented.
5. Sanitize user-generated comment content and define link/HTML/Markdown rendering rules explicitly.
6. Add pagination/loading, empty discussion, submission failure, retry and optimistic-update rollback states.
7. Add spam/rate-limit protections before exposing public comment submission.
8. Add tests for validation, authorization, sanitization and core comment flows.
9. Add CI for formatting/lint/type-check, tests and production build.
10. Rewrite README as verified portfolio documentation describing content source, comment persistence, moderation/security boundary, setup and limitations.
