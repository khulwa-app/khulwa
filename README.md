<div align="center">

<img src="docs/hero.png" alt="Khulwa — a retreat for deep work" width="900" />

<br/>

# خَلوة · Khulwa

**A retreat for deep work.**

A quiet room, a timer, one task, and nothing else.

<p>
  <a href="https://github.com/khulwa-app/khulwa/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/khulwa-app/khulwa?style=flat-square"></a>
  <img alt="License" src="https://img.shields.io/badge/license-private-lightgrey?style=flat-square">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript">
  <img alt="Design direction" src="https://img.shields.io/badge/design-Deep%20Juniper-071713?style=flat-square">
</p>

</div>

---

## What is Khulwa?

Khulwa is a calm focus environment built around a Pomodoro rhythm, one active task, ambient sound, local
notes and tasks, and server-backed progress. It is an English-only, single Next.js application at the
repository root.

You enter a space, choose your one thing, start the timer, and let a quiet ambient bed hold the room.
Everything else stays close at hand without competing for attention.

## Product

- **Home** provides a calm arrival, the current time, and a clear next action.
- **Focus** keeps the selected task, timer, phase, and session controls together.
- **Short and long breaks** are phases inside the Focus stage, not separate full-screen takeovers.
- **Ambient** centers the current soundscape and playback state.
- **Tasks, Notes, Sounds, Rhythm, and Settings** open in compact panels anchored to the dock on desktop.
- **Progress** summarizes focus minutes, sessions, trends, and streaks.
- **AI task assist** can estimate duration or break a task into steps, but the core product works without AI.

Focus categories are being removed from the UI, session flow, API, stored records where migration permits,
and statistics. Starting a focus session must not require a category.

## Approved redesign direction

The authoritative redesign specification is the
[UI/UX Audit and Redesign Plan](docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md). It defines the decisions, sequence,
review gates, accessibility targets, and acceptance criteria for the migration.

The approved system is:

- **Deep Juniper + Quiet Amethyst**: a calm dark juniper foundation with warm off-white text, quiet plum
  depth, and amethyst reserved for action and focus.
- **Manrope Variable** for marketing, UI, timer, and statistics, with restrained weights and tabular numerals.
- **Lucide** as the only application icon family.
- **shadcn native primitives + Tailwind composition**: preserve the native primitive geometry and compose
  product-level components and layouts with Tailwind.
- **No Chakra UI and no DaisyUI** in the redesigned implementation.
- **Dark-only initial release** across every page and overlay; Light/System stay hidden until a complete
  second palette is designed and verified.
- **Compact dock and anchored panels**: desktop panels remain content-driven, non-modal, and spatially tied
  to their dock trigger; mobile uses an appropriate sheet treatment.
- **Separate Progress anchor**: the quick panel opens beneath the header streak badge on desktop/tablet and
  as a top or bottom sheet on mobile; it is not a dock-capsule item.
- **Integrated break phases**: Short Break and Long Break reuse the Focus stage.
- **No focus categories** anywhere in the completed product.
- **One visible-brand migration**: Khulwa remains the repository/project working identity; Riwaq is the
  approved public product target and will replace the visible Khulwa brand once in a coordinated step.
  Existing technical/package identifiers stay unchanged during visual migration, including the current
  `package.json` name `focus-den`; the brand step does not approve their rename.

The checked-in application still contains legacy Chakra UI, Solar icons, Nunito, category, and standalone
break code while the redesign is in progress. Those dependencies and components describe migration state,
not an alternative design direction.

Each implementation phase must pass its documented review gate before work expands to the next surface:
source of truth and product decisions; foundations; dock and panel shell; individual panels; core pages;
entry pages; and the final quality pass.

## Current architecture

Khulwa is one Next.js 16 App Router application at the repository root. There is no `client/`, separate
Express server, workspace configuration, or `src/` directory.

```text
khulwa/
├── app/             routes, layouts, and API route handlers
├── modules/         domain UI and ephemeral client behavior
├── services/        HTTP/query hooks and local persisted stores
├── lib/             auth, database, email, and server services
├── components/      shared providers and UI components
├── messages/        English UI copy
├── public/          runtime images and sound assets
├── assets/          source assets
├── theme/           legacy Chakra theme during migration
├── design-system/   redesign implementation reference
└── docs/            product images and the authoritative redesign plan
```

Data boundaries:

- Tasks and notes are local Zustand-persisted data.
- Pomodoro, panels, sounds, rhythm, UI preferences, and space state are client-side domain state.
- Focus sessions, progress, and streaks are server-backed through `app/api/**`, Drizzle ORM, and Postgres.
- Authentication uses Better Auth with email/password and Google support.
- User-facing text lives in `messages/en.json` through `next-intl`.

## Technology

| Concern | Current foundation / approved direction |
| --- | --- |
| Runtime | Node 22+ |
| Framework | Next.js 16 App Router, React 19, TypeScript 5 |
| Data | Zustand, TanStack Query, Drizzle ORM, Postgres |
| Auth | Better Auth |
| i18n | next-intl, English only |
| Audio | Howler through react-howler |
| AI | Gemini through `@google/genai`, optional |
| Target UI | shadcn native primitives with Tailwind composition |
| Target type/icons | Manrope Variable and Lucide |

`package.json` is the dependency-level truth for the current migration state. The redesign plan is the
product and visual truth for the completed migration.

## Local development

Prerequisites: Node 22+, Yarn, and Postgres for server-backed features. Google OAuth, Resend, and
`GEMINI_API_KEY` are optional.

### Required environment variables

These are the only variables without defaults in `lib/env.ts`. Supply values through `.env.local` for local
development or the deployment platform's secret store. Never commit their values.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Private Postgres connection URL used by Drizzle and the application database client |
| `BETTER_AUTH_SECRET` | Private signing/encryption secret used by Better Auth |

`BETTER_AUTH_URL` defaults to `http://localhost:3000`, and `EMAIL_FROM` defaults to
`Khulwa <onboarding@resend.dev>`. Google credentials, `RESEND_API_KEY`, and `GEMINI_API_KEY` enable optional
integrations and are not required for the base application to start.

```bash
yarn install
yarn dev
```

The development server runs at `http://localhost:3000`.
Create `.env.local` with the database, auth, and optional integration variables needed for the features you
intend to run.

| Command | Purpose |
| --- | --- |
| `yarn dev` | Start the Next.js development server |
| `yarn build` | Create a production build |
| `yarn lint` | Run ESLint |
| `npx tsc --noEmit` | Run TypeScript checks |
| `yarn db:generate` | Generate Drizzle migrations |
| `yarn db:migrate` | Apply Drizzle migrations |
| `yarn db:push` | Push explicitly approved local schema work; never use for the category-removal rollout |
| `yarn db:studio` | Open Drizzle Studio |

Before changing Next.js code, read the relevant guide in `node_modules/next/dist/docs/`; this repository uses
a version with breaking API and convention changes.

## Ambient sound assets

Processed loops live in `public/sounds/`. Source loops live in `assets/sounds/`. Re-encode them with:

```bash
./scripts/process-sounds.sh
```

This requires `ffmpeg`.

## Design documentation

- [Authoritative UI/UX audit and redesign plan](docs/UI-UX-AUDIT-AND-REDESIGN-PLAN.md)
- [Derived design-system implementation reference](design-system/khulwa/DESIGN-SYSTEM.md)

## License

Private — contact the organization for access and licensing information.

<div align="center">
  <br/>
  <sub>Built quietly. Use intentionally.</sub>
</div>
