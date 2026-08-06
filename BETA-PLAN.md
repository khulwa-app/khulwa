# Khulwa Beta — Technical Build Plan

> [!WARNING]
> **SUPERSEDED — HISTORICAL RECORD ONLY. DO NOT USE THIS FILE FOR IMPLEMENTATION.**
>
> The approved and authoritative implementation direction is
> [`docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md`](docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md). Every task card,
> checklist, status, convention, definition of done, file path, palette, and execution order below is a
> snapshot of earlier work, not current guidance. References to Chakra UI, Arabic/RTL, focus categories,
> legacy indigo/violet, saffron/sage, or “Forest bright” palettes, and `client/` or separate `server/` paths
> are historical. Do not implement or revive them.

Execution plan for the rest of the beta roadmap (Phases 1–3 + post-beta), written to be handed to
Claude Code one task card at a time. Mirrors the Apple Note *"Khulwa — Beta Roadmap & Todo (live)"*.

**Historical basis:** the code and file layout as they existed on 26 Jun 2026.
Tasks are ordered; later cards assume earlier ones. Each card is independently shippable.

---

## 0. Historical conventions and ground rules — do not use

> **Full engineering conventions live in `CLAUDE.md`** (auto-loaded every session — the source of truth):
> Chakra v3 **styling = theme/recipes only, never inline**; read Chakra/Next docs when unsure; clean small
> single-responsibility components; layering (server in `app/`+`lib/`, UI in `modules/`, data in `services/`);
> i18n + RTL; a11y. Design language: `design-system/khulwa/DESIGN-SYSTEM.md`. This section is the
> task-specific summary only.

> **STRUCTURE UPDATE (28 Jun 2026):** The Express `server/` was folded into the Next.js app and the
> `client/` wrapper was flattened — **the single Next.js app IS the repo root.** Cards below may still
> show old paths: map `client/X` → `X`, and `server/src/Y` → `lib/Y` (Drizzle services → `lib/services/`,
> Express routes → `app/api/**/route.ts`). Backend now runs in-app; there is no separate server.

**Stack.** Single Next.js 16 app at the repo root (React 19, Chakra UI v3, Zustand, next-intl,
TanStack Query, better-auth). Backend runs **in the app**: route handlers in `app/api/**` calling
Drizzle (Neon Postgres) via `lib/` (db, schema, auth, email, services, validation). No `/api` rewrite proxy.

**Run.**
- `yarn dev` (`:3000`) — one process serves UI + API.
- DB: `yarn db:push` (apply schema), `yarn db:studio` (inspect). Schema in `lib/db/schema/`.
- After **any** Chakra theme change: `yarn typegen`.

**Layering (hard rule).** Server-side code (SSR, route handlers, session/DB) lives in `app/` + `lib/`.
Pure client UI lives in `modules/**`. Server-data-access (HTTP + TanStack) lives in `services/<domain>`.
Never drive frequent UI toggles through URL navigation on a dynamic route — use Zustand (see spaces/panels).

**Definition of done (every task).**
1. `yarn lint && npx tsc --noEmit` clean.
2. No raw hex/px in TSX — use tokens / `textStyle` / `layerStyle` / recipes (see `design-system/khulwa/DESIGN-SYSTEM.md`).
3. Both light & dark verified for any UI.
4. i18n: every user-facing string added to `messages/en.json` (+ `ar.json`) via `useTranslations`, never hardcoded.
5. New square/labelled controls follow the radius tiers and the squircle list (`app/globals.css`).

**Schema is already live.** All tables exist (`lib/db/schema/`): `task`,
`focusSession`, `dailyCategoryTotal`, `streak`, `note`, + better-auth tables. **No new migrations
needed for Phase 1** unless a card says so.

---

## HISTORICAL FOUNDATION — superseded prerequisite plumbing

### F1 — Server: `requireAuth` middleware + route scaffolding — ✅ DONE
**Goal.** A reusable auth guard that resolves the better-auth session and attaches `req.user`, plus a
`/api` router to hang feature routes on.
**Files.** `server/src/auth/index.ts` (existing `auth`), new `server/src/middleware/require-auth.ts`,
`server/src/app.ts` (mount), new `server/src/routes/index.ts` (api router).
**Approach.**
- `require-auth.ts`: `const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })`;
  if no session → `res.status(401).json({ error: "unauthorized" })`; else `req.user = session.user; next()`.
- Mount a top-level `apiRouter` at `/api` in `app.ts` **after** the better-auth handler and `express.json()`.
  Feature routers (tasks, notes, focus, progress, streak) attach to it, all behind `requireAuth`.
**Acceptance.** A protected `GET /api/me` returns the user when logged in, 401 otherwise (verify with the running client session).

### F2 — Client: server-state data layer (TanStack Query) — ✅ DONE
**Goal.** One consistent way to read/write server data; stop using localStorage for anything the DB owns.
**Decision.** Add `@tanstack/react-query` for **server state** (tasks, notes, progress, streak). Keep
Zustand only for **ephemeral UI / runtime** state (`usePanels`, `useSounds`, the pomodoro *timer runtime*).
*(Alternative if you'd rather not add a dep: a typed `fetch` wrapper + keep Zustand and call the API from
actions. TanStack is recommended — caching, invalidation, optimistic updates for free.)*
**Files.** `client/package.json` (+dep), new `client/modules/api/query-client.ts`,
`client/modules/api/fetcher.ts` (thin `fetch` wrapper hitting `/api/*`, throws on !ok, JSON in/out),
provider mounted in `client/app/app/layout.tsx` (or a client providers wrapper).
**Acceptance.** A trivial `useQuery(['me'], …)` renders the logged-in user in `/app`. Devtools optional.

---

## HISTORICAL PHASE 1 — Backend logic snapshot

> The 4 note checkboxes: streak logic BE, streak API + replace localStorage, category % tracking BE,
> tracking API to feed charts. Built on the `focusSession` → `dailyCategoryTotal` → `streak` model.

### P1.1 — Focus-session ingest endpoint (the write path) — ✅ DONE
**Goal.** One transactional write when a focus block completes: insert the session, upsert the day/category
total, recompute the streak.
**Files.** new `server/src/routes/focus.ts`, new `server/src/services/tracking.ts` (pure functions), schema (read-only).
**Endpoint.** `POST /api/focus-sessions` body `{ taskId?: string, category: Category|null, durationSeconds: number, startedAt: ISO, endedAt: ISO }`.
**Approach (one DB transaction).**
1. `insert into focusSession`.
2. Upsert `dailyCategoryTotal` for `(userId, day=date(endedAt), category)`: `totalSeconds += durationSeconds`
   (`onConflictDoUpdate` on the unique `(userId,day,category)`).
3. Streak recompute (see P1.2) using `day`.
Return `{ streak, todayTotals }` so the client can update without a refetch.
**Acceptance.** Posting a session creates exactly one `focusSession` row, bumps the right daily total,
and updates `streak`. Re-posting accumulates, doesn't duplicate the daily row.

### P1.2 — Streak compute logic (BE) — ✅ DONE
**Goal.** Maintain `streak.current / longest / lastActiveDay` from activity days.
**Files.** `server/src/services/tracking.ts` (`recomputeStreak(tx, userId, activeDay)`).
**Rules.** A day "counts" if it has ≥1 focus session (any category). On a new active `day`:
`if day === lastActiveDay → no-op; else if day === lastActiveDay+1 → current += 1; else current = 1`;
`longest = max(longest, current)`; `lastActiveDay = day`. Use the user's local day (pass day from client or
store a tz; for beta, derive day from `endedAt` in UTC and note the limitation).
**Acceptance.** Unit-style check: consecutive days increment; a gap resets to 1; same-day repeats don't change current.

### P1.3 — Read endpoints: streak + progress aggregates — ✅ DONE
**Goal.** Feed the dock streak badge and the Progress charts.
**Files.** new `server/src/routes/progress.ts` (+ streak route or fold in).
**Endpoints.**
- `GET /api/streak` → `{ current, longest, lastActiveDay }`.
- `GET /api/progress?range=day|week` → per-category totals. `day` = today's `dailyCategoryTotal` rows;
  `week` = last 7 days grouped by `(day, category)` for the weekly/daily charts. Shape:
  `{ range, totals: { [category]: seconds }, series: [{ day, [category]: seconds }] }`.
**Acceptance.** Both return correct numbers for a seeded user; empty user returns zeros/empty series, not 500.

### P1.4 — Client: log focus via API + read streak/progress from API — ✅ DONE
**Goal.** Replace the localStorage progress/streak path with the server.
**Files.** `client/modules/spaces/components/focus-space.tsx` (logs on focus completion — currently
`useProgressStore.logFocus(...)`), `client/modules/progress/hooks/use-progress-store.hook.ts` (retire or thin
to UI-only `selected`), `client/modules/dock/components/dock.tsx` (streak badge currently hardcoded `streakCount = 0`),
new `client/modules/progress/api.ts` (query/mutation hooks).
**Approach.**
- On focus-phase completion: `useMutation` → `POST /api/focus-sessions`; on success invalidate `['progress']` & `['streak']`.
- Dock streak badge: `useQuery(['streak'])` → real `current` (remove the `0` placeholder).
- ProgressPanel + TodayProgress read `useQuery(['progress','day'])` instead of the store's `byDate`.
- Delete the `byDate`/`logFocus` localStorage persistence (keep `selected` category as ephemeral Zustand/UI state).
**Acceptance.** Completing a focus round updates the dock streak and progress without reload; data survives a
refresh (it's in Postgres); localStorage no longer holds progress.

### P1.R — Recommended addition: Tasks & Notes persistence API — ✅ DONE (tasks client migrated; notes API ready, notes client lands with P2.4)
> *Not literal note checkboxes, but mandatory-login + existing `task`/`note` tables imply it.
> Needed before the Phase 2 "simpler tasks panel" and "notes panel" are meaningfully done. Trim if you
> want beta to stay localStorage for tasks.*
**Endpoints.**
- Tasks: `GET/POST /api/tasks`, `PATCH/DELETE /api/tasks/:id`, reorder via `position`.
- Notes: `GET/POST /api/notes`, `PATCH/DELETE /api/notes/:id`.
**Files.** `server/src/routes/tasks.ts`, `server/src/routes/notes.ts`; client `client/modules/tasks/api.ts`,
migrate `use-tasks-store.hook.ts` from `persist` localStorage to TanStack mutations (optimistic).
**Acceptance.** Tasks/notes survive logout/login on another device; no localStorage task data.

---

## HISTORICAL PHASE 2 — Core UI/UX snapshot

### P2.1 — Progress: its own page + charts
**Goal.** A dedicated `/app/progress` route with category-% + weekly/daily charts (not just the side panel).
**Deps.** P1.3 (aggregate API). **Add chart lib:** none installed — add **recharts** (small, React-first).
**Files.** new `client/app/app/progress/page.tsx`, new `client/modules/progress/components/progress-page.tsx`,
chart components (donut for category %, bar/area for weekly/daily), `client/package.json` (+recharts).
**Approach.** Use `GET /api/progress?range=week`. Donut = today category share; bar = last-7-days stacked by
category using `category.*` color tokens. Respect reduced-motion (disable chart entry animation). Provide an
empty state ("No focus logged yet"). Keep the existing ProgressPanel as the quick glance; link "See all → /app/progress".
**Acceptance.** Route renders real data, both themes, mobile width OK, empty state shown for new users.

### P2.2 — Remove % progress from the dock — ✅ DONE (dock shows real streak via `useStreak`; no % indicator remains)
**Goal.** Declutter the dock per roadmap.
**Files.** `client/modules/dock/components/dock.tsx`, `client/theme/slot-recipes/dock.ts`.
**Note.** There is **no live % indicator** today — the dock shows a **streak** badge (`Dock.Streak`).
Confirm intent with the design: either (a) keep the streak badge (now real from P1.4) and this card is "verify
no %-progress UI remains," or (b) if a category-% ring was intended, it was never built — close the item.
Recommended: keep streak, mark the note item done.
**Acceptance.** Dock shows only the intended metric; no dead/zero indicator.

### P2.3 — Settings panel: real sections — ✅ DONE
**Goal.** Turn the placeholder Settings panel into Account / Pomodoro / Theme sections.
**Files.** `client/modules/spaces/components/settings-panel.tsx` (currently a placeholder), new section
components under `client/modules/settings/`.
**Sections.**
- **Theme** (P2.3a): move `ColorModeToggle` from the navbar (`client/components/ui/navbar/navbar.tsx`)
  into Settings; remove it from the outer chrome. Keep `useColorMode`.
- **Pomodoro** (P2.3b): expose `focusMinutes / shortBreakMinutes / longBreakMinutes / rounds / autoStart`
  (currently hardcoded `DEFAULT_POMODORO` in `client/modules/pomodoro/constants/index.ts`, with a
  persisted `usePomodoroStore`). Wire inputs to the store; the timer reads from the store, not the constant.
- **Account** (P2.3c): show name/email from `useSession`; `signOut()` action; (password/email change optional).
**Acceptance.** Toggling theme in Settings works and navbar no longer has the toggle; changing focus length
actually changes the next timer; Account shows the real user and can sign out.

### P2.4 — Notes panel implementation — ✅ DONE
**Goal.** Build the missing NotesPanel (slot already reserved: `Panel.Notes`, dock Pen button, `n` hotkey,
palette entry — all currently toggle a panel that renders nothing).
**Deps.** P1.R (notes API) for persistence; can ship localStorage-first then swap.
**Files.** new `client/modules/notes/` (`components/notes-panel.tsx`, `api.ts` or store, hydration hook),
mount `<NotesPanel />` in `client/modules/dock/components/dock.tsx` (alongside the other panels).
**Approach.** Match the existing panel template (`SidePanel` → header + `ScrollArea` body). Simple set of
notes (title optional + content), autosave on blur/debounce via `PATCH /api/notes/:id`. Use `InlineEdit`
(existing building block) for in-place editing.
**Acceptance.** Pen button / `n` / palette open a working notes panel; notes persist; both themes.

### P2.5 — Simpler tasks panel — ⏸ PARKED (design locked — core UI is done/loved)
**Goal.** Reduce visual/interaction complexity of the tasks panel (roadmap: "simpler tasks panel").
**Files.** `client/modules/tasks/components/tasks-panel.tsx`, `task-list.tsx`, `tasks-row.tsx`, `quick-add.tsx`.
**Approach.** Needs a design pass — define "simpler" with the user before building (fewer per-row actions /
lighter hover cluster). Treat as: propose 1–2 layout options, then implement the chosen one.
**Acceptance.** Agreed simplified layout shipped; existing task actions still reachable; both themes.

### P2.6 — Redesign Focus space (violet play btn, keep rounds + category logic) — ⏸ PARKED (design locked)
**Goal.** Visual refresh of the focus space; keep the round/category mechanics.
**Files.** `client/modules/spaces/components/focus-space.tsx`, `client/modules/pomodoro/components/phase-tabs.tsx`.
**Notes.** Play button is already `iconPrimary` (violet) — confirm it reads as the intended violet CTA. Keep
`NoorOrb`, phase tabs, round dots, the category chip, and the `logFocus`→API call (now P1.4). This is a layout/
hierarchy redesign, not a logic change — get a design direction first.
**Acceptance.** Refreshed layout, rounds + category logging intact, reduced-motion respected.

### P2.7 — Logo redesign to new colors — ⏸ PARKED (design locked)
**Goal.** Update the logo to the current violet/magenta palette (SVG still uses the old magenta).
**Files.** `client/assets/svg/logo/logo-dark.svg`, `logo-white.svg`, `client/components/ui/logo/logo.tsx`.
**Approach.** Re-color the orb gradient to `violet.400 → magenta.500` (match `NoorOrb`); keep the auto
light/dark variant switching. Verify against the workspace logo explorations if any are canonical.
**Acceptance.** Logo matches brand colors in both themes; no hydration flash.

---

## HISTORICAL PHASE 3 — Cleanup/polish snapshot

### P3.1 — Move `buildDateLine` to clock utils — ✅ DONE (helper no longer exists; date line uses `@/modules/clock`)
**Files.** find `buildDateLine` (greeting/clock area) → move to the clock utils module; update imports.
**Acceptance.** Single home for the helper; no behavior change; typecheck clean.

### P3.2 — Shared `useMounted` hook — ✅ DONE (`hooks/use-mounted.ts`)
**Goal.** One `useMounted()` replacing the repeated hydration-guard pattern (navbar toggle, color mode, etc.).
**Files.** new `client/hooks/use-mounted.ts`; refactor call sites (color-mode toggle, any `mounted` useState).
**Acceptance.** Duplicated mount guards replaced; SSR-safe; no flash.

### P3.3 — Dedupe `card` / `card-anchor`
**Goal.** Two near-identical layer styles (`card`, `card-anchor` in `client/theme/layer-styles.ts`) — collapse
to one with a parameter or keep both only if the radius/って difference is real (anchor = roundest tier).
**Files.** `client/theme/layer-styles.ts` + usages.
**Acceptance.** One canonical card surface (or a documented reason both exist); `yarn typegen` rerun.

### P3.4 — Rename stale `glow-sage` token
**Goal.** Accent is magenta now, not sage. Rename `glow-sage` (tokens `glowSageLight/Dark`,
`semantic-tokens/shadows.ts`, `tokens/shadows.ts`) to a palette-neutral name (e.g. `glow-accent`).
**Files.** `client/theme/tokens/shadows.ts`, `client/theme/semantic-tokens/shadows.ts`, usages; `yarn typegen`.
**Acceptance.** No `sage` references remain; shadows unchanged visually.

### P3.5 — Badge variant matrix
**Goal.** Define/round out the badge slot recipe variants (tone × emphasis) consistently.
**Files.** `client/theme/slot-recipes/badge.ts`.
**Acceptance.** Documented variant set; all tones covered in both themes.

### P3.6 — Orb compositor-only rebuild (perf)
**Goal.** Ensure `NoorOrb` animates on the compositor only (transform/opacity/filter), no layout/paint thrash.
**Files.** `client/modules/companion/components/noor-orb.tsx`, `client/theme/keyframes/index.ts` (`noor-*`),
`layer-styles.ts` (`noor`).
**Approach.** Audit `noor-pulse/hue/bloom` for non-compositor props; keep `will-change: transform`; verify in
DevTools "Rendering → Paint flashing" that the orb doesn't trigger repaints. Respect reduced-motion.
**Acceptance.** No paint on each frame; 60fps; reduced-motion path unchanged.

---

## HISTORICAL POST-BETA IDEAS

## Historical suggested execution order — do not execute

1. **F1 → F2** (foundation) → 2. **P1.1 → P1.2 → P1.3 → P1.4** (tracking goes end-to-end) →
3. **P1.R** (tasks/notes API, if keeping) → 4. **P2.3** (Settings: quick wins, theme+pomodoro) →
5. **P2.1** (Progress page) → 6. **P2.4** (Notes panel) → 7. **P2.2** (dock cleanup) →
8. **P2.6 / P2.5 / P2.7** (design-led, confirm direction first) → 9. **Phase 3** polish.

> Cards marked "get a design direction first" (P2.5, P2.6, P2.7) should pause for a design decision before
> building — don't let an agent invent the layout unsupervised.
