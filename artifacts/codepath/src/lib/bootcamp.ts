export type Course = {
  id: string; title: string; stage: string; description: string; outcomes: string[]; lessons: string[];
  resource: { label: string; url: string };
  project: { title: string; brief: string; environment: "studio" | "external"; kind?: "product-filter"; deliverables: string[] };
};
export const COURSES: Course[] = [
  {
    id: "web", title: "Build your first responsive website", stage: "Foundations",
    description: "Start with HTML, make it readable and accessible, then build layouts that fit a phone and a desktop.",
    outcomes: ["Write meaningful page structure and forms", "Style content with the box model, Flexbox, and Grid", "Review a responsive page with keyboard and zoom"],
    lessons: ["html-document", "html-text-links", "html-images-lists", "html-semantics", "html-forms", "css-foundations", "css-layout", "css-responsive"],
    resource: { label: "MDN: Learn web development", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development" },
    project: { title: "Your personal project page", environment: "studio", brief: "Create a responsive page introducing you and one project you want to build. Make it useful enough to share as your first portfolio page.", deliverables: ["A main heading, introduction, project section, and descriptive links", "A labeled contact or interest form with native validation", "A responsive card layout that works at narrow and wide widths", "Visible keyboard focus, useful image alternatives, and no sideways scrolling"] },
  },
  {
    id: "js", title: "Think in JavaScript", stage: "Foundations",
    description: "Learn values, functions, decisions, and loops by solving small problems with visible test results.",
    outcomes: ["Transform inputs into useful return values", "Apply boolean rules and loops", "Read errors and test edge cases"],
    lessons: ["js-values", "js-numbers", "js-strings", "js-functions", "js-conditions", "js-loops", "js-scope", "js-debugging"],
    resource: { label: "MDN: JavaScript guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
    project: { title: "A price calculator", environment: "studio", brief: "Build a calculator for a small shop: enter an item price, quantity, and discount, then show the total. Keep calculations separate from the interface.", deliverables: ["Labeled inputs and a submit button", "Pure helpers for quantity, discount, and the total in cents", "Clear feedback for missing or invalid numbers", "Tests or written examples for zero, boundaries, and ordinary purchases"] },
  },
  {
    id: "data", title: "Work with real collections", stage: "Foundations",
    description: "Turn arrays and objects into the lists, filters, and summaries that power useful apps.",
    outcomes: ["Choose useful array and object shapes", "Filter, map, sort, and summarize collections", "Update data while preserving the original"],
    lessons: ["arrays-basics", "object-basics", "array-methods", "objects-counting", "data-shaping", "data-immutable"],
    resource: { label: "MDN: Indexed collections", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections" },
    project: { title: "Product Filter App", environment: "studio", kind: "product-filter", brief: "Use the guided clothing catalog to connect data transformations to a real interface. Complete all six milestones and check combinations of controls.", deliverables: ["Render the supplied products with names, categories, and prices", "Combine a normalized text search with category filtering", "Sort a copy by price without changing the source data", "Show empty results and pass the Studio behavior checks on the current code"] },
  },
  {
    id: "dom", title: "Make pages interactive", stage: "Application skills",
    description: "Render state, handle forms and events, and recover useful data after a refresh.",
    outcomes: ["Connect application state to DOM elements", "Handle pointer and keyboard submission", "Save and recover browser data safely"],
    lessons: ["dom-basics", "dom-rendering", "dom-events", "dom-forms", "dom-storage"],
    resource: { label: "MDN: DOM scripting", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting" },
    project: { title: "A personal task tracker", environment: "external", brief: "Build a task app in your editor with add, complete, delete, and filter actions. This project uses localStorage in a normal browser; the restricted Studio preview does not expose it.", deliverables: ["Add and validate tasks through a form", "Complete, delete, and filter without losing the source list", "Recover saved tasks after refresh and handle invalid saved data", "Complete the main flow with a keyboard and show useful empty states"] },
  },
  {
    id: "async", title: "Build with APIs", stage: "Application skills",
    description: "Request remote data and keep the interface helpful when the network is slow, empty, or failing.",
    outcomes: ["Use async/await and inspect HTTP responses", "Model loading, empty, success, and error states", "Prevent stale results from replacing new ones"],
    lessons: ["async-promises", "fetch-json", "async-loading-errors", "async-races"],
    resource: { label: "MDN: Using Fetch", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
    project: { title: "An API search explorer", environment: "external", brief: "Choose a public read-only API and build a search interface. Run it in your own editor or Replit so real network requests are available.", deliverables: ["Document the API and transform its response into a small view model", "Show loading, empty, success, and error states", "Offer a deliberate retry and guard against stale responses", "Verify the interface on a slow network and a failed request"] },
  },
  {
    id: "git", title: "Use a professional Git workflow", stage: "Developer workflow",
    description: "Run a local project, save focused changes, collaborate through branches, and share the source.",
    outcomes: ["Navigate a project and run documented scripts", "Review diffs and create focused commits", "Publish a repository with a useful README"],
    lessons: ["git-terminal", "git-basics", "git-branches", "git-remotes"],
    resource: { label: "GitHub: Hello World", url: "https://docs.github.com/en/get-started/start-your-journey/hello-world" },
    project: { title: "Publish and document your app", environment: "external", brief: "Take one earlier project from your computer to GitHub. Make a small improvement through a branch and a pull request, then document how someone else can run it.", deliverables: ["A repository with source and an appropriate ignore file", "A README with purpose, setup, usage, and current limits", "A focused branch, commit, and reviewed pull request", "A clear history without credentials or dependency folders"] },
  },
  {
    id: "ts", title: "Make contracts explicit with TypeScript", stage: "Full stack",
    description: "Describe real data shapes and catch inconsistent assumptions before running the app.",
    outcomes: ["Type object shapes and function boundaries", "Narrow unions instead of using any", "Apply a generic when it preserves useful relationships"],
    lessons: ["ts-types", "ts-objects", "ts-unions", "ts-generics"],
    resource: { label: "TypeScript handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
    project: { title: "A typed catalog engine", environment: "external", brief: "Move your catalog transformations into TypeScript. Keep their behavior and replace ambiguous data with explicit input and output contracts.", deliverables: ["Product and filter-state types with required and optional fields", "Typed pure functions for filtering and sorting", "A discriminated result type with every case handled", "A passing type check and regression tests for existing behavior"] },
  },
  {
    id: "react", title: "Build a React application", stage: "Full stack",
    description: "Compose a UI from components and make state, forms, and effects predictable.",
    outcomes: ["Compose components using props and callbacks", "Manage shared state with a reducer", "Use effects only for synchronization"],
    lessons: ["react-components", "react-props", "react-state", "react-forms", "react-effects"],
    resource: { label: "React: Learn", url: "https://react.dev/learn" },
    project: { title: "A React task workspace", environment: "external", brief: "Rebuild your task tracker with React in a separate project. Explain how data ownership and component boundaries differ from direct DOM updates.", deliverables: ["Small components with explicit props and stable list keys", "One clear owner for task state and predictable reducer actions", "A controlled form with validation and useful feedback", "Tests for add, toggle, filtering, and persistence"] },
  },
  {
    id: "node", title: "Create a trustworthy API", stage: "Full stack",
    description: "Learn HTTP, validate incoming data, and enforce access rules on the server.",
    outcomes: ["Describe and implement a JSON API contract", "Reject invalid data with consistent errors", "Distinguish identity from resource permissions"],
    lessons: ["http-basics", "node-api", "node-validation", "node-auth"],
    resource: { label: "Node.js: Introduction", url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs" },
    project: { title: "A task API", environment: "external", brief: "Build a server that supports creating, reading, updating, and deleting tasks. Keep validation, resource ownership, and persistence concerns explicit.", deliverables: ["Documented routes, request bodies, statuses, and response shapes", "Validation for missing, incorrect, and oversized inputs", "A maintained authentication approach with server ownership checks", "API tests for success, invalid input, missing records, and forbidden access"] },
  },
  {
    id: "db", title: "Persist data with SQL", stage: "Full stack",
    description: "Design relationships, write useful queries, and evolve data with migrations and transactions.",
    outcomes: ["Model records with keys and constraints", "Query related data using joins and aggregates", "Practice schema changes and recoverable writes"],
    lessons: ["db-models", "sql-basics", "sql-joins", "db-transactions"],
    resource: { label: "PostgreSQL tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html" },
    project: { title: "A persistent task service", environment: "external", brief: "Connect your task API to a relational database. Verify that data survives a server restart and that records remain associated with their owners.", deliverables: ["Versioned migrations for users, tasks, and their relationship", "Parameterized queries and database constraints", "A joined summary that includes owners with no tasks", "A migration and transaction test using existing rows"] },
  },
  {
    id: "test", title: "Prove the important behavior", stage: "Release skills",
    description: "Choose useful test cases, cover real flows, and prevent a reported failure from returning.",
    outcomes: ["Select meaningful boundary cases", "Distinguish unit, integration, and end-to-end coverage", "Reproduce a bug and add a focused regression"],
    lessons: ["testing-basics", "test-boundaries", "test-integration", "test-debugging"],
    resource: { label: "Vitest guide", url: "https://vitest.dev/guide/" },
    project: { title: "A tested release candidate", environment: "external", brief: "Add a focused set of tests to your app, including a complete critical flow and a regression for a real bug you find.", deliverables: ["Unit tests for rules and boundary conditions", "API and database integration tests with known test data", "A browser test for the app’s main user flow", "A reproduced bug, a failing regression, and a verified fix"] },
  },
  {
    id: "ship", title: "Ship a portfolio capstone", stage: "Release skills",
    description: "Deploy the complete experience, review usability, and explain the decisions behind your work.",
    outcomes: ["Deploy with correct configuration and public asset paths", "Review keyboard use, small screens, and recovery", "Write a concrete, honest project case study"],
    lessons: ["ship-builds", "security-deploy", "ship-accessibility", "ship-maintenance"],
    resource: { label: "MDN: Publishing your website", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Publishing_your_website" },
    project: { title: "Your full stack portfolio capstone", environment: "external", brief: "Bring the frontend, API, database, and tests together in an app that solves a problem you care about. Publish it and explain your own contribution and tradeoffs.", deliverables: ["A working deployed app and a documented source repository", "A verified main flow with accessibility and error recovery reviewed", "Server-held secrets, access checks, and a tested backup strategy", "A case study explaining the problem, your contribution, decisions, evidence, and limits"] },
  },
];
export const courseById = (id: string) => COURSES.find((course) => course.id === id);
