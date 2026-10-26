import { useState } from "react";
import { Link } from "wouter";
import { RefreshCw, Check, X } from "lucide-react";
import { useProjects, saveProject } from "@/lib/studio-db";
import { addDays, dayKey } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export const CONCEPT_QUESTIONS: Record<string, { q: string; options: string[]; answer: number; why: string }> = {
  dom: { q: "Which line adds a new card element inside #products?", options: ['products.innerText = card', 'document.querySelector("#products").append(card)', 'card.append("#products")'], answer: 1, why: "append places the element as the last child of the container you selected." },
  search: { q: 'Which expression matches "Linen Shirt" when the user types "  LINEN "?', options: ['name.includes(query)', 'name.toLowerCase().includes(query.trim().toLowerCase())', 'name === query.trim()'], answer: 1, why: "Normalise both sides: trim the query, then lowercase both before includes." },
  category: { q: 'How do you keep an item when the category is "all" or matches?', options: ['category === "all" || item.category === category', 'category === "all" && item.category === category', 'item.category !== category'], answer: 0, why: "Or lets the all option skip the restriction, while still checking otherwise." },
  sort: { q: "Which sorts prices low to high without changing the original array?", options: ['items.sort()', '[...items].sort((a, b) => a.price - b.price)', 'items.sort((a, b) => b.price - a.price)'], answer: 1, why: "Spread makes a copy; a - b with numbers gives ascending order." },
  empty: { q: "How should the empty message react to an empty filtered list?", options: ['Remove the element forever', 'empty.hidden = visible.length !== 0', 'Show an alert()'], answer: 1, why: "Toggle it from the result length so it hides again when results come back." },
};
export const CONCEPT_NAMES: Record<string, string> = { dom: "DOM rendering", search: "Search", category: "Filtering", sort: "Sorting", empty: "Empty states", review: "Review" };

export function useDueProjectReviews() {
  const { projects } = useProjects();
  const today = dayKey();
  return projects.flatMap((p) => Object.entries(p.reviews).filter(([c, r]) => r.due <= today && CONCEPT_QUESTIONS[c]).map(([concept]) => ({ project: p, concept })));
}

export function ProjectReviews() {
  const live = useDueProjectReviews();
  const { toast } = useToast();
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [answered, setAnswered] = useState<Record<string, (typeof live)[number]>>({});
  const k = (x: (typeof live)[number]) => `${x.project.id}:${x.concept}`;
  // Keep answered items visible so feedback stays on screen after the due date moves.
  const due = [...live, ...Object.values(answered).filter((a) => !live.some((x) => k(x) === k(a)))];

  async function answer(key: string, item: (typeof live)[number], concept: string, choice: number) {
    setAnswered((x) => ({ ...x, [key]: item }));
    const ok = CONCEPT_QUESTIONS[concept].answer === choice;
    setPicked((x) => ({ ...x, [key]: choice }));
    const p = item.project;
    try {
      await saveProject({ ...p, reviews: { ...p.reviews, [concept]: { due: addDays(ok ? 3 : 1), lastResult: ok ? "pass" : "miss" } } });
    } catch (e) {
      toast({ title: "Review not saved", description: e instanceof Error ? e.message : String(e), variant: "destructive" });
    }
  }

  return (
    <section className="mb-12 rounded-3xl border bg-card p-5 sm:p-7" aria-labelledby="pr-h" data-testid="section-project-reviews">
      <h2 id="pr-h" className="font-display text-xl font-bold flex items-center gap-2"><RefreshCw className="size-5 text-pine" /> From your projects ({live.length})</h2>
      <p className="mt-1 text-sm text-muted-foreground">Short questions on concepts you used or missed while building. Right answers return in 3 days, misses tomorrow.</p>
      {due.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">Nothing due. Run checks in a <Link href="/build" className="underline underline-offset-4 text-foreground">project</Link> to add concepts here.</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {due.map(({ project, concept }, i) => {
            const key = `${project.id}:${concept}`;
            const q = CONCEPT_QUESTIONS[concept];
            const choice = picked[key];
            const lastMiss = project.reviews[concept]?.lastResult === "miss";
            return (
              <li key={key} className="rounded-2xl border p-4" data-testid={`review-project-${concept}`}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{CONCEPT_NAMES[concept]} · {project.title}{lastMiss ? " · missed last time" : ""}</p>
                <p className="mt-1.5 font-medium">{q.q}</p>
                <div className="mt-3 grid gap-2">
                  {q.options.map((o, j) => (
                    <button key={j} disabled={choice !== undefined} onClick={() => answer(key, due[i], concept, j)} data-testid={`button-review-${concept}-${j}`}
                      className={cn("press text-left rounded-xl border-2 px-3 py-2 font-mono text-[13px] break-words disabled:cursor-default",
                        choice !== undefined && j === q.answer && "border-pine bg-pine/10",
                        choice === j && j !== q.answer && "border-primary bg-primary/10")}>{o}</button>
                  ))}
                </div>
                {choice !== undefined && (
                  <p className="mt-3 flex gap-2 text-sm" role="status">
                    {choice === q.answer ? <Check className="size-4 text-pine shrink-0 mt-0.5" /> : <X className="size-4 text-primary shrink-0 mt-0.5" />}
                    <span>{choice === q.answer ? "Right. " : "Not quite. "}{q.why}</span>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
