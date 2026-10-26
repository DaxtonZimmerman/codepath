import { Check } from "lucide-react";
import { actions } from "@/lib/store";
import { cn } from "@/lib/utils";

export type Goal = "javascript" | "portfolio" | "full";

export const GOALS: { id: Goal; title: string; detail: string }[] = [
  { id: "javascript", title: "Get stronger at JavaScript", detail: "Skip what you know. Start at JavaScript lessons and small projects." },
  { id: "portfolio", title: "Build a portfolio app", detail: "Learn just enough, then build something you can publish and show." },
  { id: "full", title: "Follow the full web development path", detail: "HTML, CSS, then JavaScript, in order. Skip ahead any time." },
];

export const goalLabel = (g: Goal | null) => GOALS.find((x) => x.id === g)?.title ?? "No goal chosen";

export function GoalPicker({ value, compact = false }: { value: Goal | null; compact?: boolean }) {
  return (
    <fieldset className="min-w-0">
      <legend className="sr-only">Choose your goal</legend>
      <div className={cn("grid gap-2.5", !compact && "sm:grid-cols-3")}>
        {GOALS.map((g) => {
          const on = value === g.id;
          return (
            <label key={g.id} data-testid={`option-goal-${g.id}`}
              className={cn("relative flex cursor-pointer gap-3 rounded-2xl border-2 p-4 transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
                on ? "border-foreground bg-marker/25" : "border-border bg-card hover:border-foreground/40")}>
              <input type="radio" name="goal" value={g.id} checked={on} onChange={() => actions.setGoal(g.id)} className="sr-only" />
              <span aria-hidden className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2", on ? "border-foreground bg-foreground text-background" : "border-foreground/30")}>
                {on && <Check className="size-3" />}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold leading-snug">{g.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{g.detail}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
