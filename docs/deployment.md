# Deployment

## Current deployment path

This repo is being moved away from GitHub Pages.

Current target path:

1. Push to `main`
2. GitHub Actions runs install, lint, typecheck, and build
3. Next.js exports static files into `out/`
4. GitHub Actions deploys `out/` to Firebase Hosting

## Why the repo still uses static export

This repo is currently a front-end shell / prototype with mock data and no server runtime.
To keep delivery simple for this stage, deployment is based on:

- `next build`
- `output: 'export'`
- Firebase Hosting serving the generated `out/` directory

This is a transitional setup.

## Current limitations

Because the app is exported as a static site:

- no Next.js API routes
- no server actions
- no Firebase Admin usage inside this repo yet
- no `/api/assistant` proxy yet

When the product moves into real Firebase auth, Firestore writes, Drive metadata handling, and assistant proxying, the deployment model may need to change from pure static hosting to a server-capable runtime.

## Required GitHub secrets

The current workflow expects this repository secret:

- `FIREBASE_TOKEN`
  - CI deploy token used by `firebase-tools deploy`

## Project binding

This repo now commits:

- `.firebaserc`
  - maps the repo default project to `taipeimetrohouse-2`

The GitHub Actions workflow deploys directly to project `taipeimetrohouse-2` and no longer depends on separate `FIREBASE_PROJECT_ID` / `FIREBASE_SERVICE_ACCOUNT` secrets.

## Local verification

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

Build output should land in `out/` and match the Firebase Hosting `public` directory setting in `firebase.json`.

The hosting config also pins the site explicitly to `taipeimetrohouse-2` so CI deploys do not rely on implicit target resolution.
