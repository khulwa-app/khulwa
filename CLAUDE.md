# Khulwa — repository guidance

Riwaq (repository name `khulwa`) is a calm focus and deep-work application: Pomodoro phases, ambient sounds,
local tasks and notes, rhythm, and server-backed streak/progress tracking.

It is one Next.js 16 application at the repository root. There is no `client/`, separate Express server,
workspace configuration, `src/` directory, Apollo/GraphQL, Sentry, yup, Arabic locale, or RTL product mode.

## Sources of truth

1. [`docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md`](docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md) is the approved,
   authoritative redesign source. It controls visual direction, component boundaries, sequencing, review
   gates, and acceptance criteria.
2. [`design-system/khulwa/DESIGN-SYSTEM.md`](design-system/khulwa/DESIGN-SYSTEM.md) is a concise
   implementation reference derived from that plan. It must not contradict the plan.
3. `package.json` and the current source tree describe migration state. Legacy dependencies do not override
   the approved target.

Do not revive older indigo/violet liquid-glass, saffron/sage, Chakra recipe, Nunito, Solar, category, or
standalone break-screen directions.

## Stack

| Aspect | Value |
| --- | --- |
| Framework | Next.js 16 App Router, React 19, TypeScript 5, Node 22+ |
| State | Zustand for local/ephemeral state; TanStack Query for server data |
| Auth | Better Auth; route handlers under `app/api/auth/**` |
| Data | Drizzle ORM + Postgres for focus sessions, streak, and progress |
| i18n | next-intl; English only; user-facing text in `messages/en.json` |
| Audio / AI | react-howler; optional Gemini through `@google/genai` |
| UI | shadcn native primitives in `components/shadcn/**` with Tailwind v4 composition |
| Type / icons | Manrope Variable; Lucide only |

Chakra UI, Emotion, Solar icons, Nunito, and the `theme/` recipe layer were removed in the redesign's final
phase. Do not reintroduce them. DaisyUI is not part of the product either. Styling lives in Tailwind
utilities over the semantic variables in `app/globals.css` — there is no theme-object layer any more.

## Commands

```bash
yarn dev
yarn build
yarn lint
yarn test
npx tsc --noEmit
yarn db:generate
yarn db:migrate
yarn db:push        # explicitly approved local schema work only; never category removal
yarn db:studio
```

Before writing Next.js code, read the relevant guide under `node_modules/next/dist/docs/`. This installed
version has breaking API, convention, and file-structure changes.

## Architecture and layering

- **Routes and server boundaries:** `app/` contains layouts, thin page entry points, and route handlers.
- **Server implementation:** `lib/` contains database, schema, auth, email, environment, and server services.
- **Domain UI:** `modules/<domain>/**` contains components and ephemeral domain behavior.
- **Data access:** `services/<domain>/**` contains HTTP/query hooks and local persisted stores.
- **Generated primitives:** `components/shadcn/**` holds the unforked shadcn base. Regenerate with the CLI;
  do not hand-edit them to solve page layout.
- **Shared UI:** `components/ui/**` contains product-wide compositions built on those primitives.
- **Design tokens:** `app/globals.css` holds every semantic variable and the Tailwind theme mapping.
- **Local persistence:** tasks and notes remain Zustand-persisted in localStorage.
- **Server-backed state:** focus sessions, progress, and streaks flow through `app/api/**`.

Keep `app/**/page.tsx` thin. Prefer one component per file, single responsibility, kebab-case filenames,
`use-*.hook.ts` hooks, and folder barrels. Preserve stable product behavior during visual work.

## Approved design constraints

- Direction: **Deep Juniper + Quiet Amethyst**.
- Typography: **Manrope Variable**, weights 400–700; application UI usually 400–600; timer numerals tabular.
- Icons: **Lucide only**. Express active state through the control container rather than icon-family or
  stroke-weight switching.
- Components: keep **shadcn native primitives** at their native sizes and geometry. Use **Tailwind
  composition** for product-level layout and styling. Do not fork primitives to solve page layout.
- Framework exclusions: **no Chakra UI and no DaisyUI**.
- Brand: the visible product is **Riwaq**. Technical identifiers keep their existing names — the package is
  `focus-den`, the repository is `khulwa`, the auth cookie prefix is `khulwa`, and the `khulwa` i18n
  namespace is a key, not copy. Renaming any of those needs a separate decision.
- Shell: use a **compact dock** and content-driven dock panels anchored near their dock trigger. Desktop dock
  panels are non-modal; mobile may use sheets. Progress is the explicit exception: it is not a dock-capsule
  panel, opens beneath the header streak badge on desktop/tablet, and uses a top or bottom sheet on mobile.
- Focus flow: remove category selection and category statistics. Focus must start without a category.
- Break flow: Short Break and Long Break are integrated states of the Focus stage. Do not create a separate
  full-screen break takeover.
- Atmosphere: static, restrained gradients; no continuous background animation, glow vocabulary, or large
  repainting blur fields.
- Accessibility: 44px minimum hit targets, visible focus, accessible names for icon-only controls, keyboard
  operation and focus return, reduced-motion support, and WCAG AA contrast.

## Review gates

Do not duplicate or abbreviate the gates here. Follow the exact
[implementation sequence and review gates](docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md#12-implementation-sequence-and-review-gates)
in the authoritative plan; the
[concise design reference](design-system/khulwa/DESIGN-SYSTEM.md#review-gates) is only a navigation aid.

## Definition of done

1. Work stays inside its approved phase and preserves unrelated product behavior.
2. The result follows the redesign plan and this derived reference.
3. `yarn lint` and `npx tsc --noEmit` pass for implementation work.
4. User-facing strings are added to `messages/en.json` through `next-intl`.
5. Keyboard, reduced-motion, responsive, and contrast behavior is verified in proportion to the change.
6. The phase review gate is recorded as approved before the next phase begins.
