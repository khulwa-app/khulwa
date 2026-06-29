# Khulwa — CLAUDE.md

Khulwa is a calm **focus / deep-work "new tab" dashboard** — pomodoro, ambient sounds, local tasks &
notes, streak/progress tracking. **One Next.js 16 app at the repo root** (no `client/`, no separate server).

> ⚠️ Heads-up: an earlier version of this file was copied from a different app (a GraphQL/Apollo storefront).
> If you see references to `src/`, Apollo, Sentry, yup, or port 5019 anywhere, they are wrong — this is the
> source of truth.

## Stack (accurate)

| Aspect | Value |
| --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack), React 19, Node ≥ 22 |
| UI | **Chakra UI v3** (`@chakra-ui/react`) — token/recipe driven |
| State | **Zustand** (local/ephemeral) · **TanStack Query** (server data) |
| Auth | **better-auth** (email + Google), route handlers in `app/api/auth/**` |
| DB | **Drizzle ORM** + **Neon Postgres** (server-backed: focus-sessions, streak, progress) |
| i18n | **next-intl** (`en` + `ar`, RTL-aware) |
| Other | next-themes (dual theme), lucide-react (icons), `@google/genai` (AI), react-howler (sounds) |
| Dev port | **3000** · Path alias | `@/* → ./*` (repo root) |

No Apollo/GraphQL. No Sentry. No yup. No `src/` dir.

## Commands

```bash
yarn dev          # Turbopack on :3000
yarn build
yarn lint         # eslint
yarn typegen      # chakra typegen — RUN AFTER ANY theme change
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

## Chakra UI v3 — styling lives in the THEME only

This is the rule we care about most.

- **No inline styling. No `style={}`, no `sx`, no Tailwind, no hardcoded hex/px.** Style only via the theme:
  **tokens, `textStyle`, `layerStyle`, recipes, slot-recipes**, and Chakra style props that resolve tokens.
- **Primitives → recipes; compound components → slot-recipes** (`Component.Root` / `Component.Body` pattern,
  via `createSlotRecipeContext`). Put shared visual logic in the recipe, not the TSX.
- **Run `yarn typegen` after EVERY theme change** (tokens/recipes/text-styles) or types go stale.
- **When you don't know a Chakra v3 API, READ THE DOCS** — v3 differs heavily from v2 and from training data.
  Check `node_modules/@chakra-ui/react` types / the Chakra v3 docs before guessing. Same for **Next 16**:
  read `node_modules/next/dist/docs/` before writing framework code (APIs have breaking changes).
- **Recipe hygiene:** no `className` field in recipes; don't re-declare Chakra's built-in defaults in `base`
  (only overrides); **never `focusRing: 'none'`** (kills keyboard a11y — suppress mouse rings in `globalCss`
  with `disableLayers`, see `theme/system.ts`); variant names use dot-notation for UI context.
- **Container sizes:** `container.*` is dead in v3 — use the T-shirt scale (`maxW="7xl"` ≈ 1280px).
- **Menus:** Chakra `<Menu.Root>/<Menu.Item>` for menus; `SidePanel`/drawer recipe for panels. Don't hand-roll
  menus from `Button unstyled` (strips focus handling).

## Components — clean, small, professional

- **One component per file, single responsibility.** Keep components small; extract sub-parts into their own
  files. **Scope a parent's children under its folder** (e.g. `tasks-panel/`, `tasks-panel/tasks-row/`) unless
  the piece is genuinely shared, then it lives in `components/ui` or the right general scope.
- **kebab-case** filenames; hooks are `use-*.hook.ts`; each folder has an `index.ts` barrel.
- **No inessential comments** — no narrative/decorative comments; only terse protective ones where logic is
  non-obvious.
- Prefer composition over props-explosions; lift shared types to a `*.types.ts` in the domain.

## i18n & RTL

- **Every user-facing string** goes in `messages/en.json` (+ `ar.json`) via `useTranslations` — never hardcode.
- **Logical properties only** for direction: `insetInlineStart/End`, `ms/me`, `paddingInline*` — never
  `left`/`right`. Add `dir="ltr"` to LTR inputs (email/url) inside RTL.

## Accessibility

- Decorative SVGs/icons get `aria-hidden`. Interactive elements keep keyboard focus-visible feedback (don't let
  mouse-ring suppression leak onto keyboard focus). Touch targets ≥ 44px. Respect `prefers-reduced-motion`.

## Design system (source of truth)

Canonical: **`design-system/khulwa/DESIGN-SYSTEM.md`** — the single design-system reference (clear "liquid
glass" identity: light-veil glass over a living indigo→violet mesh, bright specular rim, pill-first radii,
Nunito, dark-first). The implemented theme lives in `theme/` and is the ultimate source of truth; the doc
mirrors it. **Read it before any space/chrome/type/token work.**

## Definition of Done (every task)

1. `yarn lint && npx tsc --noEmit` clean.
2. Tokens/recipes only — no inline styles, no raw hex/px (see styling rules above).
3. Both light & dark verified for any UI; `prefers-reduced-motion` respected.
4. Every new user-facing string in `en.json` + `ar.json` via `useTranslations`.
5. `yarn typegen` run if the theme changed.
