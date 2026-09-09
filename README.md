# SpendGate

SpendGate is a TypeScript monorepo exploring programmable spending controls around Investec banking data. It combines web and mobile clients with reusable packages for Investec integration and rule compilation/suggestion.

This repository represents a multi-app iteration of the SpendGate concept, with shared business logic separated from the user interfaces.

## Repository structure

```text
apps/
  sg-web/       Next.js web application
  sg-mobile/    Expo / React Native mobile application

packages/
  investec/     Shared Investec integration package
  rules/        Shared spending-rule types, compiler and rule suggestions
```

The repository is managed with npm workspaces and Turborepo.

## Tech stack

### Web

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Better Auth
- Drizzle ORM
- PostgreSQL
- TanStack Query and TanStack Table
- Zustand
- shadcn-based UI components

### Mobile

- Expo 54
- React Native
- Expo Router
- TypeScript
- TanStack Query
- Zustand
- Expo SQLite and Secure Store

### Shared packages

- `@spendgate/investec` — reusable Investec-facing integration code
- `@spendgate/rules` — spending-rule types, compiler logic, and rule suggestions

## Getting started

### Prerequisites

- Node.js compatible with npm 11
- npm

Install all workspace dependencies from the repository root:

```bash
npm install
```

## Run the project

Start all development workspaces in parallel:

```bash
npm run dev
```

Or run individual areas:

```bash
npm run dev:web
npm run dev:mobile
npm run dev:investec
npm run dev:rules
```

The web application is configured to run on port `3001`.

## Web environment

Create a local environment file for the web app:

```bash
cp apps/sg-web/.env.example apps/sg-web/.env.local
```

The current example contains:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Additional database, authentication, or Investec configuration may be required as those integrations are enabled in the application. Keep all private credentials out of source control.

## Database tooling

The web workspace includes Drizzle commands for database development:

```bash
cd apps/sg-web
npm run db:generate
npm run db:migrate
npm run db:push
npm run db:studio
```

Configure the required database connection before running migration or schema commands.

## Build and quality checks

From the repository root:

```bash
npm run build
npm run lint
npm run format:check
npm run check
```

Targeted builds are also available:

```bash
npm run build:web
npm run build:mobile
```

## Rule engine package

The `packages/rules` workspace keeps core rule logic outside the UI applications. It currently contains:

- rule types;
- rule compilation;
- rule suggestion logic;
- shared exports for consuming applications.

Keeping this logic in a shared package allows the web and mobile experiences to use the same rule semantics.

## Development status

This repository is an evolving monorepo and some root scripts or application boundaries may reflect earlier architectural experiments. Check the current workspace structure before adding a new service, and prefer shared packages for business logic that must behave consistently across clients.

## Security

SpendGate deals with financial integrations. Never commit banking credentials, authentication secrets, database credentials, or production environment files. Keep sensitive integration logic server-side and treat mobile/web public environment variables as non-secret.