## Tasks

User will write some tasks, user can select which one to work on now, user can toggle if this task done.
I will need zustand store to handle tasks in general and read in the upnext card

Store Body:

<!-- Task -->

{
id: string
body: string
completed: boolean
isDoingNow: boolean
eta: Date
priority: high | mid | low
}

### Todos

[✅] Scaffold tasks store
[✅] persist store
[✅] mock store with one isDoingNow and test upnext card
[✅] build change task feature for upnext card
[✅] build panel for tasks ( side panel )

## Floating pomodoro pill (before/alongside AI v1)

Problem: leaving the Focus space (Home/Ambient) loses sight of a ticking
session. Solution: a quiet floating pill — the "mini player" pattern.

- **Visibility**: only when a session exists (`hasStarted`) AND the active
  space is not Focus. Running = normal; paused = dimmed (forgetting a paused
  session is the real risk). No session → nothing.
- **Placement**: fixed bottom-center, same baseline + glass material as the
  dock (bg.elevated/55, blur 8) — joins the chrome family, corners stay
  owned by the dock clusters.
- **Content**: phase dot (saffron focus / sage break) + mm:ss in
  tabular-nums. Doing-now task title in the tooltip only.
- **Interaction**: the whole pill is one button → changeSpace(Focus).
  Hover raises bg like dock items; press-scale from the button recipe.
- **Smooth/quiet rules**: tabular numerals so the ticking never jitters
  width (the #1 "choppy" cause); panel-in/out keyframes on appear/disappear;
  zero per-second animation; respects prefers-reduced-motion; no aria-live
  (a per-second live region spams screen readers — static aria-label).
- **Code**: modules/pomodoro/components/floating-timer.tsx, mounted in the
  dashboard layout beside <Dock/>; reads usePomodoro + useSpace. z-index 900.

## AI feature ideas (Gemini server action exists in modules/ai)

Filter every idea through Khulwa's ethos: AI works quietly at the edges
(before/after/between sessions), never during. Everything must work with AI off.

### Task intelligence (closest to what we have)

- **ETA estimation** — we already store `eta` per task; users guess badly.
  When a task is created in quick-add, ask the model for a realistic estimate
  ("Read chapter 4 — cognitive psychology" → ~45m, not 30m default).
  Cheap, invisible, immediately useful.
- **Task breakdown** — the "one thing" philosophy breaks when the one thing is
  huge ("write thesis chapter"). A quiet "split this" action on a task →
  3–5 subtasks with ETAs, pre-filled into the list for the user to prune.
  Highest-value feature for a focus app: vague big tasks are the #1 reason
  people don't start.
- **Smart capture** — parse natural language in quick-add:
  "read 20 pages before maghrib, high priority" → body + eta + priority
  fields, no extra UI.

### Session reflection (pairs with the pomodoro)

- **Daily closing summary** — at day's end, turn completed tasks + focus
  minutes into two calm sentences ("You gave 3 hours to deep work today;
  the chapter is done"). Fits the contemplative tone better than charts.
- **Weekly pattern insight** — "your best focus is mornings; Thursday
  sessions usually break early" from session history. Users feel this but
  never compute it.

### Content that matches the soul of the app

- **Intention phrasing** — when a session starts, a one-line intention
  generated from the task ("Twenty-five minutes for chapter four — nothing
  else exists"). Shown once under the timer, in the quiet caption slot.
- **Verse/quote context** — rotate verses relevant to the user's current
  work theme with proper citation, AR + EN. Real differentiator for a
  bilingual app.

### Implementation notes

- All single-prompt calls — typed wrappers over `generateText` (e.g.
  `estimateEta(task)`, `splitTask(task)`) with structured JSON output.
- Free tier (~10–15 RPM on 2.5-flash) is fine for dev; per-user features
  need billing + graceful degradation.
- Privacy: task text leaves the device only if the user enables AI.
- Prerequisite: grow the task model first (see task manager v2 plan).
