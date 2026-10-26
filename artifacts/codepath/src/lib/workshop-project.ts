import type { Files } from './studio-model';
import { PRODUCTS, PRODUCT_STARTER } from './studio-content';
const styles = `* { box-sizing: border-box; }
body { margin: 0; background: #faf7f0; color: #172133; font: 1rem/1.6 system-ui, sans-serif; }
main { max-width: 960px; margin: auto; padding: 24px; }
form, label { display: grid; gap: 8px; } form { max-width: 420px; gap: 16px; }
input, button, select { font: inherit; padding: 10px; max-width: 100%; }
input[type=checkbox] { width: auto; } .checkbox-row { display: flex; align-items: center; gap: 8px; }
section { margin-block: 24px; } article { border: 1px solid #ddd; border-radius: 12px; padding: 16px; background: white; }
a { color: #245f51; } :focus-visible { outline: 3px solid #dc4b26; outline-offset: 3px; }
@media (min-width: 640px) { main > section { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; } main > section > h2 { grid-column: 1 / -1; } }
[hidden] { display: none !important; }`;
function documentPage(title: string, body: string) { return `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><link rel="stylesheet" href="styles.css"></head><body>\n${body}\n<script src="script.js"></script></body></html>`; }
/** Copies learner source into a separate project. The original learning draft is never changed. */
export function workshopAppFiles(courseId: string, source: string): Files {
 if(courseId==='web') return {'index.html': documentPage('My Fieldwork page',source), 'styles.css':styles,'script.js':'// Your HTML workshop is now a standalone page.\n// Customize its content, responsive styles and form behavior.\n'};
 if(courseId==='js') return {
  'index.html':documentPage('My price calculator','<main><h1>My price calculator</h1><p>Members receive 10% off subtotals of at least 5000 cents. Customize the rules in script.js.</p><form id="checkout-form"><label for="price">Price in cents</label><input id="price" type="number" min="0" step="1" value="2500" required><label for="quantity">Quantity</label><input id="quantity" type="number" min="0" step="1" value="2" required><label class="checkbox-row"><input id="member" type="checkbox"> Member</label><button type="submit">Calculate total</button></form><p id="total" role="status">Submit the form to calculate a total.</p></main>'),
  'styles.css':styles,
  'script.js':`// Your tested workshop rules are copied here.\nconst learnedCheckout = (() => {\n${source}\nreturn checkout;\n})();\n\n// The page adapter keeps input handling separate from the price rules.\ndocument.querySelector('#checkout-form').addEventListener('submit', event => {\n  event.preventDefault();\n  const priceInput = document.querySelector('#price').value;\n  const quantityInput = document.querySelector('#quantity').value;\n  const output = document.querySelector('#total');\n  if (!priceInput.trim() || !quantityInput.trim()) { output.textContent = 'Enter a price and quantity.'; return; }\n  const price = Number(priceInput);\n  const quantity = Number(quantityInput);\n  const member = !!document.querySelector('#member').checked;\n  output.textContent = learnedCheckout(price, quantity, member);\n});\n`
 };
 if(courseId==='data') return {
  'index.html':PRODUCT_STARTER['index.html'].replace('<option value="default">Original order</option>',''),
  'styles.css':PRODUCT_STARTER['styles.css'],
  'script.js':`// Your catalog pipeline remains separate from the page adapter.\nconst learnedCatalog = (() => {\n${source}\nreturn catalog;\n})();\nconst codepathCatalogProducts = ${JSON.stringify(PRODUCTS,null,2)};\nfunction renderCatalogPage() {\n const query = document.querySelector('#search').value;\n const category = document.querySelector('#category').value;\n const direction = document.querySelector('#sort').value;\n const visible = learnedCatalog(codepathCatalogProducts, query, category);\n if (direction === 'desc') visible.reverse();\n const container = document.querySelector('#products');\n container.replaceChildren();\n for (const product of visible) {\n  const card = document.createElement('article'); card.className = 'product-card'; card.setAttribute('data-id',String(product.id));\n  const title = document.createElement('h2'); title.textContent = product.name;\n  const detail = document.createElement('p'); detail.textContent = product.category + ' · $' + product.price.toFixed(2);\n  card.append(title,detail); container.append(card);\n }\n document.querySelector('#empty').hidden = visible.length > 0;\n}\ndocument.querySelector('#search').addEventListener('input',renderCatalogPage);\ndocument.querySelector('#category').addEventListener('change',renderCatalogPage);\ndocument.querySelector('#sort').addEventListener('change',renderCatalogPage);\nrenderCatalogPage();\n`
 };
 throw new Error('This workshop needs its own editor environment.');
}
