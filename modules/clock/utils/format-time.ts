type FormatOptions = { withSeconds?: boolean; hour12?: boolean; locale?: string; meridiem?: boolean };

export function formatClock(date: Date, opts: FormatOptions = {}): string {
  const { withSeconds = false, hour12 = false, locale, meridiem = true } = opts;
  const format = new Intl.DateTimeFormat(locale, {
    hour: meridiem ? "2-digit" : "numeric",
    minute: "2-digit",
    second: withSeconds ? "2-digit" : undefined,
    hour12,
  });
  if (meridiem) return format.format(date);
  return format
    .formatToParts(date)
    .filter((part) => part.type !== "dayPeriod")
    .map((part) => part.value)
    .join("")
    .trim();
}

export function formatPomodoro(minutes: number, seconds: number): string {
  return `${pad2(minutes)}:${pad2(seconds)}`;
}

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}
