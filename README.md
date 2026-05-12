<div align="center">
  <img src="client/public/assets/svg/khulwa-logo-en.svg" alt="Khulwa" height="80" />

  <p><strong>خَلوة · Khulwa</strong></p>
  <p><em>A retreat for deep work.</em></p>

  <p>
    <a href="https://github.com/khulwa-app/khulwa/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/khulwa-app/khulwa?style=flat-square"></a>
    <img alt="License" src="https://img.shields.io/badge/license-private-lightgrey?style=flat-square">
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript">
    <img alt="Chakra UI" src="https://img.shields.io/badge/Chakra%20UI-v3-319795?style=flat-square&logo=chakraui">
  </p>
</div>

---

## What is Khulwa

**Khulwa** (Arabic: خَلوة, "sacred solitude") is a focus app built around the Pomodoro technique. Bilingual AR/EN, RTL-aware, single-light theme, designed for the deep-work crowd.

Inspired by the Sufi tradition of retreat — a quiet room, a timer, a task. Nothing else.

## Monorepo Layout

```
khulwa/
├── client/        Next.js 16 App Router · Chakra UI v3 · next-intl · Better Auth React
├── server/        Express 5 · TypeScript · Drizzle ORM · Postgres · Better Auth · Resend
└── .claude/       Shared agents + commands + settings
```

Each app is self-contained — no root `package.json`, no workspaces (yet).

## Tech Stack

### Client (`client/`)

| Concern | Library |
|--------|--------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | Chakra UI v3 (token-driven, recipe-based) |
| Fonts | Reem Kufi Fun (display) · IBM Plex Sans Arabic (body) · IBM Plex Sans (numeric, tabular) |
| i18n | next-intl + JSON messages (cookie-based locale, AR default) |
| Auth | `better-auth/react` — cookie sessions, email/password + Google |
| State (timer) | React hooks (`usePomodoro`) |

### Server (`server/`)

| Concern | Library |
|--------|--------|
| Runtime | Node.js 20+ · Express 5 · TypeScript (NodeNext) |
| DB | Postgres (Neon) · Drizzle ORM |
| Auth | Better Auth — email/password + Google OAuth + sessions in DB |
| Email | Resend (test sender `onboarding@resend.dev` until domain verified) |
| Config | `dotenv` (`.env` + `.env.local` override) |

## Quick Start

### Prereqs
- Node ≥ 20.9
- Yarn (client) · npm (server) — either works
- Postgres connection (Neon free tier recommended)
- Google OAuth credentials (optional)
- Resend API key (optional — logs emails to console if missing)

### 1. Clone

```bash
git clone git@github.com:khulwa-app/khulwa.git
cd khulwa
```

### 2. Server

```bash
cd server
npm install
cp .env.example .env.local
# fill DATABASE_URL, BETTER_AUTH_SECRET (openssl rand -base64 32),
# optionally GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / RESEND_API_KEY

npm run db:push          # apply Drizzle schema
npm run dev              # http://localhost:4000
```

Smoke test:
```bash
curl -X POST http://localhost:4000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"name":"You","email":"you@example.com","password":"password123"}'
```

### 3. Client

```bash
cd client
yarn install
cp .env.example .env.local
# defaults NEXT_PUBLIC_BACKEND_URL=http://localhost:4000

yarn dev                 # http://localhost:3001
```

## i18n

- Default locale: **Arabic** (AR, RTL)
- Supported: AR, EN
- No URL prefix — locale persists via cookie `NEXT_LOCALE`
- All visible strings live in `client/messages/{ar,en}.json` (namespaced)
- Server: `getTranslations("namespace")` · Client: `useTranslations("namespace")`

Add a new string:
```ts
// client/messages/ar.json + en.json
"home.banner": "..."

// usage
const t = useTranslations("home");
t("banner");
```

## Auth Endpoints

Exposed by Better Auth on `http://localhost:4000/api/auth/*`:

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/sign-up/email` | Create user + session |
| POST | `/sign-in/email` | Cookie session |
| POST | `/sign-out` | Clear session |
| GET | `/get-session` | Resolve current session |
| GET | `/sign-in/social?provider=google` | OAuth start |
| GET | `/callback/google` | OAuth return |
| POST | `/request-password-reset` | Email reset link |
| POST | `/reset-password` | Submit new password |

Cookie name: `khulwa.session_token` · `HttpOnly` · `SameSite=Lax` · 7-day TTL.

## Design System

`client/theme/` is the single source of visual truth:

- **tokens/** — colors (5 ramps: saffron, turquoise, sand, night, sunset), typography, radii, shadows, gradients, durations, easings
- **semantic-tokens/** — `bg.*`, `fg.*`, `border.*`, `brand`, `accent`, `phase`, `success`, `warning`, `danger`, `info`
- **conditions.ts** — `_spaceHome` / `_spaceFocus` / `_spaceAmbient` + phase variants
- **text-styles.ts** — `display.*`, `heading.*`, `body.*`, `label.*`, `numeric.*`, `eyebrow`, `quote`
- **system.ts** — composed Chakra system, `cssVarsPrefix: "khulwa"`

Rule: no raw hex, no inline font stacks, no magic `px`. Tokens only.

## Commands

### Client
```bash
yarn dev          # Next dev server (Turbopack)
yarn build        # production build
yarn typegen      # Chakra typegen
yarn lint         # ESLint
```

### Server
```bash
npm run dev          # tsx watch
npm run build        # tsc
npm run start        # node dist
npm run db:push      # apply schema (dev)
npm run db:generate  # generate migration files
npm run db:migrate   # apply migrations
npm run db:studio    # Drizzle Studio
```

## Project Status

Early-stage scaffold. What's wired:

- Monorepo split (client + server)
- Design system tokens
- Bilingual i18n
- Email/password + Google auth (server verified end-to-end)
- Pomodoro timer hook + minimal home page

What's next:

- Auth pages (sign-in / sign-up / forgot-password) on client
- Domain tables (tasks, sessions, streaks)
- Background sounds + ambient mode
- Plant / streak gamification

## License

Private — see [LICENSE](LICENSE) (or contact the org).

---

<div align="center">
  <img src="client/public/assets/svg/logo-icon.svg" alt="Khulwa mark" height="32" />
  <p><sub>Built quietly. Use intentionally.</sub></p>
</div>
