import test from "node:test";
import assert from "node:assert/strict";
import { canResetPomodoro, isFocusPhase, shouldResumePomodoro } from "../modules/pomodoro/policies";
import { PomodoroPhase } from "../modules/pomodoro/types";

test("only Focus completions are eligible for focus-session logging", () => {
  assert.equal(isFocusPhase(PomodoroPhase.Focus), true);
  assert.equal(isFocusPhase(PomodoroPhase.ShortBreak), false);
  assert.equal(isFocusPhase(PomodoroPhase.LongBreak), false);
  assert.equal(isFocusPhase(null), false);
});

test("reset is available only during Focus", () => {
  assert.equal(canResetPomodoro(PomodoroPhase.Focus), true);
  assert.equal(canResetPomodoro(PomodoroPhase.ShortBreak), false);
  assert.equal(canResetPomodoro(PomodoroPhase.LongBreak), false);
});

test("paused or newly selected breaks use Resume while a fresh Focus uses Begin", () => {
  assert.equal(shouldResumePomodoro(PomodoroPhase.Focus, false), false);
  assert.equal(shouldResumePomodoro(PomodoroPhase.Focus, true), true);
  assert.equal(shouldResumePomodoro(PomodoroPhase.ShortBreak, false), true);
  assert.equal(shouldResumePomodoro(PomodoroPhase.LongBreak, false), true);
});
