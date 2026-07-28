# Riwaq — CLAUDE.md

Riwaq is a calm **focus / deep-work "new tab" dashboard** — pomodoro, ambient sounds, local tasks &
notes, streak/progress tracking. **One Next.js 16 app at the repo root** (no `client/`, no separate server).

> ⚠️ Heads-up: an earlier version of this file was copied from a different app (a GraphQL/Apollo storefront).
> If you see references to `src/`, Apollo, Sentry, yup, or port 5019 anywhere, they are wrong — this is the
> source of truth.

## Stack (accurate)

| Aspect | Value |
| --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack), React 19, Node ≥ 22 |
| UI | **Tailwind CSS v4 + DaisyUI v5** — semantic theme tokens and component utilities |
| State | **Zustand** (local/ephemeral) · **TanStack Query** (server data) |
| Auth | **better-auth** (email + Google), route handlers in `app/api/auth/**` |
| DB | **Drizzle ORM** + **Neon Postgres** (server-backed: focus-sessions, streak, progress) |
| i18n | **next-intl** (`en` + `ar`, RTL-aware) |
| Other | next-themes, Solar icons, `@google/genai` (AI), react-howler (sounds) |
| Dev port | **3000** · Path alias | `@/* → ./*` (repo root) |

No Apollo/GraphQL. No Sentry. No yup. No `src/` dir.

## Commands

```bash
yarn dev          # Turbopack on :3000
yarn build
yarn lint         # eslint
yarn db:push      # apply Drizzle schema to Neon   ·   yarn db:studio
```

## Architecture & layering (hard rules)

Keep a clean line between server and UI — never let a UI interaction trigger server work.

- **Server-side** (route handlers, SSR, session/DB) → `app/` (route handlers `app/api/**/route.ts`,
  page server components) + `lib/` (db, schema, auth, email, services, validation).
- **Client UI** → `modules/<domain>/**` (components + ephemeral client state).
- **Server-data-access** (HTTP + TanStack hooks) → `services/<domain>/` (e.g. `services/progress`).
- **Local / ephemeral state** → **Zustand**. **Tasks & notes are LOCAL Zustand-persist (localStorage), no
  backend** — `services/{tasks,notes}` expose Zustand stores via thin hooks. Panels/spaces are Zustand too.
- Route pattern: `app/**/page.tsx` is a thin server component that imports the module component directly
  (`return <HomePage />`). No `client.page.tsx` shims.

## UI styling — Tailwind and DaisyUI only

- Use Tailwind utilities and DaisyUI semantic classes only. Theme lives in `app/globals.css`.
- Use shared primitives in `components/ui/primitives/` for buttons, fields, panels, overlays, menus, and tabs.
- No gradients, glass, or blur-heavy UI. Sanctuary Dusk is light-first: Bone, Sand, Juniper, Sage, Copper.
- Preserve visible keyboard focus and 44px touch targets. Read local Next 16 docs before framework changes.

## Components — clean, small, professional

- **One component per file, single responsibility.** Keep components small; extract sub-parts into their own
  files. **Scope a parent's children under its folder** (e.g. `tasks-panel/`, `tasks-panel/tasks-row/`) unless
  the piece is genuinely shared, then it lives in `components/ui` or the right general scope.
- **kebab-case** filenames; hooks are `use-*.hook.ts`; each folder has an `index.ts` barrel.
- **No inessential comments** — no narrative/decorative comments; only terse protective ones where logic is
  non-obvious.
- Prefer composition over props-explosions; lift shared types to a `*.types.ts` in the domain.

## i18n (English-only)

- **The app is English-only** (Arabic/RTL support was dropped 2026-07 — no `ar.json`, no `ar` locale, no RTL
  handling). **Every user-facing string** still goes in `messages/en.json` via `useTranslations` — never hardcode.
- Logical properties (`insetInlineStart/End`, `ms/me`, `paddingInline*`) remain the preferred style.

## Accessibility

- Decorative SVGs/icons get `aria-hidden`. Interactive elements keep keyboard focus-visible feedback (don't let
  mouse-ring suppression leak onto keyboard focus). Touch targets ≥ 44px. Respect `prefers-reduced-motion`.

## Design system (source of truth)

Canonical: `app/globals.css` and `components/ui/primitives/`. Sanctuary Dusk: light Bone and Sand surfaces,
Juniper primary actions, Sage support, Copper sparingly for warmth. Rounded, calm, no gradients.

## Definition of Done (every task)

1. `yarn lint && npx tsc --noEmit` clean.
2. Tailwind/DaisyUI primitives used; `prefers-reduced-motion` respected.
3. Every new user-facing string in `en.json` via `useTranslations`.
