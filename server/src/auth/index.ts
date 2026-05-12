import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, schema } from "../db/index.js";
import { env, isProd } from "../env.js";
import { sendEmail } from "../email/index.js";

const googleEnabled = Boolean(env.google.clientId && env.google.clientSecret);

export const auth = betterAuth({
  baseURL: env.auth.url,
  secret: env.auth.secret,
  trustedOrigins: [env.clientUrl],

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your Waha password",
        html: `<p>Reset your password: <a href="${url}">${url}</a></p>`,
        text: `Reset your password: ${url}`,
      });
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your Waha email",
        html: `<p>Verify your email: <a href="${url}">${url}</a></p>`,
        text: `Verify your email: ${url}`,
      });
    },
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
  },

  socialProviders: googleEnabled
    ? {
        google: {
          clientId: env.google.clientId!,
          clientSecret: env.google.clientSecret!,
        },
      }
    : undefined,

  advanced: {
    cookiePrefix: "waha",
    useSecureCookies: isProd,
    defaultCookieAttributes: {
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
    },
  },
});

export type Auth = typeof auth;
