const required = (name: string, fallback?: string): string => {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === "") {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
};

const optional = (name: string): string | undefined => {
  const value = process.env[name];
  return value === "" ? undefined : value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",

  databaseUrl: required("DATABASE_URL"),

  auth: {
    secret: required("BETTER_AUTH_SECRET"),
    url: required("BETTER_AUTH_URL", "http://localhost:3000"),
  },

  google: {
    clientId: optional("GOOGLE_CLIENT_ID"),
    clientSecret: optional("GOOGLE_CLIENT_SECRET"),
  },

  email: {
    apiKey: optional("RESEND_API_KEY"),
    from: required("EMAIL_FROM", "Riwaq <onboarding@resend.dev>"),
  },
} as const;

export const isProd = env.nodeEnv === "production";
