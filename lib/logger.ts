type LogContext = Record<string, unknown>;

/**
 * Deliberately two methods. `warn`/`info`/`log` invite a middle tier nobody reads, and every call
 * site that reaches for one really means "this failed" or "I am debugging". Keeping the surface
 * this small is what makes a later swap to a real reporter a one-file change.
 */
function extractError(value: unknown, context?: LogContext): Error | null {
  if (value instanceof Error) return value;
  // A string message often travels with the real Error sitting in its context.
  if (context) {
    for (const entry of Object.values(context)) {
      if (entry instanceof Error) return entry;
    }
  }
  return null;
}

export const Logger = {
  error(value: unknown, context?: LogContext) {
    const error = extractError(value, context);
    if (error) {
      console.error(error, context ?? "");
      return;
    }
    console.error(value, context ?? "");
  },

  /** Stripped in production so debug breadcrumbs never reach a user's console. */
  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV === "production") return;
    console.debug(message, context ?? "");
  },
};
