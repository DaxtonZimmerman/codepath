# Codepath

Codepath is a web development learning app that helps people practice JavaScript by building real projects. It combines short lessons, review exercises, and a browser-based Project Studio where learners can write HTML, CSS, and JavaScript, preview their work, and export it as a ZIP.

## What it does

- Guides learners from a goal to lessons, practice, and a project.
- Saves learning progress and projects in the browser, with backup and restore tools.
- Offers a Project Studio with starter projects, code versions, behavior checks, and reflection prompts.
- Runs learner code in an isolated preview with time limits.
- Exports projects as ordinary source files that can be hosted separately.

## Run locally

You need Node.js 24 and pnpm.

```bash
pnpm install
pnpm --filter @workspace/codepath dev
```

Open the local address shown by Vite. To check the app:

```bash
pnpm --filter @workspace/codepath test
pnpm --filter @workspace/codepath typecheck
pnpm --filter @workspace/codepath build
```

The app is in [`artifacts/codepath`](artifacts/codepath). The repository also includes shared workspace packages and Replit scaffolding used by the original project.

## Tech stack

React, TypeScript, Vite, Tailwind CSS, Vitest, IndexedDB, and pnpm workspaces.

## Current limits

Progress and projects are stored in the browser, so they do not sync across devices. The Studio preview supports a deliberately limited browser API; exported projects run as normal browser files. Publishing a project is a separate manual step.

## Origin

This repository is a working copy of my [Replit project](https://replit.com/@DaxtonZimmerman/Personal-Web-Development-Coach). The [public app](https://personal-web-development-coach.replit.app/) may show an earlier release until it is republished.
