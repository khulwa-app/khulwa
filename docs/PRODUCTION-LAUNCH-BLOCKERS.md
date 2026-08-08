# Khulwa Production Launch Blockers

**Status:** Drafted after the AI/subtask removal pass
**Date:** August 6, 2026
**Current verdict:** Internal-alpha ready, not public-launch ready

This plan is the production-hardening companion to the approved
[`UI/UX Audit and Redesign Plan`](./UI-UX-AUDIT-AND-REDESIGN-PLAN.md). It focuses on security, data
integrity, release operations, and final product polish. AI task assist and task subtasks have been removed
from the app, so they are no longer launch blockers.

## Phase 0 - Evidence Lock

**Goal:** Freeze the real current state before changing launch-critical code.

**Sources to read first:**

- `node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md`
- `node_modules/next/dist/docs/01-app/02-guides/production-checklist.md`
- `node_modules/next/dist/docs/01-app/02-guides/data-security.md`
- `README.md`
- `CLAUDE.md`
- `docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md`
- `drizzle.config.ts`
- `lib/auth.ts`
- `lib/env.ts`
- `lib/db/schema/**`
- `lib/services/**`
- `app/api/**`
- `modules/**`
- `services/**`

**Baseline checks:**

- `rg -n "@google/genai|GEMINI|lib/ai|estimateEta|splitTask|task-intelligence|generateText"`
- `yarn audit --groups dependencies --json`
- `yarn lint`
- `yarn test`
- `npx tsc --noEmit`
- `yarn build`

**Current evidence from this pass:**

- AI code, env, package dependency, and task breakdown UI are gone.
- `yarn audit --groups dependencies --json` still reports `1 critical`, `15 high`, `7 moderate`, and `1 low`
  production dependency advisories.
- `yarn lint`, `yarn test`, `npx tsc --noEmit`, and `yarn build` pass. The build needs network while Google
  fonts remain loaded through `next/font/google`.

**Anti-pattern guards:**

- Do not reintroduce AI task assist, Gemini keys, task subtasks, or generated task breakdown copy.
- Do not drop database columns or tables during evidence locking.
- Do not use `yarn db:push` for production or category contraction.

## Phase 1 - Dependency and Framework Security

**What to implement:**

- Upgrade `next` from `16.2.5` to a patched `16.2.x` or newer compatible release. The audit currently cites
  patched `>=16.2.11` for multiple App Router, Proxy, Server Action, and cache advisories.
- Upgrade `eslint-config-next` with `next`.
- Upgrade `better-auth` from `1.6.9` to a patched release. The audit currently requires at least `1.6.22` to
  clear the listed stable-line account and OAuth advisories.
- Re-run the dependency audit and remove or override remaining vulnerable production dependencies only when
  the owning package cannot be upgraded directly.

**References:**

- `package.json`
- `yarn.lock`
- `next.config.ts`
- `lib/auth.ts`
- Next production checklist, especially Security and Server Actions sections.

**Verification:**

- `yarn install`
- `yarn audit --groups dependencies --json`
- `yarn lint`
- `yarn test`
- `npx tsc --noEmit`
- `yarn build`

**Anti-pattern guards:**

- Do not silence audit results with broad resolutions unless the advisory is proven unreachable and documented.
- Do not upgrade Next blindly; read the installed upgrade notes for this major version first.
- Do not rely on Proxy-only authorization for protected data paths.

## Phase 2 - Auth, Account, and Email Readiness

**What to implement:**

- Decide and enforce production email verification. Public signup should not create a durable usable account
  without mailbox ownership proof.
- Add the missing password recovery UI route and flow; server-side reset email support already exists.
- Revoke existing sessions after sensitive auth changes where Better Auth does not already do it.
- Hide or disable the Google button unless both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are configured.
- Make production env validation fail fast for invalid `BETTER_AUTH_URL`, weak `BETTER_AUTH_SECRET`, missing
  required email sender, and incomplete OAuth pairs.
- Decide whether Google OAuth account linking is allowed, and configure it only with verified email ownership.

**References:**

- `lib/auth.ts`
- `lib/email.ts`
- `lib/env.ts`
- `.env.example`
- `modules/auth/components/login-form.tsx`
- `app/api/auth/[...all]/route.ts`

**Verification:**

- Register, verify, sign in, sign out, reset password, and Google sign-in in a production-like environment.
- Confirm auth callbacks use the deployed HTTPS origin, not localhost.
- Confirm no auth emails are silently logged in production.

**Anti-pattern guards:**

- Do not show a provider button for an unconfigured provider.
- Do not accept unverified email equality as identity proof.
- Do not default production auth URLs or senders to local/sandbox values.

## Phase 3 - Data Integrity and Privacy

**What to implement:**

- Namespace local persisted tasks and notes per authenticated user, or purge them on auth changes and sign-out.
- Add an idempotency key to focus-session logging so client retries cannot double-count focus minutes.
- Tighten focus-session input validation: realistic duration ceiling, no future timestamps, and consistent UTC
  boundaries.
- Prevent out-of-order or backdated focus writes from incorrectly moving streak state backward.
- Decide whether tasks and notes are intentionally local-only for launch. If not, build server-backed APIs and
  sync before public launch.
- Add account deletion, data export, retention policy, and local data purge behavior.

**References:**

- `services/tasks/use-tasks-store.hook.ts`
- `services/notes/use-notes-store.hook.ts`
- `services/progress/use-log-focus-session.hook.ts`
- `lib/services/focus-session-input.ts`
- `lib/services/tracking.ts`
- `lib/services/progress.ts`
- `lib/db/schema/focus.ts`
- `modules/settings/components/account-section.tsx`

**Verification:**

- Two accounts in the same browser cannot see each other's local tasks or notes.
- Retried focus-session POSTs count once.
- Future, extreme, malformed, and out-of-order sessions are rejected or handled safely.
- Streak and progress tests cover concurrency and rollback cases.

**Anti-pattern guards:**

- Do not use global localStorage keys for private user data after launch.
- Do not contract category schema until migration baseline, backup, and rollback are proven.
- Do not treat frontend retry behavior as idempotency.

## Phase 4 - Database Migrations and Release Safety

**What to implement:**

- Create a checked-in Drizzle migration baseline under `lib/db/migrations`.
- Prove migrations against a restored production-like database snapshot.
- Write backup, restore, rollback, and forward-fix runbooks.
- Define deployment target, Node version, package manager version, DB TLS posture, and connection pool limits.
- Remove or restrict `db:push` from production workflows.

**References:**

- `drizzle.config.ts`
- `lib/db/schema/**`
- `docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md`
- `package.json`

**Verification:**

- Fresh database migrates from zero to current schema.
- Restored database migrates forward without destructive surprise.
- Rollback procedure is documented and rehearsed.

**Anti-pattern guards:**

- Do not generate destructive migrations during this phase.
- Do not depend on a manually pushed schema as the production source of truth.
- Do not deploy without knowing the maximum DB connections per app instance.

## Phase 5 - App Shell, Accessibility, and Page Polish

**What to implement:**

- Fix `/app/progress` navigation so dock Home, Focus, and Ambient controls navigate correctly from the Progress
  route instead of only mutating client space state.
- Add proper landmarks and skip navigation to landing, auth, app spaces, and Progress.
- Add loading UI for `/app` so the protected shell does not render as a partial blank during session/data load.
- Make mobile Settings a proper accessible sheet or dialog with focus transfer, focus return, and no hidden
  interactive background.
- Ensure all icon-only controls have stable 44px hit targets, accessible names, and tooltips where needed.
- Gate or remove `/foundations` before public launch, or mark it `noindex` and protect it as an internal page.
- Reconcile active docs so README, CLAUDE, design-system, and the authoritative UI plan do not disagree on the
  current palette or implementation state.

**References:**

- `modules/dock/components/dock.tsx`
- `modules/space/hooks/use-space.hook.ts`
- `app/app/progress/page.tsx`
- `app/app/layout.tsx`
- `modules/settings/components/settings-panel.tsx`
- `modules/panels/components/anchored-panel.tsx`
- `app/foundations/page.tsx`
- `app/globals.css`

**Verification:**

- Playwright smoke test across desktop and mobile for Home, Focus, Ambient, Progress, all panels, Settings,
  auth, and keyboard-only navigation.
- Axe or equivalent accessibility pass with no critical issues.
- Manual reduced-motion and 200% zoom checks.

**Anti-pattern guards:**

- Do not solve navigation by duplicating route state and client space state in separate uncontrolled paths.
- Do not make desktop dock panels modal unless the product decision changes.
- Do not expose internal design-review pages publicly.

## Phase 6 - Security Headers, Observability, and Operations

**What to implement:**

- Add production security headers: CSP, HSTS, frame protection, content type sniffing protection, referrer
  policy, and permissions policy.
- Disable or remove `X-Powered-By`.
- Add structured server logging with request correlation IDs.
- Add error tracking, uptime checks, health/readiness endpoints, and alert routing.
- Add CI with install, lint, test, typecheck, build, audit, and smoke gates.
- Add release notes, tag strategy, deployment rollback IDs, and incident response checklist.
- Vendor or self-host the brand font so builds do not depend on live Google Fonts fetches.

**References:**

- `next.config.ts`
- `lib/logger.ts`
- `app/fonts.ts`
- `package.json`
- Next production checklist, Content Security Policy, Instrumentation, and OpenTelemetry guides.

**Verification:**

- Production response headers match the security-header checklist.
- CI blocks vulnerable dependencies and failing tests.
- Build passes offline after fonts are vendored.
- Health checks distinguish app process health from database readiness.

**Anti-pattern guards:**

- Do not rely on console-only logging for production incidents.
- Do not make every endpoint public just because Proxy protects pages.
- Do not deploy a build process that depends on a third-party font network request.

## Phase 7 - Final Go/No-Go

**Required launch evidence:**

- `yarn audit --groups dependencies --json` has no unresolved production critical/high advisories.
- `yarn lint`, `yarn test`, `npx tsc --noEmit`, and `yarn build` pass in CI.
- E2E coverage proves auth, focus logging, progress, local/private data boundaries, panels, Settings, and
  recovery flows.
- Legal pages exist: privacy policy, terms, retention/deletion notes.
- Production env values are pinned and reviewed.
- Migration, backup, rollback, monitoring, and incident runbooks are tested.
- Product owner signs off on tasks/notes local-only versus account-backed scope.

**Launch stance:**

Ship only after Phases 1 through 7 are complete. Until then, the app is suitable for private/internal alpha,
not public production.
