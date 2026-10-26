import { StudioRuntime, type Inspection } from "./studio-runtime";
import type { CheckResult, Files } from "./studio-model";

type Step = { sel: string; ev: string; value: string };
type Suite = { id: string; label: string; concept: string; steps: Step[]; ids: number[]; ordered: boolean; empty: boolean; expected: string; requireText?: boolean };

const ALL = [1, 2, 3, 4, 5, 6];
const search = (value: string): Step => ({ sel: "#search", ev: "input", value });
const category = (value: string): Step => ({ sel: "#category", ev: "change", value });
const sort = (value: string): Step => ({ sel: "#sort", ev: "change", value });

export const SUITES: Suite[] = [
  { id: "render", label: "Shows all six products as cards", concept: "dom", steps: [], ids: ALL, ordered: true, empty: false, requireText: true,
    expected: "Six .product-card elements with data-id 1 to 6, each showing its name and price. Empty message hidden." },
  { id: "search", label: "Search ignores case and extra spaces", concept: "search", steps: [search("  LINEN ")], ids: [1], ordered: false, empty: false,
    expected: 'Typing "  LINEN " shows only Linen Shirt (id 1).' },
  { id: "category", label: "Category filter keeps the chosen category", concept: "category", steps: [category("outerwear")], ids: [5, 6], ordered: false, empty: false,
    expected: "Choosing Outerwear shows Canvas Jacket and Wool Coat (ids 5, 6)." },
  { id: "sort-asc", label: "Sorts price low to high", concept: "sort", steps: [sort("asc")], ids: [2, 4, 1, 3, 5, 6], ordered: true, empty: false,
    expected: "Low to high shows ids in order 2, 4, 1, 3, 5, 6." },
  { id: "sort-desc", label: "Sorts price high to low", concept: "sort", steps: [sort("desc")], ids: [6, 5, 3, 1, 4, 2], ordered: true, empty: false,
    expected: "High to low shows ids in order 6, 5, 3, 1, 4, 2." },
  { id: "combined", label: "Search, category and sort work together", concept: "category", steps: [category("bottoms"), sort("desc"), search("s")], ids: [3, 4], ordered: true, empty: false,
    expected: 'Bottoms + high to low + search "s" shows Denim Jeans then Chino Shorts (ids 3, 4).' },
  { id: "empty", label: "Shows the empty message when nothing matches", concept: "empty", steps: [search("zzzz")], ids: [], ordered: true, empty: true,
    expected: 'Searching "zzzz" shows no cards and makes #empty visible.' },
  { id: "restore", label: "Results come back after clearing the search", concept: "empty", steps: [search("zzzz"), search("")], ids: ALL, ordered: true, empty: false,
    expected: "Clearing the search shows all six cards again and hides #empty." },
];

const NAMES = ["Linen Shirt", "Cotton Tee", "Denim Jeans", "Chino Shorts", "Canvas Jacket", "Wool Coat"];
const PRICES = [45, 20, 70, 35, 95, 150];

function describe(ins: Inspection) {
  const ids = ins.cards.map((c) => c.id ?? "missing");
  return `${ins.cards.length} ${ins.cards.length === 1 ? "card" : "cards"}${ids.length ? ` (data-id: ${ids.join(", ")})` : ""}; empty message ${ins.empty ? "visible" : "hidden"}.`;
}

function judge(s: Suite, ins: Inspection): { passed: boolean; note: string } {
  const got = ins.cards.map((c) => Number(c.id));
  const a = s.ordered ? got : [...got].sort((x, y) => x - y);
  const b = s.ordered ? s.ids : [...s.ids].sort((x, y) => x - y);
  if (a.length !== b.length || a.some((v, i) => v !== b[i])) return { passed: false, note: "" };
  if (ins.empty !== s.empty) return { passed: false, note: s.empty ? " The empty message should be visible." : " The empty message should be hidden." };
  if (s.requireText) {
    const bad = ins.cards.find((c) => { const i = Number(c.id) - 1; return !c.text.includes(NAMES[i]) || !c.text.includes(String(PRICES[i])); });
    if (bad) return { passed: false, note: ` Card ${bad.id} is missing its name or price.` };
  }
  return { passed: true, note: "" };
}

/** Each suite runs in a fresh isolated runtime so one test can never leak state into the next. */
export async function runProductChecks(files: Files, onProgress?: (done: number, total: number) => void): Promise<CheckResult[]> {
  const out: CheckResult[] = [];
  for (const s of SUITES) {
    const errors: string[] = [];
    const rt = new StudioRuntime({ error: (e) => errors.push(e), log: (level, text) => { if (level === "error") errors.push(text); } });
    try {
      let ins = await rt.run(files);
      for (const st of s.steps) ins = await rt.event(st.sel, st.ev, st.value);
      const { passed, note } = judge(s, ins);
      out.push({ id: s.id, label: s.label, concept: s.concept, expected: s.expected, passed: passed && errors.length === 0,
        actual: `Your app showed ${describe(ins)}${note}${errors.length ? ` Error: ${errors[0]}` : ""}` });
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      out.push({ id: s.id, label: s.label, concept: s.concept, expected: s.expected, passed: false,
        actual: `The check could not finish: ${errors[0] ?? m}` });
    } finally {
      rt.stop();
    }
    onProgress?.(out.length, SUITES.length);
  }
  return out;
}

export const CAPABILITIES: Record<string, string> = {
  dom: "Rendered an array of objects as DOM cards",
  search: "Built case-insensitive search with filter and string methods",
  category: "Combined conditions to filter by category alongside search",
  sort: "Sorted a copy of data with a numeric comparator",
  empty: "Handled empty results and restored them in the UI",
};
