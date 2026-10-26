# Codepath

[Open the live app](https://daxtonzimmerman.github.io/codepath/)

Codepath is a web development learning app that helps people practice JavaScript by building real projects. It combines readings, guided workshops, independent labs, module reviews and quizzes, and a browser-based Project Studio where learners can write HTML, CSS, and JavaScript, preview their work, and export it as a ZIP.

## What it does

- Offers a 12-module, 60-lesson bootcamp from HTML and CSS through JavaScript, React, APIs, SQL, testing, and deployment.
- Gives each reading an editable example, three comprehension questions, optional reflection, and separate coding practice where supported.
- Includes 12 cumulative workshops (36 steps), 12 independent labs, 12 review pages, and a 283-question assessment bank.
- Draws ten questions covering every lesson for each module quiz, shuffles answer order, saves unfinished attempts, requires 90% to pass, and links missed answers to their reading.
- Carries learner code between workshop steps and ties activity results to the exact checked source; edits require a fresh check.
- Provides mixed practice and focused review links from recent quiz misses.
- Includes six existing browser HTML/CSS lesson labs and JavaScript challenges with disclosed automated cases.
- Gives every module a project brief, deliverables, saved reflection, and a self-review.
- Links supported frontend projects to Project Studio; advanced workshops and labs include editable, downloadable starter files for an editor or Replit.
- Encourages one continuing personal app to grow across all modules, alongside independent projects.
- Shows reading results, current-code checks, quiz history, and external/project self-reviews separately.
- Saves learning progress and projects in the browser, with backup and restore tools.
- Offers a Project Studio with starter projects, code versions, behavior checks, and reflection prompts.
- Runs learner code in an isolated preview with time limits.
- Exports projects as ordinary source files that can be hosted separately.

## Run locally

You need Node.js 24 and pnpm 11.25.0.

```bash
pnpm install
pnpm dev
```

Open http://localhost:5173 (or the local address shown by Vite). To check the app:

```bash
pnpm test
pnpm --filter @workspace/codepath typecheck
pnpm --filter @workspace/codepath build
```

The app is in [`artifacts/codepath`](artifacts/codepath). The repository also includes shared workspace packages and Replit scaffolding used by the original project.

## Tech stack

React, TypeScript, Vite, Tailwind CSS, Vitest, IndexedDB, and pnpm workspaces.

## Current limits

The browser runs plain JavaScript examples and function checks in an isolated, time-limited worker. HTML/CSS checks inspect structure and declarations; they do not prove visual quality or accessibility. Git, TypeScript, React, network, server and database work runs in the learner’s own environment and is explicitly self-reviewed, not automatically graded or accredited.

Progress and projects are stored in the browser, so they do not sync across devices. The Studio preview supports a deliberately limited browser API; exported projects run as normal browser files. Publishing a project is a separate manual step.

## Curriculum and progress

`src/lib/bootcamp.ts` defines the module order and project briefs. `curriculum.ts` and `bootcamp-lessons.ts` contain reading and lesson practice. `module-activities.ts` holds workshop steps, independent labs, external starter files and continuing-app prompts. `question-bank.ts` adds original scenario, output and debugging questions to the lesson question bank.

Old lesson IDs, drafts and completion history remain readable. An additive learning record stores reading checks, source-specific activity evidence, active quizzes and attempt history. Existing backups default to an empty learning record; new backups preserve and merge these records. The first JavaScript exercises now use strings and scalar calculations before introducing collections; older drafts remain available and can be reset explicitly by the learner.

Tests cover curriculum links, all reading checks, quiz coverage and scoring, retakes, reference solutions, input immutability, worker experiments, progress compatibility and backup recovery. Browser verification covers cumulative steps, stale evidence, HTML checks, external downloads, reading checks and quiz resume/result/retry flows.

## Deployment

Pushes to `main` run the tests, type check, and production build, then publish to GitHub Pages. The deployed app uses `/codepath/` as its base path, with a fallback page for direct links and refreshes.

## Origin

This repository is a working copy of my [Replit project](https://replit.com/@DaxtonZimmerman/Personal-Web-Development-Coach). The [original Replit deployment](https://personal-web-development-coach.replit.app/) may show an earlier release.
