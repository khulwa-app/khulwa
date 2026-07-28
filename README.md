# Riwaq

Riwaq is a quiet focus workspace: Pomodoro sessions, ambient sound, local tasks and notes, daily rhythm, and
progress insights. Built with Next.js 16, React 19, Tailwind CSS v4, and DaisyUI v5.

## Design

Sanctuary Dusk is light-first and premium without noise: Bone and Sand surfaces, Juniper actions, Sage support,
and Copper used sparingly. Rounded panels, no gradients, no glass, no Chakra UI.

## Run

```bash
yarn
yarn dev
```

Validation:

```bash
yarn tsc --noEmit
yarn lint
yarn build
```

## Architecture

- `app/`: Next.js routes and server handlers
- `modules/`: product domains and client UI
- `services/`: server-data and local persisted stores
- `components/ui/primitives/`: shared Tailwind/DaisyUI primitives
- `messages/en.json`: visible product copy

Tasks and notes persist locally. Focus sessions and progress are server-backed through Drizzle/Postgres.
