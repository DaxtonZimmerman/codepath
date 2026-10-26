import { BOOTCAMP_LESSONS } from "./bootcamp-lessons";
import { COURSES } from "./bootcamp";
import type { PageExercise } from "./page-exercises";
export type Test = { args: unknown[]; expected: unknown; label: string; preserveArgs?: boolean };
export type Challenge = { functionName: string; prompt: string; starter: string; tests: Test[]; hints: string[]; concept: string };
export type QuizQ = { q: string; options: string[]; answer: number; explanation: string };
export type Lesson = {
  id: string; track: string; title: string; minutes: number; summary: string;
  body: string[]; example: string; takeaways: string[];
  challenge?: Challenge; quiz?: QuizQ[]; pageExercise?: PageExercise;
  lab?: { task: string; steps: string[]; verify: string };
};

export const TRACKS = [
  { id: "web", name: "HTML & CSS", blurb: "Structure and layout the browser understands." },
  { id: "js", name: "JavaScript Foundations", blurb: "Values, functions, decisions, loops." },
  { id: "data", name: "Arrays & Objects", blurb: "Shaping real data with confidence." },
  { id: "dom", name: "The DOM", blurb: "Making pages respond to people." },
  { id: "async", name: "Async & Fetch", blurb: "Waiting well: promises and network data." },
  { id: "git", name: "Git", blurb: "Save points you can trust." },
  { id: "ts", name: "TypeScript", blurb: "Catch mistakes before they run." },
  { id: "react", name: "React", blurb: "UI as a function of state." },
  { id: "node", name: "Node APIs", blurb: "Your own server, your own rules." },
  { id: "db", name: "Databases", blurb: "Data that survives a restart." },
  { id: "test", name: "Testing", blurb: "Proof your code does what you think." },
  { id: "ship", name: "Deploy & Security", blurb: "Putting it online, safely." },
];

const CORE_LESSONS: Lesson[] = [
  {
    id: "html-semantics", track: "web", title: "Semantic HTML that explains itself", minutes: 8,
    summary: "Pick elements for what content means, not how it looks.",
    body: [
      "HTML describes meaning. A <button> is focusable, clickable with Enter and Space, and announced as a button by screen readers. A <div onclick> gets none of that for free.",
      "Landmarks such as <header>, <nav>, <main>, and <footer> let assistive tech jump around a page. Headings (h1 to h6) form an outline: one h1 per page, then nested levels without skipping.",
      "Forms work best when every input has a <label for> pointing at its id. Clicking the label focuses the input, and the label becomes its accessible name.",
    ],
    example: `<main>
  <h1>Reading list</h1>
  <form>
    <label for="title">Book title</label>
    <input id="title" name="title" required />
    <button type="submit">Add book</button>
  </form>
</main>`,
    takeaways: ["Use buttons for actions, links for navigation", "Every input needs a label", "Headings form an outline"],
    quiz: [
      { q: "A clickable element that saves a form should be:", options: ["<div onclick>", "<a href=\"#\">", "<button type=\"submit\">", "<span role=\"text\">"], answer: 2, explanation: "Buttons are keyboard-accessible and announce their role. A link navigates; a div needs extra work to be usable." },
      { q: "What connects a <label> to its <input>?", options: ["Placing them on the same line", "label for matches input id", "Same class name", "Same name attribute"], answer: 1, explanation: "The for attribute must match the input's id. That gives the input an accessible name and a bigger click target." },
    ],
  },
  {
    id: "css-layout", track: "web", title: "Flexbox and Grid without guessing", minutes: 10,
    summary: "One-dimensional rows with flex, two-dimensional layouts with grid.",
    body: [
      "Flexbox arranges children along one axis. justify-content distributes along the main axis, align-items along the cross axis. gap spaces items without margin hacks.",
      "Grid defines rows and columns at once. grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)) creates a responsive card grid with no media queries.",
      "The box model matters: box-sizing: border-box makes width include padding and border, which is almost always what you want.",
    ],
    example: `.toolbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}`,
    takeaways: ["Flex for one axis, grid for two", "Use gap instead of margins", "border-box everywhere"],
    quiz: [
      { q: "In a row flex container, which property centers items vertically?", options: ["justify-content", "align-items", "text-align", "vertical-align"], answer: 1, explanation: "In a row, the cross axis is vertical, and align-items controls the cross axis." },
      { q: "repeat(auto-fill, minmax(220px, 1fr)) does what?", options: ["Fixes exactly 220px columns", "Creates as many columns of at least 220px as fit", "Makes one column", "Only works with flex"], answer: 1, explanation: "Grid fits as many columns as possible, each at least 220px, sharing leftover space." },
    ],
  },
  {
    id: "js-functions", track: "js", title: "Values, variables, and functions", minutes: 10,
    summary: "const by default, small functions that return values.",
    body: [
      "Use const for bindings that will not be reassigned and let for ones that will. Avoid var; its function scoping causes surprising bugs.",
      "A function takes inputs (parameters) and returns an output. Pure functions, which only depend on their inputs and do not change anything outside, are the easiest to test and reason about.",
      "Math.min and Math.max are handy building blocks. Combining them lets you keep a number inside a range.",
    ],
    example: `const TAX = 0.08;
function totalWithTax(price) {
  return Math.round(price * (1 + TAX) * 100) / 100;
}
totalWithTax(20); // 21.6`,
    takeaways: ["const first, let when needed", "Return values, do not just log them", "Small pure functions compose well"],
    challenge: {
      functionName: "clamp", concept: "Functions & Math",
      prompt: "Write clamp(n, min, max) that returns n, but never less than min and never more than max.",
      starter: `function clamp(n, min, max) {\n  // your code here\n}\n`,
      tests: [
        { args: [5, 0, 10], expected: 5, label: "inside range stays the same" },
        { args: [-3, 0, 10], expected: 0, label: "below min becomes min" },
        { args: [42, 0, 10], expected: 10, label: "above max becomes max" },
        { args: [10, 0, 10], expected: 10, label: "edge value is allowed" },
      ],
      hints: [
        "You need to return a number. Start by writing return and think about which value should come back.",
        "Math.max(n, min) guarantees the result is not below min.",
        "Wrap it: Math.min(Math.max(n, min), max).",
      ],
    },
  },
  {
    id: "js-loops", track: "js", title: "Repeat work with loops", minutes: 12,
    summary: "Repeat a calculation with a counter and a running total.",
    body: [
      "A for loop has an initializer, a condition and an update. for (let i = 1; i <= n; i++) starts at one, includes n and increments after each iteration.",
      "Use let for a counter or total that changes. Declare the total before the loop, update it inside, then return after the loop has finished.",
      "Check zero, one and a normal input. An inclusive <= boundary differs from <. The remainder operator % lets i % 2 === 0 identify even numbers. Make sure your counter changes toward a false condition so the loop stops. Arrays are introduced in the next module; this exercise uses one numeric total."
    ],
    example: `function sumUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
console.log(sumUpTo(3)); // 6`,
    takeaways: ["Initialize before repeating", "Check the inclusive boundary", "Update the counter so the loop stops"],
    challenge: {
      functionName: "sumEvenUpTo", concept: "Loops and conditions",
      prompt: "Return the sum of even integers from 1 through n, inclusive. Inputs are nonnegative integers. For zero return 0.",
      starter: `function sumEvenUpTo(n) {\n  let total = 0;\n  // Add the even numbers, then return total.\n}`,
      tests: [
        { args: [6], expected: 12, label: "2 + 4 + 6 = 12" },
        { args: [5], expected: 6, label: "Odd upper bound" },
        { args: [2], expected: 2, label: "Inclusive boundary" },
        { args: [0], expected: 0, label: "Zero has no positive terms" }
      ],
      hints: ["Loop from 1 through n.", "i % 2 === 0 identifies an even number.", "Add to total inside the condition and return after the loop."]
    }
  },
  {
    id: "array-methods", track: "data", title: "map, filter, reduce", minutes: 12,
    summary: "Transform lists without manual index bookkeeping.",
    body: [
      "filter keeps items where a callback returns true. map transforms each item into something new. Neither mutates the original array.",
      "reduce walks the array carrying an accumulator. Always pass an initial value, such as 0 for sums, so empty arrays work.",
      "Chaining reads like a sentence: take the scores, keep the passing ones, add them up.",
    ],
    example: `const scores = [72, 45, 90, 61];
const passingTotal = scores
  .filter((s) => s >= 60)
  .reduce((sum, s) => sum + s, 0); // 223`,
    takeaways: ["filter selects, map transforms, reduce combines", "Give reduce an initial value", "These do not mutate"],
    challenge: {
      functionName: "sumOfSquaresOfEvens", concept: "Array methods",
      prompt: "Given an array of integers, return the sum of the squares of the even numbers.",
      starter: `function sumOfSquaresOfEvens(nums) {\n  \n}\n`,
      tests: [
        { args: [[1, 2, 3, 4]], expected: 20, label: "2*2 + 4*4 = 20" },
        { args: [[]], expected: 0, label: "empty array returns 0" },
        { args: [[-2, 5, 6]], expected: 40, label: "negative evens count too" },
        { args: [[1, 3, 7]], expected: 0, label: "no evens returns 0" },
      ],
      hints: [
        "Break it into three steps: keep evens, square them, add them.",
        "nums.filter((n) => n % 2 === 0) keeps evens. Watch out: -2 % 2 is -0, which still equals 0.",
        "Finish with .map((n) => n * n).reduce((a, b) => a + b, 0).",
      ],
    },
  },
  {
    id: "objects-counting", track: "data", title: "Objects as lookup tables", minutes: 10,
    summary: "Use keys to count, group, and look things up fast.",
    body: [
      "An object maps string keys to values. Bracket notation, obj[key], lets you use a variable as the key.",
      "A common pattern is counting: for each item, set counts[item] = (counts[item] || 0) + 1.",
      "Normalize input first. Lowercasing and trimming text avoids counting \"The\" and \"the\" separately.",
    ],
    example: `const votes = ["tea", "coffee", "tea"];
const tally = {};
for (const v of votes) tally[v] = (tally[v] || 0) + 1;
// { tea: 2, coffee: 1 }`,
    takeaways: ["Bracket notation for dynamic keys", "Default missing counts with || 0", "Normalize before counting"],
    challenge: {
      functionName: "wordCounts", concept: "Objects",
      prompt: "Return an object counting each word in a sentence. Lowercase everything and split on whitespace. Ignore empty strings.",
      starter: `function wordCounts(text) {\n  const counts = {};\n  \n  return counts;\n}\n`,
      tests: [
        { args: ["the cat and the hat"], expected: { the: 2, cat: 1, and: 1, hat: 1 }, label: "repeated word counted" },
        { args: ["Go go GO"], expected: { go: 3 }, label: "case-insensitive" },
        { args: ["  spaced   out  "], expected: { spaced: 1, out: 1 }, label: "extra spaces ignored" },
        { args: [""], expected: {}, label: "empty string gives empty object" },
      ],
      hints: [
        "Turn the text into an array of words first.",
        "text.toLowerCase().split(/\\s+/) splits on any run of whitespace, but may leave empty strings at the ends.",
        "Skip empty words with if (!word) continue; then counts[word] = (counts[word] || 0) + 1.",
      ],
    },
  },
  {
    id: "data-shaping", track: "data", title: "Shaping arrays of objects", minutes: 12,
    summary: "Group and total records, the bread and butter of real apps.",
    body: [
      "Most app data is an array of objects: transactions, tasks, users. Many features are just reshaping that array.",
      "To total by category, reduce into an object keyed by category. Each item adds its amount to the right bucket.",
      "Floating point sums can drift (0.1 + 0.2). Rounding to cents at the end keeps output clean.",
    ],
    example: `const tasks = [{ owner: "ana", hours: 2 }, { owner: "li", hours: 1 }, { owner: "ana", hours: 3 }];
const byOwner = tasks.reduce((acc, t) => {
  acc[t.owner] = (acc[t.owner] || 0) + t.hours;
  return acc;
}, {}); // { ana: 5, li: 1 }`,
    takeaways: ["reduce into an object to group", "Always return the accumulator", "Round money at the end"],
    challenge: {
      functionName: "totalByCategory", concept: "Grouping data",
      prompt: "Given items like { category, amount }, return an object mapping each category to its total amount rounded to 2 decimals.",
      starter: `function totalByCategory(items) {\n  \n}\n`,
      tests: [
        { args: [[{ category: "food", amount: 12.5 }, { category: "rent", amount: 400 }, { category: "food", amount: 7.25 }]], expected: { food: 19.75, rent: 400 }, label: "groups food" },
        { args: [[]], expected: {}, label: "no items" },
        { args: [[{ category: "misc", amount: 0.1 }, { category: "misc", amount: 0.2 }]], expected: { misc: 0.3 }, label: "floating point rounded" },
      ],
      hints: [
        "Start with an empty object and visit each item once.",
        "acc[item.category] = (acc[item.category] || 0) + item.amount inside a reduce or for...of loop.",
        "After totaling, round each value: Math.round(v * 100) / 100.",
      ],
    },
  },
  {
    id: "dom-basics", track: "dom", title: "Selecting and changing the DOM", minutes: 9,
    summary: "The page is a tree of objects you can query and update.",
    body: [
      "document.querySelector takes a CSS selector and returns the first match, or null. querySelectorAll returns a static NodeList.",
      "Set textContent for user-provided text. innerHTML parses HTML, so inserting untrusted strings with it opens the door to script injection.",
      "classList.add, remove, and toggle let CSS handle the visuals while JavaScript flips state.",
    ],
    example: `const status = document.querySelector("#status");
status.textContent = "Saved";
status.classList.toggle("is-success", true);`,
    takeaways: ["querySelector can return null", "Prefer textContent for user text", "Toggle classes, let CSS style"],
    quiz: [
      { q: "Showing a user's comment safely on the page uses:", options: ["el.innerHTML = comment", "el.textContent = comment", "document.write(comment)", "eval(comment)"], answer: 1, explanation: "textContent never parses HTML, so a comment containing <script> shows as text instead of running." },
      { q: "document.querySelector(\".missing\") with no match returns:", options: ["An empty array", "undefined", "null", "It throws"], answer: 2, explanation: "It returns null, so check before reading properties to avoid a TypeError." },
    ],
  },
  {
    id: "dom-events", track: "dom", title: "Events and delegation", minutes: 10,
    summary: "Listen once on a parent instead of on every child.",
    body: [
      "addEventListener(\"click\", handler) runs handler with an event object. event.target is the element actually clicked.",
      "Events bubble up through ancestors. Event delegation puts one listener on a list and uses event.target.closest(\"li\") to find the item.",
      "For forms, listen to submit on the form and call event.preventDefault() to stop a full page reload.",
    ],
    example: `list.addEventListener("click", (e) => {
  const item = e.target.closest("[data-id]");
  if (!item) return;
  removeTask(item.dataset.id);
});`,
    takeaways: ["Events bubble", "Delegate for dynamic lists", "preventDefault on submit"],
    quiz: [
      { q: "Why use event delegation on a todo list?", options: ["It is required by browsers", "New items work without adding new listeners", "It makes clicks faster to render", "It prevents bubbling"], answer: 1, explanation: "One listener on the parent handles items added later, since their events bubble up to it." },
      { q: "A form reloads the page on submit. The fix is:", options: ["return false from the button", "event.preventDefault() in the submit handler", "remove the form tag", "use onclick on the input"], answer: 1, explanation: "preventDefault cancels the browser's default navigation for that submit event." },
    ],
  },
  {
    id: "async-promises", track: "async", title: "Promises and async/await", minutes: 11,
    summary: "Code that waits without freezing the page.",
    body: [
      "A promise represents a value that will arrive later. It settles as fulfilled or rejected exactly once.",
      "async functions always return a promise. Inside them, await pauses that function until the promise settles, while the rest of the page keeps running.",
      "Wrap awaits in try/catch to handle rejections. Run independent requests together with Promise.all instead of awaiting them one by one.",
    ],
    example: `async function loadProfile(id) {
  try {
    const [user, posts] = await Promise.all([getUser(id), getPosts(id)]);
    return { user, posts };
  } catch (err) {
    return { error: err.message };
  }
}`,
    takeaways: ["async functions return promises", "try/catch around await", "Promise.all for parallel work"],
    quiz: [
      { q: "What does an async function return?", options: ["The raw value", "A promise", "undefined always", "A callback"], answer: 1, explanation: "Even return 5 inside an async function returns a promise that resolves to 5." },
      { q: "Two independent requests are fastest with:", options: ["await a; await b;", "await Promise.all([a, b])", "setTimeout", "A while loop"], answer: 1, explanation: "Promise.all starts both and waits for both, so total time is the slower one, not the sum." },
    ],
  },
  {
    id: "fetch-json", track: "async", title: "Fetching and shaping JSON", minutes: 12,
    summary: "Check the response, parse it, keep only what the UI needs.",
    body: [
      "fetch only rejects on network failure. A 404 or 500 still resolves, so check response.ok before trusting the body.",
      "response.json() parses the body. API responses often contain far more than you need. Map them into small, predictable shapes right away.",
      "That shaping step is a pure function, which means you can test it without any network at all.",
    ],
    example: `const res = await fetch("/api/users");
if (!res.ok) throw new Error("HTTP " + res.status);
const body = await res.json();
const view = summarizeUsers(body); // pure, testable`,
    takeaways: ["fetch does not throw on 404", "Check res.ok", "Shape data in a pure function"],
    challenge: {
      functionName: "summarizeUsers", concept: "Shaping API data",
      prompt: "Given an API body { data: [{ id, name, active }] }, return the names of active users sorted alphabetically. If data is missing, return [].",
      starter: `function summarizeUsers(body) {\n  \n}\n`,
      tests: [
        { args: [{ data: [{ id: 1, name: "Zoe", active: true }, { id: 2, name: "Amir", active: true }, { id: 3, name: "Kai", active: false }] }], expected: ["Amir", "Zoe"], label: "active only, sorted" },
        { args: [{}], expected: [], label: "missing data" },
        { args: [{ data: [] }], expected: [], label: "empty data" },
      ],
      hints: [
        "Guard first: const users = body && body.data ? body.data : [];",
        "Use filter for active users, then map to u.name.",
        "Sort strings with .sort((a, b) => a.localeCompare(b)).",
      ],
    },
  },
  {
    id: "git-basics", track: "git", title: "Git: commits as save points", minutes: 9,
    summary: "Stage deliberately, commit small, branch for experiments.",
    body: [
      "Git tracks snapshots. git add moves changes into the staging area; git commit records the staged snapshot with a message.",
      "Small commits with clear messages (\"Add empty state to task list\") make history readable and mistakes easy to undo.",
      "Branches let you try something without risking main. git switch -c feature/search creates and moves to a new branch; merge or open a pull request when it works.",
    ],
    example: `git switch -c feature/empty-state
git add src/TaskList.tsx
git commit -m "Show empty state when no tasks"
git push -u origin feature/empty-state`,
    takeaways: ["add stages, commit records", "Small focused commits", "Branch for every feature"],
    quiz: [
      { q: "You edited two files but only want to commit one. You should:", options: ["git commit -a", "git add that-file then git commit", "git push", "Delete the other file"], answer: 1, explanation: "Staging just one file means the commit contains only that change." },
      { q: "Which is the most useful commit message?", options: ["\"stuff\"", "\"fix\"", "\"Validate email before submit\"", "\"asdf\""], answer: 2, explanation: "It tells future you what changed and why, without opening the diff." },
    ],
  },
  {
    id: "ts-types", track: "ts", title: "TypeScript types that help", minutes: 11,
    summary: "Describe your data once and let the editor catch mismatches.",
    body: [
      "TypeScript adds static types to JavaScript. Types are checked at build time and removed at runtime.",
      "Describe object shapes with type or interface. Union types like \"todo\" | \"done\" restrict a value to known options.",
      "Optional properties use ?. TypeScript then forces you to handle the undefined case, which is exactly where many runtime bugs hide.",
    ],
    example: `type Task = {
  id: number;
  title: string;
  status: "todo" | "done";
  dueDate?: string;
};
function label(t: Task) {
  return t.dueDate ? t.title + " (due " + t.dueDate + ")" : t.title;
}`,
    takeaways: ["Types vanish at runtime", "Unions model fixed choices", "Optional means handle undefined"],
    quiz: [
      { q: "status: \"todo\" | \"done\" means:", options: ["Any string", "Only those two strings", "A boolean", "An array"], answer: 1, explanation: "A union of string literals allows only those exact values." },
      { q: "Do TypeScript types validate API data at runtime?", options: ["Yes, always", "No, they are erased; validate with code like zod", "Only in production", "Only for numbers"], answer: 1, explanation: "Types disappear after compiling. Untrusted data needs runtime validation." },
    ],
  },
  {
    id: "react-state", track: "react", title: "React state with reducers", minutes: 13,
    summary: "UI is a function of state; reducers make updates predictable.",
    body: [
      "A React component returns UI from props and state. When state changes, React re-renders with the new value.",
      "Never mutate state. Create new arrays and objects with spread, map, and filter so React can detect the change.",
      "A reducer is a pure function (state, action) => newState. It centralizes every way state can change, and is trivially testable.",
    ],
    example: `function TaskList() {
  const [tasks, dispatch] = useReducer(todoReducer, []);
  return (
    <button onClick={() => dispatch({ type: "add", text: "Read docs" })}>
      Add ({tasks.length})
    </button>
  );
}`,
    takeaways: ["Never mutate state", "Reducers are pure", "Return the same state for unknown actions"],
    challenge: {
      functionName: "todoReducer", concept: "Immutable updates",
      prompt: "Write todoReducer(state, action). State is an array of { id, text, done }. Handle \"add\" (id = state.length + 1, done false), \"toggle\" (by id), and \"remove\" (by id). Unknown actions return state unchanged.",
      starter: `function todoReducer(state, action) {\n  switch (action.type) {\n    // case "add":\n    default:\n      return state;\n  }\n}\n`,
      tests: [
        { args: [[], { type: "add", text: "Learn reducers" }], expected: [{ id: 1, text: "Learn reducers", done: false }], label: "add to empty list" },
        { args: [[{ id: 1, text: "a", done: false }, { id: 2, text: "b", done: false }], { type: "toggle", id: 2 }], expected: [{ id: 1, text: "a", done: false }, { id: 2, text: "b", done: true }], label: "toggle by id" },
        { args: [[{ id: 1, text: "a", done: true }], { type: "remove", id: 1 }], expected: [], label: "remove by id" },
        { args: [[{ id: 1, text: "a", done: false }], { type: "nope" }], expected: [{ id: 1, text: "a", done: false }], label: "unknown action" },
      ],
      hints: [
        "Each case returns a brand new array. For add: return [...state, newItem].",
        "toggle: state.map((t) => t.id === action.id ? { ...t, done: !t.done } : t).",
        "remove: state.filter((t) => t.id !== action.id).",
      ],
    },
  },
  {
    id: "node-api", track: "node", title: "Building a Node API", minutes: 12,
    summary: "Routes, query strings, and status codes that mean something.",
    body: [
      "An API route maps a method and path to a handler: GET /tasks lists, POST /tasks creates. In Express, req.query holds the parsed query string.",
      "Status codes are part of your contract: 200 OK, 201 Created, 400 bad input, 404 not found, 500 server error.",
      "Understanding how a query string like ?page=2&tag=js becomes an object demystifies what frameworks do for you.",
    ],
    example: `app.get("/tasks", (req, res) => {
  const page = Number(req.query.page ?? 1);
  if (!Number.isInteger(page) || page < 1) return res.status(400).json({ error: "bad page" });
  res.json(listTasks({ page }));
});`,
    takeaways: ["Method + path = route", "Validate query input", "Use meaningful status codes"],
    challenge: {
      functionName: "parseQuery", concept: "Parsing input",
      prompt: "Parse a query string like \"?page=2&tag=js\" into { page: \"2\", tag: \"js\" }. The leading ? is optional. Decode percent-encoding and treat + as a space. Empty input returns {}.",
      starter: `function parseQuery(qs) {\n  \n}\n`,
      tests: [
        { args: ["?page=2&tag=js"], expected: { page: "2", tag: "js" }, label: "basic pairs" },
        { args: ["q=hello+world&city=S%C3%A3o%20Paulo"], expected: { q: "hello world", city: "S\u00e3o Paulo" }, label: "decoding" },
        { args: [""], expected: {}, label: "empty" },
        { args: ["?flag"], expected: { flag: "" }, label: "key without value" },
      ],
      hints: [
        "Remove a leading ? with qs.replace(/^\\?/, \"\"), then return {} if nothing is left.",
        "Split on & to get pairs, then split each on = into key and value (value may be undefined).",
        "decodeURIComponent(value.replace(/\\+/g, \" \")) handles both encodings. Default missing values to \"\".",
      ],
    },
  },
  {
    id: "sql-basics", track: "db", title: "SQL queries you will actually write", minutes: 11,
    summary: "SELECT, WHERE, JOIN, and why parameters matter.",
    body: [
      "Relational databases store rows in tables. SELECT picks columns, WHERE filters rows, ORDER BY sorts, LIMIT caps results.",
      "JOIN combines tables through a key: tasks.user_id references users.id. That is how one user has many tasks.",
      "Never build SQL by gluing strings with user input. Parameterized queries ($1, ?) keep data and code separate and prevent SQL injection.",
    ],
    example: `SELECT t.title, u.name
FROM tasks t
JOIN users u ON u.id = t.user_id
WHERE t.done = false AND u.id = $1
ORDER BY t.created_at DESC
LIMIT 20;`,
    takeaways: ["WHERE filters, JOIN connects", "Foreign keys model relationships", "Always parameterize"],
    quiz: [
      { q: "How do you safely include a user's search term in a query?", options: ["String concatenation", "Template literal", "A parameter placeholder like $1", "Escape quotes by hand"], answer: 2, explanation: "Parameters send data separately from SQL, so input can never change the query's structure." },
      { q: "One user has many tasks. Where does the foreign key go?", options: ["users.task_id", "tasks.user_id", "Both", "Neither"], answer: 1, explanation: "Each task points to its single owner, so the many side holds the key." },
    ],
  },
  {
    id: "testing-basics", track: "test", title: "Writing tests that earn their keep", minutes: 11,
    summary: "Arrange, act, assert. Test behavior, especially edge cases.",
    body: [
      "A unit test calls a function with known input and asserts the output. This app's challenges are exactly that: each label is a test.",
      "Good tests cover the normal case, the edges (empty, zero, boundaries), and the weird input real users send.",
      "Write the failing test first when fixing a bug. When it passes, you know the bug is fixed and will stay fixed.",
    ],
    example: `import { test, expect } from "vitest";
test("slugify trims and lowercases", () => {
  expect(slugify("  Hello World  ")).toBe("hello-world");
});`,
    takeaways: ["Test behavior, not implementation", "Cover edges", "Reproduce bugs as tests first"],
    challenge: {
      functionName: "slugify", concept: "String edge cases",
      prompt: "Turn a title into a URL slug: lowercase, trim, replace any run of non-alphanumeric characters with a single -, and remove leading or trailing dashes.",
      starter: `function slugify(title) {\n  \n}\n`,
      tests: [
        { args: ["Hello World"], expected: "hello-world", label: "basic" },
        { args: ["  Learn JS: Day 3!  "], expected: "learn-js-day-3", label: "punctuation and spaces" },
        { args: ["---"], expected: "", label: "only symbols" },
        { args: ["React & Node"], expected: "react-node", label: "collapse runs" },
      ],
      hints: [
        "Lowercase first so you only need to keep a-z and 0-9.",
        "title.toLowerCase().replace(/[^a-z0-9]+/g, \"-\") turns each run of other characters into one dash.",
        "Finally strip dashes at the ends with .replace(/^-+|-+$/g, \"\").",
      ],
    },
  },
  {
    id: "security-deploy", track: "ship", title: "Shipping safely", minutes: 12,
    summary: "Environment variables, HTTPS, and escaping output.",
    body: [
      "Secrets such as API keys live in environment variables on the server, never in frontend code or a git commit. Anything shipped to the browser is public.",
      "Deploying means building the app, running it on a host, and serving it over HTTPS. Check logs after every deploy and keep a way to roll back.",
      "Cross-site scripting happens when user input is rendered as HTML. Escaping the five special characters turns markup into harmless text.",
    ],
    example: `// server only
const key = process.env.WEATHER_API_KEY;
if (!key) throw new Error("Missing WEATHER_API_KEY");`,
    takeaways: ["Secrets stay server-side", "HTTPS and logs every deploy", "Escape untrusted output"],
    challenge: {
      functionName: "escapeHtml", concept: "Output escaping",
      prompt: "Escape &, <, >, \" and ' as &amp; &lt; &gt; &quot; &#39; so user text cannot become markup.",
      starter: `function escapeHtml(str) {\n  \n}\n`,
      tests: [
        { args: ["<script>alert(1)</script>"], expected: "&lt;script&gt;alert(1)&lt;/script&gt;", label: "script tag" },
        { args: ["Tom & Jerry"], expected: "Tom &amp; Jerry", label: "ampersand" },
        { args: ["She said \"hi\" and it's fine"], expected: "She said &quot;hi&quot; and it&#39;s fine", label: "quotes" },
        { args: ["plain"], expected: "plain", label: "nothing to escape" },
      ],
      hints: [
        "A map object from character to entity keeps it tidy.",
        "Use str.replace(/[&<>\"']/g, (ch) => map[ch]) to replace each match.",
        "If you chain separate replaces, do & first, otherwise you will double-escape the entities you created.",
      ],
    },
  },
];

const allLessons = [...CORE_LESSONS, ...BOOTCAMP_LESSONS];
export const LESSONS: Lesson[] = COURSES.flatMap((course) => course.lessons.map((id) => {
  const lesson = allLessons.find((item) => item.id === id);
  if (!lesson) throw new Error(`Missing bootcamp lesson: ${id}`);
  return lesson;
}));

export const lessonById = (id: string) => LESSONS.find((l) => l.id === id);
export const trackName = (id: string) => TRACKS.find((t) => t.id === id)?.name ?? id;

export type Project = { id: string; title: string; tagline: string; level: string; uses: string[]; brief: string; steps: string[]; stretch: string[] };
export const PROJECTS: Project[] = [
  {
    id: "portfolio", title: "Personal portfolio", tagline: "A single page that says who you are and what you have built.", level: "Starter", uses: ["html-semantics", "css-layout", "git-basics", "security-deploy"],
    brief: "Build a responsive, accessible one-page site with an intro, three project write-ups, and a contact link. Hand-write the HTML and CSS so you understand every line, then deploy it.",
    steps: ["Sketch the sections on paper: intro, projects, contact", "Write semantic HTML with one h1 and landmark elements", "Lay out project cards with CSS grid and test at 375px wide", "Check keyboard navigation and visible focus styles", "Commit in small steps with clear messages", "Deploy and share the public URL"],
    stretch: ["Add a light and dark theme toggle", "Score 95+ on a Lighthouse accessibility audit"],
  },
  {
    id: "task-tracker", title: "Task tracker", tagline: "Add, complete, filter, and persist tasks.", level: "Core", uses: ["dom-events", "objects-counting", "react-state", "ts-types", "testing-basics"],
    brief: "Build a task tracker in React with TypeScript. State lives in a reducer, tasks persist to localStorage, and the reducer has unit tests.",
    steps: ["Define a Task type with a status union", "Implement todoReducer with add, toggle, remove", "Render the list with an empty state", "Add filters: all, active, done", "Persist to localStorage and reload on start", "Write tests for every reducer action"],
    stretch: ["Drag to reorder", "Due dates with an overdue highlight"],
  },
  {
    id: "api-dashboard", title: "API-powered dashboard", tagline: "Your own Node API feeding a live dashboard.", level: "Stretch", uses: ["fetch-json", "async-promises", "node-api", "sql-basics", "security-deploy"],
    brief: "Create a small Node API backed by a database, then a frontend dashboard that fetches, summarizes, and charts the data, with loading and error states.",
    steps: ["Design two tables and their relationship", "Build GET and POST routes with validation and status codes", "Use parameterized queries for all user input", "Fetch from the frontend, checking res.ok", "Show loading, error with retry, and empty states", "Store secrets in environment variables and deploy"],
    stretch: ["Pagination with query params", "Integration tests for each route"],
  },
];

export type AssessQ = { q: string; code?: string; options: string[]; answer: number; explanation: string; lesson: string };
export const ASSESSMENT: AssessQ[] = [
  { q: "Which element should wrap a form field's visible name?", options: ["<span>", "<label>", "<p>", "<div>"], answer: 1, explanation: "A label tied to the input via for/id gives it an accessible name.", lesson: "html-semantics" },
  { q: "What does this return?", code: "function f(n) { return n % 2 === 0 ? \"even\" : \"odd\"; }\nf(7)", options: ["\"even\"", "\"odd\"", "1", "undefined"], answer: 1, explanation: "7 % 2 is 1, so the condition is false and the function returns \"odd\".", lesson: "js-loops" },
  { q: "What is the result?", code: "[1, 2, 3, 4].filter(n => n > 2).map(n => n * 10)", options: ["[10, 20]", "[30, 40]", "[3, 4]", "70"], answer: 1, explanation: "filter keeps 3 and 4, then map multiplies each by 10.", lesson: "array-methods" },
  { q: "fetch() returns a 404. What happens?", options: ["The promise rejects", "The promise resolves; res.ok is false", "The page reloads", "It retries automatically"], answer: 1, explanation: "fetch only rejects on network failure. Check res.ok yourself.", lesson: "fetch-json" },
  { q: "Which React state update is correct for adding an item?", options: ["items.push(x); setItems(items)", "setItems([...items, x])", "items = [...items, x]", "setItems(items.push(x))"], answer: 1, explanation: "A new array lets React see the change. Mutating the old one does not.", lesson: "react-state" },
  { q: "Where should a third-party API secret key live?", options: ["In the React code", "In a server environment variable", "In localStorage", "In a public git repo"], answer: 1, explanation: "Anything shipped to the browser is public. Secrets stay on the server.", lesson: "security-deploy" },
];
