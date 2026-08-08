# Khulwa UI/UX Audit and Redesign Plan

**Status:** Approved — authoritative source for the redesign
**Audit date:** July 29, 2026
**Scope:** Landing, authentication, Home, Focus, break phases, Ambient, Progress, dock, all dock panels, Settings, command palette, desktop, and mobile
**Implementation status:** Phased migration; each phase must pass its review gate before the next phase begins

This file is the source of truth for redesign decisions and sequencing. Repository summaries and implementation
notes must link here and must not introduce a competing visual direction. During migration, the current code may
still contain Chakra UI, Solar icons, Nunito, category statistics, and the standalone break takeover; those are
legacy implementation details to remove through the phases below, not approved alternatives.

## 1. Executive decision

Khulwa should use a **Nocturne** direction: a near-achromatic dark foundation with cool off-white type, depth carried entirely by luminance, and a single sage accent reserved for interaction and focus.

The product should feel:

- Calm enough for long sessions.
- Precise enough to feel like a performance tool.
- Atmospheric without becoming glowy, blurry, or visually heavy.
- Compact at the edges and focused in the center.
- Consistent across Home, Focus, Ambient, Progress, panels, and authentication.

The redesign should retain the existing product logic and familiar dock-to-panel relationship, while replacing the inconsistent visual system and reorganizing each panel around its main job.

The target balance is:

- **70%** neutral dark canvas.
- **20%** opaque or nearly opaque neutral surfaces.
- **10%** sage interaction color.

### 1.1 Naming decision

- **Khulwa** is the approved public product brand and repository/project working identity.
- The selected brand mark is **Quiet Signal**: a symmetric, five-bar focus/sound signal with calm wordmark
  scale.
- Apply the brand once in a dedicated brand step covering product copy, metadata, authentication and email
  copy, icons, logo assets, and other public surfaces.
- Existing technical and package identifiers remain unchanged during the visual migration and do not need to
  match the working identity; for example, `package.json` currently uses `focus-den`.
- Do not rename public pages or assets piecemeal. The dedicated brand phase covers visible brand only and does
  not approve a repository, package, database, cookie, or other technical-identifier rename. Any such rename
  requires a separate engineering decision.

## 2. What was audited

The live application was inspected at desktop and mobile sizes, including:

- Landing page.
- Login and registration states.
- Home space.
- Focus space.
- Current break takeover.
- Ambient space.
- Progress page.
- Tasks panel.
- Notes panel, including empty and editor states.
- Sounds panel, including idle and playing states.
- Rhythm panel.
- Progress quick panel.
- Settings: Account, Focus, and Appearance.
- Command palette.
- Dock inactive, hover, and active states.

The source audit included:

- Theme primitives and semantic tokens.
- Current glass recipes and component styling.
- Dock and floating panel layout.
- Settings drawer behavior.
- Focus, break, Ambient, and Progress structures.
- Task, note, sound, and rhythm component patterns.
- Icon and typography dependencies.
- Existing design-system, README, and development documentation.

## 3. Current-state assessment

### 3.1 Critical issues

| Area | Current issue | Consequence | Required change |
|---|---|---|---|
| Semantic colors | Light-theme `fg` tokens are used inside dark translucent surfaces | Dark text appears on dark panels and controls become difficult to read | Create paired background/foreground semantic tokens for every surface |
| Visual direction | Bright green mesh, dark glass panels, white cards, and older indigo documentation coexist | The app feels assembled from different systems | Establish one Nocturne source of truth |
| Panel positioning | Panels behave like tall side drawers and feel detached from the dock trigger | Weak spatial relationship and excessive visual weight | Anchor compact panels directly above their dock cluster |
| Panel sizing | Panels and Settings consume too much viewport area | The main focus area loses priority | Use content-driven floating panels with strict maximum dimensions |
| Typography | Nunito at very heavy weights feels playful and choppy | Weakens the premium, professional tone | Use Manrope Variable with restrained weights and tabular numerals |
| Icon system | Solar Linear/Bold switching changes weight between states | Active and inactive controls do not feel like one system | Use Lucide only; communicate state with the button container |
| Break flow | Break is a separate full-screen takeover | Breaks continuity and hides session context | Reuse the Focus stage with a break phase state |
| Focus categories | Category selection is present in Focus and statistics structures | Adds a decision that is not essential to starting a session | Remove category from UI, state, API, and backend statistics |

### 3.2 High-priority UX issues

- The central canvas has a lot of unused space without a strong primary action or meaningful state.
- Panel headers, empty states, secondary labels, and selected rows do not share a clear hierarchy.
- Tasks expose too many controls in a single row and alignment becomes fragile.
- Notes expose editor fields before establishing a useful list/browse experience.
- Sounds do not communicate active playback strongly enough, while the panel itself is oversized.
- Rhythm uses nested cards and high-contrast slabs that compete with content.
- Progress empty states show containers before there is useful data to explain.
- Settings uses a half-screen desktop drawer and a fixed 128px mobile sidebar, leaving little room for settings content.
- The command palette selected row is visually louder than the rest of the application.
- The landing and authentication screens use saturated backgrounds, but their actions and form hierarchy do not consistently pass the visual “one obvious next step” test.

### 3.3 Measured live geometry

These measurements explain why the current shell feels large:

- Dock buttons: approximately **42 × 42px**, with about **10px** between items.
- Dock bottom offset: approximately **56px** at a 900px-high desktop viewport.
- Floating tool panel: approximately **352px** wide, **20px** from the edge, and **80px** above the bottom.
- Panel radius: approximately **32px**.
- Settings desktop drawer: approximately **768px** wide at a 1440px viewport.
- Settings mobile navigation: **128px** wide inside a 440px viewport.
- Panel blur: approximately **30px** with high saturation.

The current dimensions are individually plausible, but the combination of large radii, large gaps, heavy blur, and tall surfaces makes the shell feel inflated.

## 4. Chosen visual foundation

### 4.1 Color palette

**Amended July 31, 2026 — "Nocturne".** The original Quiet Amethyst accent was replaced after review: a
saturated violet was the loudest thing on a calm field, and the surrounding greens had already drifted
toward a more neutral direction. The palette is now a near-achromatic dark field carrying a single sage
accent. The 70/20/10 balance and every rule below still hold; only the values changed.

| Semantic role | Value | Use |
|---|---:|---|
| Canvas | `#080B0A` | Main application background |
| Canvas elevated | `#101513` | Static gradient depth and page sections |
| Horizon | `#121A16` | Closing stop of the environment gradient |
| Surface | `#101513` | Dock, panels, cards, fields |
| Surface elevated | `#1B2320` | Hover and nested surfaces |
| Surface interactive | `#232C28` | Selected and pressed states |
| Border | `#343C38` | Quiet dividers |
| Border strong | `#56615B` | Control outlines, field boundaries, emphasis |
| Primary text | `#EDF1EE` | Headings, timer, important values |
| Secondary text | `#C8D3CD` | Body copy and control labels |
| Muted text | `#8E9993` | Metadata and tertiary information |
| Primary action | `#7FA08D` | Primary buttons and active navigation |
| Primary hover | `#90B19D` | Hover for primary actions |
| Focus ring | `#90B19D` | Focus rings and quiet highlights |
| Success | `#6BC49A` | Completion and positive state |
| Warning | `#D6B071` | Streak and caution |
| Danger | `#D97A78` | Destructive actions and errors |

Sage is the only hue in the system, and it always carries **dark** text: light text on `#7FA08D` is
2.65:1 and fails AA outright. Because the field is otherwise neutral, status colours read as genuine
exceptions — which is the point of spending the accent so sparingly.

### 4.2 Contrast validation

Measured against the Nocturne values:

| Combination | Contrast |
|---|---:|
| Primary text on Canvas | `17.33:1` |
| Secondary text on Canvas | `12.85:1` |
| Muted text on Canvas | `6.71:1` |
| Muted text on Surface | `6.26:1` |
| Canvas text on Primary action | `6.88:1` |
| Focus ring on Canvas | `8.43:1` |
| Success / Warning / Danger on Canvas | `9.40:1` / `9.70:1` / `6.59:1` |
| Surface → Surface elevated | `1.15:1` |
| Surface → Surface interactive | `1.28:1` |
| Border strong on Surface | `2.86:1` |

Primary text is a cool off-white. The primary action carries **canvas-dark** text, never white. The two
elevation steps are deliberately subtle but stay above 1.1:1, so a panel reads as raised without needing
an outline. `Border strong` doubles as the field boundary at 2.86:1 — just under the 3:1 guidance for
non-text UI, which is acceptable only because fields also carry a fill and a placeholder.

### 4.3 Premium gradient

The base environment should use one static, low-cost composition:

```css
linear-gradient(135deg, #080B0A 0%, #101513 52%, #121A16 100%)
```

Layered over that base, still entirely static:

1. **Fine grain** at ~140px tile, blended `soft-light`. A near-black gradient bands visibly on wide
   displays; grain is what separates "flat dark" from a surface with material. Dropped under
   `prefers-reduced-motion`, because high-frequency texture is what triggers visual discomfort.
2. **Light slices** — a single `104deg` linear gradient with three soft warm-white bands at 1–2.8%.
   This is the one decorative gesture in the system and it reads as raked light, not as decoration.
3. **A sage pool** upper-left at 9% and **a cool pool** lower-right. The pools are the only place hue
   touches the environment.

Rules that still bind: total lift over the canvas stays under 3% so text contrast is untouched; the
composition never introduces a hue outside sage; nothing animates; and no blur filter is used —
everything is a gradient, so there is no repaint cost during a session.

Rules:

- No gradient buttons.
- No glowing borders.
- No multiple animated blur blobs.
- No blur as a substitute for surface contrast.
- Gradients are limited to the environment, artwork, waveform, and selected data visualization.
- Buttons and controls use solid semantic colors.

### 4.4 Surface treatment

- Dock and panels: nearly opaque surface, `rgb(16 21 19 / 0.94)`.
- Border: 1px light hairline at ~9% opacity or the semantic Border token.
- Backdrop blur: **10–12px maximum**, only where background continuity adds value.
- Shadow: one soft, dark shadow with a short spread; no colored glow.
- Shared panel radius: **20px**.
- **Shape language — pill direction, with three required clauses.** A stadium is correct only when the
  control is (1) sized by its own content rather than stretched to fill, (2) a single line of fixed
  height, and (3) able to afford `padding-inline >= height / 2`, because a stadium sets
  `radius = height / 2` and text closer than the radius runs into the corner arc. Stretched rows,
  stretched buttons, text fields, tab lists, and menu items are therefore never stadiums. Checkboxes
  stay square-ish so they are not mistaken for radios.
- **Padding invariant.** On any control that renders text to its own edge, `padding-inline` must be at
  least the border radius. Tailwind's preflight zeroes padding on form controls, so a radius without
  matching padding clips the leading or trailing glyph.
- **Focus indicators are ink overflow.** Rings and outline offsets never join a scroll container's
  scrollable region, so a focusable child flush against a scrollport edge loses part of its indicator
  permanently. Every scroll container needs a gutter at least as large as its largest focus indicator.

This produces depth through luminance and spacing instead of glow.

## 5. Typography and iconography

### 5.1 Typography

Use **Manrope Variable** for UI, marketing, and numerical displays.

Reasons:

- Rounded enough to feel approachable.
- More controlled and professional than the current heavy Nunito treatment.
- Clear at compact control sizes.
- Strong tabular numerals for the timer and statistics.

Weight rules:

- `400`: supporting text.
- `500`: inputs, navigation, and secondary actions.
- `600`: panel titles, buttons, section labels, and timer.
- `700`: limited to marketing and major page headings.
- Avoid `800` and `900` in the application shell.

Timer numerals use `font-variant-numeric: tabular-nums`.

### 5.2 Icons

Use **Lucide** as the only application icon set:

- Standard icon size: **18px**.
- Small utility icon: **16px**.
- Rare prominent icon: **20px**.
- Stroke: library default or a consistent **1.75–2px**.
- Rounded caps and joins.
- Active state is expressed through the button background and foreground, not by switching to a bold icon family.

Every icon-only button must have an accessible label and tooltip.

## 6. Dock specification

The dock should borrow the compact spatial logic of Flocus without copying its identity.

### 6.1 Desktop

Use two visually balanced zones:

- Left tool capsule: Tasks, Notes, Sounds, Rhythm.
- Right space capsule: Ambient, Home, Focus.
- Right utility capsule: Settings, Fullscreen.
- Progress is not a dock-capsule item; its trigger remains the streak badge in the application header.

Dimensions:

- Visual button: **36 × 36px**.
- Accessible hit area: **44 × 44px**.
- Icon: **18px**.
- Capsule height: **44px**.
- Capsule padding: **4px**.
- Internal gap: **2–4px**.
- Gap between capsules: **8px**.
- Bottom offset: **24px**.
- Horizontal offset: **24–32px**.
- Capsule radius: **14–16px**.
- Active item radius: **10–12px**.

States:

- Default: transparent button on Surface.
- Hover: Surface elevated.
- Active: solid Primary action with warm-white icon.
- Pressed: scale to `0.97` for 80–100ms.
- Focus: 2px Focus/accent ring with 2px offset.
- Tooltip delay: approximately 450ms.

### 6.2 Mobile

- Keep no more than five primary actions persistently visible.
- Move Notes, Rhythm, and Fullscreen to a compact overflow or secondary sheet when necessary.
- Preserve **44px** hit areas while keeping the visual icon buttons at **36px**.
- Place the dock at `safe-area-inset-bottom + 12–16px`.
- Avoid full-width stretched navigation when the content does not require it.

## 7. Shared floating-panel foundation

The legacy spatial behavior is the correct foundation: panels should appear near the button that opened them.

### 7.1 Desktop positioning

- Left tool panels: **24px** from the left, approximately **62px** above the bottom.
- Right utility panels: **24px** from the right, approximately **62px** above the bottom.
- Transform origin matches the opening dock cluster.
- No black backdrop for dock panels or desktop Settings.

Recommended widths:

- Tasks: **360px**.
- Notes: **380px**.
- Sounds: **420px**.
- Rhythm: **360px**.
- Settings: **480–520px**.

The Progress quick panel is a separate header-anchored surface, approximately **360px** wide. On desktop and
tablet it opens directly beneath the header streak badge and uses that badge as its transform origin and focus
return target. It is not positioned from either dock capsule.

Recommended height:

- Content-driven.
- Maximum `min(65vh, 560px)` for tool panels.
- Settings maximum approximately **620px**.
- Internal content scrolls; the panel shell remains anchored.

### 7.2 Panel anatomy

- Header: **48px** high, 16px horizontal padding.
- Title: 14px/20px, weight 600.
- Close control: 32px visual button with a 44px hit target.
- Body padding: 12–16px.
- Field and standard row height: 44px.
- Compact data row: 40px only when it is not an interactive target.
- Footer is sticky only when it contains a persistent action or master control.

### 7.3 Motion and behavior

- Enter: 180ms, opacity + `translateY(8px)` + `scale(0.98)`.
- Exit: 130ms.
- No spring overshoot.
- Respect `prefers-reduced-motion`.
- Only one dock panel is open at a time.
- Trigger toggles its panel.
- `Escape` closes.
- Opening moves focus to the first useful action.
- Closing returns focus to the triggering dock button.
- Desktop dock panels remain non-modal and do not trap focus.

Use modal behavior only for:

- Command palette.
- Destructive confirmation.
- Mobile full-screen or bottom-sheet settings.

### 7.4 Component implementation boundary

Use shadcn native primitives at their native sizes and geometry, with Tailwind composition for product-level
layout and styling. Do not introduce Chakra UI or DaisyUI into the redesigned implementation. Build product
behavior by composing:

- `Button`
- `Input`
- `Textarea`
- `Popover`
- `Sheet`
- `Dialog`
- `Tabs`
- `ScrollArea`
- `DropdownMenu`
- `Tooltip`
- `Slider`
- `Progress`

Do not fork the base shadcn components to solve page-level layout problems.

Tailwind, shadcn, and Lucide are approved targets, not current installed capabilities. Their fresh, pinned
installation and baseline configuration are Phase 1 work.

## 8. Panel-by-panel UX plan

### 8.1 Tasks

Goal: capture and choose the next task with the least possible friction.

- One 44px quick-add row at the top.
- Task row height: approximately 48px.
- Checkbox: 18px.
- Title: 14–15px with a single-line default.
- Secondary ETA is visually quiet.
- Replace the line of action icons with one overflow menu.
- “Doing now” uses a restrained sage tint or 2px left indicator.
- Use Today, Later, and Done as collapsible sections.
- Edit task details inline or in a compact secondary view.
- Empty state is one line of guidance plus the quick-add action.
- Preserve existing task behavior and data while replacing the layout.

### 8.2 Notes

Goal: make capture immediate and retrieval obvious.

- Default view is a note list, not a permanently expanded editor.
- New note is the first action.
- Each list item shows title and a two-line preview.
- Selecting a note opens the editor inside the same panel.
- Show a quiet autosave state.
- Move Delete into an overflow menu.
- Do not show multiple empty bordered fields before the user chooses to create a note.

### 8.3 Sounds

Goal: make selection, playback state, and volume understandable in one glance.

- Three-column tile grid at full panel width; two columns when narrow.
- Tile size approximately 84–92px.
- Sound icon sits inside a 36px visual container.
- Active sound uses a quiet sage tint and a clear playing indicator.
- Per-sound volume appears in a stable detail row or footer and must not reflow the grid.
- Master volume stays in a sticky footer.
- Playback state must be visible without relying on animation.

### 8.4 Rhythm

Goal: present a lightweight routine, not a stack of nested cards.

- Row height: approximately 44px.
- Use subtle surfaces and dividers instead of bright white slabs.
- Show progress in a single quiet progress line.
- Completion uses icon, label, and state color.
- Keep add/edit actions secondary to the routine itself.

### 8.5 Progress quick panel

Goal: give a useful answer in under five seconds.

- The header streak badge is the trigger and anchor on desktop and tablet.
- Open directly beneath the badge, aligned to remain within the viewport, at approximately 360px wide.
- On mobile, use a top or bottom sheet with safe-area padding rather than a dock-anchored floating panel.
- This panel is not part of the left tool, right space, or right utility dock capsules.
- Remove category-based statistics.
- Show three primary values: focus minutes, sessions, and streak.
- Add one compact seven-day sparkline.
- Include a single “View details” action.
- Do not render empty chart frames when no data exists.

### 8.6 Settings

Desktop:

- Floating right-side panel anchored above the Settings button.
- Width 480–520px; maximum height approximately 620px.
- No page scrim.
- Account, Focus, and Appearance use a compact top or side section switcher.
- Rows use visible labels, helper copy only when needed, and consistent 44–48px controls.
- Destructive actions live in a clearly separated section.

Mobile:

- Full-screen sheet or bottom sheet.
- Replace the current 128px vertical sidebar with horizontal tabs or a compact segmented section switcher.
- Keep the content pane at a readable width.

Theme:

- The redesign ships **dark-first and dark-only initially** across landing, authentication, application pages,
  dock, panels, sheets, dialogs, command palette, and native browser color.
- Remove or hide the theme toggle when migration begins so users never enter a mixed legacy/redesign theme.
- Light and System are future options only after a complete second semantic palette exists and every page,
  panel, overlay, state, contrast pair, and browser-color integration passes the same review gates.

### 8.7 Command palette

- Maximum width: approximately 520px.
- Search field: 56px.
- Maximum content height: 440–480px.
- Selected row: sage at roughly 12–15% tint with a subtle border.
- Avoid the current bright white selected slab.
- Provide visible shortcut hints and strong selected-state contrast.
- Command palette remains modal and may use a restrained scrim.

## 9. Page-by-page plan

### 9.1 Landing

- Use the Nocturne static gradient at a slightly richer amplitude than the application canvas.
- Present one dominant CTA.
- Keep a clear product preview or short feature story beneath the hero.
- Reduce decorative color behind important text.
- Explain the product through focused outcomes: begin a session, sustain focus, and understand progress.

### 9.2 Login and registration

- Use a 400–440px elevated Surface card.
- Provide persistent field labels, password visibility, inline error states, and helpful recovery links.
- Primary action remains solid sage with dark text.
- Subdue the environmental gradient behind the form.
- Keep Login and Register as clearly related states without changing the overall frame.

### 9.3 Home

- Preserve calm negative space.
- Reduce extreme heading weight.
- Keep date, greeting, and time as the central hierarchy.
- Add one clear next action: resume the current task, choose one task, or begin Focus.
- Do not fill the page with dashboard cards.

### 9.4 Focus

- Remove the category chip and category menu.
- Show the selected task above the timer when available.
- Timer size: approximately 96–112px desktop and 64–72px mobile.
- Use Manrope 600 with tabular numerals.
- Phase selector remains compact and secondary.
- Primary play/pause control: 56–64px.
- Reset and skip controls retain 44px hit areas.
- Make Running, Paused, and Completed states unmistakable through text, icon, and container state.
- Optional session progress is a thin, non-glowing line.

### 9.5 Break phases

- Remove the standalone full-screen `BreakScreen`.
- Reuse the Focus stage layout with a Short Break or Long Break phase label.
- Retain skip, resume, and timing context.
- Change atmosphere through a restrained surface/accent shift, not a different page or takeover.

### 9.6 Ambient

- Show the selected soundscape and playback state in the center.
- Provide one primary play/pause action.
- Show a concise environment label.
- Keep detailed sound selection inside the Sounds panel.
- Use artwork or a subtle waveform as the only richer visual area.

### 9.7 Progress

- Replace category-shaped statistics with the category-free Progress contract defined in the Phase 0
  expand/contract rollout. Do not drop stored fields or tables as part of the visual page migration.
- Primary metrics: focus minutes, session count, average session, and streak.
- Secondary view: weekly trend and recent sessions.
- Empty state explains what the first completed session will unlock.
- Avoid white cards on a light background or dark text on glass.

## 10. Responsive model

Design and test at:

- 390px mobile.
- 768px tablet.
- 1024px compact desktop.
- 1440px desktop.

| Area | Mobile | Tablet | Desktop |
|---|---|---|---|
| Dock | Maximum five persistent actions; overflow for secondary tools | Compact capsules | Split left/right capsules |
| Tool panels | Bottom sheet or near-full-width floating sheet | Anchored panel when space permits | Dock-anchored floating panel |
| Progress quick panel | Top or bottom sheet | Beneath header streak badge | Beneath header streak badge |
| Settings | Full-screen or bottom sheet | 480px sheet | 480–520px anchored panel |
| Timer | 64–72px | 80–96px | 96–112px |
| Landing/auth | Single column | Single or balanced two-column | Controlled two-column composition |
| Progress | Single-column metrics | Two columns | Four-metric summary plus trend |

All layouts must account for safe areas and short landscape viewports. Panels use internal scrolling rather than extending beyond the viewport.

## 11. Accessibility and performance targets

- WCAG AA contrast minimum; the proposed core combinations exceed 4.5:1.
- Minimum interactive target: 44 × 44px.
- Visible keyboard focus on every interactive control.
- Full keyboard operation for dock, panels, tabs, menus, and command palette.
- Focus return after closing overlays.
- Accessible labels for every icon-only button.
- Reduced-motion support.
- UI transition duration: generally 150–220ms.
- No continuous background animation.
- No large blurred elements that repaint during a session.
- Prefer CSS gradients and transforms over large video or canvas backgrounds.
- Verify at 200% zoom and with long localized strings even if the initial product language is English.

## 12. Implementation sequence and review gates

Each phase should be reviewed before the next phase changes a larger surface.

### Phase 0 — Protect product logic and repair source of truth

1. Snapshot current behavior and create a visual regression route list.
2. Isolate and commit non-design product work already present on the working branch.
3. Migrate category behavior through the non-destructive expand/contract functional slice below.
4. Confirm removal of the standalone break takeover as an explicit product decision.
5. Reconcile README, development instructions, and the design-system document.
6. Record Khulwa as the visible product brand and repository/project working identity; preserve existing
   technical/package identifiers, including `focus-den`, and defer any technical rename to a separate
   engineering decision.

#### Category removal: expand/contract rollout

The current `focus_session` rows already contain user, duration, start, and end timestamps. The current
Progress contract instead reads `daily_category_total`, and no real migration baseline is checked in under
`lib/db/migrations`. Category removal therefore uses a reversible rollout:

1. **Expand the contract without dropping data.** Define a category-free Progress response derived directly
   from `focus_session`, scoped by authenticated user:
   `{ range, totals: { focusSeconds, sessions, averageSessionSeconds }, series: [{ day, focusSeconds, sessions }] }`.
   Keep the persisted category column, enum, and `daily_category_total` table untouched during this stage.
2. **Make UTC behavior explicit.** Validate finite positive durations and valid timestamps, require
   `endedAt >= startedAt`, and bucket sessions by the UTC calendar day of `endedAt` to preserve current
   behavior. Add boundary coverage for midnight UTC, seven-day ranges, empty users, and sessions whose
   category is null.
3. **Optimize only with evidence.** An index such as `focus_session (user_id, ended_at)` is optional; add it
   through a versioned migration only if query plans or production-sized fixtures justify it.
4. **Tolerate legacy writers.** New focus-session clients omit `category`. During the compatibility window,
   the ingest endpoint continues to accept a missing category and known legacy category values; unknown
   values remain invalid. Category does not affect the new Progress totals.
5. **Migrate producers and consumers together.** Update focus-session response types, Progress service hooks,
   the quick panel, the full Progress page, and related tests in the same functional slice as the new API
   response. Do not deploy a category-free producer with category-shaped consumers, or the reverse.
6. **Validate before contraction.** Compare category-free totals derived from `focus_session` against raw
   session counts/durations and the legacy aggregate where comparable. Verify authenticated user isolation,
   UTC range boundaries, null-category sessions, empty data, and rollback to the previous API/code while the
   legacy schema remains present.
7. **Defer destructive contraction.** Only after production verification, an observation window, and a real
   checked-in Drizzle migration baseline may a separate reviewed migration drop legacy category columns,
   aggregates, and enum types. Take a backup and document forward/rollback procedures first.

**Database safety rule:** do not run `db:push`, drop category schema, or create a destructive migration during
Phase 0. The current rollout changes the application contract first and preserves a code rollback path.

**Review gate:** product behavior and naming decisions are documented before visual migration.

### Phase 1 — Foundations

1. Install and pin compatible Tailwind/PostCSS integration, a fresh native shadcn preset and base,
   `lucide-react`, Manrope through `next/font`, and the minimal class utilities used by the preset (including
   `clsx`, `tailwind-merge`, and `class-variance-authority` when emitted). Commit the generated baseline
   configuration and lockfile; do not claim these are already installed.
2. Establish semantic CSS variables for Nocturne backgrounds/foregrounds, sage interaction,
   borders, focus, elevation, radii, and motion, then map Tailwind utilities to them.
3. Keep Chakra and Tailwind temporarily coexisting: untouched legacy surfaces retain their existing provider
   and theme while each approved feature slice moves to native shadcn primitives plus Tailwind. Do not style
   shadcn through Chakra or remove Chakra before parity.
4. Apply Manrope Variable across each migrated surface and use tabular numerals for timer/statistics.
5. Standardize migrated surfaces on Lucide without mixing icon families inside a redesigned slice.
6. Ship one dark palette across the entire product and remove/hide the theme toggle. Do not expose Light or
   System until a complete second palette is designed and verified.
7. Validate palette, focus, border, elevation, motion, and contrast in representative primitive samples.

**Review gate:** palette, typography, icon scale, fields, buttons, menus, and surface hierarchy.

### Phase 2 — Dock and shared panel shell

1. Build the compact dock capsules.
2. Create the shared anchored-panel primitive.
3. Implement desktop and mobile positioning.
4. Add focus management, Escape behavior, motion, and reduced-motion support.
5. Verify that no desktop dock panel creates a black backdrop.

**Review gate:** dock size, spacing, active states, and panel position before panel content changes.

### Phase 3 — Panels

Implement and review one panel at a time:

1. Tasks.
2. Notes.
3. Sounds.
4. Rhythm.
5. Progress quick panel.
6. Settings.
7. Command palette.

**Review gate:** each panel is approved for hierarchy, empty state, active state, keyboard use, and mobile behavior.

### Phase 4 — Core application pages

1. Focus and integrated break phases.
2. Home.
3. Ambient.
4. Progress.

**Review gate:** the central focus area remains dominant with all panels closed and open.

### Phase 5 — Dedicated brand migration and entry pages

1. Apply the Khulwa Quiet Signal brand once across copy, metadata, authentication/email copy, logo/icon
   assets, and public surfaces. This step does not rename existing technical and package identifiers such as
   `focus-den`; those require separate approval.
2. Login and registration.
3. Landing.

**Review gate:** brand promise and product experience feel like one system.

### Phase 6 — Quality pass

1. Responsive visual regression at all target widths.
2. Keyboard and screen-reader audit.
3. Contrast and zoom audit.
4. Performance profile with panels opening and sounds playing.
5. Remove unused legacy theme, icon, and component code only after parity is confirmed.

## 13. Acceptance criteria

The redesign is ready when:

- Every page and panel uses the same semantic palette.
- No dark text appears on a dark surface.
- The dock is visually compact while preserving 44px hit areas.
- Dock items use one icon family and one icon size.
- Every desktop panel opens next to its trigger without a black backdrop.
- Settings no longer consumes half the desktop viewport.
- Mobile Settings no longer reserves 128px for a sidebar.
- Focus can start without choosing a category.
- Break phases remain inside the Focus stage.
- Progress opens beneath the header streak badge on desktop/tablet and as a mobile sheet, never from a dock
  capsule.
- The initial redesign is dark-only and exposes no incomplete Light/System choice.
- The user-facing Khulwa brand and Quiet Signal mark are applied in one dedicated step, not page by page;
  existing technical/package identifiers remain unchanged unless separately approved.
- Tasks, Notes, Sounds, and Rhythm each have a clear primary job.
- The active sound and active focus state are immediately visible.
- The interface passes WCAG AA for normal text and interactive states.
- Background atmosphere remains static and inexpensive to render.
- Existing working product logic is preserved unless its removal is explicitly listed in this plan.

## 14. Non-goals

- Copying Flocus or Endel branding, gradients, illustration style, or exact layout.
- Creating custom replacements for every shadcn primitive.
- Using glow, animated blur, or glass effects as the main source of visual quality.
- Filling Home with conventional dashboard cards.
- Rewriting stable feature logic during purely visual component work.

## 15. Reference principles

The useful lesson from [Flocus](https://flocus.com/) is the separation between a dominant focus canvas and compact edge controls. The useful lesson from [Endel](https://endel.io/) is the clarity of current state and atmosphere around a single activity. Khulwa should apply these principles through its own Nocturne identity, task workflow, and quieter interaction model.
