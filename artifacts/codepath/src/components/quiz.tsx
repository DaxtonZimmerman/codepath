import { useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";
import type { QuizQ } from "@/lib/curriculum";
import { cn } from "@/lib/utils";

export function Quiz({ questions, onSubmit }: { questions: QuizQ[]; onSubmit: (allCorrect: boolean) => void }) {
  const [picks, setPicks] = useState<(number | null)[]>(questions.map(() => null));
  const [checked, setChecked] = useState(false);
  const allPicked = picks.every((p) => p !== null);
  const correct = picks.filter((p, i) => p === questions[i].answer).length;

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => (
        <fieldset key={qi} className="rounded-2xl border bg-card p-5 sm:p-6" data-testid={`quiz-question-${qi}`}>
          <legend className="sr-only">Question {qi + 1}</legend>
          <p className="font-display text-lg font-semibold mb-4"><span className="font-mono text-primary text-sm mr-2">Q{qi + 1}</span>{q.q}</p>
          <div className="grid gap-2">
            {q.options.map((o, oi) => {
              const picked = picks[qi] === oi;
              const right = checked && oi === q.answer;
              const wrong = checked && picked && oi !== q.answer;
              return (
                <label key={oi} className={cn(
                  "press flex items-center gap-3 rounded-xl border-2 px-4 py-3 cursor-pointer transition-colors font-mono text-sm",
                  picked && !checked && "border-foreground bg-secondary",
                  right && "border-pine bg-pine/10",
                  wrong && "border-primary bg-primary/10 shake",
                  !picked && !right && "border-border hover:border-foreground/40",
                  checked && "cursor-default",
                )}>
                  <input type="radio" className="sr-only peer" name={`q-${qi}`} checked={picked} disabled={checked}
                    onChange={() => setPicks((p) => p.map((v, i) => (i === qi ? oi : v)))} data-testid={`radio-q${qi}-o${oi}`} />
                  <span className="grid place-items-center size-6 rounded-md border text-xs shrink-0 peer-focus-visible:ring-2 ring-primary">
                    {right ? <Check className="size-4 text-pine" /> : wrong ? <X className="size-4 text-primary" /> : String.fromCharCode(65 + oi)}
                  </span>
                  {o}
                </label>
              );
            })}
          </div>
          {checked && (
            <p className={cn("mt-4 text-sm rounded-lg p-3 rise", picks[qi] === q.answer ? "bg-pine/10" : "bg-primary/10")}>
              <strong>{picks[qi] === q.answer ? "Right. " : "Not quite. "}</strong>{q.explanation}
            </p>
          )}
        </fieldset>
      ))}
      <div className="flex flex-wrap items-center gap-3">
        {!checked ? (
          <button disabled={!allPicked} onClick={() => { setChecked(true); onSubmit(correct === questions.length); }}
            className="press rounded-xl bg-foreground text-background px-6 py-3 font-semibold disabled:opacity-40" data-testid="button-check-quiz">
            Check answers
          </button>
        ) : (
          <>
            <p className="font-display text-lg font-semibold" data-testid="text-quiz-score">{correct} of {questions.length} correct</p>
            {correct < questions.length && (
              <button onClick={() => { setChecked(false); setPicks(questions.map(() => null)); }} className="press inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2 font-medium" data-testid="button-retry-quiz">
                <RotateCcw className="size-4" /> Try again
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
