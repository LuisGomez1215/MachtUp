### Quick context

This is an Expo + React Native app (managed workflow) using TypeScript and `expo-router` (file-based routing). Primary app code lives under `app/`. The project was created from `create-expo-app` and keeps a starter/reset helper in `scripts/reset-project.js`.

### Architecture & big picture

- Runtime: Expo (see `package.json` scripts — `start`, `android`, `ios`, `web`).
- Routing: `expo-router` file-based routing. Pages/components under `app/` map directly to routes. Example: `app/auth/_layout.tsx` registers `login` and `register` stack screens.
- UI pattern: small, focused components under `components/` with subfolders (`auth/`, `partido/`, `shared/`, `ui/`). Use these for reusable pieces (icons, themed text/view, collapsible UI).
- The top-level `app/_layout.tsx` contains a self-contained app shell that demonstrates app flow (auth -> home -> searching -> profile). It also shows design choices: large single-file screens with inline state used for demo flows.

### Key files to consult when coding

- `app/_layout.tsx` — example app shell; a useful reference for state, navigation patterns, and UI constants.
- `app/auth/_layout.tsx` — how the auth stack is declared using `Stack` from `expo-router`.
- `components/` — reusable UI primitives. Check `themed-text.tsx` and `themed-view.tsx` for theming conventions.
- `scripts/reset-project.js` — provides the `npm run reset-project` workflow; it moves or deletes directories and creates a minimal `app` scaffold. Be careful editing it: it's the canonical reset flow.
- `tsconfig.json` — `paths` maps `@/*` to the repo root. Use absolute imports like `@/components/...`.

### Project-specific conventions (do not assume defaults)

- File-based routing: add new screens under `app/` and `expo-router` will pick them up. Use `_layout.tsx` files to create nested stacks.
- Keep route components simple and export default a React component. Example: `export default function AuthLayout() { return <Stack ... /> }`.
- The repo uses TypeScript strict mode (see `tsconfig.json` with `strict: true`). Ensure new code satisfies strict types.
- Import alias: use `@/` to reference top-level files (configured in `tsconfig.json`).
- Avoid global state libraries unless necessary — the example uses component-level state in `app/_layout.tsx`. If adding shared state, follow existing patterns (small hooks under `hooks/`).

### Developer workflows & commands

- Install: `npm install`
- Start dev server: `npm start` or `npx expo start` (opens Metro/Expo dev UI)
- Platform shortcuts: `npm run android`, `npm run ios`, `npm run web`.
- Reset starter scaffolding: `npm run reset-project` (reads `scripts/reset-project.js`) — this moves `app`, `components`, `hooks`, `constants`, `scripts` into `app-example` or deletes them depending on the prompt. Don't run on production branches.
- Linting: `npm run lint` (uses Expo ESLint preset).

### Integration points & external deps

- Expo packages: `expo`, `expo-router`, `expo-image`, `expo-splash-screen`, etc. Check `package.json` for full list.
- Navigation: `expo-router` + `@react-navigation/*` packages. Use `Stack` from `expo-router` for nested stacks.
- Icons: `@expo/vector-icons` and `lucide-react-native` are used across UI files.

### Examples and patterns to follow

- Route registration (from `app/auth/_layout.tsx`):
  - Register child routes with `<Stack.Screen name="login" />` and `<Stack.Screen name="register" />`.
- Theming: prefer `components/themed-*` primitives (e.g., `themed-text.tsx`, `themed-view.tsx`) for colors and dark/light adaptations.
- Absolute imports: `import X from '@/components/ui/collapsible'` instead of long relative paths.
- Small reusable components: place shared UI in `components/ui/` and domain-specific UI in `components/auth/` or `components/partido/`.

### What to avoid

- Replacing `scripts/reset-project.js` without adjusting `README.md` or `package.json` references — it's part of the documented developer flow.
- Adding non-Expo-native modules that require native linking without confirming managed workflow compatibility.

### If you change routing or TypeScript paths

- Update `tsconfig.json` if you add new path aliases.
- When adding routes, prefer creating `app/<route>/index.tsx` or `app/<route>/<subroute>.tsx` and, if needed, add a `_layout.tsx` to customize stack options.

### Quick checklist for PRs

- Run `npm run lint` and fix issues.
- Verify route loads via `npm start` and open the route in Expo (on web or mobile).
- Ensure new TypeScript code passes strict checks locally.

If any part of this doc is unclear or you want more coverage (tests, CI, or code-style rules), tell me which area to expand.
