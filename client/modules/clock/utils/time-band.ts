import { TimeBand } from "../types";

const MORNING_START = 5;
const AFTERNOON_START = 12;
const EVENING_START = 17;
const NIGHT_START = 21;

export function getTimeBand(date: Date): TimeBand {
  const h = date.getHours();
  if (h >= MORNING_START && h < AFTERNOON_START) return TimeBand.Morning;
  if (h >= AFTERNOON_START && h < EVENING_START) return TimeBand.Afternoon;
  if (h >= EVENING_START && h < NIGHT_START) return TimeBand.Evening;
  return TimeBand.Night;
}
