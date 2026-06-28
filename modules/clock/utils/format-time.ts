type FormatOptions = { withSeconds?: boolean; hour12?: boolean; locale?: string };

export function formatClock(date: Date, opts: FormatOptions = {}): string {
  const { withSeconds = false, hour12 = false, locale } = opts;
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: withSeconds ? "2-digit" : undefined,
    hour12,
  });
}

export function formatPomodoro(minutes: number, seconds: number): string {
  return `${pad2(minutes)}:${pad2(seconds)}`;
}

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}
