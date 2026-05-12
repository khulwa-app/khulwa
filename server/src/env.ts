import dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });

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
  port: Number(required("PORT", "4000")),
  nodeEnv: required("NODE_ENV", "development"),

  clientUrl: required("CLIENT_URL", "http://localhost:3000"),
  corsOrigin: required("CORS_ORIGIN", "http://localhost:3000"),

  databaseUrl: required("DATABASE_URL"),

  auth: {
    secret: required("BETTER_AUTH_SECRET"),
    url: required("BETTER_AUTH_URL", "http://localhost:4000"),
  },

  google: {
    clientId: optional("GOOGLE_CLIENT_ID"),
    clientSecret: optional("GOOGLE_CLIENT_SECRET"),
  },

  email: {
    apiKey: optional("RESEND_API_KEY"),
    from: required("EMAIL_FROM", "Waha <onboarding@resend.dev>"),
  },
} as const;

export const isProd = env.nodeEnv === "production";
