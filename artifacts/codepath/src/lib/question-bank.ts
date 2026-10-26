import type { QuizQ } from "./curriculum";
export type BankQuestion = QuizQ & { id: string; courseId: string; lessonId: string; concept: string };
export const AUTHORED_QUESTIONS: BankQuestion[] = [
  {
    "id": "web-bank-1",
    "courseId": "web",
    "lessonId": "html-document",
    "concept": "Document shell",
    "q": "Where does the page\u2019s visible main heading belong?",
    "options": [
      "Inside body",
      "Inside title",
      "Inside meta",
      "Inside head"
    ],
    "answer": 0,
    "explanation": "The body holds visible content. The title names the browser tab."
  },
  {
    "id": "web-bank-2",
    "courseId": "web",
    "lessonId": "html-text-links",
    "concept": "Navigation",
    "q": "Which link clearly describes its destination?",
    "options": [
      "Read the setup guide",
      "Click here",
      "More",
      "This link"
    ],
    "answer": 0,
    "explanation": "Descriptive link text remains useful outside the surrounding paragraph."
  },
  {
    "id": "web-bank-3",
    "courseId": "web",
    "lessonId": "html-images-lists",
    "concept": "Image alternatives",
    "q": "A decorative image repeats information already beside it. Which alt is appropriate?",
    "options": [
      "alt=\"\"",
      "Omit alt",
      "alt=\"image\"",
      "alt=\"decorative image\""
    ],
    "answer": 0,
    "explanation": "An empty alt tells assistive technology to skip a purely decorative image."
  },
  {
    "id": "web-bank-4",
    "courseId": "web",
    "lessonId": "html-semantics",
    "concept": "Native controls",
    "q": "A control performs a save action without navigating. Which element fits?",
    "options": [
      "button",
      "a without href",
      "span",
      "div"
    ],
    "answer": 0,
    "explanation": "A native button provides action semantics and keyboard behavior."
  },
  {
    "id": "web-bank-5",
    "courseId": "web",
    "lessonId": "html-forms",
    "concept": "Form labels",
    "q": "Which pair creates a programmatic label?",
    "options": [
      "label for=\"email\" and input id=\"email\"",
      "Matching class names",
      "Matching placeholder text",
      "An input beside a paragraph"
    ],
    "answer": 0,
    "explanation": "The label\u2019s for must match the control\u2019s id. A placeholder is not a substitute."
  },
  {
    "id": "web-bank-6",
    "courseId": "web",
    "lessonId": "css-foundations",
    "concept": "Box model",
    "q": "With content-box, width 100px, padding 10px on each side and no border, what is the outer width?",
    "options": [
      "120px",
      "100px",
      "110px",
      "80px"
    ],
    "answer": 0,
    "explanation": "Content-box width excludes padding: 100 + 10 + 10 = 120."
  },
  {
    "id": "web-bank-7",
    "courseId": "web",
    "lessonId": "css-layout",
    "concept": "Layout choice",
    "q": "Which system is designed for coordinated rows and columns?",
    "options": [
      "CSS Grid",
      "Text alignment",
      "Float clearing",
      "Letter spacing"
    ],
    "answer": 0,
    "explanation": "Grid controls two dimensions; Flexbox is most useful along one main axis."
  },
  {
    "id": "web-bank-8",
    "courseId": "web",
    "lessonId": "css-responsive",
    "concept": "Responsive design",
    "q": "What makes a card layout adapt to narrow screens?",
    "options": [
      "Flexible tracks plus a suitable media query",
      "A fixed 1200px width",
      "Disabling zoom",
      "Hiding all overflow"
    ],
    "answer": 0,
    "explanation": "Flexible sizing and deliberate breakpoints adapt the layout without hiding content."
  },
  {
    "id": "web-bank-9",
    "courseId": "web",
    "lessonId": "css-layout",
    "concept": "Alignment",
    "q": "In a default flex row, which property distributes items along the horizontal main axis?",
    "options": [
      "justify-content",
      "align-content only",
      "font-size",
      "grid-row"
    ],
    "answer": 0,
    "explanation": "With flex-direction: row, justify-content operates along the row\u2019s main axis."
  },
  {
    "id": "web-bank-10",
    "courseId": "web",
    "lessonId": "css-responsive",
    "concept": "Keyboard review",
    "q": "Which is evidence of a useful keyboard review?",
    "options": [
      "Tab through every control and confirm visible focus",
      "Only resize the browser",
      "Only click the primary button",
      "Remove focus outlines"
    ],
    "answer": 0,
    "explanation": "A real keyboard pass checks reachability, order and visible focus, not appearance alone."
  },
  {
    "id": "js-bank-1",
    "courseId": "js",
    "lessonId": "js-values",
    "concept": "Values",
    "q": "What is typeof \"42\"?",
    "options": [
      "\"string\"",
      "\"number\"",
      "\"integer\"",
      "\"boolean\""
    ],
    "answer": 0,
    "explanation": "Quotes create a string even when its characters look numeric."
  },
  {
    "id": "js-bank-2",
    "courseId": "js",
    "lessonId": "js-numbers",
    "concept": "Numeric conversion",
    "q": "What is Number(\"12\") + 3?",
    "options": [
      "15",
      "\"123\"",
      "NaN",
      "9"
    ],
    "answer": 0,
    "explanation": "Number converts the numeric text before addition."
  },
  {
    "id": "js-bank-3",
    "courseId": "js",
    "lessonId": "js-strings",
    "concept": "String normalization",
    "q": "Which normalizes \"  Blue  \" to \"blue\"?",
    "options": [
      "value.trim().toLowerCase()",
      "value.toUpperCase()",
      "Number(value)",
      "value.length"
    ],
    "answer": 0,
    "explanation": "trim removes surrounding whitespace; toLowerCase normalizes case."
  },
  {
    "id": "js-bank-4",
    "courseId": "js",
    "lessonId": "js-functions",
    "concept": "Return values",
    "q": "A function computes a total but has no return. What does its caller receive?",
    "options": [
      "undefined",
      "The last local variable",
      "The console output",
      "null automatically"
    ],
    "answer": 0,
    "explanation": "A normal function without an executed return statement returns undefined."
  },
  {
    "id": "js-bank-5",
    "courseId": "js",
    "lessonId": "js-conditions",
    "concept": "Boolean rules",
    "q": "A discount requires member AND total at least 50. Which condition fits?",
    "options": [
      "member && total >= 50",
      "member || total >= 50",
      "!member && total < 50",
      "member === total"
    ],
    "answer": 0,
    "explanation": "Both conditions must be true, so use &&."
  },
  {
    "id": "js-bank-6",
    "courseId": "js",
    "lessonId": "js-loops",
    "concept": "Loop boundaries",
    "q": "What does let n=0; for(let i=1;i<=3;i++){n+=i} produce for n?",
    "options": [
      "6",
      "3",
      "5",
      "7"
    ],
    "answer": 0,
    "explanation": "The loop adds 1, 2 and 3. The <= boundary includes 3."
  },
  {
    "id": "js-bank-7",
    "courseId": "js",
    "lessonId": "js-scope",
    "concept": "Scope",
    "q": "A const is declared inside a function. Where can it normally be read?",
    "options": [
      "Inside that function\u2019s scope",
      "From every file automatically",
      "Only in CSS",
      "From the caller by its local name"
    ],
    "answer": 0,
    "explanation": "Function-local bindings are not exported to the caller\u2019s scope."
  },
  {
    "id": "js-bank-8",
    "courseId": "js",
    "lessonId": "js-debugging",
    "concept": "Debugging",
    "q": "A calculation unexpectedly returns NaN. What is the most useful first check?",
    "options": [
      "Inspect the inputs and their types",
      "Rewrite the entire app",
      "Delete every test",
      "Change the output label"
    ],
    "answer": 0,
    "explanation": "NaN often originates from invalid numeric input. Check the first incorrect value."
  },
  {
    "id": "js-bank-9",
    "courseId": "js",
    "lessonId": "js-functions",
    "concept": "Parameters",
    "q": "For function double(n){return n*2}, what is double(4)?",
    "options": [
      "8",
      "4",
      "\"44\"",
      "undefined"
    ],
    "answer": 0,
    "explanation": "The argument 4 binds to n, and the explicit return supplies 8."
  },
  {
    "id": "js-bank-10",
    "courseId": "js",
    "lessonId": "js-conditions",
    "concept": "Boundaries",
    "q": "A minimum age is 18, inclusive. Which test catches a mistaken > comparison?",
    "options": [
      "Age exactly 18",
      "Age 30 only",
      "Age 100 only",
      "An unrelated name"
    ],
    "answer": 0,
    "explanation": "The exact boundary distinguishes > 18 from >= 18."
  },
  {
    "id": "data-bank-1",
    "courseId": "data",
    "lessonId": "arrays-basics",
    "concept": "Indexes",
    "q": "What is [\"a\",\"b\",\"c\"][1]?",
    "options": [
      "\"b\"",
      "\"a\"",
      "\"c\"",
      "3"
    ],
    "answer": 0,
    "explanation": "Arrays are zero-indexed; index 1 is the second element."
  },
  {
    "id": "data-bank-2",
    "courseId": "data",
    "lessonId": "object-basics",
    "concept": "Object properties",
    "q": "For const task={done:false}, what reads its completion state?",
    "options": [
      "task.done",
      "task[0]",
      "task()",
      "done.task"
    ],
    "answer": 0,
    "explanation": "Named properties describe fields on objects."
  },
  {
    "id": "data-bank-3",
    "courseId": "data",
    "lessonId": "array-methods",
    "concept": "Filtering",
    "q": "Which method selects all matching records without changing the source array?",
    "options": [
      "filter",
      "push",
      "splice",
      "reverse"
    ],
    "answer": 0,
    "explanation": "filter returns a new array of records for which the predicate is truthy."
  },
  {
    "id": "data-bank-4",
    "courseId": "data",
    "lessonId": "array-methods",
    "concept": "Mapping",
    "q": "What does [2,3].map(n=>n*2) return?",
    "options": [
      "[4,6]",
      "[2,3]",
      "[5]",
      "6"
    ],
    "answer": 0,
    "explanation": "map transforms each element and returns an array with the same number of entries."
  },
  {
    "id": "data-bank-5",
    "courseId": "data",
    "lessonId": "objects-counting",
    "concept": "Counting",
    "q": "What starting value avoids NaN when incrementing a missing count?",
    "options": [
      "0",
      "undefined",
      "NaN",
      "An empty object"
    ],
    "answer": 0,
    "explanation": "Use a numeric fallback such as (counts[key] ?? 0) + 1."
  },
  {
    "id": "data-bank-6",
    "courseId": "data",
    "lessonId": "data-shaping",
    "concept": "View models",
    "q": "An API returns 30 fields, but a card needs 3. What should the UI receive?",
    "options": [
      "An explicit small view model",
      "A copied raw response everywhere",
      "A string of the entire response",
      "A random selection of fields"
    ],
    "answer": 0,
    "explanation": "A view model isolates the UI from unrelated response details."
  },
  {
    "id": "data-bank-7",
    "courseId": "data",
    "lessonId": "data-immutable",
    "concept": "Sorting safely",
    "q": "Which numeric sort preserves the source array?",
    "options": [
      "[...items].sort((a,b)=>a-b)",
      "items.sort()",
      "items.reverse()",
      "items.splice(0)"
    ],
    "answer": 0,
    "explanation": "Copy first, then use a numeric comparator. sort mutates its receiver."
  },
  {
    "id": "data-bank-8",
    "courseId": "data",
    "lessonId": "arrays-basics",
    "concept": "Empty data",
    "q": "What is [].length?",
    "options": [
      "0",
      "1",
      "undefined",
      "null"
    ],
    "answer": 0,
    "explanation": "An empty array is valid data with length zero."
  },
  {
    "id": "data-bank-9",
    "courseId": "data",
    "lessonId": "object-basics",
    "concept": "Missing properties",
    "q": "What is ({name:\"A\"}).price?",
    "options": [
      "undefined",
      "0",
      "null",
      "An empty string"
    ],
    "answer": 0,
    "explanation": "An absent property evaluates to undefined; supply a fallback only when your contract calls for one."
  },
  {
    "id": "data-bank-10",
    "courseId": "data",
    "lessonId": "data-immutable",
    "concept": "Immutable updates",
    "q": "How do you change one task while keeping the original object untouched?",
    "options": [
      "Create {...task, done:true}",
      "Assign task.done=true",
      "Delete task.done first",
      "Reuse task and rename it"
    ],
    "answer": 0,
    "explanation": "Object spread creates a new shallow object; direct assignment mutates the original."
  },
  {
    "id": "dom-bank-1",
    "courseId": "dom",
    "lessonId": "dom-basics",
    "concept": "Selection",
    "q": "What does querySelector return when no element matches?",
    "options": [
      "null",
      "An empty array",
      "false",
      "A new element"
    ],
    "answer": 0,
    "explanation": "Check for null before reading a property or attaching a listener."
  },
  {
    "id": "dom-bank-2",
    "courseId": "dom",
    "lessonId": "dom-rendering",
    "concept": "Safe text",
    "q": "How should untrusted task text be placed in an element?",
    "options": [
      "Assign textContent",
      "Concatenate it into innerHTML",
      "Pass it to eval",
      "Use document.write"
    ],
    "answer": 0,
    "explanation": "textContent treats the value as text instead of interpreting HTML."
  },
  {
    "id": "dom-bank-3",
    "courseId": "dom",
    "lessonId": "dom-events",
    "concept": "Event listeners",
    "q": "How do you register a handler without running it immediately?",
    "options": [
      "addEventListener(\"click\", handleClick)",
      "addEventListener(\"click\", handleClick())",
      "handleClick = click()",
      "element.click = handleClick()"
    ],
    "answer": 0,
    "explanation": "Pass the function reference. Calling it supplies its return value instead."
  },
  {
    "id": "dom-bank-4",
    "courseId": "dom",
    "lessonId": "dom-forms",
    "concept": "Submission",
    "q": "Which event supports both a submit button and Enter in a form?",
    "options": [
      "submit on the form",
      "mouseover on the button",
      "keydown on every div",
      "load on the input"
    ],
    "answer": 0,
    "explanation": "A form submit handler covers native submission paths."
  },
  {
    "id": "dom-bank-5",
    "courseId": "dom",
    "lessonId": "dom-storage",
    "concept": "Storage parsing",
    "q": "Stored task JSON is malformed. What should the app do?",
    "options": [
      "Catch the parse error and use a safe fallback",
      "Crash during startup",
      "Silently delete every unrelated storage key",
      "Treat malformed text as trusted HTML"
    ],
    "answer": 0,
    "explanation": "Guard parsing and validate the shape before using saved data."
  },
  {
    "id": "dom-bank-6",
    "courseId": "dom",
    "lessonId": "dom-rendering",
    "concept": "State ownership",
    "q": "After toggling a task, what should determine the next rendering?",
    "options": [
      "The updated task state",
      "The button\u2019s color alone",
      "A hardcoded HTML string unrelated to state",
      "The previous screenshot"
    ],
    "answer": 0,
    "explanation": "Render from state so every display uses the same source of truth."
  },
  {
    "id": "dom-bank-7",
    "courseId": "dom",
    "lessonId": "dom-events",
    "concept": "Event targets",
    "q": "In delegation, how can a click on an icon find its surrounding action button?",
    "options": [
      "event.target.closest(\"button\") with a containment check",
      "Assume target is always the button",
      "Read window.name",
      "Use the icon\u2019s color"
    ],
    "answer": 0,
    "explanation": "closest handles nested click targets; ensure the match belongs to your container."
  },
  {
    "id": "dom-bank-8",
    "courseId": "dom",
    "lessonId": "dom-forms",
    "concept": "Validation",
    "q": "What should happen to a task title containing only spaces?",
    "options": [
      "Trim and reject it with feedback",
      "Save invisible content",
      "Convert it to undefined text",
      "Submit repeatedly"
    ],
    "answer": 0,
    "explanation": "Validate the normalized value before adding a task."
  },
  {
    "id": "dom-bank-9",
    "courseId": "dom",
    "lessonId": "dom-storage",
    "concept": "Serialization",
    "q": "Which stores an array as JSON text?",
    "options": [
      "localStorage.setItem(\"tasks\", JSON.stringify(tasks))",
      "localStorage.setItem(\"tasks\", tasks)",
      "JSON.parse(tasks)",
      "tasks.toString = localStorage"
    ],
    "answer": 0,
    "explanation": "Storage values are strings. Serialize deliberately and parse when reading."
  },
  {
    "id": "dom-bank-10",
    "courseId": "dom",
    "lessonId": "dom-basics",
    "concept": "Creation",
    "q": "Which creates an element without interpreting a user-supplied HTML string?",
    "options": [
      "document.createElement(\"li\")",
      "eval(\"li\")",
      "JSON.parse(\"li\")",
      "document.querySelectorAll(\"new\")"
    ],
    "answer": 0,
    "explanation": "createElement creates a node; set its text separately."
  },
  {
    "id": "async-bank-1",
    "courseId": "async",
    "lessonId": "async-promises",
    "concept": "Await",
    "q": "What does await do inside an async function?",
    "options": [
      "Waits for a promise there without blocking all browser work",
      "Freezes every browser tab",
      "Converts every error to success",
      "Always starts a new thread"
    ],
    "answer": 0,
    "explanation": "await pauses that async function while other event-loop work can continue."
  },
  {
    "id": "async-bank-2",
    "courseId": "async",
    "lessonId": "fetch-json",
    "concept": "HTTP failures",
    "q": "fetch receives HTTP 404. What normally happens?",
    "options": [
      "It resolves to a response whose ok is false",
      "It always rejects before a response",
      "It returns parsed JSON automatically",
      "It retries forever"
    ],
    "answer": 0,
    "explanation": "fetch rejects network failures, but HTTP error statuses still require checking response.ok."
  },
  {
    "id": "async-bank-3",
    "courseId": "async",
    "lessonId": "fetch-json",
    "concept": "JSON parsing",
    "q": "Which reads a response\u2019s JSON body?",
    "options": [
      "await response.json()",
      "response.body.name directly",
      "JSON.stringify(response)",
      "response.ok()"
    ],
    "answer": 0,
    "explanation": "json consumes the body asynchronously; ok is a boolean status check."
  },
  {
    "id": "async-bank-4",
    "courseId": "async",
    "lessonId": "async-loading-errors",
    "concept": "Loading state",
    "q": "Where can loading be reset after both success and failure?",
    "options": [
      "A finally block",
      "Only before the request",
      "Only in the success branch",
      "Inside a CSS rule"
    ],
    "answer": 0,
    "explanation": "finally runs after either outcome, making it useful for cleanup."
  },
  {
    "id": "async-bank-5",
    "courseId": "async",
    "lessonId": "async-races",
    "concept": "Stale results",
    "q": "An older search finishes after the latest search. Which result should display?",
    "options": [
      "The latest requested search",
      "Whichever response arrives last",
      "The longest response",
      "Both overlaid"
    ],
    "answer": 0,
    "explanation": "Track request identity or cancel superseded requests so stale responses cannot replace current results."
  },
  {
    "id": "async-bank-6",
    "courseId": "async",
    "lessonId": "async-promises",
    "concept": "Rejected promises",
    "q": "How should an awaited request failure be handled?",
    "options": [
      "Use try/catch or propagate it deliberately",
      "Ignore every rejection",
      "Assume await prevents errors",
      "Parse the error as HTML"
    ],
    "answer": 0,
    "explanation": "Awaited rejections throw into the async function. Handle or propagate them intentionally."
  },
  {
    "id": "async-bank-7",
    "courseId": "async",
    "lessonId": "async-loading-errors",
    "concept": "Empty results",
    "q": "A request succeeds with an empty array. What should the UI show?",
    "options": [
      "A distinct no-results state",
      "A permanent loading indicator",
      "A fake result",
      "An authentication failure automatically"
    ],
    "answer": 0,
    "explanation": "Empty success differs from loading and error."
  },
  {
    "id": "async-bank-8",
    "courseId": "async",
    "lessonId": "async-races",
    "concept": "Cancellation",
    "q": "Which browser API can cancel fetch?",
    "options": [
      "AbortController",
      "Array.sort",
      "localStorage",
      "CSSStyleSheet"
    ],
    "answer": 0,
    "explanation": "Pass an AbortController signal to fetch and abort superseded work."
  },
  {
    "id": "async-bank-9",
    "courseId": "async",
    "lessonId": "fetch-json",
    "concept": "Response boundaries",
    "q": "Where should a remote response be transformed to the UI\u2019s data shape?",
    "options": [
      "At the API boundary before rendering",
      "In unrelated click handlers everywhere",
      "Only in CSS",
      "In the page title"
    ],
    "answer": 0,
    "explanation": "Central boundary transformations make assumptions and validation easier to inspect."
  },
  {
    "id": "async-bank-10",
    "courseId": "async",
    "lessonId": "async-loading-errors",
    "concept": "Retry",
    "q": "What makes a retry action useful?",
    "options": [
      "It reissues the failed request and reports its new state",
      "It only hides the error",
      "It duplicates old cards",
      "It reloads continuously without a limit"
    ],
    "answer": 0,
    "explanation": "A retry should perform work and expose loading, success or error again."
  },
  {
    "id": "git-bank-1",
    "courseId": "git",
    "lessonId": "git-terminal",
    "concept": "Working directory",
    "q": "Which command shows the current directory?",
    "options": [
      "pwd",
      "git commit",
      "npm install",
      "cd without an argument list"
    ],
    "answer": 0,
    "explanation": "pwd prints the current working directory so you can confirm the project location."
  },
  {
    "id": "git-bank-2",
    "courseId": "git",
    "lessonId": "git-basics",
    "concept": "Diff review",
    "q": "What should you inspect before staging a change?",
    "options": [
      "git diff and git status",
      "Only the browser favicon",
      "An unrelated repository",
      "The size of node_modules"
    ],
    "answer": 0,
    "explanation": "Inspect the exact changes and affected files before making a focused commit."
  },
  {
    "id": "git-bank-3",
    "courseId": "git",
    "lessonId": "git-basics",
    "concept": "Staging",
    "q": "What does git add README.md do?",
    "options": [
      "Stages the current README changes for the next commit",
      "Publishes the entire repo",
      "Creates a remote",
      "Deletes the file"
    ],
    "answer": 0,
    "explanation": "The index stores staged changes; commit records them locally."
  },
  {
    "id": "git-bank-4",
    "courseId": "git",
    "lessonId": "git-branches",
    "concept": "Branches",
    "q": "Why create a branch for a focused improvement?",
    "options": [
      "To isolate and review that change",
      "To skip all tests",
      "To back up secrets publicly",
      "To remove commit history"
    ],
    "answer": 0,
    "explanation": "A branch provides an independent line of work that can be reviewed and merged."
  },
  {
    "id": "git-bank-5",
    "courseId": "git",
    "lessonId": "git-remotes",
    "concept": "Remote publishing",
    "q": "Which command uploads local commits to a remote branch?",
    "options": [
      "git push",
      "git status",
      "git diff",
      "git add"
    ],
    "answer": 0,
    "explanation": "push transfers commits; staging and committing alone stay local."
  },
  {
    "id": "git-bank-6",
    "courseId": "git",
    "lessonId": "git-remotes",
    "concept": "Ignore rules",
    "q": "Which normally belongs in .gitignore?",
    "options": [
      "node_modules and local secret files",
      "Every source file",
      "The README",
      "All tests"
    ],
    "answer": 0,
    "explanation": "Generated dependencies and local credentials should stay out of source history."
  },
  {
    "id": "git-bank-7",
    "courseId": "git",
    "lessonId": "git-branches",
    "concept": "Merge conflicts",
    "q": "What should you do with conflict markers before committing?",
    "options": [
      "Resolve the intended content and verify it",
      "Commit the markers unchanged",
      "Choose every incoming line blindly",
      "Delete the repository"
    ],
    "answer": 0,
    "explanation": "Conflicts require a deliberate combined result and checks of the resulting behavior."
  },
  {
    "id": "git-bank-8",
    "courseId": "git",
    "lessonId": "git-terminal",
    "concept": "Project scripts",
    "q": "Where should you first look for the command to run an unfamiliar app?",
    "options": [
      "Its README and package.json scripts",
      "A random global install",
      "The browser history",
      "The lockfile\u2019s largest line"
    ],
    "answer": 0,
    "explanation": "Use the project\u2019s documented setup and scripts to avoid guessing its workflow."
  },
  {
    "id": "git-bank-9",
    "courseId": "git",
    "lessonId": "git-remotes",
    "concept": "README",
    "q": "Which helps another developer reproduce your app?",
    "options": [
      "Setup, run commands, required environment and limits",
      "Only a logo",
      "A list of passwords",
      "Only an app name"
    ],
    "answer": 0,
    "explanation": "A useful README gives reproducible instructions and honest limitations."
  },
  {
    "id": "git-bank-10",
    "courseId": "git",
    "lessonId": "git-basics",
    "concept": "Commits",
    "q": "Which commit is easiest to review?",
    "options": [
      "One focused behavior change with a descriptive message",
      "Every unrelated edit from a month",
      "Only generated dependencies",
      "An empty message"
    ],
    "answer": 0,
    "explanation": "Focused commits make intent and regressions easier to inspect."
  },
  {
    "id": "ts-bank-1",
    "courseId": "ts",
    "lessonId": "ts-types",
    "concept": "Type boundaries",
    "q": "What does TypeScript primarily check?",
    "options": [
      "Static assumptions before execution",
      "Whether a network response is trustworthy at runtime",
      "CSS contrast",
      "Database backups"
    ],
    "answer": 0,
    "explanation": "Types disappear at runtime; external data still needs runtime validation."
  },
  {
    "id": "ts-bank-2",
    "courseId": "ts",
    "lessonId": "ts-objects",
    "concept": "Optional fields",
    "q": "What does name?: string allow?",
    "options": [
      "A missing name property",
      "Only the literal string \"?\"",
      "Every number",
      "A required boolean"
    ],
    "answer": 0,
    "explanation": "Optional properties may be absent, so consumers must handle undefined."
  },
  {
    "id": "ts-bank-3",
    "courseId": "ts",
    "lessonId": "ts-unions",
    "concept": "Narrowing",
    "q": "For string | number, how can string methods be used safely?",
    "options": [
      "Check typeof value === \"string\" first",
      "Cast everything to any",
      "Call trim unconditionally",
      "Disable type checking"
    ],
    "answer": 0,
    "explanation": "A runtime check narrows the union within its branch."
  },
  {
    "id": "ts-bank-4",
    "courseId": "ts",
    "lessonId": "ts-generics",
    "concept": "Relationships",
    "q": "Why use function first<T>(items:T[]): T | undefined?",
    "options": [
      "It preserves the relationship between input element and result types",
      "It guarantees a nonempty array",
      "It converts values to strings",
      "It validates JSON automatically"
    ],
    "answer": 0,
    "explanation": "The generic retains element type information while acknowledging empty input."
  },
  {
    "id": "ts-bank-5",
    "courseId": "ts",
    "lessonId": "ts-types",
    "concept": "Any",
    "q": "What is a major cost of using any at an input boundary?",
    "options": [
      "It suppresses useful checks on subsequent operations",
      "It validates every field",
      "It makes execution faster automatically",
      "It prevents null"
    ],
    "answer": 0,
    "explanation": "unknown plus validation retains checks that any bypasses."
  },
  {
    "id": "ts-bank-6",
    "courseId": "ts",
    "lessonId": "ts-objects",
    "concept": "Contracts",
    "q": "A Product requires price: number. Which value violates that contract?",
    "options": [
      "{ price: \"12\" }",
      "{ price: 12 }",
      "{ price: 0 }",
      "{ price: 12.5 }"
    ],
    "answer": 0,
    "explanation": "Numeric text is still a string; conversion and validation must be explicit."
  },
  {
    "id": "ts-bank-7",
    "courseId": "ts",
    "lessonId": "ts-unions",
    "concept": "Discriminated unions",
    "q": "Which field helps distinguish success and error result variants?",
    "options": [
      "A literal tag such as status: \"ok\" | \"error\"",
      "An unrelated comment",
      "A random object key",
      "A CSS class only"
    ],
    "answer": 0,
    "explanation": "A shared discriminant lets TypeScript narrow the rest of each variant."
  },
  {
    "id": "ts-bank-8",
    "courseId": "ts",
    "lessonId": "ts-generics",
    "concept": "Generic constraints",
    "q": "What does T extends {id:string} promise inside a generic function?",
    "options": [
      "A string id property is available",
      "Every property is a string",
      "The object is runtime validated",
      "The object cannot have extra fields"
    ],
    "answer": 0,
    "explanation": "The constraint specifies the minimum required structure, not the complete shape."
  },
  {
    "id": "ts-bank-9",
    "courseId": "ts",
    "lessonId": "ts-types",
    "concept": "Compile checks",
    "q": "What verifies the project\u2019s static types without producing output files?",
    "options": [
      "tsc --noEmit",
      "git push",
      "JSON.stringify",
      "CSS validation"
    ],
    "answer": 0,
    "explanation": "The compiler can check types without emitting JavaScript."
  },
  {
    "id": "ts-bank-10",
    "courseId": "ts",
    "lessonId": "ts-unions",
    "concept": "Exhaustive cases",
    "q": "A new result variant is added. What should an exhaustive handler force you to consider?",
    "options": [
      "The newly added case",
      "Only existing CSS",
      "An unrelated endpoint",
      "The previous build\u2019s screenshot"
    ],
    "answer": 0,
    "explanation": "Exhaustive handling makes missing union cases visible rather than silently ignoring them."
  },
  {
    "id": "react-bank-1",
    "courseId": "react",
    "lessonId": "react-components",
    "concept": "Components",
    "q": "What should a React component return?",
    "options": [
      "A description of its UI",
      "A direct mutation of every DOM node",
      "A database connection only",
      "An endless loop"
    ],
    "answer": 0,
    "explanation": "Components describe UI; React reconciles it with the DOM."
  },
  {
    "id": "react-bank-2",
    "courseId": "react",
    "lessonId": "react-props",
    "concept": "Props",
    "q": "How should a child ask its parent to change shared state?",
    "options": [
      "Call a callback passed through props",
      "Mutate the parent\u2019s props",
      "Edit the DOM and hope state follows",
      "Reassign an imported variable"
    ],
    "answer": 0,
    "explanation": "Callbacks preserve a clear owner of state and explicit update paths."
  },
  {
    "id": "react-bank-3",
    "courseId": "react",
    "lessonId": "react-state",
    "concept": "State updates",
    "q": "The next count depends on the previous count. Which is robust?",
    "options": [
      "setCount(c => c + 1)",
      "count++ only",
      "setCount = count + 1",
      "props.count++"
    ],
    "answer": 0,
    "explanation": "A functional update uses the pending state value."
  },
  {
    "id": "react-bank-4",
    "courseId": "react",
    "lessonId": "react-forms",
    "concept": "Controlled inputs",
    "q": "What pairs with value={title} for an editable controlled input?",
    "options": [
      "onChange updating title state",
      "Only a placeholder",
      "A CSS animation",
      "A direct mutation of props"
    ],
    "answer": 0,
    "explanation": "The state value and change handler form the controlled input loop."
  },
  {
    "id": "react-bank-5",
    "courseId": "react",
    "lessonId": "react-effects",
    "concept": "Effects",
    "q": "Which task belongs in an effect?",
    "options": [
      "Synchronizing with a browser subscription",
      "Calculating a filtered list from current props",
      "Formatting a name during render",
      "Choosing a button label"
    ],
    "answer": 0,
    "explanation": "Effects synchronize with external systems; derived values usually belong in render."
  },
  {
    "id": "react-bank-6",
    "courseId": "react",
    "lessonId": "react-components",
    "concept": "Keys",
    "q": "Which key best preserves task identity when sorting?",
    "options": [
      "The task\u2019s stable id",
      "Its current array index",
      "A new random number each render",
      "The current timestamp"
    ],
    "answer": 0,
    "explanation": "Stable data IDs maintain identity when list positions change."
  },
  {
    "id": "react-bank-7",
    "courseId": "react",
    "lessonId": "react-state",
    "concept": "Reducers",
    "q": "What should a reducer do?",
    "options": [
      "Return the next state for an action",
      "Perform arbitrary network requests during render",
      "Mutate every input object",
      "Read a DOM checkbox as the source of truth"
    ],
    "answer": 0,
    "explanation": "A pure reducer makes state transitions predictable and testable."
  },
  {
    "id": "react-bank-8",
    "courseId": "react",
    "lessonId": "react-props",
    "concept": "State ownership",
    "q": "Two siblings need the same task filter. Where should its state usually live?",
    "options": [
      "Their closest suitable common parent",
      "Independently in both with no synchronization",
      "In a CSS file",
      "In the task title"
    ],
    "answer": 0,
    "explanation": "Lift shared state to one owner and pass values and callbacks."
  },
  {
    "id": "react-bank-9",
    "courseId": "react",
    "lessonId": "react-effects",
    "concept": "Cleanup",
    "q": "An effect registers a subscription. What should its cleanup do?",
    "options": [
      "Remove that subscription",
      "Add a duplicate subscription",
      "Delete all state",
      "Reload the page"
    ],
    "answer": 0,
    "explanation": "Cleanup prevents duplicate handlers and leaks when the effect reruns or unmounts."
  },
  {
    "id": "react-bank-10",
    "courseId": "react",
    "lessonId": "react-forms",
    "concept": "Form submission",
    "q": "How should a React form add a task while retaining Enter submission?",
    "options": [
      "Handle the form\u2019s onSubmit and validate state",
      "Use only a div click handler",
      "Disable the keyboard",
      "Read a screenshot"
    ],
    "answer": 0,
    "explanation": "Native form semantics work with a submit handler and deliberate validation."
  },
  {
    "id": "node-bank-1",
    "courseId": "node",
    "lessonId": "http-basics",
    "concept": "HTTP methods",
    "q": "Which method commonly creates a task resource?",
    "options": [
      "POST",
      "GET with side effects",
      "HEAD",
      "OPTIONS only"
    ],
    "answer": 0,
    "explanation": "POST commonly creates resources; GET should remain safe to repeat."
  },
  {
    "id": "node-bank-2",
    "courseId": "node",
    "lessonId": "node-api",
    "concept": "Statuses",
    "q": "Which status conventionally indicates successful creation?",
    "options": [
      "201",
      "404",
      "500",
      "403"
    ],
    "answer": 0,
    "explanation": "201 Created communicates successful resource creation."
  },
  {
    "id": "node-bank-3",
    "courseId": "node",
    "lessonId": "node-validation",
    "concept": "Input validation",
    "q": "Where must a task title\u2019s length be enforced?",
    "options": [
      "On the server as well as any client checks",
      "Only in browser CSS",
      "Only in a placeholder",
      "Only in a screenshot"
    ],
    "answer": 0,
    "explanation": "Clients can be bypassed. Server validation enforces the API contract."
  },
  {
    "id": "node-bank-4",
    "courseId": "node",
    "lessonId": "node-auth",
    "concept": "Ownership",
    "q": "A user is logged in. What else is needed before editing task 42?",
    "options": [
      "Check that user is permitted to edit that task",
      "Trust the task ID alone",
      "Trust a hidden button",
      "Accept any supplied ownerId"
    ],
    "answer": 0,
    "explanation": "Authentication identifies a user; authorization decides access to a resource."
  },
  {
    "id": "node-bank-5",
    "courseId": "node",
    "lessonId": "http-basics",
    "concept": "Not found",
    "q": "A requested task does not exist. Which response is appropriate?",
    "options": [
      "404 with a consistent error body",
      "200 with a fake task",
      "201",
      "An infinite pending response"
    ],
    "answer": 0,
    "explanation": "A consistent not-found response makes client handling predictable."
  },
  {
    "id": "node-bank-6",
    "courseId": "node",
    "lessonId": "node-api",
    "concept": "JSON contract",
    "q": "What makes an API contract useful?",
    "options": [
      "Defined routes, inputs, outputs, statuses and errors",
      "Only a port number",
      "Only an app logo",
      "Undocumented response changes"
    ],
    "answer": 0,
    "explanation": "An explicit contract lets clients and tests agree on observable behavior."
  },
  {
    "id": "node-bank-7",
    "courseId": "node",
    "lessonId": "node-validation",
    "concept": "Body limits",
    "q": "Why limit request body size?",
    "options": [
      "To bound resource use and reject oversized input",
      "To hide authorization failures",
      "To replace all validation",
      "To encrypt passwords automatically"
    ],
    "answer": 0,
    "explanation": "Size limits are one layer of defensive input handling."
  },
  {
    "id": "node-bank-8",
    "courseId": "node",
    "lessonId": "node-auth",
    "concept": "Credentials",
    "q": "Where should private server credentials live?",
    "options": [
      "Server configuration outside public client bundles",
      "A frontend environment variable bundled for users",
      "A public GitHub issue",
      "A CSS comment"
    ],
    "answer": 0,
    "explanation": "Anything shipped to the browser is readable. Keep secrets on the server."
  },
  {
    "id": "node-bank-9",
    "courseId": "node",
    "lessonId": "node-api",
    "concept": "Error handling",
    "q": "An unexpected internal error occurs. What should the client receive?",
    "options": [
      "A safe consistent error response",
      "The full secret-bearing stack trace",
      "A successful response",
      "A database password"
    ],
    "answer": 0,
    "explanation": "Log useful internal diagnostics while returning a safe public error."
  },
  {
    "id": "node-bank-10",
    "courseId": "node",
    "lessonId": "node-auth",
    "concept": "Authorization tests",
    "q": "Which test detects an ownership flaw?",
    "options": [
      "User B tries to update user A\u2019s task",
      "Only user A reads their own task",
      "Only the homepage loads",
      "Only valid JSON is sent"
    ],
    "answer": 0,
    "explanation": "Cross-user access tests exercise authorization, not just authentication."
  },
  {
    "id": "db-bank-1",
    "courseId": "db",
    "lessonId": "db-models",
    "concept": "Primary keys",
    "q": "What is the purpose of a task primary key?",
    "options": [
      "Uniquely identify a row",
      "Store every user password",
      "Sort all records automatically",
      "Replace all constraints"
    ],
    "answer": 0,
    "explanation": "A primary key provides stable unique identity."
  },
  {
    "id": "db-bank-2",
    "courseId": "db",
    "lessonId": "sql-basics",
    "concept": "Parameters",
    "q": "How should user-supplied values enter a SQL query?",
    "options": [
      "Through query parameters",
      "Through string concatenation",
      "As raw SQL fragments",
      "Through CSS escaping"
    ],
    "answer": 0,
    "explanation": "Parameters separate data from SQL syntax."
  },
  {
    "id": "db-bank-3",
    "courseId": "db",
    "lessonId": "sql-joins",
    "concept": "Left joins",
    "q": "Which join retains users who have no tasks?",
    "options": [
      "LEFT JOIN from users to tasks",
      "INNER JOIN only",
      "CROSS JOIN with no predicate",
      "A task-only SELECT"
    ],
    "answer": 0,
    "explanation": "A left join retains unmatched rows from its left-hand table."
  },
  {
    "id": "db-bank-4",
    "courseId": "db",
    "lessonId": "db-transactions",
    "concept": "Atomic writes",
    "q": "Two related writes must both succeed or both fail. What fits?",
    "options": [
      "A transaction",
      "Two unrelated requests with no checks",
      "A CSS transition",
      "A console message"
    ],
    "answer": 0,
    "explanation": "A transaction can commit related writes together or roll them back."
  },
  {
    "id": "db-bank-5",
    "courseId": "db",
    "lessonId": "db-models",
    "concept": "Foreign keys",
    "q": "What does tasks.user_id referencing users.id protect?",
    "options": [
      "The task\u2019s owner relationship",
      "The color of a task card",
      "The app\u2019s URL",
      "Every business rule automatically"
    ],
    "answer": 0,
    "explanation": "A foreign key enforces referential integrity between rows."
  },
  {
    "id": "db-bank-6",
    "courseId": "db",
    "lessonId": "sql-basics",
    "concept": "Filtering",
    "q": "Which clause filters rows before aggregation?",
    "options": [
      "WHERE",
      "ORDER BY",
      "LIMIT only",
      "SELECT alias only"
    ],
    "answer": 0,
    "explanation": "WHERE filters input rows; HAVING filters aggregate groups."
  },
  {
    "id": "db-bank-7",
    "courseId": "db",
    "lessonId": "sql-joins",
    "concept": "Zero counts",
    "q": "After a left join, what counts tasks without counting the unmatched placeholder?",
    "options": [
      "COUNT(tasks.id)",
      "COUNT(*) always",
      "SUM(users.name)",
      "COUNT(1) always"
    ],
    "answer": 0,
    "explanation": "COUNT(non-null task id) gives zero when no task matched."
  },
  {
    "id": "db-bank-8",
    "courseId": "db",
    "lessonId": "db-transactions",
    "concept": "Migrations",
    "q": "Why version schema migrations?",
    "options": [
      "To reproduce and review schema changes",
      "To avoid every backup",
      "To hide failures",
      "To replace all data tests"
    ],
    "answer": 0,
    "explanation": "Versioned migrations make schema evolution explicit and reproducible."
  },
  {
    "id": "db-bank-9",
    "courseId": "db",
    "lessonId": "db-models",
    "concept": "Constraints",
    "q": "Where should a required relationship be enforced?",
    "options": [
      "With database constraints plus application checks",
      "Only in a README",
      "Only in CSS",
      "Only by a user promise"
    ],
    "answer": 0,
    "explanation": "Database constraints protect integrity across every writer."
  },
  {
    "id": "db-bank-10",
    "courseId": "db",
    "lessonId": "db-transactions",
    "concept": "Existing data",
    "q": "A new required column is added. What must a migration plan account for?",
    "options": [
      "Existing rows and a valid backfill or staged change",
      "Only an empty new database",
      "Only a new logo",
      "Only CSS selectors"
    ],
    "answer": 0,
    "explanation": "Schema changes must work on real existing records, not just fresh databases."
  },
  {
    "id": "test-bank-1",
    "courseId": "test",
    "lessonId": "testing-basics",
    "concept": "Observable behavior",
    "q": "Which is usually the strongest unit-test assertion?",
    "options": [
      "The returned result for a meaningful input",
      "The private variable\u2019s exact name",
      "The source file\u2019s line count",
      "The indentation style"
    ],
    "answer": 0,
    "explanation": "Behavior assertions allow harmless refactors while protecting the contract."
  },
  {
    "id": "test-bank-2",
    "courseId": "test",
    "lessonId": "test-boundaries",
    "concept": "Boundary cases",
    "q": "A limit allows at most 10 tasks. Which inputs are most revealing?",
    "options": [
      "9, 10 and 11 tasks",
      "Only 1 task",
      "Only 1000 tasks",
      "No task counts"
    ],
    "answer": 0,
    "explanation": "Test immediately below, at and above a boundary."
  },
  {
    "id": "test-bank-3",
    "courseId": "test",
    "lessonId": "test-integration",
    "concept": "Integration tests",
    "q": "What does an API-and-database integration test verify?",
    "options": [
      "The components cooperate with known test data",
      "Only one pure helper",
      "Only font rendering",
      "Only a screenshot of a README"
    ],
    "answer": 0,
    "explanation": "Integration coverage checks boundaries between collaborating components."
  },
  {
    "id": "test-bank-4",
    "courseId": "test",
    "lessonId": "test-debugging",
    "concept": "Regression tests",
    "q": "When fixing a reported bug, what should a focused regression first demonstrate?",
    "options": [
      "Failure on the broken behavior",
      "Success without exercising the bug",
      "Only an unrelated button",
      "The author\u2019s preferred variable names"
    ],
    "answer": 0,
    "explanation": "A regression should fail before the fix and pass after it."
  },
  {
    "id": "test-bank-5",
    "courseId": "test",
    "lessonId": "testing-basics",
    "concept": "Isolation",
    "q": "Why reset known test data between tests?",
    "options": [
      "To avoid order-dependent results",
      "To make tests permanently slow",
      "To erase production data",
      "To skip assertions"
    ],
    "answer": 0,
    "explanation": "Independent fixtures keep failures reproducible."
  },
  {
    "id": "test-bank-6",
    "courseId": "test",
    "lessonId": "test-boundaries",
    "concept": "Empty inputs",
    "q": "Why test an empty collection?",
    "options": [
      "It exercises a valid edge case often missed by ordinary examples",
      "It proves every input works",
      "It replaces all other tests",
      "It only checks styling"
    ],
    "answer": 0,
    "explanation": "Empty collections reveal assumptions such as always reading the first element."
  },
  {
    "id": "test-bank-7",
    "courseId": "test",
    "lessonId": "test-integration",
    "concept": "Browser tests",
    "q": "Which is a useful critical-flow browser test?",
    "options": [
      "Create a task, reload, and confirm it remains",
      "Only import a helper",
      "Only count source files",
      "Only check a CSS class exists"
    ],
    "answer": 0,
    "explanation": "A user flow verifies the connected behavior in the environment users use."
  },
  {
    "id": "test-bank-8",
    "courseId": "test",
    "lessonId": "test-debugging",
    "concept": "Failure diagnosis",
    "q": "A test fails intermittently. What should you investigate first?",
    "options": [
      "Shared state, timing assumptions and uncontrolled dependencies",
      "Disable it forever",
      "Change the expected result randomly",
      "Add arbitrary long sleeps everywhere"
    ],
    "answer": 0,
    "explanation": "Control inputs and synchronization instead of masking nondeterminism."
  },
  {
    "id": "test-bank-9",
    "courseId": "test",
    "lessonId": "testing-basics",
    "concept": "Test quality",
    "q": "A test passes even when the implementation returns the wrong result. What does that suggest?",
    "options": [
      "The assertion or exercised path is insufficient",
      "The implementation is proven correct",
      "Every other test is unnecessary",
      "The test must run slower"
    ],
    "answer": 0,
    "explanation": "Tests must be able to detect a meaningful failure."
  },
  {
    "id": "test-bank-10",
    "courseId": "test",
    "lessonId": "test-integration",
    "concept": "Test scope",
    "q": "Where is a pure price calculation usually cheapest to cover thoroughly?",
    "options": [
      "A unit test",
      "Only a full browser deployment",
      "A production database migration",
      "A manual screenshot"
    ],
    "answer": 0,
    "explanation": "Use focused unit cases for rules and broader tests for connected flows."
  },
  {
    "id": "ship-bank-1",
    "courseId": "ship",
    "lessonId": "ship-builds",
    "concept": "Production builds",
    "q": "What should you test before publishing a static app?",
    "options": [
      "The production build with its deployed base path",
      "Only the development server",
      "Only a source-file screenshot",
      "Only the repository name"
    ],
    "answer": 0,
    "explanation": "Production paths and bundling can differ from development."
  },
  {
    "id": "ship-bank-2",
    "courseId": "ship",
    "lessonId": "security-deploy",
    "concept": "Public bundles",
    "q": "Is a secret safe because its frontend variable name starts with PRIVATE?",
    "options": [
      "No; bundled client values are readable",
      "Yes, variable names encrypt values",
      "Yes, if the CSS is minified",
      "Yes, if the app uses TypeScript"
    ],
    "answer": 0,
    "explanation": "A name does not change what ships to the browser."
  },
  {
    "id": "ship-bank-3",
    "courseId": "ship",
    "lessonId": "ship-accessibility",
    "concept": "Keyboard access",
    "q": "Which check helps reveal an inaccessible modal?",
    "options": [
      "Open it, move through controls, close it and confirm sensible focus",
      "Only inspect its color",
      "Only take a screenshot",
      "Only count its elements"
    ],
    "answer": 0,
    "explanation": "Keyboard behavior and focus management require interaction."
  },
  {
    "id": "ship-bank-4",
    "courseId": "ship",
    "lessonId": "ship-maintenance",
    "concept": "Restore checks",
    "q": "What demonstrates a backup is useful?",
    "options": [
      "A verified restore into a safe test environment",
      "Only that a backup file exists",
      "A filename containing backup",
      "A promise to test later"
    ],
    "answer": 0,
    "explanation": "Recovery depends on a usable restore procedure, not file existence alone."
  },
  {
    "id": "ship-bank-5",
    "courseId": "ship",
    "lessonId": "ship-builds",
    "concept": "Deep links",
    "q": "A deployed nested route works by clicking but fails on refresh. What likely needs attention?",
    "options": [
      "Hosting fallback routing and asset base paths",
      "Only the text size",
      "Only the commit message",
      "The user\u2019s keyboard"
    ],
    "answer": 0,
    "explanation": "The server must serve the app for supported routes and assets must resolve correctly."
  },
  {
    "id": "ship-bank-6",
    "courseId": "ship",
    "lessonId": "security-deploy",
    "concept": "Access checks",
    "q": "Where must protected resource permissions be enforced?",
    "options": [
      "On the server for each relevant operation",
      "Only by hiding a button",
      "Only in a frontend route",
      "Only in the README"
    ],
    "answer": 0,
    "explanation": "Client UI restrictions are not an authorization boundary."
  },
  {
    "id": "ship-bank-7",
    "courseId": "ship",
    "lessonId": "ship-accessibility",
    "concept": "Zoom review",
    "q": "What is a useful zoom and small-screen check?",
    "options": [
      "Confirm content and controls remain usable without clipping",
      "Disable zoom",
      "Hide important text",
      "Fix the viewport to desktop width"
    ],
    "answer": 0,
    "explanation": "Users must still access content and operate controls when space is constrained."
  },
  {
    "id": "ship-bank-8",
    "courseId": "ship",
    "lessonId": "ship-maintenance",
    "concept": "Case studies",
    "q": "What makes a portfolio case study credible?",
    "options": [
      "Specific decisions, your contribution, evidence and limits",
      "Claims with no examples",
      "Only a technology logo list",
      "A copied testimonial"
    ],
    "answer": 0,
    "explanation": "Concrete evidence explains both capability and current limitations."
  },
  {
    "id": "ship-bank-9",
    "courseId": "ship",
    "lessonId": "ship-builds",
    "concept": "Release checks",
    "q": "What is a useful post-deploy smoke test?",
    "options": [
      "Exercise the app\u2019s main flow at its real public URL",
      "Only confirm a commit exists",
      "Only inspect local source",
      "Only open the domain root"
    ],
    "answer": 0,
    "explanation": "Publishing is not proof that deployed paths and behavior work."
  },
  {
    "id": "ship-bank-10",
    "courseId": "ship",
    "lessonId": "ship-maintenance",
    "concept": "Monitoring",
    "q": "What should an actionable maintenance note include?",
    "options": [
      "A reproducible problem, impact and a next step",
      "Only \u201cbroken\u201d",
      "Only an emoji",
      "A secret access token"
    ],
    "answer": 0,
    "explanation": "Concrete reports make follow-up work possible."
  }
,

  {
    "id": "js-values-return",
    "courseId": "js",
    "lessonId": "js-values",
    "concept": "Returning text",
    "q": "What does function f(name) { return \"Hi \" + name; } return for f(\"Ada\")?",
    "options": [
      "\"Hi Ada\"",
      "\"name\"",
      "undefined",
      "\"Hi name\""
    ],
    "answer": 0,
    "explanation": "The parameter receives \"Ada\" and the + operator joins the two strings."
  },
  {
    "id": "js-values-const",
    "courseId": "js",
    "lessonId": "js-values",
    "concept": "Bindings",
    "q": "Which declaration gives a fixed text value the name greeting?",
    "options": [
      "const greeting = \"Hello\";",
      "greeting(\"Hello\");",
      "return const \"Hello\";",
      "\"greeting\" = Hello;"
    ],
    "answer": 0,
    "explanation": "const declares a binding, and the quoted string is its initial value."
  }
,

  {
    "id": "js-extra-0",
    "courseId": "js",
    "lessonId": "js-values",
    "concept": "What does typeof true return",
    "q": "What does typeof true return?",
    "options": [
      "\"boolean\"",
      "\"string\"",
      "\"true\"",
      "\"number\""
    ],
    "answer": 0,
    "explanation": "true and false are boolean values, not strings."
  },
  {
    "id": "js-extra-1",
    "courseId": "js",
    "lessonId": "js-numbers",
    "concept": "What is \"10\" + 2 in JavaScript",
    "q": "What is \"10\" + 2 in JavaScript?",
    "options": [
      "\"102\"",
      "12",
      "8",
      "NaN"
    ],
    "answer": 0,
    "explanation": "When one operand is a string, + can concatenate rather than add numerically."
  },
  {
    "id": "js-extra-2",
    "courseId": "js",
    "lessonId": "js-numbers",
    "concept": "Why represent prices as integer cents during calculation",
    "q": "Why represent prices as integer cents during calculation?",
    "options": [
      "To avoid many decimal floating-point rounding surprises",
      "To make every invalid input valid",
      "To replace all validation",
      "To let strings multiply safely"
    ],
    "answer": 0,
    "explanation": "Integer cents keep common price calculations integral until final formatting."
  },
  {
    "id": "js-extra-3",
    "courseId": "js",
    "lessonId": "js-strings",
    "concept": "What is \"hello\".length",
    "q": "What is \"hello\".length?",
    "options": [
      "5",
      "4",
      "6",
      "undefined"
    ],
    "answer": 0,
    "explanation": "String length counts the characters in this basic example."
  },
  {
    "id": "js-extra-4",
    "courseId": "js",
    "lessonId": "js-strings",
    "concept": "Why normalize both a search term and compared text",
    "q": "Why normalize both a search term and compared text?",
    "options": [
      "So case and surrounding whitespace do not cause accidental misses",
      "So every string becomes a number",
      "So the input becomes trusted HTML",
      "So every query matches every record"
    ],
    "answer": 0,
    "explanation": "Normalize deliberately on both sides of a case-insensitive comparison."
  },
  {
    "id": "js-extra-5",
    "courseId": "js",
    "lessonId": "js-functions",
    "concept": "What does return do to the current function call",
    "q": "What does return do to the current function call?",
    "options": [
      "Provides a value and ends that call",
      "Restarts the function",
      "Only prints text",
      "Changes every caller variable"
    ],
    "answer": 0,
    "explanation": "Statements after an executed return in the same path do not run."
  },
  {
    "id": "js-extra-6",
    "courseId": "js",
    "lessonId": "js-functions",
    "concept": "What does function add(a,b){return a+b} return for add(2,3)",
    "q": "What does function add(a,b){return a+b} return for add(2,3)?",
    "options": [
      "5",
      "\"23\"",
      "undefined",
      "6"
    ],
    "answer": 0,
    "explanation": "Both arguments are numbers, so + adds them."
  },
  {
    "id": "js-extra-7",
    "courseId": "js",
    "lessonId": "js-conditions",
    "concept": "What is false || true",
    "q": "What is false || true?",
    "options": [
      "true",
      "false",
      "undefined",
      "\"false true\""
    ],
    "answer": 0,
    "explanation": "OR is true when either boolean operand is true."
  },
  {
    "id": "js-extra-8",
    "courseId": "js",
    "lessonId": "js-conditions",
    "concept": "What is !false",
    "q": "What is !false?",
    "options": [
      "true",
      "false",
      "0",
      "undefined"
    ],
    "answer": 0,
    "explanation": "The logical NOT operator negates a boolean."
  },
  {
    "id": "js-extra-9",
    "courseId": "js",
    "lessonId": "js-loops",
    "concept": "How many times does for(let i=0;i<3;i++) run its body",
    "q": "How many times does for(let i=0;i<3;i++) run its body?",
    "options": [
      "3",
      "2",
      "4",
      "Forever"
    ],
    "answer": 0,
    "explanation": "The body runs for i equal to 0, 1 and 2."
  },
  {
    "id": "js-extra-10",
    "courseId": "js",
    "lessonId": "js-loops",
    "concept": "A while loop never changes a value used by its condition. Wh",
    "q": "A while loop never changes a value used by its condition. What is the risk?",
    "options": [
      "It may never terminate",
      "It automatically returns zero",
      "It becomes an array",
      "It always runs once"
    ],
    "answer": 0,
    "explanation": "A loop must eventually make its condition false or exit deliberately."
  },
  {
    "id": "js-extra-11",
    "courseId": "js",
    "lessonId": "js-scope",
    "concept": "Can a const binding be reassigned to a different number",
    "q": "Can a const binding be reassigned to a different number?",
    "options": [
      "No; use let when reassignment is required",
      "Yes, without restriction",
      "Only if the number is larger",
      "Only after console.log"
    ],
    "answer": 0,
    "explanation": "const prevents reassignment of that binding."
  },
  {
    "id": "js-extra-12",
    "courseId": "js",
    "lessonId": "js-scope",
    "concept": "Why is a small local variable scope useful",
    "q": "Why is a small local variable scope useful?",
    "options": [
      "It limits which code can depend on or change that binding",
      "It makes every variable global",
      "It prevents every error",
      "It removes the need for return"
    ],
    "answer": 0,
    "explanation": "Keeping bindings close to their use reduces accidental dependencies."
  },
  {
    "id": "js-extra-13",
    "courseId": "js",
    "lessonId": "js-debugging",
    "concept": "A loop returns 1 when you expected a total of 6. What should",
    "q": "A loop returns 1 when you expected a total of 6. What should you inspect?",
    "options": [
      "Whether return is inside the loop too early",
      "The browser title first",
      "The font size",
      "The repository visibility"
    ],
    "answer": 0,
    "explanation": "Returning from the first iteration stops the calculation before later additions."
  },
  {
    "id": "js-extra-14",
    "courseId": "js",
    "lessonId": "js-debugging",
    "concept": "What is a useful minimal reproduction",
    "q": "What is a useful minimal reproduction?",
    "options": [
      "The smallest inputs and code that still show the failure",
      "The entire dependency folder",
      "A screenshot with no steps",
      "A different working app"
    ],
    "answer": 0,
    "explanation": "A small reproduction isolates the cause and supports a focused regression case."
  },
  {
    "id": "js-extra-15",
    "courseId": "js",
    "lessonId": "js-values",
    "concept": "Which value is a string",
    "q": "Which value is a string?",
    "options": [
      "\"false\"",
      "false",
      "42",
      "null"
    ],
    "answer": 0,
    "explanation": "Quotes make \"false\" text; the unquoted false is boolean."
  },
  {
    "id": "js-extra-16",
    "courseId": "js",
    "lessonId": "js-numbers",
    "concept": "What is 2 + 3 * 4",
    "q": "What is 2 + 3 * 4?",
    "options": [
      "14",
      "20",
      "24",
      "9"
    ],
    "answer": 0,
    "explanation": "Multiplication runs before addition unless parentheses change grouping."
  },
  {
    "id": "js-extra-17",
    "courseId": "js",
    "lessonId": "js-strings",
    "concept": "What does trim remove",
    "q": "What does trim remove?",
    "options": [
      "Whitespace at the start and end",
      "All internal spaces",
      "Every letter",
      "Only lowercase characters"
    ],
    "answer": 0,
    "explanation": "trim preserves internal content while removing surrounding whitespace."
  },
  {
    "id": "js-extra-18",
    "courseId": "js",
    "lessonId": "js-functions",
    "concept": "Why separate a pure calculation from its interface",
    "q": "Why separate a pure calculation from its interface?",
    "options": [
      "The same inputs and outputs can be tested without clicking the page",
      "To make it depend on hidden global state",
      "To avoid returning results",
      "To skip input contracts"
    ],
    "answer": 0,
    "explanation": "Pure helpers isolate rules from browser interactions."
  },
  {
    "id": "js-extra-19",
    "courseId": "js",
    "lessonId": "js-loops",
    "concept": "What is 7 % 2",
    "q": "What is 7 % 2?",
    "options": [
      "1",
      "3.5",
      "0",
      "2"
    ],
    "answer": 0,
    "explanation": "The remainder after dividing 7 by 2 is 1."
  },
  {
    "id": "data-extra-20",
    "courseId": "data",
    "lessonId": "arrays-basics",
    "concept": "Which appends one element to an existing array",
    "q": "Which appends one element to an existing array?",
    "options": [
      "items.push(value)",
      "items.filter(value)",
      "items.length(value)",
      "items.map = value"
    ],
    "answer": 0,
    "explanation": "push appends and mutates the array. Use copying when the contract forbids mutation."
  },
  {
    "id": "data-extra-21",
    "courseId": "data",
    "lessonId": "arrays-basics",
    "concept": "What is the last valid index of an array with length 3",
    "q": "What is the last valid index of an array with length 3?",
    "options": [
      "2",
      "3",
      "1",
      "0"
    ],
    "answer": 0,
    "explanation": "Zero-based indexes run from 0 through length minus one."
  },
  {
    "id": "data-extra-22",
    "courseId": "data",
    "lessonId": "object-basics",
    "concept": "How do you read a property whose name is stored in key",
    "q": "How do you read a property whose name is stored in key?",
    "options": [
      "record[key]",
      "record.key always",
      "key.record",
      "record(key)"
    ],
    "answer": 0,
    "explanation": "Bracket notation evaluates the variable to obtain the property name."
  },
  {
    "id": "data-extra-23",
    "courseId": "data",
    "lessonId": "object-basics",
    "concept": "Why choose objects for task records",
    "q": "Why choose objects for task records?",
    "options": [
      "Named fields describe related attributes",
      "Objects automatically sort themselves by price",
      "Objects eliminate validation",
      "Objects can only hold numbers"
    ],
    "answer": 0,
    "explanation": "Named fields such as title and done express a record\u2019s shape."
  },
  {
    "id": "data-extra-24",
    "courseId": "data",
    "lessonId": "array-methods",
    "concept": "What does [1,2,3].filter(n=>n>1) return",
    "q": "What does [1,2,3].filter(n=>n>1) return?",
    "options": [
      "[2,3]",
      "[false,true,true]",
      "[1]",
      "3"
    ],
    "answer": 0,
    "explanation": "filter keeps original elements whose predicate is true."
  },
  {
    "id": "data-extra-25",
    "courseId": "data",
    "lessonId": "array-methods",
    "concept": "Why supply 0 as the initial value for a sum reduction",
    "q": "Why supply 0 as the initial value for a sum reduction?",
    "options": [
      "So empty input returns a valid zero total",
      "So the callback never runs",
      "So every input becomes zero",
      "So the array is mutated"
    ],
    "answer": 0,
    "explanation": "An explicit identity value handles empty input and makes accumulation predictable."
  },
  {
    "id": "data-extra-26",
    "courseId": "data",
    "lessonId": "objects-counting",
    "concept": "What is (undefined ",
    "q": "What is (undefined ?? 0) + 1?",
    "options": [
      "1",
      "NaN",
      "undefined",
      "0"
    ],
    "answer": 0,
    "explanation": "Nullish coalescing supplies the numeric fallback before addition."
  },
  {
    "id": "data-extra-27",
    "courseId": "data",
    "lessonId": "objects-counting",
    "concept": "A count map sees category \"tops\" twice. What should its tops",
    "q": "A count map sees category \"tops\" twice. What should its tops count be?",
    "options": [
      "2",
      "1",
      "0",
      "\"tops tops\""
    ],
    "answer": 0,
    "explanation": "Increment once for every matching record, beginning at zero."
  },
  {
    "id": "data-extra-28",
    "courseId": "data",
    "lessonId": "data-shaping",
    "concept": "Which is a useful card view model",
    "q": "Which is a useful card view model?",
    "options": [
      "{id, title, displayPrice}",
      "A secret API token",
      "The entire database connection",
      "A random HTML string"
    ],
    "answer": 0,
    "explanation": "A view model includes the fields needed by the view and a stable identity."
  },
  {
    "id": "data-extra-29",
    "courseId": "data",
    "lessonId": "data-shaping",
    "concept": "Where should inconsistent remote field names be normalized",
    "q": "Where should inconsistent remote field names be normalized?",
    "options": [
      "In one explicit response transformation",
      "Separately in every card component",
      "Only in the README",
      "Only after a user reports a bug"
    ],
    "answer": 0,
    "explanation": "A boundary transformation prevents remote naming from spreading through the UI."
  },
  {
    "id": "data-extra-30",
    "courseId": "data",
    "lessonId": "data-immutable",
    "concept": "What is a shallow copy",
    "q": "What is a shallow copy?",
    "options": [
      "A new outer object or array that may share nested references",
      "A recursive copy of every nested object always",
      "The same outer reference",
      "A sorted string"
    ],
    "answer": 0,
    "explanation": "Spread copies the outer structure; nested objects can still be shared."
  },
  {
    "id": "data-extra-31",
    "courseId": "data",
    "lessonId": "data-immutable",
    "concept": "What does items.sort((a,b)=>a.price-b.price) change",
    "q": "What does items.sort((a,b)=>a.price-b.price) change?",
    "options": [
      "The order of items itself",
      "Only a separate new array",
      "Only the DOM",
      "Only the comparator"
    ],
    "answer": 0,
    "explanation": "sort mutates the array it is called on, so copy first if required."
  },
  {
    "id": "data-extra-32",
    "courseId": "data",
    "lessonId": "arrays-basics",
    "concept": "What should a search helper return when no records match",
    "q": "What should a search helper return when no records match?",
    "options": [
      "An empty array",
      "A fake matching record",
      "The entire source always",
      "A thrown error for ordinary no-match"
    ],
    "answer": 0,
    "explanation": "An empty result is a normal collection outcome."
  },
  {
    "id": "data-extra-33",
    "courseId": "data",
    "lessonId": "object-basics",
    "concept": "Which updates a task title without reassigning other fields ",
    "q": "Which updates a task title without reassigning other fields manually?",
    "options": [
      "{...task, title: newTitle}",
      "{task, newTitle}",
      "task = newTitle",
      "[task.title, newTitle]"
    ],
    "answer": 0,
    "explanation": "Spread the current fields and override the intended property in a new object."
  },
  {
    "id": "data-extra-34",
    "courseId": "data",
    "lessonId": "array-methods",
    "concept": "Which method returns the first matching element rather than ",
    "q": "Which method returns the first matching element rather than every match?",
    "options": [
      "find",
      "filter",
      "map",
      "reduce always"
    ],
    "answer": 0,
    "explanation": "find returns one element or undefined; filter returns an array."
  },
  {
    "id": "data-extra-35",
    "courseId": "data",
    "lessonId": "objects-counting",
    "concept": "Why check an object count\u2019s missing key before incrementing",
    "q": "Why check an object count\u2019s missing key before incrementing?",
    "options": [
      "undefined + 1 produces NaN",
      "Missing values are automatically one",
      "All keys exist by default",
      "Incrementing creates an array"
    ],
    "answer": 0,
    "explanation": "Use a numeric fallback rather than adding to undefined."
  },
  {
    "id": "data-extra-36",
    "courseId": "data",
    "lessonId": "data-shaping",
    "concept": "What should a UI transformation do with fields it does not n",
    "q": "What should a UI transformation do with fields it does not need?",
    "options": [
      "Omit them from the view model",
      "Render them all as raw HTML",
      "Turn them into secrets",
      "Rename them randomly"
    ],
    "answer": 0,
    "explanation": "A deliberate smaller contract reduces accidental coupling."
  },
  {
    "id": "data-extra-37",
    "courseId": "data",
    "lessonId": "data-immutable",
    "concept": "How can a task be updated in an array without mutating the s",
    "q": "How can a task be updated in an array without mutating the source?",
    "options": [
      "map to a new object for the matching id",
      "Assign directly to the matching original object",
      "Use sort on the source",
      "Delete random indexes"
    ],
    "answer": 0,
    "explanation": "map creates a new array, and a new matching object preserves the source record."
  },
  {
    "id": "data-extra-38",
    "courseId": "data",
    "lessonId": "array-methods",
    "concept": "What is [2,4].reduce((sum,n)=>sum+n,0)",
    "q": "What is [2,4].reduce((sum,n)=>sum+n,0)?",
    "options": [
      "6",
      "8",
      "0",
      "[2,4]"
    ],
    "answer": 0,
    "explanation": "The accumulator starts at zero and adds 2, then 4."
  },
  {
    "id": "data-extra-39",
    "courseId": "data",
    "lessonId": "data-immutable",
    "concept": "Why compare input snapshots in an immutable-function test",
    "q": "Why compare input snapshots in an immutable-function test?",
    "options": [
      "To detect unintended source changes",
      "To replace output assertions",
      "To verify CSS",
      "To hide a sorting error"
    ],
    "answer": 0,
    "explanation": "Both correct output and unchanged input matter when immutability is part of the contract."
  }
,

  {
    "id": "web-applied-0",
    "courseId": "web",
    "lessonId": "html-document",
    "concept": "What does the title element describe",
    "q": "What does the title element describe?",
    "options": [
      "The browser tab\u2019s title",
      "The main visible h1 automatically",
      "A CSS class",
      "An input label"
    ],
    "answer": 0,
    "explanation": "title belongs in head and names the document in browser UI."
  },
  {
    "id": "web-applied-1",
    "courseId": "web",
    "lessonId": "html-document",
    "concept": "Why include a viewport meta tag",
    "q": "Why include a viewport meta tag?",
    "options": [
      "To let mobile browsers use the device width for layout",
      "To disable all zoom",
      "To authenticate users",
      "To make headings bold"
    ],
    "answer": 0,
    "explanation": "A device-width viewport supports responsive CSS on mobile screens."
  },
  {
    "id": "web-applied-2",
    "courseId": "web",
    "lessonId": "html-text-links",
    "concept": "Which attribute gives an anchor its navigation destination",
    "q": "Which attribute gives an anchor its navigation destination?",
    "options": [
      "href",
      "src",
      "for",
      "alt"
    ],
    "answer": 0,
    "explanation": "Anchors use href; images use src."
  },
  {
    "id": "web-applied-3",
    "courseId": "web",
    "lessonId": "html-text-links",
    "concept": "Which element marks the most important page heading",
    "q": "Which element marks the most important page heading?",
    "options": [
      "h1",
      "title inside body",
      "strong alone",
      "label"
    ],
    "answer": 0,
    "explanation": "Headings describe document hierarchy; h1 is the top-level visible heading."
  },
  {
    "id": "web-applied-4",
    "courseId": "web",
    "lessonId": "html-images-lists",
    "concept": "Which element represents an unordered list",
    "q": "Which element represents an unordered list?",
    "options": [
      "ul",
      "ol only",
      "li without a list",
      "img"
    ],
    "answer": 0,
    "explanation": "ul groups list items when their order is not significant."
  },
  {
    "id": "web-applied-5",
    "courseId": "web",
    "lessonId": "html-images-lists",
    "concept": "What should an informative image\u2019s alt communicate",
    "q": "What should an informative image\u2019s alt communicate?",
    "options": [
      "Its relevant information in context",
      "Only its filename",
      "Every pixel\u2019s color",
      "Always nothing"
    ],
    "answer": 0,
    "explanation": "Alternative text conveys the information a reader needs from the image."
  },
  {
    "id": "web-applied-6",
    "courseId": "web",
    "lessonId": "html-semantics",
    "concept": "Which landmark contains the page\u2019s main unique content",
    "q": "Which landmark contains the page\u2019s main unique content?",
    "options": [
      "main",
      "nav",
      "footer",
      "head"
    ],
    "answer": 0,
    "explanation": "main identifies the primary page content."
  },
  {
    "id": "web-applied-7",
    "courseId": "web",
    "lessonId": "html-semantics",
    "concept": "Why prefer a native button over a clickable div",
    "q": "Why prefer a native button over a clickable div?",
    "options": [
      "It provides built-in action semantics and keyboard support",
      "It automatically saves all data",
      "It cannot be styled",
      "It always submits every form"
    ],
    "answer": 0,
    "explanation": "Native controls supply useful behavior that custom controls must otherwise recreate."
  },
  {
    "id": "web-applied-8",
    "courseId": "web",
    "lessonId": "html-forms",
    "concept": "Which input attribute makes a value mandatory for native val",
    "q": "Which input attribute makes a value mandatory for native validation?",
    "options": [
      "required",
      "optional",
      "checked on every input",
      "readonly"
    ],
    "answer": 0,
    "explanation": "required participates in native form constraint validation."
  },
  {
    "id": "web-applied-9",
    "courseId": "web",
    "lessonId": "html-forms",
    "concept": "Which button type explicitly submits its containing form",
    "q": "Which button type explicitly submits its containing form?",
    "options": [
      "type=\"submit\"",
      "type=\"text\"",
      "type=\"link\"",
      "type=\"input\""
    ],
    "answer": 0,
    "explanation": "An explicit submit button expresses the form action."
  },
  {
    "id": "web-applied-10",
    "courseId": "web",
    "lessonId": "css-foundations",
    "concept": "Which declaration changes an element\u2019s text color",
    "q": "Which declaration changes an element\u2019s text color?",
    "options": [
      "color: navy",
      "background-color: navy",
      "border-color: navy",
      "outline-color: navy"
    ],
    "answer": 0,
    "explanation": "color affects foreground text; the other declarations affect different parts."
  },
  {
    "id": "web-applied-11",
    "courseId": "web",
    "lessonId": "css-foundations",
    "concept": "What does box-sizing: border-box include in a declared width",
    "q": "What does box-sizing: border-box include in a declared width?",
    "options": [
      "Content, padding and border",
      "Only margin",
      "Only text characters",
      "The entire viewport"
    ],
    "answer": 0,
    "explanation": "Border-box makes width include padding and border, but not margin."
  },
  {
    "id": "web-applied-12",
    "courseId": "web",
    "lessonId": "css-layout",
    "concept": "Which declaration creates a flex container",
    "q": "Which declaration creates a flex container?",
    "options": [
      "display: flex",
      "position: flex",
      "layout: row",
      "float: flex"
    ],
    "answer": 0,
    "explanation": "The display property establishes the flex formatting context."
  },
  {
    "id": "web-applied-13",
    "courseId": "web",
    "lessonId": "css-layout",
    "concept": "Which Grid declaration creates two equal flexible columns",
    "q": "Which Grid declaration creates two equal flexible columns?",
    "options": [
      "grid-template-columns: repeat(2, 1fr)",
      "grid-template-rows: 2px",
      "flex-direction: column",
      "font-size: 2fr"
    ],
    "answer": 0,
    "explanation": "Two 1fr tracks share available column space equally."
  },
  {
    "id": "web-applied-14",
    "courseId": "web",
    "lessonId": "css-responsive",
    "concept": "What does @media (max-width: 600px) target",
    "q": "What does @media (max-width: 600px) target?",
    "options": [
      "Viewports no wider than 600px",
      "Only screens wider than 600px",
      "Only an element with width 600px",
      "Only print media"
    ],
    "answer": 0,
    "explanation": "The width media feature refers to the viewport in this screen example."
  },
  {
    "id": "web-applied-15",
    "courseId": "web",
    "lessonId": "css-responsive",
    "concept": "Why avoid a fixed wide width on the main container",
    "q": "Why avoid a fixed wide width on the main container?",
    "options": [
      "It can force sideways scrolling on small screens",
      "It always improves reading",
      "It creates native labels",
      "It automatically adds breakpoints"
    ],
    "answer": 0,
    "explanation": "Use flexible widths and a maximum width to fit different viewports."
  },
  {
    "id": "web-applied-16",
    "courseId": "web",
    "lessonId": "html-document",
    "concept": "Where should stylesheet metadata normally go",
    "q": "Where should stylesheet metadata normally go?",
    "options": [
      "Inside head",
      "Inside a heading\u2019s text",
      "Inside an input value",
      "Inside an image alt"
    ],
    "answer": 0,
    "explanation": "The head contains document metadata and resource references."
  },
  {
    "id": "web-applied-17",
    "courseId": "web",
    "lessonId": "html-forms",
    "concept": "Why is a placeholder insufficient as the only field label",
    "q": "Why is a placeholder insufficient as the only field label?",
    "options": [
      "It disappears while typing and is not a reliable label",
      "It always remains visible",
      "It replaces the input id",
      "It submits the form automatically"
    ],
    "answer": 0,
    "explanation": "Use an associated label; placeholders are optional hints."
  },
  {
    "id": "web-applied-18",
    "courseId": "web",
    "lessonId": "css-foundations",
    "concept": "What does margin control",
    "q": "What does margin control?",
    "options": [
      "Space outside the border",
      "Space between content and border",
      "The text\u2019s weight",
      "The input\u2019s accessible name"
    ],
    "answer": 0,
    "explanation": "Margin is external spacing; padding is internal spacing."
  },
  {
    "id": "web-applied-19",
    "courseId": "web",
    "lessonId": "css-responsive",
    "concept": "Which is a useful final responsive review",
    "q": "Which is a useful final responsive review?",
    "options": [
      "Try narrow and wide widths plus keyboard and zoom",
      "Only inspect one desktop screenshot",
      "Hide anything that overflows",
      "Disable user scaling"
    ],
    "answer": 0,
    "explanation": "Real interaction at varied sizes catches issues that one screenshot misses."
  },
  {
    "id": "async-applied-0",
    "courseId": "async",
    "lessonId": "async-promises",
    "concept": "What does an async function return even when it says return ",
    "q": "What does an async function return even when it says return 5?",
    "options": [
      "A promise that resolves to 5",
      "The raw number immediately",
      "An array",
      "A DOM node"
    ],
    "answer": 0,
    "explanation": "async wraps returned values in a promise."
  },
  {
    "id": "async-applied-1",
    "courseId": "async",
    "lessonId": "async-promises",
    "concept": "Independent promises already started can be awaited together",
    "q": "Independent promises already started can be awaited together using what?",
    "options": [
      "Promise.all",
      "A synchronous while loop",
      "JSON.parse",
      "localStorage"
    ],
    "answer": 0,
    "explanation": "Promise.all waits for all inputs and rejects if an input rejects."
  },
  {
    "id": "async-applied-2",
    "courseId": "async",
    "lessonId": "fetch-json",
    "concept": "Which property reports whether status is in the successful 2",
    "q": "Which property reports whether status is in the successful 200\u2013299 range?",
    "options": [
      "response.ok",
      "response.success()",
      "response.json.ok",
      "response.statusText()"
    ],
    "answer": 0,
    "explanation": "ok is a boolean derived from the HTTP status range."
  },
  {
    "id": "async-applied-3",
    "courseId": "async",
    "lessonId": "fetch-json",
    "concept": "Which failure usually causes fetch itself to reject",
    "q": "Which failure usually causes fetch itself to reject?",
    "options": [
      "A network failure",
      "Every 404 response",
      "An empty successful JSON array",
      "A successful 201"
    ],
    "answer": 0,
    "explanation": "Distinguish transport failure from HTTP status handling."
  },
  {
    "id": "async-applied-4",
    "courseId": "async",
    "lessonId": "async-loading-errors",
    "concept": "Why keep retry deliberate rather than looping forever",
    "q": "Why keep retry deliberate rather than looping forever?",
    "options": [
      "To avoid uncontrolled repeated work and give useful feedback",
      "To guarantee every server becomes available",
      "To bypass permissions",
      "To hide an error without work"
    ],
    "answer": 0,
    "explanation": "Retries need bounded or user-controlled behavior."
  },
  {
    "id": "async-applied-5",
    "courseId": "async",
    "lessonId": "async-loading-errors",
    "concept": "Which state should appear while a request is pending",
    "q": "Which state should appear while a request is pending?",
    "options": [
      "Loading feedback",
      "A fabricated success",
      "A permanent error from a previous query",
      "A blank page with no context"
    ],
    "answer": 0,
    "explanation": "Make pending work visible and avoid stale misleading feedback."
  },
  {
    "id": "async-applied-6",
    "courseId": "async",
    "lessonId": "async-races",
    "concept": "What does a monotonically increasing request ID let you chec",
    "q": "What does a monotonically increasing request ID let you check?",
    "options": [
      "Whether a response belongs to the current request",
      "Whether JSON is trusted automatically",
      "Whether the network is free",
      "Whether the user owns a record"
    ],
    "answer": 0,
    "explanation": "Compare captured request identity before applying asynchronous UI updates."
  },
  {
    "id": "async-applied-7",
    "courseId": "async",
    "lessonId": "async-races",
    "concept": "Why guard the finally block against stale requests too",
    "q": "Why guard the finally block against stale requests too?",
    "options": [
      "An old request could clear the new request\u2019s loading state",
      "finally never runs after errors",
      "It prevents all HTTP errors",
      "It changes the API schema"
    ],
    "answer": 0,
    "explanation": "Every state update from obsolete work can be stale, not just the data update."
  },
  {
    "id": "node-applied-0",
    "courseId": "node",
    "lessonId": "http-basics",
    "concept": "Which response format is described by Content-Type: applicat",
    "q": "Which response format is described by Content-Type: application/json?",
    "options": [
      "JSON text",
      "Executable React components",
      "A binary database connection",
      "CSS declarations"
    ],
    "answer": 0,
    "explanation": "Content-Type describes the response representation."
  },
  {
    "id": "node-applied-1",
    "courseId": "node",
    "lessonId": "http-basics",
    "concept": "Why should GET avoid changing a task\u2019s completion state",
    "q": "Why should GET avoid changing a task\u2019s completion state?",
    "options": [
      "GET should be safe to request without performing that write",
      "GET cannot carry any URL",
      "GET is always private",
      "GET automatically authenticates users"
    ],
    "answer": 0,
    "explanation": "Use an appropriate write method for state changes."
  },
  {
    "id": "node-applied-2",
    "courseId": "node",
    "lessonId": "node-api",
    "concept": "What should a successful delete with status 204 contain",
    "q": "What should a successful delete with status 204 contain?",
    "options": [
      "No response body",
      "A full error stack",
      "A fabricated task",
      "A password"
    ],
    "answer": 0,
    "explanation": "204 No Content indicates the response has no message body."
  },
  {
    "id": "node-applied-3",
    "courseId": "node",
    "lessonId": "node-api",
    "concept": "Why use consistent error shapes",
    "q": "Why use consistent error shapes?",
    "options": [
      "Clients can handle failures predictably",
      "It removes the need for statuses",
      "It hides all bugs automatically",
      "It replaces server logging"
    ],
    "answer": 0,
    "explanation": "An explicit error contract keeps error handling coherent."
  },
  {
    "id": "node-applied-4",
    "courseId": "node",
    "lessonId": "node-validation",
    "concept": "Which field should be accepted for a task toggle request",
    "q": "Which field should be accepted for a task toggle request?",
    "options": [
      "Only intended validated fields such as done",
      "Every property supplied by the client",
      "An arbitrary new ownerId",
      "A database role name"
    ],
    "answer": 0,
    "explanation": "Allow only the fields the operation is designed to modify."
  },
  {
    "id": "node-applied-5",
    "courseId": "node",
    "lessonId": "node-validation",
    "concept": "A title is 1000 spaces long. What should validation consider",
    "q": "A title is 1000 spaces long. What should validation consider?",
    "options": [
      "Normalized content and documented length limits",
      "Only that it is a string",
      "Only that JSON parsed",
      "Only the button label"
    ],
    "answer": 0,
    "explanation": "A string can still be empty after trimming or exceed allowed size."
  },
  {
    "id": "node-applied-6",
    "courseId": "node",
    "lessonId": "node-auth",
    "concept": "Why is an authenticated request not enough to permit every e",
    "q": "Why is an authenticated request not enough to permit every edit?",
    "options": [
      "Permission depends on the resource and operation too",
      "Every signed-in user owns every record",
      "JSON validation grants ownership",
      "CSS roles grant access"
    ],
    "answer": 0,
    "explanation": "Authorization must check who may act on this resource."
  },
  {
    "id": "node-applied-7",
    "courseId": "node",
    "lessonId": "node-auth",
    "concept": "What is appropriate when a verified user lacks permission",
    "q": "What is appropriate when a verified user lacks permission?",
    "options": [
      "A consistent forbidden response without changing the record",
      "Silently perform the write",
      "Return a fake successful edit",
      "Trust a different ownerId from the same request"
    ],
    "answer": 0,
    "explanation": "Deny unauthorized operations on the server and preserve data."
  },
  {
    "id": "test-applied-0",
    "courseId": "test",
    "lessonId": "testing-basics",
    "concept": "What should a test\u2019s expected value be based on",
    "q": "What should a test\u2019s expected value be based on?",
    "options": [
      "The intended behavior contract",
      "Whatever the current implementation happens to return",
      "A random sample each run",
      "The file\u2019s indentation"
    ],
    "answer": 0,
    "explanation": "An independent expectation can detect implementation mistakes."
  },
  {
    "id": "test-applied-1",
    "courseId": "test",
    "lessonId": "testing-basics",
    "concept": "Why include both ordinary and edge cases",
    "q": "Why include both ordinary and edge cases?",
    "options": [
      "They exercise different assumptions",
      "One ordinary case proves all inputs",
      "Edge cases replace normal behavior",
      "They make tests impossible to maintain"
    ],
    "answer": 0,
    "explanation": "A balanced set checks common use and meaningful boundaries."
  },
  {
    "id": "test-applied-2",
    "courseId": "test",
    "lessonId": "test-boundaries",
    "concept": "Shipping becomes free at 5000 cents inclusive. Which input r",
    "q": "Shipping becomes free at 5000 cents inclusive. Which input reveals a > bug?",
    "options": [
      "5000",
      "9000 only",
      "10000 only",
      "An unrelated product name"
    ],
    "answer": 0,
    "explanation": "Exactly 5000 distinguishes an inclusive from an exclusive comparison."
  },
  {
    "id": "test-applied-3",
    "courseId": "test",
    "lessonId": "test-boundaries",
    "concept": "A function promises not to mutate input. What should its tes",
    "q": "A function promises not to mutate input. What should its test check?",
    "options": [
      "Output and unchanged original input",
      "Only console output",
      "Only the function name",
      "Only array length after sorting"
    ],
    "answer": 0,
    "explanation": "Immutability is part of the contract and needs its own assertion."
  },
  {
    "id": "test-applied-4",
    "courseId": "test",
    "lessonId": "test-integration",
    "concept": "Why use a separate test database",
    "q": "Why use a separate test database?",
    "options": [
      "To isolate fixtures and avoid changing real user data",
      "To skip schema setup",
      "To avoid all constraints",
      "To make production tests destructive"
    ],
    "answer": 0,
    "explanation": "Known isolated data makes integration checks safe and repeatable."
  },
  {
    "id": "test-applied-5",
    "courseId": "test",
    "lessonId": "test-integration",
    "concept": "What is a better browser-test wait than an arbitrary five-se",
    "q": "What is a better browser-test wait than an arbitrary five-second sleep?",
    "options": [
      "Wait for the expected visible condition",
      "Always sleep for a minute",
      "Ignore timing entirely",
      "Skip assertions after requests"
    ],
    "answer": 0,
    "explanation": "Synchronize on observable completion instead of guessing duration."
  },
  {
    "id": "test-applied-6",
    "courseId": "test",
    "lessonId": "test-debugging",
    "concept": "Why keep a regression after fixing the defect",
    "q": "Why keep a regression after fixing the defect?",
    "options": [
      "To detect the same behavior breaking again",
      "To prove every possible future bug is impossible",
      "To replace code review",
      "To remove boundary tests"
    ],
    "answer": 0,
    "explanation": "A focused regression protects the formerly broken contract."
  },
  {
    "id": "test-applied-7",
    "courseId": "test",
    "lessonId": "test-debugging",
    "concept": "A test only passes when run after another test. What does th",
    "q": "A test only passes when run after another test. What does that suggest?",
    "options": [
      "An unwanted shared-state or setup dependency",
      "The test is independent",
      "The browser is always wrong",
      "The expected value should be random"
    ],
    "answer": 0,
    "explanation": "Each test should establish the data it needs."
  },
  {
    "id": "ship-applied-0",
    "courseId": "ship",
    "lessonId": "ship-builds",
    "concept": "What should a release document record for setup",
    "q": "What should a release document record for setup?",
    "options": [
      "Exact commands and required configuration names without secret values",
      "Private production passwords",
      "Only a screenshot",
      "Only the app\u2019s logo"
    ],
    "answer": 0,
    "explanation": "Reproducible setup helps reviewers and future maintenance."
  },
  {
    "id": "ship-applied-1",
    "courseId": "ship",
    "lessonId": "ship-builds",
    "concept": "Why check the real public URL after deployment",
    "q": "Why check the real public URL after deployment?",
    "options": [
      "Hosting configuration can differ from local preview",
      "A successful upload proves every user flow",
      "It replaces all tests",
      "It makes secrets private"
    ],
    "answer": 0,
    "explanation": "Verify the deployed environment\u2019s actual behavior."
  },
  {
    "id": "ship-applied-2",
    "courseId": "ship",
    "lessonId": "security-deploy",
    "concept": "What should happen before putting an API key in a frontend f",
    "q": "What should happen before putting an API key in a frontend file?",
    "options": [
      "Keep private keys on a server and expose only appropriate public configuration",
      "Rename it so users cannot find it",
      "Minify it to encrypt it",
      "Put it in a CSS comment"
    ],
    "answer": 0,
    "explanation": "Private credentials must not be bundled into public assets."
  },
  {
    "id": "ship-applied-3",
    "courseId": "ship",
    "lessonId": "security-deploy",
    "concept": "Why validate untrusted input on the server",
    "q": "Why validate untrusted input on the server?",
    "options": [
      "A client can bypass frontend checks",
      "Browsers always run your validator",
      "CSS validates HTTP bodies",
      "TypeScript guarantees all remote data"
    ],
    "answer": 0,
    "explanation": "Server-side enforcement must not depend on cooperative clients."
  },
  {
    "id": "ship-applied-4",
    "courseId": "ship",
    "lessonId": "ship-accessibility",
    "concept": "How should you test a form without a mouse",
    "q": "How should you test a form without a mouse?",
    "options": [
      "Reach fields, submit, read feedback and recover using the keyboard",
      "Only inspect its screenshot",
      "Only count input elements",
      "Remove focus indicators"
    ],
    "answer": 0,
    "explanation": "Accessible behavior includes operating the whole task and correcting errors."
  },
  {
    "id": "ship-applied-5",
    "courseId": "ship",
    "lessonId": "ship-accessibility",
    "concept": "Why preserve useful input after a failed save",
    "q": "Why preserve useful input after a failed save?",
    "options": [
      "So a user can correct or retry without repeating work",
      "So the error disappears without fixing it",
      "So every save becomes a success",
      "So labels are unnecessary"
    ],
    "answer": 0,
    "explanation": "Good recovery helps users complete the intended task."
  },
  {
    "id": "ship-applied-6",
    "courseId": "ship",
    "lessonId": "ship-maintenance",
    "concept": "What should be included with a known limitation",
    "q": "What should be included with a known limitation?",
    "options": [
      "Its user impact and a realistic next improvement",
      "A claim that no bugs exist",
      "A secret token",
      "Only an unrelated feature list"
    ],
    "answer": 0,
    "explanation": "Honest limitations are useful when their implications and next steps are concrete."
  },
  {
    "id": "ship-applied-7",
    "courseId": "ship",
    "lessonId": "ship-maintenance",
    "concept": "Which restore experiment provides evidence",
    "q": "Which restore experiment provides evidence?",
    "options": [
      "Restore a known backup into a safe environment and compare expected records",
      "Only rename the file",
      "Only check its extension",
      "Only compress it again"
    ],
    "answer": 0,
    "explanation": "A recovery check must exercise the actual restore path."
  }
,

  {
    "id": "dom-focused-0",
    "courseId": "dom",
    "lessonId": "dom-storage",
    "concept": "Saved data validation",
    "q": "What does JSON.parse do with malformed JSON text?",
    "options": [
      "Throws an error that should be handled",
      "Always returns an empty array",
      "Automatically repairs every error",
      "Returns trusted HTML"
    ],
    "answer": 0,
    "explanation": "Guard parsing and validate the shape before using a stored value."
  },
  {
    "id": "dom-focused-1",
    "courseId": "dom",
    "lessonId": "dom-storage",
    "concept": "Saved data validation",
    "q": "Why validate saved data after JSON.parse succeeds?",
    "options": [
      "Valid JSON can still have the wrong shape",
      "All parsed values are guaranteed arrays",
      "Parsing authenticates the user",
      "Parsing guarantees storage cannot fail"
    ],
    "answer": 0,
    "explanation": "A syntactically valid number or object may not satisfy your task-array contract."
  },
  {
    "id": "react-focused-2",
    "courseId": "react",
    "lessonId": "react-state",
    "concept": "Immutable state",
    "q": "Why create a new tasks array when updating React state?",
    "options": [
      "To represent the changed state without mutating the existing array",
      "To make every task ID random",
      "To bypass validation",
      "To force a page reload"
    ],
    "answer": 0,
    "explanation": "Immutable updates preserve previous state and make changes explicit to React."
  }
];
