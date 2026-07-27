# Phase 2 Review — Framework-Neutral UI Boundary

## Review gate

Phase 2 builds the application-owned primitives that later feature screens will
use. Review them at:

`http://localhost:3000/redesign/primitives`

Phase 3 must not begin until the interaction style and component behavior are
approved or revised.

## What changed

- Added `cn` for conditional class composition without a new runtime dependency.
- Added Tailwind/DaisyUI-owned `Button` and `IconButton` primitives.
- Added labelled input, select, textarea, checkbox, description, and error
  primitives.
- Added panels, pills, badges, progress, and empty-state primitives.
- Added tabs, menu, tooltip, native-dialog modal, and native-dialog drawer
  primitives.
- Added a native overflow scroll primitive.
- Rebuilt safe shared wrappers for badges, collapsible content, number fields,
  and scroll areas without changing their feature behavior.

The feature modules still retain their existing logic and workflows. Their
screen-by-screen visual migration starts only after the application shell is
approved in Phase 3.

## Interaction contract

- Buttons expose primary, secondary, quiet, and destructive hierarchy.
- Icon-only controls require an accessible name and preserve a 44 px minimum
  target at the default size.
- All fields use visible labels; descriptions and errors are separate,
  semantic elements.
- Dialogs and drawers use the native `<dialog>` element, so focus is contained
  while open and Escape dismisses the layer.
- Menus close after selection and on Escape; Arrow Down opens the menu while
  native button tab order keeps every item reachable.
- Tabs use tablist, tab, and tabpanel roles with selected state.
- Tooltips appear on hover and keyboard focus without becoming the only source
  of essential information.
- Native scrolling replaces the custom scroll implementation where the shared
  wrapper is already safe to migrate.

## Styling rules

- Only primitives contain DaisyUI component class names.
- Feature code should import the application primitives, not DaisyUI directly.
- All visual values use the Sage Serenity semantic tokens from Phase 1.
- No gradients, glass blur, noise, or ornamental shadows are introduced.
- Controls use 12 px corners, panels use 16 px corners, and the outer shell
  remains at 24 px.

## Validation

- The review page was exercised for button feedback, tabs, menu selection,
  dialog dismissal, and drawer dismissal.
- It renders without horizontal overflow at 375 px and 1440 px viewports.
- Existing shared badge, collapsible, number-field, and scroll-area consumers
  compile after the wrapper migrations.
- Full lint, TypeScript, and production build verification are required before
  this review is handed off.

## Review decisions

1. Confirm the control density and corner-radius hierarchy.
2. Confirm primary / secondary / quiet / destructive button hierarchy.
3. Confirm the native-dialog motionless overlay direction.
4. Confirm that menus, tabs, and tooltips feel restrained enough for the
   product.
