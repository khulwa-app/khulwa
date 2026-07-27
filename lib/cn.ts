type ClassValue = string | false | null | undefined;

/** Joins conditional classes without introducing a styling dependency. */
export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(" ");
}
