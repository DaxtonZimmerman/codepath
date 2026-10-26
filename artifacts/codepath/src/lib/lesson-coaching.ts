export type LessonCoaching = { code: string; answer: string; steps: string[]; reason: string; mistake: string; fix: string; apply: string; verify: string };
// Original worked traces and project applications for every lesson.
export const LESSON_COACHING: Record<string, LessonCoaching> = {
  "html-document": {
    "code": "<!doctype html>\n<html lang=\"en\"><head><title>Fieldwork</title></head>\n<body><h1>My workspace</h1></body></html>",
    "answer": "The tab is named Fieldwork; the visible heading says My workspace.",
    "steps": [
      "The head stores document metadata.",
      "title names the browser tab.",
      "The body contains the visible h1."
    ],
    "reason": "A title is metadata rather than a substitute for a visible heading.",
    "mistake": "The tab is named correctly but the page has no heading.",
    "fix": "Add an h1 inside body instead of putting visible content in head.",
    "apply": "Give your app a clear browser title and one visible main heading.",
    "verify": "Read the tab title, then find the heading in the page."
  },
  "html-text-links": {
    "code": "<a href=\"/projects\">Explore my projects</a>",
    "answer": "Activating the link navigates to /projects.",
    "steps": [
      "The anchor describes navigation.",
      "href supplies its destination.",
      "Visible text explains what is at that destination."
    ],
    "reason": "A link\u2019s destination and its wording work together.",
    "mistake": "A link says only \u201cclick here.\u201d",
    "fix": "Describe its destination so the wording still makes sense out of context.",
    "apply": "Replace vague navigation in your app with descriptive links.",
    "verify": "Read each link without the surrounding paragraph."
  },
  "html-images-lists": {
    "code": "<ul><li>Plan</li><li>Build</li></ul>\n<img src=\"divider.png\" alt=\"\">",
    "answer": "A two-item unordered list is exposed; a decorative divider is skipped by screen readers.",
    "steps": [
      "ul groups unordered items.",
      "Each li is one item.",
      "Empty alt intentionally skips a decorative image."
    ],
    "reason": "Use meaningful list structure and an image alternative suited to the image\u2019s purpose.",
    "mistake": "A meaningful image has no useful alternative.",
    "fix": "Describe its relevant information; reserve empty alt for decoration.",
    "apply": "Group your app\u2019s features as a list and review each image alternative.",
    "verify": "Confirm that image information is still available without seeing the image."
  },
  "html-semantics": {
    "code": "<button type=\"button\">Save draft</button>\n<a href=\"/drafts\">View drafts</a>",
    "answer": "Save draft is an action; View drafts navigates.",
    "steps": [
      "A button represents an action.",
      "An anchor with href represents navigation.",
      "Native elements supply useful keyboard semantics."
    ],
    "reason": "Choosing an element by meaning supplies behavior you otherwise have to rebuild.",
    "mistake": "A clickable div cannot be reached normally with Tab.",
    "fix": "Use a native button for the action and check its focus styling.",
    "apply": "Use native controls for the main actions in your app.",
    "verify": "Reach and operate each action with only the keyboard."
  },
  "html-forms": {
    "code": "<label for=\"email\">Email</label>\n<input id=\"email\" type=\"email\" required>",
    "answer": "The label names the required email input; clicking it focuses the field.",
    "steps": [
      "for points to the input id.",
      "type=email enables email-format validation.",
      "required rejects an empty value during native submission."
    ],
    "reason": "A visible associated label and input constraints serve different purposes.",
    "mistake": "Clicking the label does not focus the input.",
    "fix": "Compare for and id character for character; keep IDs unique.",
    "apply": "Add associated labels and useful native constraints to your form.",
    "verify": "Click each label, then submit an empty and invalid value."
  },
  "css-foundations": {
    "code": ".card { width: 200px; padding: 16px; border: 2px solid; box-sizing: border-box; }",
    "answer": "The outer border-box width is 200px, excluding margins.",
    "steps": [
      "Border-box includes padding and border in width.",
      "Horizontal padding totals 32px.",
      "Borders total 4px, leaving 164px for content."
    ],
    "reason": "Naming the box being measured prevents width arithmetic surprises.",
    "mistake": "A declared width plus padding pushes cards outside their container.",
    "fix": "Inspect box-sizing and the computed box before changing widths randomly.",
    "apply": "Use predictable box sizing and consistent spacing for your cards.",
    "verify": "Inspect one card\u2019s computed width, padding and border."
  },
  "css-layout": {
    "code": ".cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }",
    "answer": "The grid has two equal flexible columns with a 16px gap.",
    "steps": [
      "display establishes Grid.",
      "repeat creates two tracks.",
      "The tracks share remaining width after the gap."
    ],
    "reason": "Grid coordinates rows and columns while a gap separates tracks.",
    "mistake": "Cards sit in one column even at a wide viewport.",
    "fix": "Inspect whether display:grid applies to their actual parent.",
    "apply": "Arrange your app\u2019s cards in a deliberate grid.",
    "verify": "Resize the container and inspect the parent\u2019s computed display."
  },
  "css-responsive": {
    "code": ".cards { display: grid; grid-template-columns: 1fr; }\n@media (min-width: 48rem) { .cards { grid-template-columns: repeat(2, 1fr); } }",
    "answer": "Below 48rem there is one column; at 48rem and above there are two.",
    "steps": [
      "The base rule is one column.",
      "The media query starts inclusively at 48rem.",
      "Its later declaration replaces the track definition."
    ],
    "reason": "A responsive rule changes at a defined condition rather than assuming a device model.",
    "mistake": "The phone view has sideways scrolling.",
    "fix": "Inspect fixed widths and minimum sizes; do not hide essential content with overflow.",
    "apply": "Give your app a narrow layout and a wider layout.",
    "verify": "Test both sides of the breakpoint plus keyboard use and zoom."
  },
  "js-values": {
    "code": "const name = \"Ada\";\nconst greeting = \"Hello, \" + name;\nconsole.log(greeting);",
    "answer": "Hello, Ada",
    "steps": [
      "name holds text.",
      "The + operator joins the strings.",
      "console.log displays the resulting greeting."
    ],
    "reason": "Quotes create text values, and a binding gives a value a reusable name.",
    "mistake": "A function prints a greeting but its caller receives undefined.",
    "fix": "Return the greeting from the function; logging and returning have different jobs.",
    "apply": "Create a small greeting helper for your app\u2019s welcome message.",
    "verify": "Call it with two different names and inspect its return value."
  },
  "js-numbers": {
    "code": "const priceCents = Number(\"250\");\nconst totalCents = priceCents * 3;\nconsole.log(totalCents);",
    "answer": "750",
    "steps": [
      "Number converts numeric text.",
      "Multiplication uses numeric operands.",
      "The result stays in integer cents."
    ],
    "reason": "Convert at the input boundary and format for display after calculation.",
    "mistake": "Adding an input value produces 2503 instead of 253.",
    "fix": "Check typeof and convert numeric text before addition.",
    "apply": "Keep your app\u2019s price or quantity calculations numeric.",
    "verify": "Try ordinary input, zero and invalid numeric text."
  },
  "js-strings": {
    "code": "const query = \"  BLUE  \".trim().toLowerCase();\nconsole.log(query);",
    "answer": "blue",
    "steps": [
      "trim removes surrounding whitespace.",
      "toLowerCase normalizes letter case.",
      "The original literal is not changed."
    ],
    "reason": "Normalization makes comparisons deliberate instead of depending on accidental formatting.",
    "mistake": "A search misses matching names with different capitalization.",
    "fix": "Normalize both the query and compared name before matching.",
    "apply": "Normalize one search or title field in your app.",
    "verify": "Try leading spaces, different case and an empty query."
  },
  "js-functions": {
    "code": "function double(n) { return n * 2; }\nconst result = double(4);\nconsole.log(result);",
    "answer": "8",
    "steps": [
      "The argument 4 binds to n.",
      "The expression multiplies it by 2.",
      "return supplies 8 to the caller."
    ],
    "reason": "Parameters describe inputs; return describes the value the caller can use.",
    "mistake": "A calculation is correct in the console but cannot be reused.",
    "fix": "Return its output and let the interface decide how to display it.",
    "apply": "Extract one app calculation into a pure helper.",
    "verify": "Call it with known inputs without clicking the interface."
  },
  "js-conditions": {
    "code": "const member = true;\nconst total = 49;\nconsole.log(member && total >= 50);",
    "answer": "false",
    "steps": [
      "The member flag is true.",
      "49 >= 50 is false.",
      "AND requires both conditions to be true."
    ],
    "reason": "Translate \u201cboth required\u201d to AND and \u201ceither allowed\u201d to OR.",
    "mistake": "A discount is applied below the qualifying total.",
    "fix": "Write the rule in words, then check its operator and inclusive boundary.",
    "apply": "Express an eligibility or discount rule as a clear boolean condition.",
    "verify": "Test below, exactly at and above the threshold."
  },
  "js-loops": {
    "code": "let total = 0;\nfor (let i = 1; i <= 3; i++) total += i;\nconsole.log(total);",
    "answer": "6",
    "steps": [
      "Start with total 0.",
      "Add 1, then 2, then 3.",
      "When i becomes 4, the condition is false."
    ],
    "reason": "Trace a small loop one iteration at a time before trying a larger input.",
    "mistake": "The final number is missing from a sum.",
    "fix": "Compare < and <= and write out the first and last iterations.",
    "apply": "Use a loop for one bounded repeated calculation in your app.",
    "verify": "Check zero, one and a small ordinary upper bound."
  },
  "js-scope": {
    "code": "const rate = 2;\nfunction price(quantity) { const total = quantity * rate; return total; }\nconsole.log(price(3));",
    "answer": "6; total is local to price.",
    "steps": [
      "price can read its parameter.",
      "It can also read rate from the outer scope.",
      "total stays within the function."
    ],
    "reason": "A binding\u2019s scope controls where its name can be used.",
    "mistake": "A caller tries to read a helper\u2019s local variable by name.",
    "fix": "Return the needed value instead of relying on another function\u2019s local binding.",
    "apply": "Keep temporary calculation values local to your app\u2019s helpers.",
    "verify": "Confirm the caller uses a return value rather than a hidden variable."
  },
  "js-debugging": {
    "code": "function clamp(score) {\n  if (score > 100) return 100;\n  return score;\n}\nconsole.log(clamp(-1));",
    "answer": "-1, exposing the missing lower-bound rule.",
    "steps": [
      "The upper-bound check is false.",
      "Execution reaches return score.",
      "The negative value is returned unchanged."
    ],
    "reason": "A logic bug can run without throwing; expected behavior still needs to be checked.",
    "mistake": "A boundary fix handles one example but breaks another.",
    "fix": "Keep a small table of expected results and rerun every boundary after the fix.",
    "apply": "Reproduce and fix one calculation bug in your app.",
    "verify": "Record a failing input, its expected result and the verified fix."
  },
  "arrays-basics": {
    "code": "const names = [\"Ada\", \"Lin\", \"Sam\"];\nconsole.log(names[1], names.length);",
    "answer": "Lin 3",
    "steps": [
      "Array indexes start at zero.",
      "Index 1 selects the second entry.",
      "length counts all three entries."
    ],
    "reason": "Distinguish an index from a count, especially when selecting the last element.",
    "mistake": "Reading items[items.length] gives undefined.",
    "fix": "The last valid index is length - 1; handle an empty array separately.",
    "apply": "Represent your app\u2019s repeated records as an array.",
    "verify": "Inspect its first, last and empty cases."
  },
  "object-basics": {
    "code": "const user = { name: \"Ada\", nickname: \"\" };\nconsole.log(user.nickname ?? user.name);",
    "answer": "An empty string, not Ada.",
    "steps": [
      "nickname exists and is an empty string.",
      "?? falls back only for null or undefined.",
      "The intentional empty value is preserved."
    ],
    "reason": "Choose a fallback operator based on which values should count as missing.",
    "mistake": "A fallback replaces valid zero or empty values.",
    "fix": "Check whether you mean missing values or every falsy value.",
    "apply": "Define an explicit record shape and useful missing-field rules.",
    "verify": "Try a missing optional field and an intentionally empty one."
  },
  "array-methods": {
    "code": "const result = [1, 2, 3, 4].filter(n => n > 2).map(n => n * 10);\nconsole.log(result);",
    "answer": "[30, 40]",
    "steps": [
      "filter keeps 3 and 4.",
      "map transforms each retained number.",
      "The source array is not changed by these methods."
    ],
    "reason": "Trace collection pipelines between stages, not just at the final output.",
    "mistake": "A filter returns true/false values instead of the selected records.",
    "fix": "Use filter to select records and map to change their shape.",
    "apply": "Build one filter-and-display pipeline for your app.",
    "verify": "Inspect the source, intermediate selection and displayed result."
  },
  "objects-counting": {
    "code": "const counts = {};\nfor (const category of [\"tops\", \"tops\", \"hats\"]) {\n  counts[category] = (counts[category] ?? 0) + 1;\n}\nconsole.log(counts);",
    "answer": "{tops: 2, hats: 1}",
    "steps": [
      "Each category becomes a key.",
      "A missing count starts at 0.",
      "Each occurrence increments its own count."
    ],
    "reason": "An accumulator needs a valid starting value for each new group.",
    "mistake": "A group count becomes NaN on its first record.",
    "fix": "Use a numeric fallback before incrementing a missing property.",
    "apply": "Add a count by status or category to your app.",
    "verify": "Check an empty list, one category and repeated categories."
  },
  "data-shaping": {
    "code": "const record = { id: 7, name: \"Tee\", priceCents: 1250, internalCode: \"X\" };\nconst card = { id: record.id, title: record.name, price: record.priceCents / 100 };\nconsole.log(card);",
    "answer": "{id: 7, title: \"Tee\", price: 12.5}",
    "steps": [
      "Select the view\u2019s needed fields.",
      "Rename name to title explicitly.",
      "Convert cents for the view and omit internalCode."
    ],
    "reason": "A small view model makes the UI\u2019s assumptions inspectable.",
    "mistake": "Every component handles remote field names differently.",
    "fix": "Transform remote records once at a clear boundary.",
    "apply": "Create a small display model for one app card.",
    "verify": "Confirm its fields are sufficient and unrelated data is omitted."
  },
  "data-immutable": {
    "code": "const source = [3, 1, 2];\nconst sorted = [...source].sort((a, b) => a - b);\nconsole.log(source, sorted);",
    "answer": "[3, 1, 2] and [1, 2, 3]",
    "steps": [
      "Spread copies the outer array.",
      "sort changes the copy.",
      "The original order remains available."
    ],
    "reason": "Copy before using a mutating method when the source must remain unchanged.",
    "mistake": "Sorting one view unexpectedly changes another view.",
    "fix": "Inspect shared array references and sort a copy.",
    "apply": "Add a sorted view that preserves your app\u2019s original records.",
    "verify": "Compare the source order before and after sorting."
  },
  "dom-basics": {
    "code": "const missing = document.querySelector(\"#missing\");\nconsole.log(missing);\n// Assume no element has id=\"missing\".",
    "answer": "null",
    "steps": [
      "querySelector looks for a matching element.",
      "No match exists in this document.",
      "The result must be checked before property access."
    ],
    "reason": "Selecting a node and successfully finding one are different steps.",
    "mistake": "Reading textContent throws after a selection.",
    "fix": "Inspect the selector, markup and whether the selected node is null.",
    "apply": "Select your app\u2019s output container with a stable identifier.",
    "verify": "Confirm it exists before attaching behavior."
  },
  "dom-rendering": {
    "code": "const title = \"<b>My task</b>\";\nconst item = document.createElement(\"li\");\nitem.textContent = title;",
    "answer": "The literal text <b>My task</b> is displayed, not bold markup.",
    "steps": [
      "createElement creates a node.",
      "textContent treats its value as text.",
      "The string is not interpreted as HTML."
    ],
    "reason": "Render untrusted titles as text and keep state as the source of truth.",
    "mistake": "User-supplied markup changes the page structure.",
    "fix": "Use textContent for text instead of concatenating it into innerHTML.",
    "apply": "Render one record from your app\u2019s state safely.",
    "verify": "Try a title containing angle brackets and inspect the result."
  },
  "dom-events": {
    "code": "button.addEventListener(\"click\", save);\n// Compare: button.addEventListener(\"click\", save());",
    "answer": "The first passes a handler; the second calls save immediately.",
    "steps": [
      "A function reference can be called later.",
      "Parentheses invoke it now.",
      "The listener should receive the handler, not its return value."
    ],
    "reason": "Registration describes what should happen on a later event.",
    "mistake": "An action runs during startup instead of on click.",
    "fix": "Check whether the listener argument includes an accidental function call.",
    "apply": "Wire one app action using an event listener.",
    "verify": "Confirm it runs once on the intended event, not while loading."
  },
  "dom-forms": {
    "code": "form.addEventListener(\"submit\", event => {\n  event.preventDefault();\n  const title = input.value.trim();\n  if (!title) return;\n  addTask(title);\n});",
    "answer": "The form does not navigate; whitespace-only input does not add a task.",
    "steps": [
      "Handle the form\u2019s submit event.",
      "Prevent its default navigation.",
      "Normalize and validate before updating state."
    ],
    "reason": "A form handler supports keyboard submission and protects the state boundary.",
    "mistake": "Click works but pressing Enter does not.",
    "fix": "Attach submission logic to the form rather than only to a button click.",
    "apply": "Add a labeled form that preserves invalid input for correction.",
    "verify": "Try Enter submission, whitespace and a valid title."
  },
  "dom-storage": {
    "code": "const raw = \"{broken\";\ntry { JSON.parse(raw); } catch { console.log(\"Use fallback\"); }",
    "answer": "Use fallback",
    "steps": [
      "The stored text is malformed JSON.",
      "JSON.parse throws.",
      "The catch branch supplies a recovery path."
    ],
    "reason": "Successful parsing also needs shape validation before using the result.",
    "mistake": "Reloading the app crashes when saved data is malformed.",
    "fix": "Guard parsing and validate each stored record before rendering it.",
    "apply": "Persist one app record list with a safe fallback.",
    "verify": "Reload valid data, malformed JSON and a wrong-shaped value."
  },
  "async-promises": {
    "code": "async function value() { return 5; }\nconst result = value();\n// What kind of value is result?",
    "answer": "A promise that resolves to 5.",
    "steps": [
      "Calling an async function returns a promise.",
      "return 5 becomes its fulfilled value.",
      "Await or a continuation reads that value."
    ],
    "reason": "Async results remain promises even when the returned expression is simple.",
    "mistake": "The UI prints [object Promise] instead of data.",
    "fix": "Await the asynchronous result inside an async function.",
    "apply": "Separate one asynchronous app operation from its rendering.",
    "verify": "Check fulfillment and rejection deliberately."
  },
  "fetch-json": {
    "code": "const response = await fetch(url);\nif (!response.ok) throw new Error(`HTTP ${response.status}`);\nconst data = await response.json();\n// Assume the server responds with HTTP 404.",
    "answer": "The explicit status check throws before JSON is used.",
    "steps": [
      "fetch can resolve for an HTTP error.",
      "response.ok is false for 404.",
      "The code throws before parsing success data."
    ],
    "reason": "Transport failure and an HTTP error status are separate failure paths.",
    "mistake": "A 404 is treated as a successful result.",
    "fix": "Check response.ok before consuming the response as success data.",
    "apply": "Give your app\u2019s API helper an explicit response boundary.",
    "verify": "Test a valid response, a 404 and a network failure."
  },
  "async-loading-errors": {
    "code": "let loading = true;\ntry { throw new Error(\"Offline\"); }\ncatch { console.log(\"Show error\"); }\nfinally { loading = false; }",
    "answer": "The error is handled and loading becomes false.",
    "steps": [
      "The thrown error enters catch.",
      "The interface can show failure.",
      "finally clears pending state after either outcome."
    ],
    "reason": "A visible loading state needs an explicit completion path on success and failure.",
    "mistake": "A spinner never stops after a failed request.",
    "fix": "Reset loading in a deliberate cleanup path and keep error separate from empty success.",
    "apply": "Add loading, empty, success and error states to your app.",
    "verify": "Use controlled fixtures to exercise all four states and retry."
  },
  "async-races": {
    "code": "let latest = 2;\nfunction apply(id, data) { if (id === latest) show(data); }\napply(1, \"old\");\napply(2, \"new\");",
    "answer": "Only new is shown.",
    "steps": [
      "The captured IDs identify separate requests.",
      "The older ID does not match latest.",
      "Only the current request may update the UI."
    ],
    "reason": "Every asynchronous state update must be scoped to the current work.",
    "mistake": "Old results replace a newer search.",
    "fix": "Guard success, error and loading updates with request identity or cancellation.",
    "apply": "Protect your app\u2019s search against overlapping requests.",
    "verify": "Finish an older request after a newer one and inspect the final UI."
  },
  "git-terminal": {
    "code": "# Starting inside /projects/fieldwork\npwd\n# package.json contains scripts: { \"dev\": \"vite\" }\nnpm run dev",
    "answer": "pwd reports the project directory; npm run dev invokes its documented dev script.",
    "steps": [
      "Confirm your working directory.",
      "Read the project\u2019s scripts.",
      "Run the command from the directory that owns package.json."
    ],
    "reason": "Commands act in a location; a correct command in the wrong folder can still fail.",
    "mistake": "The package script cannot be found.",
    "fix": "Confirm the directory and read package.json rather than guessing a command.",
    "apply": "Document and run your app from its own project directory.",
    "verify": "Follow the setup instructions from a second checkout."
  },
  "git-basics": {
    "code": "# README.md and app.js are modified\ngit add README.md\ngit diff --staged",
    "answer": "Only the staged README changes are shown.",
    "steps": [
      "The working tree holds edits.",
      "git add stages one file\u2019s current changes.",
      "The staged diff previews the next commit."
    ],
    "reason": "The next commit contains staged changes, not every visible edit automatically.",
    "mistake": "An unrelated change appears in a commit.",
    "fix": "Review git status and git diff --staged before committing.",
    "apply": "Commit one focused app improvement.",
    "verify": "Inspect the staged diff and the resulting commit."
  },
  "git-branches": {
    "code": "git switch -c feature/empty-state\n# Make and commit one focused change here.",
    "answer": "A new feature branch becomes the current branch.",
    "steps": [
      "The branch starts at the current commit.",
      "New commits advance that branch.",
      "A review can compare it with the default branch."
    ],
    "reason": "A branch isolates a line of work; it does not replace verification.",
    "mistake": "A merge leaves conflict markers in source.",
    "fix": "Resolve the intended final content, then run the relevant checks before committing.",
    "apply": "Improve your app through a focused branch.",
    "verify": "Review its diff and verify its behavior before merging."
  },
  "git-remotes": {
    "code": "git fetch origin\n# What happens to your working files automatically?",
    "answer": "Remote history is downloaded; fetch alone does not merge it into working files.",
    "steps": [
      "origin names a remote.",
      "fetch updates remote-tracking information.",
      "A separate integration step changes the local branch."
    ],
    "reason": "Distinguish downloading history from merging it into your current work.",
    "mistake": "A developer expects local edits to appear on GitHub after committing only.",
    "fix": "Inspect the remote and push the intended branch deliberately.",
    "apply": "Publish your app source with a reproducible README.",
    "verify": "Open the remote branch and follow the README\u2019s setup steps."
  },
  "ts-types": {
    "code": "let total: number = 12;\ntotal = \"12\";",
    "answer": "The TypeScript check reports a type mismatch.",
    "steps": [
      "The annotation expects number.",
      "The assigned value is a string.",
      "Static checking rejects the inconsistent assignment."
    ],
    "reason": "A type describes an allowed shape; it does not convert a value.",
    "mistake": "An annotation is used as if it parsed numeric text.",
    "fix": "Convert and validate external data in runtime code.",
    "apply": "Type the inputs and outputs of your app\u2019s pure helpers.",
    "verify": "Run the type check and separately exercise runtime values."
  },
  "ts-objects": {
    "code": "type Product = { name: string; note?: string };\nconst item: Product = { name: \"Tee\" };",
    "answer": "The object satisfies Product; reading item.note can yield undefined.",
    "steps": [
      "name is required.",
      "note is optional.",
      "Consumers must handle its absence."
    ],
    "reason": "Optional fields describe an explicit possibility, not a guaranteed empty string.",
    "mistake": "Code calls trim on an optional field without checking it.",
    "fix": "Narrow the field or provide an intentional fallback.",
    "apply": "Define a record contract with deliberate optional fields.",
    "verify": "Check records with and without each optional value."
  },
  "ts-unions": {
    "code": "type Result = { status: \"ok\"; value: number } | { status: \"error\"; message: string };\nfunction describe(r: Result) {\n  if (r.status === \"error\") return r.message;\n  return String(r.value);\n}",
    "answer": "The status check narrows each branch to the matching variant.",
    "steps": [
      "Both variants share a discriminant.",
      "The error branch exposes message.",
      "The other branch exposes value."
    ],
    "reason": "A discriminated union makes distinct states explicit and narrows their fields.",
    "mistake": "Code reads value in the error branch.",
    "fix": "Check the discriminant before using variant-specific fields.",
    "apply": "Represent an app operation\u2019s success and error as separate variants.",
    "verify": "Handle every variant and run the type check."
  },
  "ts-generics": {
    "code": "function first<T>(items: T[]): T | undefined { return items[0]; }\nconst item = first([\"Ada\"]);",
    "answer": "item has type string | undefined.",
    "steps": [
      "The input infers T as string.",
      "The return keeps that element type.",
      "Undefined remains possible for an empty array."
    ],
    "reason": "A generic preserves a useful relationship without pretending every collection is nonempty.",
    "mistake": "A generic helper erases its result to any.",
    "fix": "Keep the input/output relationship and model the empty case explicitly.",
    "apply": "Use a generic only where your app preserves a type relationship.",
    "verify": "Inspect inferred types for two different element types and empty input."
  },
  "react-components": {
    "code": "function Welcome() { return <h1>Fieldwork</h1>; }\n<Welcome />",
    "answer": "Welcome is a custom React component rendering a heading.",
    "steps": [
      "An uppercase name identifies the component.",
      "Its return describes UI.",
      "React renders that description."
    ],
    "reason": "Components describe a UI rather than directly modifying every DOM node.",
    "mistake": "A lowercase custom component is interpreted as a host element.",
    "fix": "Use an uppercase component name and explicit JSX composition.",
    "apply": "Split one app screen into components with clear responsibilities.",
    "verify": "Confirm the same UI renders through the component tree."
  },
  "react-props": {
    "code": "function Toggle({ onToggle }) {\n  return <button onClick={onToggle}>Toggle</button>;\n}",
    "answer": "The child requests a change by calling the supplied callback.",
    "steps": [
      "The parent supplies a behavior.",
      "The child receives it as a prop.",
      "The button calls it on activation."
    ],
    "reason": "Callbacks communicate intent while shared state keeps one clear owner.",
    "mistake": "Two sibling controls disagree about the selected value.",
    "fix": "Lift shared state to a common owner and pass the value plus callbacks.",
    "apply": "Connect a child control to your app\u2019s state owner.",
    "verify": "Confirm sibling views update consistently."
  },
  "react-state": {
    "code": "setCount(c => c + 1);\nsetCount(c => c + 1);\n// Assume the starting count is 0.",
    "answer": "The next count is 2.",
    "steps": [
      "The first updater receives 0.",
      "The second receives the pending value 1.",
      "Each returns a new state value."
    ],
    "reason": "A functional updater uses pending state when the next value depends on the previous one.",
    "mistake": "Repeated increments use a stale captured value.",
    "fix": "Use a functional update for a transition based on previous state.",
    "apply": "Implement one predictable app state transition.",
    "verify": "Exercise repeated actions and inspect the final state."
  },
  "react-forms": {
    "code": "<input value={title} onChange={e => setTitle(e.target.value)} />",
    "answer": "The rendered value follows title state, which typing updates through onChange.",
    "steps": [
      "State supplies the current value.",
      "The event reports new input.",
      "The update completes the controlled-input loop."
    ],
    "reason": "A controlled field needs both a value and a way to update it.",
    "mistake": "An input is read-only even though it looks editable.",
    "fix": "Pair value with a handler that updates the owning state.",
    "apply": "Build a controlled app form with useful validation feedback.",
    "verify": "Type, submit with Enter and recover after a failed save."
  },
  "react-effects": {
    "code": "useEffect(() => {\n  window.addEventListener(\"resize\", onResize);\n  return () => window.removeEventListener(\"resize\", onResize);\n}, [onResize]);",
    "answer": "The subscription is removed before replacement or after unmount.",
    "steps": [
      "The effect synchronizes with an external system.",
      "The cleanup mirrors registration.",
      "Dependencies determine when synchronization restarts."
    ],
    "reason": "Effects synchronize; derived display values usually belong directly in render.",
    "mistake": "Handlers multiply after rerendering or navigating.",
    "fix": "Match every subscription with cleanup and inspect dependencies.",
    "apply": "Review one external synchronization in your app.",
    "verify": "Mount, update and unmount while checking for duplicate handlers."
  },
  "http-basics": {
    "code": "POST /tasks\nContent-Type: application/json\n\n{\"title\":\"Build Fieldwork\"}",
    "answer": "A successful creation commonly returns 201 with the created resource.",
    "steps": [
      "The method communicates the operation.",
      "The body carries a representation.",
      "The status describes the outcome."
    ],
    "reason": "An API contract includes method, path, input, status and output together.",
    "mistake": "A write is hidden in a GET request.",
    "fix": "Choose an appropriate write method and document its contract.",
    "apply": "Write down the contract for one app API operation.",
    "verify": "Send a request and compare status and body to the contract."
  },
  "node-api": {
    "code": "GET /tasks/404\n# Assume task 404 does not exist.",
    "answer": "Return a consistent 404 response rather than a fake success.",
    "steps": [
      "Match the route.",
      "Look up the requested record.",
      "Represent absence using the documented error contract."
    ],
    "reason": "An endpoint\u2019s failure behavior is part of its public contract.",
    "mistake": "A client cannot distinguish missing data from an internal failure.",
    "fix": "Use deliberate statuses and consistent safe error shapes.",
    "apply": "Implement one resource route in your app API.",
    "verify": "Test success, missing data and an unexpected internal error."
  },
  "node-validation": {
    "code": "const title = typeof body.title === \"string\" ? body.title.trim() : \"\";\nif (!title || title.length > 120) reject();",
    "answer": "Missing, wrong-typed, blank and oversized titles are rejected.",
    "steps": [
      "Check the incoming type.",
      "Normalize the text.",
      "Apply content and size rules before writing."
    ],
    "reason": "Parsing JSON is not the same as validating the operation\u2019s input.",
    "mistake": "Valid-looking frontend input is accepted with unexpected fields.",
    "fix": "Validate and allow only the fields the server operation intends to change.",
    "apply": "Validate one app write at the server boundary.",
    "verify": "Try missing, wrong-typed, blank and oversized input."
  },
  "node-auth": {
    "code": "const task = await findTask(id);\nif (task.ownerId !== authenticatedUser.id) deny();",
    "answer": "A verified user cannot edit a task owned by someone else.",
    "steps": [
      "Obtain identity from verified authentication.",
      "Load the resource\u2019s ownership.",
      "Enforce permission for this operation."
    ],
    "reason": "Authentication identifies a user; authorization limits actions on resources.",
    "mistake": "A signed-in user can modify another user\u2019s record by changing an ID.",
    "fix": "Scope reads and writes to the verified user and test cross-user requests.",
    "apply": "Protect a private record in your app API.",
    "verify": "Use two test users and verify forbidden cross-user operations."
  },
  "db-models": {
    "code": "CREATE TABLE tasks (\n id BIGINT PRIMARY KEY,\n owner_id BIGINT NOT NULL REFERENCES users(id)\n);",
    "answer": "Each task needs a unique ID and an owner ID referencing an existing user.",
    "steps": [
      "The primary key gives identity.",
      "NOT NULL requires an owner reference.",
      "The foreign key enforces the relationship."
    ],
    "reason": "Constraints protect data regardless of which application path writes it.",
    "mistake": "A record references an owner that does not exist.",
    "fix": "Add a suitable foreign key and handle constraint errors deliberately.",
    "apply": "Model your app\u2019s records and owner relationships.",
    "verify": "Try duplicate IDs and a nonexistent owner in a disposable database."
  },
  "sql-basics": {
    "code": "SELECT title FROM tasks WHERE owner_id = $1 ORDER BY id;",
    "answer": "The query selects titles for the owner passed separately as a parameter.",
    "steps": [
      "WHERE filters rows.",
      "A parameter carries data separately from SQL syntax.",
      "ORDER BY makes the requested order explicit."
    ],
    "reason": "Bind values through the database driver instead of constructing SQL strings.",
    "mistake": "A search value changes the structure of the SQL query.",
    "fix": "Use parameters, not string concatenation, for input values.",
    "apply": "Write an owner-scoped query for your app.",
    "verify": "Test ordinary input and strings containing quotes through the driver."
  },
  "sql-joins": {
    "code": "SELECT users.id, COUNT(tasks.id)\nFROM users LEFT JOIN tasks ON tasks.owner_id = users.id\nGROUP BY users.id;",
    "answer": "Users with no tasks remain, with a task count of zero.",
    "steps": [
      "LEFT JOIN preserves every user.",
      "An unmatched task ID is null.",
      "COUNT(tasks.id) counts only non-null task IDs."
    ],
    "reason": "Choosing the join and counted column determines how empty relationships appear.",
    "mistake": "A user with zero records disappears from a summary.",
    "fix": "Start from users with a left join and count a nullable task-side key.",
    "apply": "Add an owner summary that includes empty accounts.",
    "verify": "Compare owners with zero, one and multiple records."
  },
  "db-transactions": {
    "code": "BEGIN;\nINSERT INTO projects (name) VALUES ('Fieldwork');\n-- A related write fails.\nROLLBACK;",
    "answer": "The transaction\u2019s inserted project is not committed.",
    "steps": [
      "Begin a transaction.",
      "Keep related writes in the same unit.",
      "Rollback discards its uncommitted changes."
    ],
    "reason": "Related writes should not leave partial state after a failure.",
    "mistake": "One write survives after a related operation fails.",
    "fix": "Use a transaction and verify its rollback behavior against known test data.",
    "apply": "Make a multi-record app operation recoverable.",
    "verify": "Force a failure safely and compare records before and after rollback."
  },
  "testing-basics": {
    "code": "expect(totalCents(250, 3)).toBe(750);",
    "answer": "The assertion fails if the helper returns a different result.",
    "steps": [
      "Choose a meaningful input.",
      "State the expected behavior independently.",
      "Compare the observed result to that expectation."
    ],
    "reason": "A test is useful when it can detect an incorrect behavior.",
    "mistake": "A test stays green after the function is deliberately broken.",
    "fix": "Inspect whether it calls the intended path and asserts its result.",
    "apply": "Test one important pure rule in your app.",
    "verify": "Temporarily break the rule and confirm the test fails."
  },
  "test-boundaries": {
    "code": "// Free shipping starts at 5000 cents, inclusive.\nshippingCost(4999);\nshippingCost(5000);\nshippingCost(5001);",
    "answer": "Only 4999 should have a nonzero shipping cost.",
    "steps": [
      "4999 is just below the threshold.",
      "5000 is exactly included.",
      "5001 is just above it."
    ],
    "reason": "Below, at and above a boundary distinguish similar-looking conditions.",
    "mistake": "A >= rule is accidentally implemented using >.",
    "fix": "Add the exact threshold as a test rather than relying only on distant examples.",
    "apply": "Add boundary cases for one app limit.",
    "verify": "Demonstrate that changing the comparison breaks a focused test."
  },
  "test-integration": {
    "code": "// Browser flow\n// Add a task, reload, then find the task again.",
    "answer": "The flow verifies creation and persistence together.",
    "steps": [
      "Create through the real interface.",
      "Reload the environment.",
      "Assert the record remains visible."
    ],
    "reason": "A connected flow checks cooperation between components that unit tests can miss.",
    "mistake": "Unit tests pass but saving does not survive refresh.",
    "fix": "Add a repeatable integration or browser flow with isolated known data.",
    "apply": "Test your app\u2019s main task from input through persistence.",
    "verify": "Run it twice with fresh fixtures and compare results."
  },
  "test-debugging": {
    "code": "// Before fixing a reported bug:\nexpect(normalizeTitle(\"   \")).toBe(\"\");",
    "answer": "A meaningful regression should fail on the broken implementation and pass after the fix.",
    "steps": [
      "Reproduce the reported behavior.",
      "Write an assertion that exposes it.",
      "Apply the focused fix and rerun the suite."
    ],
    "reason": "Prove the test detects the bug before relying on its later green result.",
    "mistake": "A regression passes both before and after the supposed fix.",
    "fix": "Check its setup and assertion against the original failing behavior.",
    "apply": "Protect one real bug fix in your app.",
    "verify": "Record the failure before the fix and success after it."
  },
  "ship-builds": {
    "code": "# Production is hosted under /codepath/\n# Built HTML requests /assets/app.js instead of /codepath/assets/app.js",
    "answer": "The root-relative asset path may miss the app\u2019s deployed base path.",
    "steps": [
      "Identify the hosting base path.",
      "Inspect the built asset URLs.",
      "Exercise the actual production output."
    ],
    "reason": "A development server can hide production routing and path problems.",
    "mistake": "The deployed page loads but its JavaScript or styles do not.",
    "fix": "Inspect asset responses and build the app with the correct public base path.",
    "apply": "Verify your app\u2019s production build and deep links.",
    "verify": "Open the public URL, refresh a nested route and check missing assets."
  },
  "security-deploy": {
    "code": "// Frontend source\nconst PRIVATE_API_KEY = \"example-secret\";\n// Does the variable name protect its value?",
    "answer": "No. Values shipped to the browser remain readable.",
    "steps": [
      "The value enters the client bundle.",
      "A variable name does not encrypt it.",
      "Private credentials belong behind a server boundary."
    ],
    "reason": "Protect a secret by controlling where it exists, not by naming it differently.",
    "mistake": "A private API key appears in built frontend assets.",
    "fix": "Move private credentials to server configuration and rotate any exposed real key.",
    "apply": "Review your app\u2019s client/server configuration boundary.",
    "verify": "Inspect production assets and test server-side access checks."
  },
  "ship-accessibility": {
    "code": "<label for=\"title\">Task title</label>\n<input id=\"title\">\n<button type=\"submit\">Add task</button>",
    "answer": "The input has an associated label; the full keyboard flow still needs hands-on review.",
    "steps": [
      "The label supplies a programmatic name.",
      "Native controls provide useful defaults.",
      "Focus, feedback and task completion need interaction checks."
    ],
    "reason": "Structural checks are useful evidence but do not prove the whole interaction is usable.",
    "mistake": "A modal looks correct but keyboard focus becomes lost.",
    "fix": "Walk the complete keyboard flow and inspect focus entry, order, exit and return.",
    "apply": "Review your app with keyboard, narrow width and zoom.",
    "verify": "Complete its main task and recover from a validation error."
  },
  "ship-maintenance": {
    "code": "// A backup file exists.\n// It has never been restored.\n// Is recovery verified?",
    "answer": "No. A safe restore and data comparison are still needed.",
    "steps": [
      "Preserve a known backup.",
      "Restore it in a safe environment.",
      "Compare expected records and behavior."
    ],
    "reason": "File existence is not evidence that the recovery path works.",
    "mistake": "A backup cannot restore the current data shape.",
    "fix": "Test recovery and document compatible formats and the actual procedure.",
    "apply": "Write a release case study and verify your app\u2019s recovery plan.",
    "verify": "Restore safely, record observed results and explain current limitations."
  }
};
