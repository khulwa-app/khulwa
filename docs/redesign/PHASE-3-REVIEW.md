# Phase 3 review — application shell and navigation

Review the interactive shell at `/redesign/shell` before it replaces the live
authenticated layout.

## What to review

- **Desktop navigation:** a quiet persistent rail exposes the four workspace
  destinations, while settings and profile remain secondary.
- **Mobile navigation:** Home, Focus, Ambient, and More are reachable in a
  four-item bottom bar. Progress moves into More to retain an understandable
  mobile hierarchy.
- **Persistent context:** the timer and ambient-sound status occupy the header
  and remain visible when destinations change. This review prototype preserves
  their state locally to prove the interaction model.
- **Command palette:** `Cmd/Ctrl + K`, the visible Find anything trigger, and
  the mobile More drawer lead to the same destination model. Escape and
  backdrop click dismiss native dialog overlays.
- **Responsive behavior:** the page reserves space for the mobile bar and
  safe-area inset; desktop content remains within a readable 1024px measure.

## Design decisions

- Bone and sand create the light workspace; sage defines quiet active surfaces;
  juniper identifies current focus and primary action. Copper is reserved for a
  rare, meaningful highlight rather than decorative colour.
- The rounded DaisyUI convention is deliberate: 14px fields, 20px panels, 28px
  outer shells, and pill-shaped compact controls preserve warmth without a
  playful or inflated appearance.
- There are no gradients, glass effects, elevated shadows, or colour accents
  outside semantic status.
- Instrument Sans carries interface copy; Geist Mono keeps timer numerals
  stable with tabular figures.

## Boundary before approval

This is intentionally a dedicated review surface. The live `/app` layout is
still Chakra-based until this navigation model is approved, after which it will
be connected to the existing space, Pomodoro, sound, panel, shortcut, and
session logic without changing their behavior.
