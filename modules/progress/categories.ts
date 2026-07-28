export type { CategoryId } from "@/services/progress";

export const CATEGORIES = [
  { id: "deepWork", color: "#24473F" },
  { id: "learning", color: "#7FA08D" },
  { id: "reading", color: "#C97952" },
  { id: "dhikr", color: "#8A7350" },
] as const;

export function dayKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function formatDuration(seconds: number): string {
  const totalMinutes = Math.round(seconds / 60);
  if (totalMinutes < 60) return `${totalMinutes}m`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}
