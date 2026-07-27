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

This is the rule we care about most. TSX carries structure and tokens, never raw looks.

- **No inline styling.** No `style={}`, no `sx`, no Tailwind, no hardcoded hex/px/rgba. Raw values live in
  exactly one place: `theme/tokens/**` (+ `semantic-tokens/shadows.ts`). Semantic tokens reference primitives;
  recipes/layer-styles reference tokens — never raw values. The *only* sanctioned `style={}` is a genuinely
  dynamic runtime value (e.g. per-index `animationDelay`), annotated on the line with `theme-lint-allow`.
- **Components consume semantic tokens, never primitive ramps.** Use `primary.solid`, `fg.muted`,
  `bg.subtle` — not `peach.500`, `whiteA.strong`; interaction veils reference `whiteA.faint/dim` directly (documented exception: alphas compose over the gradient). Documented exceptions need a terse comment on the line.
- **No visual overrides at call sites.** No `boxSize`/`rounded`/`size`/`color` for *chrome* on primitives
  (esp. `IconButton`/`Button`, panel/card surfaces) — encode it in the recipe/slot/variant. Glyph `boxSize`
  on `<Icon>` is content sizing and is fine.
- **Primitives → recipes; compound components → slot-recipes.** The styled slot map
  (`createSlotRecipeContext` + `withProvider`/`withContext`, rendering nothing) lives beside its recipe in
  `theme/slot-recipes/<key>.ts` (see `panel.ts`); components rendering real markup live in `components/ui/**`.
  Import slot compounds via their deep path (`@/theme/slot-recipes/task-list`), never a barrel. Every
  `components/ui/**` folder ships a complete `index.ts` barrel.
- **Recipe hygiene:** no `className` field in recipes; don't re-declare Chakra's built-in `base` defaults
  (the config deep-merges with `defaultConfig` — only overrides); **never `focusRing: 'none'`**. Focus is
  global-fallback + recipe-owned (see the comment in `theme/system.ts`); **do not set `disableLayers`** —
  recipes intentionally beat the global `*:focus-visible` via `@layer recipes`.
- **Button variants are the native set** — `solid · subtle · surface · ghost` (flat deep-space treatments;
  no `outline` — nothing in the flat language has a border) + `link`. `*.panel` variants are `@deprecated`
  transitional light-panel looks; delete each with its screen's redesign chunk. `Button`/`IconButton`
  import from `@/components/ui`, never `@chakra-ui/react`. The glass/onMesh vocabularies are retired — surfaces are
  solid on the dark-first native scale (`bg` = jet.950 … `bg.emphasized` = jet.700) — the flip is DONE; light legacy screens render wrong until their redesigns (accepted).
- **Menus** come from `@/components/ui/menu` (`Menu.Content` bundles Portal + Positioner) — never
  hand-assemble `Menu.Positioner`/`Portal` at call sites. Panels/drawers use the `panel`/`drawer` recipes.
- **Every new scroll region uses `ScrollArea`** (`@/components/ui`). Existing native/slot overflow migrates
  with its redesign chunk, not as silent parity edits.
- **Run `yarn typegen` after EVERY theme change** (tokens/recipes/text-styles/layer-styles/slot-recipes);
  run `yarn lint:theme` before handing off (greppable guardrails for all of the above).
- **When you don't know a Chakra v3 API, READ THE DOCS** — v3 differs heavily from v2 and from training data.
  Check `node_modules/@chakra-ui/react` types / the Chakra v3 docs before guessing. Same for **Next 16**:
  read `node_modules/next/dist/docs/` before writing framework code (APIs have breaking changes).
- **Container sizes:** `container.*` is dead in v3 — use the T-shirt scale (`maxW="7xl"` ≈ 1280px).

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

Canonical: **`design-system/khulwa/DESIGN-SYSTEM.md`** — the single design-system reference (clear "liquid
deep space" identity: flat solid navies over a 204° gradient field, azure accent, pill-first radii,
Nunito, dark-first). The implemented theme lives in `theme/` and is the ultimate source of truth; the doc
mirrors it. **Read it before any space/chrome/type/token work.**

## Definition of Done (every task)

1. `yarn lint && npx tsc --noEmit` clean.
2. Tokens/recipes only — no inline styles, no raw hex/px (see styling rules above).
3. Both light & dark verified for any UI; `prefers-reduced-motion` respected.
4. Every new user-facing string in `en.json` + `ar.json` via `useTranslations`.
5. `yarn typegen` run if the theme changed.
