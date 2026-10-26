import type { Lesson } from "./curriculum";

// Original Codepath lesson content. IDs stay stable so existing progress survives.
export const BOOTCAMP_LESSONS: Lesson[] = [
  {
    "id": "html-document",
    "track": "web",
    "title": "Your first page and its structure",
    "minutes": 20,
    "summary": "Give the browser a clear structure and give people a clear starting point.",
    "body": [
      "A web page is a text document. HTML elements label its parts: an opening tag, content, and a closing tag. Nesting places one element inside another; closing tags unwind in reverse order.",
      "A complete document starts with <!doctype html>, an html element with lang=\"en\", a head for metadata, and a body for visible content. The viewport meta tag helps layouts fit phone screens.",
      "This exercise edits the visible body. Build one main region with a heading and a short introduction. You will add the document shell when you export a project."
    ],
    "example": "<main>\n  <h1>My reading journal</h1>\n  <p>A place to keep useful ideas.</p>\n</main>",
    "takeaways": [
      "HTML describes content",
      "Nest and close elements deliberately",
      "Use a main heading for the page"
    ],
    "pageExercise": {
      "language": "html",
      "prompt": "Inside main, add one h1 containing your name and a paragraph introducing what you want to build.",
      "starter": "<main>\n  <!-- Add your heading and introduction. -->\n</main>",
      "checks": [
        {
          "kind": "html",
          "label": "Use one main region",
          "selector": "main",
          "count": 1
        },
        {
          "kind": "html",
          "label": "Put a nonempty h1 inside main",
          "selector": "main h1",
          "count": 1,
          "text": true
        },
        {
          "kind": "html",
          "label": "Add an introduction paragraph",
          "selector": "main p",
          "text": true
        }
      ],
      "hints": [
        "Put the visible content between <main> and </main>.",
        "An h1 is the main heading; p is a paragraph.",
        "Give both elements meaningful text before their closing tags."
      ],
      "template": ""
    }
  },
  {
    "id": "html-text-links",
    "track": "web",
    "title": "Headings, paragraphs, and useful links",
    "minutes": 20,
    "summary": "Make content easy to scan and navigation easy to understand.",
    "body": [
      "Headings form an outline. Use h1 for the page, then h2 for its sections. A paragraph groups a thought; a br element is a line break, not a layout tool.",
      "An anchor navigates to an href. Descriptive text such as \u201cRead the project notes\u201d is more useful than \u201cclick here.\u201d Use a button when an action changes the current page.",
      "An address beginning with https:// is an absolute URL. A URL such as /projects is relative to a site. A fragment such as #contact points to an element whose id is contact."
    ],
    "example": "<section id=\"work\">\n  <h2>My work</h2>\n  <p>See <a href=\"https://example.com\">my project notes</a>.</p>\n</section>",
    "takeaways": [
      "Headings organize information",
      "Links navigate to destinations",
      "Choose descriptive link text"
    ],
    "pageExercise": {
      "language": "html",
      "prompt": "Build a section with id=\"work\", an h2, a paragraph, and a descriptive link to https://github.com.",
      "starter": "<section id=\"work\">\n\n</section>",
      "checks": [
        {
          "kind": "html",
          "label": "Use a work section",
          "selector": "section#work"
        },
        {
          "kind": "html",
          "label": "Give it a section heading",
          "selector": "section#work h2",
          "text": true
        },
        {
          "kind": "html",
          "label": "Include a paragraph",
          "selector": "section#work p",
          "text": true
        },
        {
          "kind": "html",
          "label": "Link to GitHub with meaningful text",
          "selector": "a[href=\"https://github.com\"]",
          "text": true
        }
      ],
      "hints": [
        "Add h2 and p inside the section.",
        "An anchor uses href for its destination.",
        "Use <a href=\"https://github.com\">My GitHub profile</a>."
      ],
      "template": ""
    }
  },
  {
    "id": "html-images-lists",
    "track": "web",
    "title": "Images and lists that explain themselves",
    "minutes": 20,
    "summary": "Describe meaningful images and group related items.",
    "body": [
      "An img element is a void element: it does not wrap content or need a closing tag. Its src chooses a file and alt provides a text alternative. Describe the image\u2019s purpose in context; decorative images use alt=\"\".",
      "Use ul for items whose order does not matter and ol for ordered steps. Each item belongs in an li. A list provides structure that a row of paragraphs does not.",
      "Write the alternative text even when a preview cannot load the image. Codepath blocks external images in lesson previews, so this exercise checks your markup rather than downloading a file."
    ],
    "example": "<img src=\"desk.jpg\" alt=\"Notebook beside a laptop on a desk\">\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>",
    "takeaways": [
      "alt communicates purpose",
      "ul and ol represent different kinds of lists",
      "Each list item uses li"
    ],
    "pageExercise": {
      "language": "html",
      "prompt": "Add an image with a nonempty alt description and a ul with at least three li items for skills you want to learn.",
      "starter": "<main>\n  <h1>My learning plan</h1>\n</main>",
      "checks": [
        {
          "kind": "html",
          "label": "Describe the image with alt text",
          "selector": "img",
          "attribute": "alt",
          "nonempty": true
        },
        {
          "kind": "html",
          "label": "Group skills in a list",
          "selector": "ul"
        },
        {
          "kind": "html",
          "label": "Add at least three skill items",
          "selector": "ul > li",
          "min": 3,
          "text": true
        }
      ],
      "hints": [
        "Put alt on the img element.",
        "Place li elements inside ul.",
        "External image loading is disabled here; a useful alt description still matters."
      ],
      "template": ""
    }
  },
  {
    "id": "html-forms",
    "track": "web",
    "title": "Forms, labels, and built-in validation",
    "minutes": 20,
    "summary": "Collect information with controls people can understand and use.",
    "body": [
      "A form groups inputs for a task. The name attribute identifies a field when a form is submitted; the id connects it to a visible label. A placeholder is a hint, not a replacement for a label.",
      "Choose an input type for the data. type=\"email\" enables browser email checks, and required prevents an empty field. You still validate on a real server because browser checks can be bypassed.",
      "Use a submit button and handle a form\u2019s submit event when building an interactive app. In this markup exercise, create the structure first. The preview blocks network submission."
    ],
    "example": "<form>\n  <label for=\"email\">Email address</label>\n  <input id=\"email\" name=\"email\" type=\"email\" required>\n  <button type=\"submit\">Join</button>\n</form>",
    "takeaways": [
      "Use a visible label",
      "Choose the right input type",
      "Browser validation improves usability"
    ],
    "pageExercise": {
      "language": "html",
      "prompt": "Create a signup form with a label for=\"email\", a required email input with id and name email, and a submit button.",
      "starter": "<form>\n  <!-- Add the label, input, and button. -->\n</form>",
      "checks": [
        {
          "kind": "html",
          "label": "Use a form",
          "selector": "form"
        },
        {
          "kind": "html",
          "label": "Label the email field",
          "selector": "form label[for=\"email\"]",
          "text": true
        },
        {
          "kind": "html",
          "label": "Require an email address",
          "selector": "form input#email[name=\"email\"][type=\"email\"][required]"
        },
        {
          "kind": "html",
          "label": "Provide a submit button",
          "selector": "form button[type=\"submit\"]",
          "text": true
        }
      ],
      "hints": [
        "The label for and input id must match.",
        "Add type=\"email\" and required to the input.",
        "Use a button with type=\"submit\" inside the form."
      ],
      "template": ""
    }
  },
  {
    "id": "css-foundations",
    "track": "web",
    "title": "Selectors, spacing, and the box model",
    "minutes": 20,
    "summary": "Style a card by understanding what a rule actually changes.",
    "body": [
      "A CSS rule has a selector and declarations. .card selects elements with class=\"card\". Each declaration gives a property a value, such as padding: 24px.",
      "The box model includes content, padding, border, and margin. Padding is inside the border; margin is outside. box-sizing: border-box includes padding and borders in the specified size.",
      "When rules compete, the cascade uses importance, specificity, and order. Start with simple class selectors instead of adding !important. The checks here inspect your selectors and declarations; also inspect the preview yourself."
    ],
    "example": ".card {\n  padding: 24px;\n  border-radius: 12px;\n  background-color: white;\n}",
    "takeaways": [
      "A class selector starts with a dot",
      "Padding sits inside the border",
      "Use border-box for predictable dimensions"
    ],
    "pageExercise": {
      "language": "css",
      "prompt": "Style .card with 24px padding and a 12px border-radius. Set box-sizing: border-box on * so sizing is predictable.",
      "starter": "/* Style the card below. */\n.card {\n\n}",
      "checks": [
        {
          "kind": "css",
          "label": "Use predictable box sizing",
          "selector": "*",
          "property": "box-sizing",
          "value": [
            "border-box"
          ]
        },
        {
          "kind": "css",
          "label": "Give the card internal spacing",
          "selector": ".card",
          "property": "padding",
          "value": [
            "24px"
          ]
        },
        {
          "kind": "css",
          "label": "Round the card corners",
          "selector": ".card",
          "property": "border-radius",
          "value": [
            "12px"
          ]
        }
      ],
      "hints": [
        "Use * for the universal selector.",
        "Set padding and border-radius inside .card.",
        "A declaration ends with a semicolon; rules wrap declarations in braces."
      ],
      "template": "<main><article class=\"card\"><h1>Learning card</h1><p>Small steps become useful skills.</p><button>Keep learning</button></article></main>"
    }
  },
  {
    "id": "css-responsive",
    "track": "web",
    "title": "Responsive layouts and small screens",
    "minutes": 20,
    "summary": "Make a layout adapt without squeezing content off the page.",
    "body": [
      "A responsive page changes with the available space. Start with a usable single column, then add columns when there is room. Avoid a fixed page width that is wider than a phone.",
      "A media query applies rules only when its condition matches. @media (min-width: 700px) can switch a card group from one column to two. The breakpoint belongs to your content, not to a specific phone model.",
      "Grid\u2019s minmax(0, 1fr) lets a column shrink below its content\u2019s preferred width. Check long text, zoom, keyboard focus, and a narrow viewport rather than trusting a single screenshot."
    ],
    "example": ".cards { display: grid; grid-template-columns: 1fr; gap: 16px; }\n@media (min-width: 700px) {\n  .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n}",
    "takeaways": [
      "Start with a small-screen layout",
      "Media queries adapt to space",
      "Test long content and zoom"
    ],
    "pageExercise": {
      "language": "css",
      "prompt": "Make .cards a grid with a 16px gap. Inside a min-width: 700px media query, use grid-template-columns: repeat(2, minmax(0, 1fr)).",
      "starter": ".cards {\n\n}\n\n@media (min-width: 700px) {\n  .cards {\n\n  }\n}",
      "checks": [
        {
          "kind": "css",
          "label": "Use grid for the cards",
          "selector": ".cards",
          "property": "display",
          "value": [
            "grid"
          ]
        },
        {
          "kind": "css",
          "label": "Space cards by 16px",
          "selector": ".cards",
          "property": "gap",
          "value": [
            "16px"
          ]
        },
        {
          "kind": "css",
          "label": "Add two flexible columns above 700px",
          "selector": ".cards",
          "property": "grid-template-columns",
          "value": [
            "repeat(2, minmax(0px, 1fr))",
            "repeat(2, minmax(0, 1fr))"
          ],
          "media": "min-width: 700px"
        }
      ],
      "hints": [
        "Put display and gap in the base .cards rule.",
        "Put the column rule inside the media query.",
        "Use the supplied repeat(2, minmax(0, 1fr)) value, then resize a real project to inspect it."
      ],
      "template": "<div class=\"cards\"><article>First project</article><article>Second project</article><article>Third project</article></div>"
    }
  },
  {
    "id": "js-values",
    "track": "js",
    "title": "Values, variables, and return",
    "minutes": 15,
    "summary": "Store useful information and return a simple text result.",
    "body": [
      "JavaScript works with values such as strings, numbers and booleans. Quotes make text a string. typeof reports a value\u2019s runtime type: typeof \"42\" is \"string\". const binds a name to a value when you will not reassign that name.",
      "A function receives values through named parameters. return sends a result to the caller. console.log displays a message; it does not provide a return value to the caller.",
      "Start with a string before learning collections. The + operator joins strings: \"Hello, \" + name. Call your function with an ordinary name and an empty string. Objects and arrays come in the next module."
    ],
    "example": "function greet(name) {\n  const greeting = \"Hello, \" + name;\n  return greeting;\n}\nconsole.log(greet(\"Daxton\"));",
    "takeaways": [
      "Quoted values are strings",
      "Parameters name inputs",
      "return produces the output"
    ],
    "challenge": {
      "functionName": "makeGreeting",
      "concept": "Values and return",
      "prompt": "Return \"Hello, \" followed by the name argument and \"!\". For an empty name return \"Hello, !\". Return the text instead of only logging it.",
      "starter": "function makeGreeting(name) {\n  // Return your greeting string.\n}",
      "tests": [
        {
          "args": [
            "Daxton"
          ],
          "expected": "Hello, Daxton!",
          "label": "Greet Daxton"
        },
        {
          "args": [
            "Ada"
          ],
          "expected": "Hello, Ada!",
          "label": "Use the supplied name"
        },
        {
          "args": [
            ""
          ],
          "expected": "Hello, !",
          "label": "An empty string still works"
        }
      ],
      "hints": [
        "Join the fixed text and the parameter.",
        "Use + or a template literal.",
        "Return the entire string including the final exclamation mark."
      ]
    }
  },
  {
    "id": "js-numbers",
    "track": "js",
    "title": "Numbers, operators, and prices",
    "minutes": 15,
    "summary": "Calculate a value without confusing numbers with strings.",
    "body": [
      "Arithmetic operators include +, -, *, /, and %. Multiplication happens before addition unless parentheses change the order. The + operator also joins strings, so \"10\" + 2 is \"102\".",
      "Browser form fields provide strings. Convert deliberately with Number, then check that the result is useful before calculating. Number.isFinite rejects NaN and Infinity.",
      "Money calculations can have floating-point rounding errors. This exercise uses integer cents so the total remains an integer; convert cents into a display label only at the UI boundary."
    ],
    "example": "const priceCents = 1299;\nconst totalCents = priceCents * 2; // 2598",
    "takeaways": [
      "Convert input deliberately",
      "Understand operator precedence",
      "Use integer cents for this calculation"
    ],
    "challenge": {
      "functionName": "lineTotal",
      "concept": "Numbers, operators, and prices",
      "prompt": "Return priceCents multiplied by quantity. Both inputs are nonnegative integers.",
      "starter": "function lineTotal(priceCents, quantity) {\n  // Write your solution here.\n}\n",
      "tests": [
        {
          "args": [
            1299,
            2
          ],
          "expected": 2598,
          "label": "two items"
        },
        {
          "args": [
            500,
            0
          ],
          "expected": 0,
          "label": "zero quantity"
        },
        {
          "args": [
            0,
            4
          ],
          "expected": 0,
          "label": "free item"
        }
      ],
      "hints": [
        "Use the multiplication operator *.",
        "Return the numeric result.",
        "Keep the calculation in cents; do not add a currency symbol."
      ]
    }
  },
  {
    "id": "js-strings",
    "track": "js",
    "title": "Strings and useful transformations",
    "minutes": 15,
    "summary": "Clean text before comparing it or showing it to people.",
    "body": [
      "A string is a sequence of characters. Quoted text and template literals both create strings. A template literal can include an expression with ${...}.",
      "Methods such as trim and toLowerCase return new strings; they do not change the original value. Chaining methods applies transformations from left to right.",
      "Search often works better after normalizing both the query and the searchable text. Keep the original text for display so you do not throw away meaningful capitalization."
    ],
    "example": "const query = \"  Shirt  \";\nconst normalized = query.trim().toLowerCase(); // \"shirt\"",
    "takeaways": [
      "Strings are immutable",
      "Normalize search input",
      "Keep display text separate"
    ],
    "challenge": {
      "functionName": "normalizeSearch",
      "concept": "Strings and useful transformations",
      "prompt": "Return the input text trimmed and converted to lowercase.",
      "starter": "function normalizeSearch(text) {\n  // Write your solution here.\n}\n",
      "tests": [
        {
          "args": [
            "  LiNeN "
          ],
          "expected": "linen",
          "label": "removes outside spaces"
        },
        {
          "args": [
            ""
          ],
          "expected": "",
          "label": "empty text"
        },
        {
          "args": [
            "  TWO WORDS  "
          ],
          "expected": "two words",
          "label": "keeps inside spaces"
        }
      ],
      "hints": [
        "Start with text.trim().",
        "Chain toLowerCase after trim.",
        "Return the new string; the original is unchanged."
      ]
    }
  },
  {
    "id": "js-conditions",
    "track": "js",
    "title": "Conditions and boolean logic",
    "minutes": 15,
    "summary": "Turn a product rule into a precise decision.",
    "body": [
      "A comparison such as age >= 18 produces a boolean. if and else select which code runs. Use === when you want equality without type conversion.",
      "&& requires both conditions and || requires at least one. Parentheses make combined rules easier to read. Empty strings, 0, null, and undefined are falsy, but the string \"false\" is truthy.",
      "Write the rule in plain language first and test the boundaries. A minimum age of 18 includes 18; changing >= to > is a real behavior change."
    ],
    "example": "function canPublish(isOwner, isReady) {\n  return isOwner && isReady;\n}",
    "takeaways": [
      "Conditions produce booleans",
      "Use strict equality",
      "Test the boundary value"
    ],
    "challenge": {
      "functionName": "canEnroll",
      "concept": "Conditions and boolean logic",
      "prompt": "Return true only when age is at least 18 AND hasConsent is true.",
      "starter": "function canEnroll(age, hasConsent) {\n  // Write your solution here.\n}\n",
      "tests": [
        {
          "args": [
            18,
            true
          ],
          "expected": true,
          "label": "includes age 18"
        },
        {
          "args": [
            17,
            true
          ],
          "expected": false,
          "label": "under age"
        },
        {
          "args": [
            30,
            false
          ],
          "expected": false,
          "label": "needs consent"
        }
      ],
      "hints": [
        "You need two conditions joined by &&.",
        "Use >= for the age boundary.",
        "Return a boolean, not the words \"true\" or \"false\"."
      ]
    }
  },
  {
    "id": "js-scope",
    "track": "js",
    "title": "Scope and small reusable functions",
    "minutes": 15,
    "summary": "Know which values a function can see and avoid hidden dependencies.",
    "body": [
      "Block scope limits let and const to the surrounding braces. A function can read its parameters and values in outer scopes, but an outer scope cannot read a variable created inside a function.",
      "A closure is a function together with access to its lexical environment. Closures are useful, but a helper is easier to test when its changing inputs are explicit parameters.",
      "Prefer a helper that receives a price and discount over one that quietly reads a global sale variable. Return the result and let the caller decide where to store or show it."
    ],
    "example": "function addFee(amount, fee) {\n  return amount + fee;\n}",
    "takeaways": [
      "Blocks limit visibility",
      "Pass changing inputs explicitly",
      "Keep helpers small"
    ],
    "challenge": {
      "functionName": "applyDiscount",
      "concept": "Scope and small reusable functions",
      "prompt": "Return price minus discount, but never return less than zero.",
      "starter": "function applyDiscount(price, discount) {\n  // Write your solution here.\n}\n",
      "tests": [
        {
          "args": [
            100,
            20
          ],
          "expected": 80,
          "label": "ordinary discount"
        },
        {
          "args": [
            10,
            20
          ],
          "expected": 0,
          "label": "does not go negative"
        },
        {
          "args": [
            10,
            0
          ],
          "expected": 10,
          "label": "no discount"
        }
      ],
      "hints": [
        "Calculate price - discount first.",
        "Use Math.max to enforce the lower bound.",
        "Pass 0 and the calculated value to Math.max."
      ]
    }
  },
  {
    "id": "js-debugging",
    "track": "js",
    "title": "Debugging and reading errors",
    "minutes": 15,
    "summary": "Follow a value through the program instead of guessing.",
    "body": [
      "A syntax error prevents code from being parsed. A runtime error happens while it executes. A logic error runs successfully but produces the wrong answer.",
      "Read the error message and the first relevant line of the stack. Reproduce the failure with the smallest input. Inspect values near the point where the actual result diverges from your expectation.",
      "Write down expected outputs before changing code. A score clamp should return 0 below zero, 100 above one hundred, and the original number in between. Test both boundaries and an ordinary value so a fix handles more than one example."
    ],
    "example": "// Bug: the upper boundary is handled but the lower one is not.\nfunction clampScore(score) {\n  if (score > 100) return 100;\n  return score;\n}\nconsole.log(clampScore(-1)); // Should be 0",
    "takeaways": [
      "Distinguish error categories",
      "Reproduce with a small input",
      "Test the fix against boundaries"
    ],
    "challenge": {
      "functionName": "clampScore",
      "concept": "Debugging boundary rules",
      "prompt": "Repair clampScore(score). Return 0 for numbers below 0, 100 for numbers above 100, and score otherwise. All inputs are finite numbers.",
      "starter": "function clampScore(score) {\n  if (score > 100) return 100;\n  // Fix the missing lower boundary.\n  return score;\n}",
      "tests": [
        {
          "args": [
            50
          ],
          "expected": 50,
          "label": "Ordinary score"
        },
        {
          "args": [
            -1
          ],
          "expected": 0,
          "label": "Below lower boundary"
        },
        {
          "args": [
            0
          ],
          "expected": 0,
          "label": "At lower boundary"
        },
        {
          "args": [
            100
          ],
          "expected": 100,
          "label": "At upper boundary"
        },
        {
          "args": [
            101
          ],
          "expected": 100,
          "label": "Above upper boundary"
        }
      ],
      "hints": [
        "Reproduce the negative-input failure first.",
        "Check score < 0 before returning an ordinary score.",
        "Keep both the low and high boundary rules."
      ]
    }
  },
  {
    "id": "arrays-basics",
    "track": "data",
    "title": "Arrays, indexes, and safe access",
    "minutes": 15,
    "summary": "Read and transform an ordered collection.",
    "body": [
      "Arrays store ordered values. Indexes start at zero and length is the number of items. The last valid index is length - 1; reading beyond it gives undefined.",
      "Use for...of when you need each value. Use an index when position is part of the task. Array.isArray helps at boundaries where the input may be unknown.",
      "Decide how an empty array should behave before writing the normal case. A deliberate fallback is easier to use than an accidental undefined."
    ],
    "example": "const names = [\"Amir\", \"Zoe\"];\nconst first = names[0];\nconst last = names[names.length - 1];",
    "takeaways": [
      "Array indexes begin at zero",
      "length is a count",
      "Define empty behavior"
    ],
    "challenge": {
      "functionName": "lastItem",
      "concept": "Arrays, indexes, and safe access",
      "prompt": "Return the last value in an array, or null when it is empty.",
      "starter": "function lastItem(items) {\n  // Write your solution here.\n}\n",
      "tests": [
        {
          "args": [
            [
              2,
              4,
              6
            ]
          ],
          "expected": 6,
          "label": "last item"
        },
        {
          "args": [
            []
          ],
          "expected": null,
          "label": "empty fallback"
        },
        {
          "args": [
            [
              "only"
            ]
          ],
          "expected": "only",
          "label": "single item"
        }
      ],
      "hints": [
        "Check length before reading the last index.",
        "The last index is length - 1.",
        "Return null explicitly for an empty input."
      ]
    }
  },
  {
    "id": "object-basics",
    "track": "data",
    "title": "Objects, properties, and destructuring",
    "minutes": 15,
    "summary": "Represent one thing with named fields.",
    "body": [
      "Objects group related properties. Dot notation reads a known field, while bracket notation lets the field name come from a variable. A missing property produces undefined.",
      "Destructuring gives selected fields local names. Defaults in destructuring apply to undefined values. The nullish coalescing operator ?? also lets you provide a fallback for null or undefined.",
      "Use a small output shape for a view instead of passing a huge API object everywhere. This also makes tests and later data changes easier to manage."
    ],
    "example": "const user = { name: \"Kai\", role: \"Developer\" };\nconst { name } = user;\nconst label = user.nickname ?? name;",
    "takeaways": [
      "Objects use named fields",
      "Use brackets for dynamic names",
      "Choose fallbacks deliberately"
    ],
    "challenge": {
      "functionName": "displayName",
      "concept": "Objects, properties, and destructuring",
      "prompt": "Return user.nickname when it is not null or undefined; otherwise return user.name.",
      "starter": "function displayName(user) {\n  // Write your solution here.\n}\n",
      "tests": [
        {
          "args": [
            {
              "name": "Kai",
              "nickname": "K"
            }
          ],
          "expected": "K",
          "label": "uses nickname"
        },
        {
          "args": [
            {
              "name": "Kai"
            }
          ],
          "expected": "Kai",
          "label": "missing nickname"
        },
        {
          "args": [
            {
              "name": "Kai",
              "nickname": null
            }
          ],
          "expected": "Kai",
          "label": "null nickname"
        },
        {
          "args": [
            {
              "name": "Kai",
              "nickname": ""
            }
          ],
          "expected": "",
          "label": "keeps intentional empty string"
        }
      ],
      "hints": [
        "Use ?? rather than ||.",
        "An empty string is a value the task keeps.",
        "Read both properties from user."
      ]
    }
  },
  {
    "id": "data-immutable",
    "track": "data",
    "title": "Updating data without mutation",
    "minutes": 15,
    "summary": "Create changed values while keeping the original available.",
    "body": [
      "Assigning an object to another variable does not clone it. Both variables still refer to the same object. Changing a property through one reference changes what the other sees.",
      "Spread syntax makes a shallow copy. Nested objects still share references unless you copy those levels too. For arrays, map and filter are useful ways to produce new collections.",
      "Returning new values makes state changes easier to track and undo. In this exercise, add a tag with a new array rather than calling push on the existing array."
    ],
    "example": "const task = { title: \"Learn\", done: false };\nconst next = { ...task, done: true };",
    "takeaways": [
      "Assignment does not clone an object",
      "Spread copies one level",
      "Prefer explicit immutable updates"
    ],
    "challenge": {
      "functionName": "addTag",
      "concept": "Updating data without mutation",
      "prompt": "Return a new array with tag added to the end of tags. Do not change the input array.",
      "starter": "function addTag(tags, tag) {\n  // Write your solution here.\n}\n",
      "tests": [
        {
          "args": [
            [
              "html"
            ],
            "css"
          ],
          "expected": [
            "html",
            "css"
          ],
          "label": "appends a tag",
          "preserveArgs": true
        },
        {
          "args": [
            [],
            "js"
          ],
          "expected": [
            "js"
          ],
          "label": "works from empty",
          "preserveArgs": true
        }
      ],
      "hints": [
        "Spread tags into a new array.",
        "Put tag after the spread.",
        "Avoid tags.push: it mutates and returns a number."
      ]
    }
  },
  {
    "id": "dom-rendering",
    "track": "dom",
    "title": "Rendering data without unsafe HTML",
    "minutes": 15,
    "summary": "Connect a data model to visible elements.",
    "body": [
      "The DOM is a tree of nodes. Create elements with document.createElement, assign textContent for user-visible text, and append them to the right parent. Keep your array of data as the source of truth.",
      "A render function reads the current state and updates the page. For a small list, replacing the children with a document fragment is straightforward. For large interfaces, preserve focus and update only what needs changing.",
      "Avoid placing untrusted strings into innerHTML. If a title is meant to be text, textContent prevents it from becoming markup. Test empty lists as well as populated ones."
    ],
    "example": "const card = document.createElement(\"article\");\ncard.textContent = product.name;\ncontainer.replaceChildren(card);",
    "takeaways": [
      "Keep data as the source of truth",
      "Use textContent for plain text",
      "Check the empty state"
    ],
    "quiz": [
      {
        "q": "Which property displays a user-supplied title as plain text?",
        "options": [
          "innerHTML",
          "textContent",
          "outerHTML",
          "document.write"
        ],
        "answer": 1,
        "explanation": "textContent treats the title as text instead of parsing it as HTML."
      },
      {
        "q": "What should a render function usually read?",
        "options": [
          "The current application state",
          "Only the initial HTML",
          "A random copy of old data",
          "Only the button\u2019s current background color"
        ],
        "answer": 0,
        "explanation": "Render the current state so UI updates reflect the latest data."
      }
    ]
  },
  {
    "id": "dom-forms",
    "track": "dom",
    "title": "Form submission and validation messages",
    "minutes": 15,
    "summary": "Handle a complete user action rather than one particular click.",
    "body": [
      "A form can be submitted by clicking its submit button or pressing Enter in a field. Listen for submit on the form so both paths work. preventDefault stops the browser\u2019s normal navigation when your JavaScript handles the action.",
      "Read the values, validate them, and return early when they are invalid. Show a specific message beside the relevant field and connect it with aria-describedby. Do not erase valid fields after an error.",
      "After a successful save, update your model, render it, and reset the form if that fits the workflow. Give people visible confirmation, and keep keyboard focus somewhere useful."
    ],
    "example": "form.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  const title = input.value.trim();\n  if (!title) { message.textContent = \"Enter a task title.\"; return; }\n  addTask(title);\n});",
    "takeaways": [
      "Handle submit on the form",
      "Validate before changing state",
      "Preserve useful input on failure"
    ],
    "quiz": [
      {
        "q": "Why listen for submit instead of only a button click?",
        "options": [
          "It also handles keyboard submission",
          "It disables validation",
          "It runs on every keystroke",
          "It runs only when the page first loads"
        ],
        "answer": 0,
        "explanation": "The form event represents the action regardless of how the user submits."
      },
      {
        "q": "What should happen when validation fails?",
        "options": [
          "Clear every field",
          "Save anyway",
          "Explain the problem and preserve useful input",
          "Replace the error with a success message"
        ],
        "answer": 2,
        "explanation": "Specific feedback helps people correct the input without repeating their work."
      }
    ]
  },
  {
    "id": "dom-storage",
    "track": "dom",
    "title": "Local saving and recoverable state",
    "minutes": 15,
    "summary": "Separate serializing data from displaying it.",
    "body": [
      "localStorage stores strings under keys. JSON.stringify converts suitable JavaScript values to a string; JSON.parse reads them back. Parsing invalid JSON throws an error.",
      "Reading storage can fail or return data from an older app version. Wrap storage access and parsing in try/catch, validate the shape, and offer a fallback rather than crashing the page.",
      "This exercise builds the pure parsing part. The runner does not expose the browser\u2019s storage. In your module project, call this helper with the string returned by localStorage.getItem."
    ],
    "example": "let tasks = [];\ntry {\n  const saved = JSON.parse(raw);\n  if (Array.isArray(saved)) tasks = saved;\n} catch { /* Keep the safe fallback. */ }",
    "takeaways": [
      "Storage uses strings",
      "Parsing and access can fail",
      "Validate the recovered shape"
    ],
    "challenge": {
      "functionName": "parseSavedList",
      "concept": "Local saving and recoverable state",
      "prompt": "Parse raw as JSON. Return the parsed value only if it is an array; return [] for invalid JSON, null, or a different shape.",
      "starter": "function parseSavedList(raw) {\n  // Write your solution here.\n}\n",
      "tests": [
        {
          "args": [
            "[1,2]"
          ],
          "expected": [
            1,
            2
          ],
          "label": "valid list"
        },
        {
          "args": [
            "broken"
          ],
          "expected": [],
          "label": "invalid JSON"
        },
        {
          "args": [
            "{}"
          ],
          "expected": [],
          "label": "wrong shape"
        },
        {
          "args": [
            null
          ],
          "expected": [],
          "label": "missing data"
        }
      ],
      "hints": [
        "Put JSON.parse inside try/catch.",
        "Check Array.isArray before returning the result.",
        "Both the catch path and a wrong shape return an empty array."
      ]
    }
  },
  {
    "id": "async-loading-errors",
    "track": "async",
    "title": "Loading, success, empty, and error states",
    "minutes": 15,
    "summary": "Design a request flow that tells people what is happening.",
    "body": [
      "A request has more than a success path. Distinguish idle, loading, successful data, an empty successful result, and an error. A blank page makes all of these states look the same.",
      "Set loading before starting work and clear it in finally. Show errors that help a person act, such as a retry button. Treat HTTP status failures separately from a network failure when useful.",
      "Retrying a write can create duplicate records unless the API is designed to handle repeated requests. Begin with retrying a read-only GET, and avoid hiding repeated failures in an endless automatic loop."
    ],
    "example": "setStatus(\"loading\");\ntry {\n  const response = await fetch(url);\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  setItems(await response.json());\n  setStatus(\"success\");\n} catch { setStatus(\"error\"); }",
    "takeaways": [
      "Model request states explicitly",
      "Keep an actionable error path",
      "Think about repeated writes"
    ],
    "quiz": [
      {
        "q": "A successful search returns zero items. What should the UI show?",
        "options": [
          "A useful empty-result message",
          "A network error",
          "An endless spinner",
          "Old unrelated results without explanation"
        ],
        "answer": 0,
        "explanation": "An empty successful result is different from a failure."
      },
      {
        "q": "Which request is the simplest starting point for a manual retry?",
        "options": [
          "A payment write",
          "A read-only GET",
          "Any write repeated forever",
          "A delete operation without duplicate protection"
        ],
        "answer": 1,
        "explanation": "Reading is a safer retry exercise; writes need duplicate-handling rules."
      }
    ]
  },
  {
    "id": "async-races",
    "track": "async",
    "title": "Stale responses and request cancellation",
    "minutes": 15,
    "summary": "Keep an older response from replacing newer results.",
    "body": [
      "If a person searches twice, the first request may finish last. Without a guard, its older results overwrite the response for the newer search. Completion order is not request order.",
      "AbortController can cancel a fetch that is no longer needed. Pass its signal to fetch and call abort when replacing the request. An abort is expected cleanup, not a message the user needs to see as an application failure.",
      "A request counter is another useful guard: apply results only when their request ID still matches the latest one. Use this when work cannot be cancelled or as an additional stale-result check."
    ],
    "example": "let latest = 0;\nasync function search(query) {\n  const requestId = ++latest;\n  const results = await loadResults(query);\n  if (requestId === latest) render(results);\n}",
    "takeaways": [
      "Response order can differ from request order",
      "Cancel unneeded work",
      "Guard against stale results"
    ],
    "quiz": [
      {
        "q": "The first search finishes after the second. Which results should be applied?",
        "options": [
          "The first, because it started earlier",
          "The response for the latest search",
          "Both merged without a rule",
          "Whichever response has the largest payload"
        ],
        "answer": 1,
        "explanation": "The interface should reflect the latest request the person made."
      },
      {
        "q": "What does AbortController provide to fetch?",
        "options": [
          "A signal for cancellation",
          "A database transaction",
          "A guaranteed faster response",
          "Automatic response caching forever"
        ],
        "answer": 0,
        "explanation": "Pass controller.signal in fetch options and call controller.abort when needed."
      }
    ]
  },
  {
    "id": "git-terminal",
    "track": "git",
    "title": "Files, folders, and the terminal",
    "minutes": 15,
    "summary": "Understand where a command runs before changing a project.",
    "body": [
      "The terminal runs commands in a current directory. pwd shows that location; ls lists its contents. cd changes directories. A relative path is interpreted from the current directory.",
      "Quote a path containing spaces, such as cd \"Web Dev/Codepath\". Read a command before running it, especially one that deletes files or changes many paths. Use your editor to inspect changes afterward.",
      "A package manager reads package.json scripts and installs dependencies. Run a project\u2019s documented commands from its root folder. Keeping the lockfile in Git helps teammates install the same dependency versions."
    ],
    "example": "pwd\nls\ncd \"Web Dev/Codepath\"\npnpm dev",
    "takeaways": [
      "Know your current directory",
      "Quote paths containing spaces",
      "Follow the project\u2019s setup instructions"
    ],
    "quiz": [
      {
        "q": "What does pwd show?",
        "options": [
          "The current directory",
          "Your Git password",
          "Every dependency",
          "The last commit message"
        ],
        "answer": 0,
        "explanation": "pwd helps you verify where a command will run."
      },
      {
        "q": "Why commit a lockfile?",
        "options": [
          "It stores your account password",
          "It records resolved dependency versions",
          "It replaces source code",
          "It runs the app without dependencies"
        ],
        "answer": 1,
        "explanation": "A lockfile makes dependency installation more reproducible."
      }
    ],
    "lab": {
      "task": "Run a local project from its folder",
      "steps": [
        "Find the project root and inspect package.json.",
        "Open a terminal in that folder and run the documented install and start commands.",
        "Stop the server using Ctrl+C when finished."
      ],
      "verify": "The browser opens your local app and the terminal shows which folder and port are in use."
    }
  },
  {
    "id": "git-branches",
    "track": "git",
    "title": "Branches, diffs, and safe changes",
    "minutes": 15,
    "summary": "Keep a focused change understandable before it reaches main.",
    "body": [
      "A branch is a movable name for a line of commits. Create a branch for one change, make the edit, and inspect the diff before committing. A cleanly scoped diff is easier to review and reverse.",
      "git status shows staged and unstaged changes. git diff shows unstaged changes, and git diff --staged shows what the next commit will contain. Stage only the files or parts that belong to the change.",
      "A merge conflict means Git needs help combining overlapping edits. Read both intentions, edit the combined result, remove conflict markers, and run the relevant checks. Choosing one side blindly can discard needed behavior."
    ],
    "example": "git switch -c improve-form\ngit diff\ngit add src/form.js\ngit diff --staged\ngit commit -m \"Explain invalid form input\"",
    "takeaways": [
      "Use a branch for a focused change",
      "Review staged changes",
      "Resolve conflicts by intent"
    ],
    "quiz": [
      {
        "q": "Which command shows what the next commit contains?",
        "options": [
          "git diff --staged",
          "git log only",
          "git switch main",
          "git status --short only"
        ],
        "answer": 0,
        "explanation": "Staged changes are the changes included in the next commit."
      },
      {
        "q": "What does a merge conflict require?",
        "options": [
          "Always delete one file",
          "Understand and combine the intended changes",
          "Commit the conflict markers",
          "Publish the unresolved markers as working code"
        ],
        "answer": 1,
        "explanation": "Resolve the actual behavior, then verify the result."
      }
    ],
    "lab": {
      "task": "Make a small improvement on a branch",
      "steps": [
        "Create a branch and improve one error message.",
        "Review the diff and commit the relevant file.",
        "Merge through a pull request after checking the result."
      ],
      "verify": "The commit has a clear purpose and contains no unrelated files."
    }
  },
  {
    "id": "git-remotes",
    "track": "git",
    "title": "GitHub remotes and pull requests",
    "minutes": 15,
    "summary": "Share a working project with an understandable change history.",
    "body": [
      "A local repository and a GitHub repository are separate copies. A remote is a named URL, often origin. fetch downloads remote history; pull also integrates changes into your current branch.",
      "push uploads your branch. A pull request proposes merging it and provides a place to discuss the change and see automated checks. Explain the problem, resulting behavior, and how you verified it.",
      "Avoid committing .env files, access tokens, dependency folders, or generated output unless the project specifically requires them. If a real secret reaches Git, remove it from use by rotating it; deleting one line in a later commit does not erase the earlier copy."
    ],
    "example": "git remote -v\ngit fetch origin\ngit push -u origin improve-form",
    "takeaways": [
      "A remote points to another repository",
      "Explain changes for reviewers",
      "Keep secrets out of Git"
    ],
    "quiz": [
      {
        "q": "Which command downloads history without automatically merging it?",
        "options": [
          "git fetch",
          "git commit",
          "git add",
          "git merge"
        ],
        "answer": 0,
        "explanation": "fetch updates your remote references; integration is a separate choice."
      },
      {
        "q": "What belongs in a useful pull request description?",
        "options": [
          "Only \u201cdone\u201d",
          "The problem, changed behavior, and verification",
          "An access token",
          "A secret stored in a screenshot"
        ],
        "answer": 1,
        "explanation": "A reviewer needs enough context to judge the change."
      }
    ],
    "lab": {
      "task": "Publish a project repository",
      "steps": [
        "Add a README with setup steps and the project\u2019s purpose.",
        "Push a focused branch and open a pull request.",
        "Check the diff and any automated checks before merging."
      ],
      "verify": "Someone else can find the source, understand what it does, and follow the setup steps."
    }
  },
  {
    "id": "ts-unions",
    "track": "ts",
    "title": "Unions and narrowing",
    "minutes": 15,
    "summary": "Handle different shapes without pretending every value is the same.",
    "body": [
      "A union such as string | null allows more than one kind of value. TypeScript asks you to narrow the union before using operations that are not valid for every member.",
      "Use typeof for primitive values, an equality check for null, or a discriminating property for object unions. A shared status field is a useful way to represent loading, success, and failure.",
      "Avoid silencing a useful error with any or an unchecked type assertion. Describe the real possibilities and handle each one explicitly. Types disappear at runtime, so external data still needs validation."
    ],
    "example": "type Result =\n  | { status: \"ok\"; value: number }\n  | { status: \"error\"; message: string };\nfunction describe(result: Result) {\n  return result.status === \"ok\" ? String(result.value) : result.message;\n}",
    "takeaways": [
      "Model actual possibilities",
      "Narrow before accessing a specific field",
      "Types do not validate network data"
    ],
    "quiz": [
      {
        "q": "What narrows this Result union?",
        "options": [
          "Checking result.status",
          "Adding any",
          "Changing indentation",
          "Renaming Result to Data"
        ],
        "answer": 0,
        "explanation": "The discriminant identifies which properties are available."
      },
      {
        "q": "Does a type annotation validate an API response at runtime?",
        "options": [
          "Yes, always",
          "Only in production",
          "No",
          "Only when strict mode is enabled"
        ],
        "answer": 2,
        "explanation": "TypeScript types are erased; validate untrusted runtime values separately."
      }
    ],
    "lab": {
      "task": "Model your app\u2019s request state",
      "steps": [
        "Define a discriminated union for loading, success, and error.",
        "Write a function that returns a label for each state.",
        "Run your TypeScript check and remove any unnecessary assertions."
      ],
      "verify": "Invalid property access produces a compiler error, and every state has a display path."
    }
  },
  {
    "id": "ts-objects",
    "track": "ts",
    "title": "Object types, optional fields, and contracts",
    "minutes": 15,
    "summary": "Write down the shape a component or helper expects.",
    "body": [
      "An object type describes property names and their value types. An optional property uses ?, meaning it may be undefined. A readonly property signals that code should not reassign it through that type.",
      "A function\u2019s parameter and return types form a contract. Keep the contract close to what the function needs rather than requiring a huge object with unrelated fields.",
      "When an API changes, a narrow view model can protect the rest of your UI. Validate the response at the boundary and transform it into the stable shape your components consume."
    ],
    "example": "type Product = { id: number; name: string; priceCents: number; note?: string };\nfunction label(product: Product): string {\n  return `${product.name}: ${product.priceCents} cents`;\n}",
    "takeaways": [
      "Describe required and optional fields",
      "Use focused contracts",
      "Validate data at boundaries"
    ],
    "quiz": [
      {
        "q": "What can the type of note be when note?: string is used?",
        "options": [
          "Only string",
          "string or undefined",
          "Only null",
          "It is always a boolean"
        ],
        "answer": 1,
        "explanation": "An optional property may be absent, so undefined must be considered."
      },
      {
        "q": "A helper only needs id and name. What is a useful contract?",
        "options": [
          "Those two required fields",
          "Every field from the database",
          "any",
          "Require every unrelated server field"
        ],
        "answer": 0,
        "explanation": "A small explicit contract limits unnecessary coupling."
      }
    ],
    "lab": {
      "task": "Type your catalog model",
      "steps": [
        "Describe Product and the input to your filtering helper.",
        "Add explicit return types where they clarify public helpers.",
        "Pass a deliberately invalid value and read the compiler message."
      ],
      "verify": "The type check catches an invalid price or missing required name before the code runs."
    }
  },
  {
    "id": "ts-generics",
    "track": "ts",
    "title": "Generics and reusable helpers",
    "minutes": 15,
    "summary": "Preserve the relationship between input and output types.",
    "body": [
      "A generic type parameter names a type that will be supplied when a helper is used. A function first<T>(items: T[]): T | undefined says its output is an item of the same type as the input array.",
      "A generic is useful when it describes a relationship, not simply because it makes a function look more advanced. Constraints such as T extends { id: string } state the operations the helper requires.",
      "Start with a concrete implementation and add a type parameter only when reuse needs it. Test the runtime behavior independently from whether the types compile."
    ],
    "example": "function first<T>(items: T[]): T | undefined {\n  return items[0];\n}\nconst name = first([\"Amir\", \"Zoe\"]);",
    "takeaways": [
      "Use generics for type relationships",
      "Constrain only what you need",
      "Still test runtime behavior"
    ],
    "quiz": [
      {
        "q": "What type does first([\"Amir\"]) return?",
        "options": [
          "number",
          "string | undefined",
          "any always",
          "number | undefined"
        ],
        "answer": 1,
        "explanation": "The element type is string, while an empty array can still produce undefined."
      },
      {
        "q": "What does a generic constraint describe?",
        "options": [
          "The required capabilities of the type",
          "An automatic database index",
          "A runtime security check",
          "The exact runtime value of every argument"
        ],
        "answer": 0,
        "explanation": "A constraint lets the implementation safely use specified properties or operations."
      }
    ],
    "lab": {
      "task": "Write a typed first-item helper",
      "steps": [
        "Implement first<T> with an explicit empty result.",
        "Use it with products and with strings.",
        "Verify that each call keeps its own useful output type."
      ],
      "verify": "Your editor infers the product type for products and string for strings without any."
    }
  },
  {
    "id": "react-components",
    "track": "react",
    "title": "Components and JSX",
    "minutes": 15,
    "summary": "Describe reusable pieces of an interface.",
    "body": [
      "A React component is a function that returns a description of UI. Name components with a capital letter. JSX resembles HTML, but it is JavaScript syntax with conventions such as className and expressions in braces.",
      "A component should describe what to display for its current inputs. Avoid changing the DOM directly inside render or performing a network request as a rendering side effect.",
      "Start with a small component such as ProductCard, then compose several cards in a list. When mapping a list, use a stable key based on the data rather than a new random value each render."
    ],
    "example": "function ProductCard({ product }) {\n  return <article><h2>{product.name}</h2><p>{product.priceCents} cents</p></article>;\n}",
    "takeaways": [
      "Components describe UI",
      "Compose small components",
      "Use stable list keys"
    ],
    "quiz": [
      {
        "q": "Which name identifies a custom JSX component?",
        "options": [
          "productcard",
          "ProductCard",
          "div",
          "<tasklist>"
        ],
        "answer": 1,
        "explanation": "Capitalization distinguishes a component from a built-in tag."
      },
      {
        "q": "What makes a useful list key?",
        "options": [
          "Math.random() each render",
          "The same value for every item",
          "A stable unique product ID",
          "Generate a different random key on every render"
        ],
        "answer": 2,
        "explanation": "A stable key lets React track an item across updates."
      }
    ],
    "lab": {
      "task": "Create a React catalog card",
      "steps": [
        "Start a React project in your own editor.",
        "Build ProductCard and render three cards from an array.",
        "Give each rendered card a stable key."
      ],
      "verify": "Changing the data changes the cards without direct DOM manipulation."
    }
  },
  {
    "id": "react-props",
    "track": "react",
    "title": "Props and one-way data flow",
    "minutes": 15,
    "summary": "Pass information down and send actions back up.",
    "body": [
      "Props are inputs a parent provides to a component. Treat them as read-only. A child should not mutate a product object in order to communicate that it was selected.",
      "Pass a callback such as onSelect to describe an action. The child calls the callback with the relevant ID, and the parent changes the shared state.",
      "When two components need the same changing data, place that state in their closest useful shared parent. Avoid storing two copies that must be kept manually synchronized."
    ],
    "example": "<ProductCard\n  product={product}\n  onSelect={(id) => setSelectedId(id)}\n/>",
    "takeaways": [
      "Props are inputs",
      "Callbacks communicate actions",
      "Give shared state one owner"
    ],
    "quiz": [
      {
        "q": "How should a child request a change owned by the parent?",
        "options": [
          "Mutate props",
          "Call a supplied callback",
          "Query the parent\u2019s DOM",
          "Mutate the parent\u2019s props directly"
        ],
        "answer": 1,
        "explanation": "A callback communicates intent while the owner controls the state update."
      },
      {
        "q": "Two siblings need the same selected ID. Where should it usually live?",
        "options": [
          "In their shared parent",
          "In two unrelated copies",
          "In a random global variable",
          "Unrelated independent copies with no synchronization"
        ],
        "answer": 0,
        "explanation": "A shared owner keeps both components consistent."
      }
    ],
    "lab": {
      "task": "Select an item across components",
      "steps": [
        "Add a selected ID in the catalog parent.",
        "Pass an onSelect callback to each card.",
        "Display details for the selected product in a sibling panel."
      ],
      "verify": "Selecting any card updates the details panel using a single source of state."
    }
  },
  {
    "id": "react-effects",
    "track": "react",
    "title": "Effects and synchronization",
    "minutes": 15,
    "summary": "Use effects for external systems, not every calculation.",
    "body": [
      "Rendering calculates UI from props and state. An effect synchronizes a component with something outside that calculation: a subscription, browser API, or request.",
      "Include the reactive values an effect reads in its dependency list. Return cleanup for subscriptions or cancellable work. Development checks may start and clean up an effect more than once, so setup and cleanup must pair correctly.",
      "Do not store a filtered list in another state variable just because you can. Derive it from the products and query during rendering. Extra state and effects can create loops and stale copies."
    ],
    "example": "useEffect(() => {\n  document.title = `${count} tasks`;\n}, [count]);\nconst visible = tasks.filter(task => task.title.includes(query));",
    "takeaways": [
      "Derive values during render",
      "Synchronize external systems with effects",
      "Pair setup with cleanup"
    ],
    "quiz": [
      {
        "q": "Which value usually does not require an effect?",
        "options": [
          "A browser event subscription",
          "A list filtered from current props and state",
          "An external connection",
          "Synchronizing an external event subscription"
        ],
        "answer": 1,
        "explanation": "A filtered list is derived during rendering rather than synchronized separately."
      },
      {
        "q": "What should a subscription effect return?",
        "options": [
          "A cleanup function",
          "A JSX element",
          "A random number",
          "Add the same subscription again"
        ],
        "answer": 0,
        "explanation": "Cleanup removes the old subscription when appropriate."
      }
    ],
    "lab": {
      "task": "Synchronize a small browser feature",
      "steps": [
        "Update the document title with the task count in an effect.",
        "Add and clean up one event subscription.",
        "Keep filtered tasks as a derived value."
      ],
      "verify": "Changing the filter does not create a render loop or duplicate subscriptions."
    }
  },
  {
    "id": "react-forms",
    "track": "react",
    "title": "Controlled forms and useful validation",
    "minutes": 15,
    "summary": "Keep input state and user feedback predictable.",
    "body": [
      "A controlled input receives its value from state and reports edits with onChange. Initialize a text value to an empty string so the input does not switch between controlled and uncontrolled behavior.",
      "Handle submission on the form, validate a trimmed value, and call preventDefault if JavaScript owns the action. Disable repeat submission while a save is pending, while still showing why the button is unavailable.",
      "Use field-specific messages and preserve input when saving fails. A successful save can clear the input and announce the result. Test with the keyboard as well as a pointer."
    ],
    "example": "<form onSubmit={handleSubmit}>\n  <label htmlFor=\"title\">Task title</label>\n  <input id=\"title\" value={title} onChange={event => setTitle(event.target.value)} />\n  <button disabled={saving}>Add task</button>\n</form>",
    "takeaways": [
      "Initialize controlled values",
      "Validate on submission",
      "Keep recoverable input after failure"
    ],
    "quiz": [
      {
        "q": "What updates a controlled text input\u2019s state?",
        "options": [
          "onChange",
          "A random DOM mutation",
          "Only a browser refresh",
          "Only a defaultValue with no state update"
        ],
        "answer": 0,
        "explanation": "onChange reports the new value to the state setter."
      },
      {
        "q": "A save fails. What should happen to the user\u2019s text?",
        "options": [
          "Always erase it",
          "Preserve it and explain the failure",
          "Replace it with undefined",
          "Discard the draft and report success"
        ],
        "answer": 1,
        "explanation": "Keeping valid input makes retrying possible without retyping."
      }
    ],
    "lab": {
      "task": "Build a React task form",
      "steps": [
        "Control the title field with state.",
        "Show a useful message for an empty submission.",
        "Add a pending state and preserve the draft on a simulated failure."
      ],
      "verify": "Keyboard submission works and an error does not destroy the draft."
    }
  },
  {
    "id": "http-basics",
    "track": "node",
    "title": "HTTP requests and responses",
    "minutes": 15,
    "summary": "Understand the contract between a client and a server.",
    "body": [
      "HTTP is a request and response protocol. A request includes a method, a target URL, headers, and sometimes a body. A response includes a status, headers, and an optional body.",
      "GET reads a resource. POST commonly creates one; PATCH changes part of one; DELETE requests removal. A status code communicates the result: 200 for a successful read, 201 for creation, and 404 for a missing resource.",
      "Content-Type describes the representation, such as application/json. A useful API contract states inputs, outputs, and failures so the UI can handle each deliberately."
    ],
    "example": "GET /api/tasks\nAccept: application/json\n\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n{\"tasks\": []}",
    "takeaways": [
      "Know method, URL, headers, and body",
      "Return meaningful statuses",
      "Document error responses"
    ],
    "quiz": [
      {
        "q": "Which status is a common result for creating a resource?",
        "options": [
          "201",
          "404",
          "500",
          "401"
        ],
        "answer": 0,
        "explanation": "201 Created communicates that a new resource was created."
      },
      {
        "q": "What describes a JSON response representation?",
        "options": [
          "The filename alone",
          "Content-Type: application/json",
          "The button text",
          "An executable JavaScript function sent directly over HTTP"
        ],
        "answer": 1,
        "explanation": "The header identifies how to interpret the response body."
      }
    ],
    "lab": {
      "task": "Inspect a real request",
      "steps": [
        "Open your browser\u2019s Network panel.",
        "Load a page and inspect one request\u2019s method, status, and content type.",
        "Compare its response with the page\u2019s visible state."
      ],
      "verify": "You can explain which request supplied the data and what would indicate failure."
    }
  },
  {
    "id": "node-validation",
    "track": "node",
    "title": "Server validation and consistent errors",
    "minutes": 15,
    "summary": "Treat every incoming request as untrusted input.",
    "body": [
      "Frontend validation improves usability, but it cannot protect an API. A client can bypass the form and send arbitrary JSON. Validate types, required values, and limits on the server before using the input.",
      "Use a consistent error response shape and a suitable status such as 400 for invalid input. Explain the field error without returning a stack trace or database internals to the client.",
      "Validate an allowlist of writable fields instead of copying a whole request object onto a database record. Ownership and permission checks are separate from checking whether a field is a valid string."
    ],
    "example": "app.post(\"/api/tasks\", (req, res) => {\n  const title = req.body?.title;\n  if (typeof title !== \"string\" || !title.trim() || title.length > 160) {\n    return res.status(400).json({ error: \"Enter a title of 1\u2013160 characters.\" });\n  }\n  // Save the validated title, then return 201.\n});",
    "takeaways": [
      "Validate at the server boundary",
      "Return consistent safe errors",
      "Check authorization separately"
    ],
    "quiz": [
      {
        "q": "Where must API input be validated?",
        "options": [
          "Only in the form",
          "On the server",
          "Only in CSS",
          "Only after the record is already saved"
        ],
        "answer": 1,
        "explanation": "The server receives requests from clients that may skip the UI."
      },
      {
        "q": "A valid title is submitted for another user\u2019s task. Is validation sufficient?",
        "options": [
          "Yes",
          "No, ownership also needs checking",
          "Only if the title is short",
          "Yes, if the button was hidden in the UI"
        ],
        "answer": 1,
        "explanation": "Valid data and permission to change a record are different requirements."
      }
    ],
    "lab": {
      "task": "Add API validation",
      "steps": [
        "Reject missing, blank, non-string, and overlong task titles.",
        "Return a consistent 400 JSON response.",
        "Try the invalid requests directly with an HTTP client."
      ],
      "verify": "Invalid requests leave stored data unchanged and return understandable errors."
    }
  },
  {
    "id": "node-auth",
    "track": "node",
    "title": "Authentication and authorization",
    "minutes": 15,
    "summary": "Identify who is calling and what they are allowed to do.",
    "body": [
      "Authentication establishes an identity. Authorization decides whether that identity may perform a particular action on a particular resource. Being signed in does not grant access to every record.",
      "Use a maintained authentication solution and established password hashing rather than inventing password storage or cryptography. Session cookies commonly use HttpOnly, Secure, and an appropriate SameSite setting; the overall design still needs CSRF protection appropriate to the app.",
      "Check ownership on the server for reads and writes. Never trust a client-supplied user ID as proof of identity. Test that one account cannot read or modify another account\u2019s private task."
    ],
    "example": "// After trusted authentication middleware:\nconst task = await findTask(req.params.id);\nif (!task || task.ownerId !== req.user.id) {\n  return res.status(404).json({ error: \"Task not found\" });\n}",
    "takeaways": [
      "Identity and permission are separate",
      "Use maintained authentication tools",
      "Test access across two accounts"
    ],
    "quiz": [
      {
        "q": "What is authorization?",
        "options": [
          "Deciding what an identity may access",
          "Checking a CSS property",
          "Only asking for a username",
          "The order of SQL rows"
        ],
        "answer": 0,
        "explanation": "Authorization enforces permission to act on a resource."
      },
      {
        "q": "Can a request body\u2019s userId prove who is signed in?",
        "options": [
          "Yes",
          "No",
          "Only if it is a number",
          "Only if the browser input is hidden"
        ],
        "answer": 1,
        "explanation": "Client input is not a trusted authentication identity."
      }
    ],
    "lab": {
      "task": "Test ownership boundaries",
      "steps": [
        "Create two test accounts using your chosen auth tool.",
        "Create a task as one account.",
        "Try reading and modifying it as the other account."
      ],
      "verify": "The second account cannot access the first account\u2019s private task."
    }
  },
  {
    "id": "db-models",
    "track": "db",
    "title": "Tables, keys, and relationships",
    "minutes": 15,
    "summary": "Model the things your app needs to remember.",
    "body": [
      "A relational table holds rows with a defined set of columns. Give each row a primary key that uniquely identifies it. Choose column types and constraints that reflect the rules your app depends on.",
      "A foreign key connects a row to another table. For example, tasks.owner_id can reference users.id. A one-to-many relationship means one user can own many tasks.",
      "Constraints protect the data even if application code makes a mistake. NOT NULL prevents missing required values; UNIQUE prevents duplicates for a key. Plan how deletion should affect related rows rather than relying on an accidental default."
    ],
    "example": "CREATE TABLE tasks (\n  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  owner_id INTEGER NOT NULL REFERENCES users(id),\n  title TEXT NOT NULL,\n  done BOOLEAN NOT NULL DEFAULT false\n);",
    "takeaways": [
      "Choose stable primary keys",
      "Use foreign keys for relationships",
      "Enforce data rules with constraints"
    ],
    "quiz": [
      {
        "q": "What does a primary key provide?",
        "options": [
          "A unique identity for each row",
          "A page title",
          "Automatic ownership checks",
          "Automatic encryption of every column"
        ],
        "answer": 0,
        "explanation": "A primary key uniquely identifies a row; permissions still need application rules."
      },
      {
        "q": "How does tasks.owner_id relate to users.id?",
        "options": [
          "As a foreign key",
          "As CSS inheritance",
          "As a JavaScript closure",
          "As an HTTP status code"
        ],
        "answer": 0,
        "explanation": "A foreign key represents and constrains the relationship."
      }
    ],
    "lab": {
      "task": "Sketch a task database",
      "steps": [
        "Define users and tasks with their required fields.",
        "Add the ownership relationship.",
        "Write down what should happen to tasks when a user is deleted."
      ],
      "verify": "Each task has a clear owner and invalid ownership references are rejected."
    }
  },
  {
    "id": "sql-joins",
    "track": "db",
    "title": "Joins, aggregates, and useful questions",
    "minutes": 15,
    "summary": "Ask the database for related information in one deliberate query.",
    "body": [
      "A JOIN combines rows using a relationship. INNER JOIN returns matching rows; LEFT JOIN also keeps rows from the left table when no match exists on the right.",
      "GROUP BY collects rows for aggregate functions such as COUNT and SUM. Be careful with joins that multiply rows: the number of joined rows may not equal the number of distinct records you intended to count.",
      "Use parameterized queries for values supplied by a person. Values belong in parameters, not string concatenation. Add indexes for measured query needs, and inspect the query plan as data grows."
    ],
    "example": "SELECT users.id, users.name, COUNT(tasks.id) AS task_count\nFROM users\nLEFT JOIN tasks ON tasks.owner_id = users.id\nGROUP BY users.id, users.name;",
    "takeaways": [
      "Choose a join for the question",
      "Check counting behavior",
      "Parameterize user values"
    ],
    "quiz": [
      {
        "q": "Which join keeps users with no tasks?",
        "options": [
          "INNER JOIN only",
          "LEFT JOIN from users",
          "No join can do this",
          "CROSS JOIN without an ownership condition"
        ],
        "answer": 1,
        "explanation": "LEFT JOIN preserves the left-side row even without a matching task."
      },
      {
        "q": "How should a user-supplied search value enter SQL?",
        "options": [
          "String concatenation",
          "A query parameter",
          "A copied script tag",
          "An interpolated raw SQL fragment"
        ],
        "answer": 1,
        "explanation": "Parameterized values prevent them from being interpreted as SQL syntax."
      }
    ],
    "lab": {
      "task": "Query tasks by owner",
      "steps": [
        "Join tasks to their owners.",
        "Count tasks per user, including a user with no tasks.",
        "Compare the query with a small hand-written fixture."
      ],
      "verify": "Your result includes the zero-task user and the expected count for every owner."
    }
  },
  {
    "id": "db-transactions",
    "track": "db",
    "title": "Migrations and transactions",
    "minutes": 15,
    "summary": "Evolve a database and keep related changes consistent.",
    "body": [
      "A migration records a schema change in version control. Apply it through the deployment process so environments agree about the database structure. Back up important data and plan for failure before changing a live schema.",
      "A transaction groups related operations so they can succeed together or roll back together. This is useful when a workflow must never leave only half its changes recorded.",
      "Do not assume a local schema update proves a migration is safe for existing data. Test against realistic old rows, and consider compatibility while old and new application versions overlap during deployment."
    ],
    "example": "BEGIN;\nUPDATE accounts SET balance = balance - 10 WHERE id = 1;\nUPDATE accounts SET balance = balance + 10 WHERE id = 2;\nCOMMIT;",
    "takeaways": [
      "Version schema changes",
      "Group dependent writes",
      "Test with existing rows"
    ],
    "quiz": [
      {
        "q": "What is a transaction useful for?",
        "options": [
          "Keeping related writes consistent",
          "Styling a table",
          "Skipping input validation",
          "Sorting a CSS grid"
        ],
        "answer": 0,
        "explanation": "Related changes should commit together or roll back together."
      },
      {
        "q": "What should a migration test include?",
        "options": [
          "Only an empty database",
          "Existing data from the earlier schema",
          "Only screenshots",
          "Only the README\u2019s heading"
        ],
        "answer": 1,
        "explanation": "Existing rows often expose schema-change problems an empty database misses."
      }
    ],
    "lab": {
      "task": "Practice a recoverable schema change",
      "steps": [
        "Add an optional due-date column with a migration.",
        "Apply it to a database containing old tasks.",
        "Verify the app handles tasks without a due date."
      ],
      "verify": "Existing tasks remain readable and a failed related write can be rolled back."
    }
  },
  {
    "id": "test-boundaries",
    "track": "test",
    "title": "Boundary cases and useful examples",
    "minutes": 15,
    "summary": "Turn a vague rule into a set of cases that expose mistakes.",
    "body": [
      "A happy-path example shows intended use, but boundary cases test exactly where behavior changes. Include values just below, at, and just above a threshold.",
      "Choose examples from the rule rather than copying the implementation\u2019s branches. A test should explain what matters to the caller so it remains useful after a refactor.",
      "Here the business rule is free shipping at 5000 cents or more. A total of 4999, exactly 5000, and 5001 test the important boundary."
    ],
    "example": "// Useful examples for a minimum rule:\n// below the threshold, exactly at it, above it.",
    "takeaways": [
      "Test where behavior changes",
      "Express rules from the caller\u2019s view",
      "Keep tests useful across refactors"
    ],
    "challenge": {
      "functionName": "shippingCost",
      "concept": "Boundary cases and useful examples",
      "prompt": "Return 0 when subtotalCents is at least 5000; otherwise return 499. Inputs are nonnegative integers.",
      "starter": "function shippingCost(subtotalCents) {\n  // Write your solution here.\n}\n",
      "tests": [
        {
          "args": [
            4999
          ],
          "expected": 499,
          "label": "just below threshold"
        },
        {
          "args": [
            5000
          ],
          "expected": 0,
          "label": "exactly at threshold"
        },
        {
          "args": [
            5001
          ],
          "expected": 0,
          "label": "just above threshold"
        },
        {
          "args": [
            0
          ],
          "expected": 499,
          "label": "zero subtotal"
        }
      ],
      "hints": [
        "Use an inclusive comparison at 5000.",
        "The result is either 0 or 499.",
        "Test 5000 carefully: it qualifies for free shipping."
      ]
    }
  },
  {
    "id": "test-integration",
    "track": "test",
    "title": "Integration tests and complete user flows",
    "minutes": 15,
    "summary": "Check that the pieces work together, not only in isolation.",
    "body": [
      "A unit test checks a small piece, such as a pricing helper. An integration test checks cooperating pieces, such as an API route and database. An end-to-end test exercises a flow through the running application.",
      "Use realistic inputs and assert observable outcomes. For a task form, submit a title and verify the task appears; do not only check that a particular internal setter was called.",
      "Keep tests independent by setting up known data and cleaning up the data they own. Use focused end-to-end coverage for critical flows rather than duplicating every small unit test in a slower browser test."
    ],
    "example": "// User-facing test outline:\n// 1. Open the task page.\n// 2. Enter a title and submit.\n// 3. Confirm the task appears.\n// 4. Refresh and confirm it is still present.",
    "takeaways": [
      "Cover cooperating pieces",
      "Assert visible outcomes",
      "Keep test data independent"
    ],
    "quiz": [
      {
        "q": "Which assertion best checks a task creation flow?",
        "options": [
          "The task appears and survives refresh",
          "A private helper has a particular name",
          "A source file has exactly 100 lines",
          "The add button has one exact private class name"
        ],
        "answer": 0,
        "explanation": "Assert the outcome a person relies on."
      },
      {
        "q": "Why set up known test data?",
        "options": [
          "To make tests independent and repeatable",
          "To hide failures",
          "To make screenshots identical by chance",
          "To make tests depend on production users"
        ],
        "answer": 0,
        "explanation": "Predictable setup prevents one test from depending on another test\u2019s leftovers."
      }
    ],
    "lab": {
      "task": "Test one full task flow",
      "steps": [
        "Create a task through the UI.",
        "Refresh and confirm persistence.",
        "Complete it and verify the completed view."
      ],
      "verify": "The test fails when persistence or completion is broken, not when a private helper is renamed."
    }
  },
  {
    "id": "test-debugging",
    "track": "test",
    "title": "Regression tests and fixing a reported bug",
    "minutes": 15,
    "summary": "Keep a real failure from returning.",
    "body": [
      "A regression test captures behavior that previously failed. First reproduce the report and record the expected outcome. Narrow the failing input before changing the code.",
      "Add a test at the smallest useful layer, confirm it fails for the right reason, then implement the fix. If a parser helper is responsible, a fast helper test may be better than a full browser scenario.",
      "Rerun the affected checks and inspect the diff. A passing test is evidence for the cases it exercises, not a guarantee that every possible interaction is correct."
    ],
    "example": "// Report: a search with outside spaces finds nothing.\n// Regression: \"  shirt  \" should match \"Linen Shirt\".\n// Fix: normalize the query before comparing.",
    "takeaways": [
      "Reproduce before changing code",
      "Test at the smallest useful layer",
      "Understand what the evidence covers"
    ],
    "quiz": [
      {
        "q": "When should the new regression test first fail?",
        "options": [
          "Before the fix, for the reported behavior",
          "Never",
          "Only after deployment",
          "Only for an unrelated behavior"
        ],
        "answer": 0,
        "explanation": "A meaningful failing test demonstrates that it captures the original problem."
      },
      {
        "q": "What does a passing suite prove?",
        "options": [
          "Every possible behavior is correct",
          "The exercised checks passed",
          "No future bug is possible",
          "That the application requires no further review"
        ],
        "answer": 1,
        "explanation": "Tests provide bounded evidence about the cases they cover."
      }
    ],
    "lab": {
      "task": "Fix a search normalization bug",
      "steps": [
        "Write a failing case with leading and trailing spaces.",
        "Normalize the query in the search helper.",
        "Check ordinary text, empty text, and uppercase text."
      ],
      "verify": "The original reproduction passes and existing search behavior still works."
    }
  },
  {
    "id": "ship-builds",
    "track": "ship",
    "title": "Development, production, and deployment",
    "minutes": 15,
    "summary": "Publish the built app with the right paths and configuration.",
    "body": [
      "A development server provides rapid feedback. A production build transforms source into deployable assets. The host must serve the build output, not the source directory.",
      "When an app lives under a path such as /codepath/, its asset URLs and router base must agree with that path. Static hosts also need a strategy for direct links and refreshing client-side routes.",
      "Environment variables used in frontend builds are included in public assets when referenced by the code. Keep secrets on a server. Test the deployed URL, including a nested route and a fresh browser load."
    ],
    "example": "pnpm --filter @workspace/codepath build\n# Publish artifacts/codepath/dist/public\n# Check the deployed app and a nested route.",
    "takeaways": [
      "Deploy the build output",
      "Match router and asset paths",
      "Check the actual hosted app"
    ],
    "quiz": [
      {
        "q": "What should a static host serve?",
        "options": [
          "The production build output",
          "node_modules",
          "Only package.json",
          "A directory of private server environment files"
        ],
        "answer": 0,
        "explanation": "The browser needs the generated assets and entry document."
      },
      {
        "q": "Are variables embedded into frontend assets private?",
        "options": [
          "Yes",
          "No",
          "Only if the variable name is long",
          "Only if the app uses TypeScript"
        ],
        "answer": 1,
        "explanation": "Anything delivered to the browser is available to its users."
      }
    ],
    "lab": {
      "task": "Publish your frontend",
      "steps": [
        "Build the project and inspect the output folder.",
        "Deploy it with a documented base path.",
        "Open a nested route directly and refresh it."
      ],
      "verify": "The deployed app loads its assets and its routes work after a fresh load."
    }
  },
  {
    "id": "ship-accessibility",
    "track": "ship",
    "title": "Accessibility and a practical release review",
    "minutes": 15,
    "summary": "Verify that people can actually use the app.",
    "body": [
      "An interface needs meaningful labels, visible focus, logical headings, and sufficient contrast. Native controls give you useful keyboard behavior, but your surrounding design still needs testing.",
      "Use Tab and Shift+Tab through the primary flow. Check Enter and Space where appropriate, and verify you can leave a code editor or close a dialog. Zoom the page and test a narrow viewport with realistic long content.",
      "Automated accessibility tools find some issues, but they cannot judge every label, reading order, or confusing interaction. Combine automated checks with a manual review of your actual task flow."
    ],
    "example": "<label for=\"search\">Search projects</label>\n<input id=\"search\" aria-describedby=\"search-help\">\n<p id=\"search-help\">Search by project name.</p>\n/* Keep a visible :focus-visible outline in CSS. */",
    "takeaways": [
      "Use semantic controls and labels",
      "Test the keyboard flow",
      "Combine automated and manual reviews"
    ],
    "quiz": [
      {
        "q": "Which check needs manual review as well as automation?",
        "options": [
          "Whether the interaction makes sense with a keyboard",
          "Whether a file exists",
          "Whether 2 + 2 is 4",
          "Whether a static file has a particular byte count"
        ],
        "answer": 0,
        "explanation": "Keyboard behavior and task clarity need hands-on use."
      },
      {
        "q": "What should a placeholder replace?",
        "options": [
          "A visible label",
          "The submit button",
          "Neither; it is only an optional hint",
          "All error messages"
        ],
        "answer": 2,
        "explanation": "A placeholder disappears during typing and is not a reliable label."
      }
    ],
    "lab": {
      "task": "Review the primary flow before release",
      "steps": [
        "Complete the app\u2019s main task without a mouse.",
        "Zoom to 200% and test a narrow viewport.",
        "Fix missing labels, hidden focus, or unreachable controls."
      ],
      "verify": "The main flow remains usable with the keyboard, zoom, and small screens."
    }
  },
  {
    "id": "ship-maintenance",
    "track": "ship",
    "title": "Monitoring, recovery, and a portfolio case study",
    "minutes": 15,
    "summary": "Explain what you built and keep it working after launch.",
    "body": [
      "A release is the beginning of maintenance. Check application and deployment logs, confirm important user flows still work, and provide a way to recover from a bad change.",
      "Backups are useful only if they can be restored. For a browser app, explain where data is stored and how a person can export it. For a server app, practice restoring a backup in a safe test environment.",
      "A portfolio case study should explain the problem, your implementation choices, evidence from testing, and a real limitation or next improvement. Link to the running app and repository, and clearly describe your own contribution, including tools or assistance used."
    ],
    "example": "# Project case study\nProblem:\nMain user flow:\nWhat I implemented:\nTradeoff and why:\nHow I tested it:\nKnown limits and next step:\nLive app and repository:",
    "takeaways": [
      "Check the app after release",
      "Practice restoring data",
      "Explain decisions and contributions"
    ],
    "quiz": [
      {
        "q": "What confirms a backup is useful?",
        "options": [
          "Its filename looks correct",
          "A successful restore test",
          "It was never opened",
          "The backup file is large"
        ],
        "answer": 1,
        "explanation": "A restore verifies that the saved data can actually be recovered."
      },
      {
        "q": "What belongs in an honest portfolio case study?",
        "options": [
          "Only a screenshot",
          "Your contribution, decisions, evidence, and limits",
          "Claims that no bugs can exist",
          "Only a list of technology logos"
        ],
        "answer": 1,
        "explanation": "Concrete evidence and clear attribution make the work understandable."
      }
    ],
    "lab": {
      "task": "Finish your portfolio case study",
      "steps": [
        "Write a short case study using the example outline.",
        "Link the live app and source repository.",
        "Document one real limitation and test backup recovery."
      ],
      "verify": "Someone can understand your contribution, run or inspect the app, and assess the evidence."
    }
  }
];

// Trusted reference implementations used only by curriculum regression tests.
export const REFERENCE_SOLUTIONS: Record<string, string> = {
  "js-values": "function makeGreeting(name) { return 'Hello, ' + name + '!'; }",
  "js-numbers": "function lineTotal(priceCents, quantity) { return priceCents * quantity; }",
  "js-strings": "function normalizeSearch(text) { return text.trim().toLowerCase(); }",
  "js-conditions": "function canEnroll(age, hasConsent) { return age >= 18 && hasConsent === true; }",
  "js-scope": "function applyDiscount(price, discount) { return Math.max(0, price - discount); }",
  "js-debugging": "function clampScore(score) { return Math.max(0, Math.min(100,score)); }",
  "arrays-basics": "function lastItem(items) { return items.length ? items[items.length - 1] : null; }",
  "object-basics": "function displayName(user) { return user.nickname ?? user.name; }",
  "data-immutable": "function addTag(tags, tag) { return [...tags, tag]; }",
  "dom-storage": "function parseSavedList(raw) { try { const value=JSON.parse(raw); return Array.isArray(value) ? value : []; } catch { return []; } }",
  "test-boundaries": "function shippingCost(subtotalCents) { return subtotalCents >= 5000 ? 0 : 499; }"
};
