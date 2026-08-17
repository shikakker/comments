# Completion plan

1. Document the actual product: a Next.js Pages Router Markdown blog (`_posts`, post index/detail) with a comment form/list and `/api/comment`, not a generic commenting SaaS.
2. Trace `.env.local.example`, `lib/redis.js`, `fetchComment/createComment/deleteComment/getUser` and `/api/comment` end to end; document the exact Redis/provider persistence model and required environment variables without exposing credentials.
3. Define validated post/comment/user schemas with stable comment ids, post slug association, author/display fields, timestamps and bounded body length; reject malformed payloads server-side.
4. Verify the current delete flow: require authenticated ownership or an explicit moderation capability before deletion, and never trust a client-supplied user/id alone to authorize destructive actions.
5. Treat comment bodies as untrusted content: escape/sanitize output, define whether Markdown/links are supported and prevent stored/reflected script injection independently of the trusted `_posts` Markdown pipeline.
6. Add deterministic loading/empty/submitting/success/failure/retry states and rollback optimistic UI after failed create/delete operations; prevent duplicate submissions.
7. Add abuse controls to public submission: request/body limits, rate limiting, basic spam protection and safe structured logging without storing unnecessary personal data.
8. Add unit/API tests for validation, Redis failure, create/delete authorization and sanitization plus interaction tests for reading a post and submitting/recovering a comment.
9. Pin the legacy Next.js/Node toolchain or upgrade deliberately, then add CI for formatting/lint/tests and production build before changing runtime dependencies.
10. Rewrite README as a verified Markdown-blog-with-comments case study covering content source, Redis persistence, comment security/moderation boundary, setup, screenshots and known limitations.
