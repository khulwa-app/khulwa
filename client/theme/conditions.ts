import { defineConditions } from "@chakra-ui/react";

// Single light theme. No dark mode.
// Space conditions retained for context-aware styling (e.g. dock active state per space).
// Phase conditions retained for Pomodoro phase context.
export const conditions = defineConditions({
  _spaceHome: '[data-space="home"] &',
  _spaceFocus: '[data-space="focus"] &',
  _spaceAmbient: '[data-space="ambient"] &',
  _phaseFocus: '[data-phase="focus"] &',
  _phaseShortBreak: '[data-phase="short-break"] &',
  _phaseLongBreak: '[data-phase="long-break"] &',
});
