export type { CategoryId } from "@/services/progress";

export const CATEGORIES = [
  { id: "deepWork", color: "#6D28D9" },
  { id: "learning", color: "#C56BFF" },
  { id: "reading", color: "#D9B6FF" },
  { id: "dhikr", color: "#8F42EC" },
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
