# Khulwa Redesign — Tailwind CSS + DaisyUI

This plan replaces the current Chakra UI visual system without rewriting Khulwa's
working product logic. Each phase should leave the application runnable and is
independently reviewable.

## Product behavior to preserve

- Authentication and server-seeded session data.
- Home, Focus, and Ambient spaces.
- Pomodoro phases, rounds, settings, and floating timer continuity.
- Tasks, steps, exclusive doing-now selection, and AI task breakdown.
- Notes.
- Ambient sound playback and persisted volume state.
- Focus-session logging, categories, streaks, and progress data.
- Command palette and keyboard shortcuts.
- English copy through `next-intl`.

## Decisions required before visual implementation

- [ ] Approve the visual references and overall art direction.
- [ ] Approve the primary typeface and timer/numeric typeface.
- [ ] Decide whether Khulwa is dark-only or supports light and dark themes.
- [ ] Approve the information architecture for desktop and mobile navigation.
- [ ] Decide whether Home, Focus, and Ambient remain state-driven spaces or become routes.

## Phase 0 — Baseline and safety

- [x] Audit the previous branch for reusable non-design behavior.
- [x] Preserve the previous Chakra direction in its original branch.
- [x] Promote the layered Escape behavior fix to `main`.
- [x] Create a fresh redesign branch from updated `main`.
- [ ] Capture baseline screenshots of every current route and major panel state.
- [ ] Add a lightweight critical-flow verification checklist.

### Acceptance

- The redesign branch begins from the latest `main`.
- No unfinished Chakra redesign commits are included.
- Existing behavior is documented before components are replaced.

## Phase 1 — New styling foundation

- [ ] Install Tailwind CSS 4, `@tailwindcss/postcss`, PostCSS, and DaisyUI 5.
- [ ] Add the Tailwind PostCSS configuration and global stylesheet.
- [ ] Configure DaisyUI through CSS and enable only the Khulwa custom theme.
- [ ] Add the modern browser target recommended for DaisyUI with Next.js Turbopack.
- [ ] Define semantic theme variables for background, surfaces, text, borders,
      primary action, secondary action, status colors, and radii.
- [ ] Install and configure the approved fonts through `next/font`.
- [ ] Define a small typography scale and tabular numeric treatment.

### Acceptance

- Tailwind and DaisyUI compile under Next.js 16 and Turbopack.
- A temporary foundation preview renders the approved colors and typography.
- Existing routes still build while Chakra remains temporarily installed.
- No feature component is redesigned during foundation setup.

## Phase 2 — Framework-neutral UI boundary

- [ ] Rebuild `Button` and `IconButton`.
- [ ] Rebuild text, number, checkbox, select, and textarea fields.
- [ ] Rebuild menu, tooltip, modal, drawer, and panel primitives.
- [ ] Rebuild tabs, cards, badges, progress indicators, and empty states.
- [ ] Rebuild scroll-area behavior with native CSS where possible.
- [ ] Add a `cn` utility for conditional class composition.
- [ ] Keep accessibility behavior inside primitives: focus-visible, labels,
      descriptions, Escape handling, and minimum touch targets.

### Acceptance

- Feature modules import application primitives rather than DaisyUI directly
  when behavior or accessibility is involved.
- DaisyUI component classes are not duplicated across unrelated feature files.
- Primitives have keyboard and reduced-motion verification.

## Phase 3 — Application shell and navigation

- [ ] Redesign the authenticated application shell.
- [ ] Redesign desktop navigation.
- [ ] Design and implement the mobile navigation model.
- [ ] Rebuild the command palette.
- [ ] Rebuild persistent timer and sound indicators.
- [ ] Establish responsive page widths, safe areas, and overlay stacking.

### Acceptance

- Navigation works with keyboard, pointer, and touch.
- A running timer and sound playback survive navigation changes.
- Overlays have predictable focus, dismissal, and stacking behavior.

## Phase 4 — Core experience

- [ ] Redesign Home.
- [ ] Redesign task capture, task list, steps, and doing-now selection.
- [ ] Redesign Focus.
- [ ] Redesign short-break and long-break experiences.
- [ ] Redesign Ambient and sound mixing.
- [ ] Redesign Notes.

### Acceptance

- All preserved product behaviors remain available.
- Focus completion still records the correct category and session duration.
- Timer and sound state remain continuous across the experience.
- Empty, loading, error, paused, running, and completed states are designed.

## Phase 5 — Supporting experience

- [ ] Redesign landing and authentication.
- [ ] Redesign Progress.
- [ ] Redesign Settings.
- [ ] Redesign Rhythm.
- [ ] Review all product copy and remove stale design-era terminology.

### Acceptance

- Every route has responsive layouts and complete interaction states.
- All visible strings remain in `messages/en.json`.
- Authentication and server-data error states are understandable.

## Phase 6 — Remove Chakra

- [ ] Remove all `@chakra-ui/react` imports.
- [ ] Remove Chakra and Emotion providers.
- [ ] Remove Chakra and Emotion packages.
- [ ] Delete `theme/`, Chakra-generated types, and typegen scripts.
- [ ] Replace the Chakra-specific theme lint script with relevant Tailwind/DaisyUI checks.
- [ ] Rewrite `CLAUDE.md`, `README.md`, and the design-system documentation.
- [ ] Remove obsolete glass-system assets and notes after confirming they are no longer referenced.

### Acceptance

- `rg "@chakra-ui|@emotion" --glob "*.{ts,tsx,json}"` returns no application dependencies.
- The application builds without Chakra-generated artifacts.
- Documentation describes the actual architecture and visual system.

## Phase 7 — Product hardening

- [ ] Make the Pomodoro timer timestamp-based so background throttling cannot cause drift.
- [ ] Make streak day boundaries timezone-aware.
- [ ] Decide and document local versus server persistence for tasks and notes.
- [ ] Decide whether completed focus sessions link to the doing-now task.
- [ ] Enable stricter TypeScript checks incrementally.
- [ ] Add tests for stores, timer transitions, focus logging, and critical keyboard behavior.
- [ ] Run responsive, accessibility, reduced-motion, and performance audits.

### Acceptance

- Critical focus behavior has automated coverage.
- Timer and streak behavior remain correct across refreshes, background tabs,
  timezones, and day boundaries.
- Lint, type checking, tests, and production build pass.

## Migration rule

Do not translate Chakra style props or slot recipes line-for-line. Rebuild each
screen from approved UX and product behavior. Chakra and DaisyUI may coexist only
as a temporary migration state; no new Chakra-based component should be added.
