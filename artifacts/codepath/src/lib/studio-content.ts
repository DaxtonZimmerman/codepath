import { type Files, type StudioProject } from "./studio-model";

export const PRODUCTS = [
  { id: 1, name: "Linen Shirt", category: "tops", price: 45 },
  { id: 2, name: "Cotton Tee", category: "tops", price: 20 },
  { id: 3, name: "Denim Jeans", category: "bottoms", price: 70 },
  { id: 4, name: "Chino Shorts", category: "bottoms", price: 35 },
  { id: 5, name: "Canvas Jacket", category: "outerwear", price: 95 },
  { id: 6, name: "Wool Coat", category: "outerwear", price: 150 },
];
const html = `<!doctype html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Product Filter</title><link rel="stylesheet" href="styles.css"></head>
<body>
<main>
  <h1>Everyday clothing</h1>
  <p>Find something that fits your day.</p>
  <div class="controls">
    <label>Search by name <input id="search" type="search" placeholder="Try linen"></label>
    <label>Category <select id="category"><option value="all">All categories</option><option value="tops">Tops</option><option value="bottoms">Bottoms</option><option value="outerwear">Outerwear</option></select></label>
    <label>Price <select id="sort"><option value="default">Original order</option><option value="asc">Low to high</option><option value="desc">High to low</option></select></label>
  </div>
  <section id="products" aria-label="Products"></section>
  <p id="empty" hidden>No products match. Try another search.</p>
</main>
<script src="script.js"></script>
</body></html>`;
const css = `* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: #faf7f0; color: #172133; }
main { max-width: 1000px; margin: auto; padding: 24px; }
.controls { display: flex; flex-wrap: wrap; gap: 16px; margin: 24px 0; }
label { display: grid; gap: 6px; }
input, select { padding: 10px; max-width: 100%; border: 1px solid #abb1bb; border-radius: 6px; font: inherit; }
#products { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr)); gap: 16px; }
.product-card { padding: 20px; background: white; border: 1px solid #ddd; border-radius: 10px; }
:focus-visible { outline: 3px solid #dc4b26; outline-offset: 3px; }
[hidden] { display: none !important; }`;
const data = `const products = ${JSON.stringify(PRODUCTS, null, 2)};\n`;
export const PRODUCT_STARTER: Files = {
  "index.html": html, "styles.css": css,
  "script.js": data + `
// Milestone 1: render the products as cards inside #products.
// Each card needs class="product-card" and data-id set to the product id.
// Include the product's name, category, and price in its card.
// Keep the starter control IDs; the behavior checks use them.
function render() {
  // Read #search, #category and #sort.
  // Filter products, sort a copy, and update the page.
}
// Listen for input on #search and change on #category / #sort.
render();
`,
};
export const PRODUCT_EXAMPLE: Files = { ...PRODUCT_STARTER,
  "script.js": data + `
function render() {
  const query = document.querySelector("#search").value.trim().toLowerCase();
  const category = document.querySelector("#category").value;
  const sort = document.querySelector("#sort").value;
  const visible = products.filter(p =>
    p.name.toLowerCase().includes(query) &&
    (category === "all" || p.category === category)
  );
  if (sort === "asc") visible.sort((a, b) => a.price - b.price);
  if (sort === "desc") visible.sort((a, b) => b.price - a.price);
  const container = document.querySelector("#products");
  container.innerHTML = "";
  visible.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = String(p.id);
    const title = document.createElement("h2");
    title.textContent = p.name;
    const detail = document.createElement("p");
    detail.textContent = p.category + " · $" + p.price;
    card.append(title, detail);
    container.append(card);
  });
  document.querySelector("#empty").hidden = visible.length !== 0;
}
document.querySelector("#search").addEventListener("input", render);
document.querySelector("#category").addEventListener("change", render);
document.querySelector("#sort").addEventListener("change", render);
render();
`,
};
export const BLANK_STARTER: Files = {
  "index.html": `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>My app</title><link rel="stylesheet" href="styles.css"></head><body><main><h1>My idea starts here</h1><button id="hello">Try it</button><p id="message"></p></main><script src="script.js"></script></body></html>`,
  "styles.css": `body { font-family: system-ui; margin: 0; padding: 24px; color: #172133; background: #faf7f0; }\nbutton { padding: 12px; }\n`,
  "script.js": `document.querySelector("#hello").addEventListener("click", () => {\n  document.querySelector("#message").textContent = "Your app is working.";\n  console.log("Button clicked");\n});\n`,
};
export const MILESTONES = [
  { title: "Render product cards", concept: "dom", lessonId: "dom-basics", practiceId: "objects-counting", brief: "Turn the six clothing objects into cards showing name, category and price. Give each card class product-card and data-id matching its product.", hints: ["How can each object become an element?", "Create an article per item, set its class and data-id, then append it inside #products.", 'const card = document.createElement("article"); card.className = "product-card"; card.dataset.id = String(item.id); card.textContent = item.name;'] },
  { title: "Search by name", concept: "search", lessonId: "array-methods", practiceId: "array-methods", brief: "Match names without caring about case or surrounding spaces. Re-render when the search input changes.", hints: ["What array method keeps only matching items?", "Read the search value, trim and lowercase it, then filter names with includes.", 'const matches = items.filter(item => item.name.toLowerCase().includes(query.trim().toLowerCase()));'] },
  { title: "Filter categories", concept: "category", lessonId: "dom-events", practiceId: "data-shaping", brief: "Use the category select to keep only the chosen category, while also respecting the search. All categories removes only the category restriction.", hints: ["How do you combine two conditions?", "Keep an item when BOTH the name matches and the category is all or matches.", 'const matches = items.filter(item => category === "all" || item.category === category);'] },
  { title: "Sort prices", concept: "sort", lessonId: "data-shaping", practiceId: "data-shaping", brief: "Support price ascending and descending on the currently filtered products. Do not lose the original data order.", hints: ["Does sort mutate the array?", "Sort a filtered or copied array using a numeric comparator.", 'const ordered = [...items].sort((a, b) => a.price - b.price);'] },
  { title: "Handle empty results", concept: "empty", lessonId: "dom-basics", practiceId: "testing-basics", brief: "When no cards match, show #empty. When results return, hide it again. Combine search, category, and sorting reliably.", hints: ["What tells you there are no matches?", "Set the empty message hidden property based on the filtered array length.", 'empty.hidden = visible.length !== 0;'] },
  { title: "Review and ship", concept: "review", lessonId: "css-layout", practiceId: "security-deploy", brief: "Run all behavior checks. Review the layout on a phone and desktop and try every control with a keyboard. Export your app, then reflect on what you built.", hints: ["Can someone use your page without a mouse?", "Use labels, visible focus, and a grid that fits within the available width.", '.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr)); gap: 16px; }'] },
];
export function newProject(kind: StudioProject["kind"]): StudioProject {
  const now = new Date().toISOString();
  return { id: crypto.randomUUID(), kind, title: kind === "product-filter" ? "Product Filter App" : "My own idea",
    description: kind === "product-filter" ? "Build a clothing catalog with search, category filters and price sorting." : "",
    files: { ...(kind === "product-filter" ? PRODUCT_STARTER : BLANK_STARTER) }, notes: "",
    createdAt: now, updatedAt: now, lastOpenedAt: now, step: 0, liveUrl: "", repoUrl: "",
    reflection: ["", "", ""], manual: {}, evidence: null, versions: [], reviews: {} };
}
