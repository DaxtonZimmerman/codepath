import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, X } from "lucide-react";
import { ASSESSMENT, LESSONS, lessonById } from "@/lib/curriculum";
import { actions, useStore } from "@/lib/store";
import { prettyDate } from "@/lib/progress";
import { PageHeader } from "@/components/shell";
import { cn } from "@/lib/utils";

function recommend(answers: number[]) {
  const miss = ASSESSMENT.findIndex((q, i) => answers[i] !== q.answer);
  if (miss >= 0) return ASSESSMENT[miss].lesson;
  return "ts-types";
}

export default function Assessment() {
  const s = useStore();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);
  const finished = answers.length === ASSESSMENT.length && revealed && i === ASSESSMENT.length - 1;
  const [showResult, setShowResult] = useState(false);

  const q = ASSESSMENT[i];
  const pick = answers[i];

  function choose(o: number) {
    if (revealed) return;
    setAnswers((a) => { const n = [...a]; n[i] = o; return n; });
    setRevealed(true);
  }
  function nextQ() {
    if (i < ASSESSMENT.length - 1) { setI(i + 1); setRevealed(false); return; }
    const score = ASSESSMENT.filter((x, k) => answers[k] === x.answer).length;
    actions.saveAssessment({ at: new Date().toISOString(), score, recommended: recommend(answers), answers });
    setShowResult(true);
  }
  function restart() { setI(0); setAnswers([]); setRevealed(false); setShowResult(false); setStarted(true); }

  if (showResult || (!started && s.assessment)) {
    const a = s.assessment!;
    const rec = lessonById(a.recommended)!;
    return (
      <div className="max-w-2xl">
        <PageHeader kicker={`Skills check · ${prettyDate(a.at)}`} title={<>{a.score} of {ASSESSMENT.length}. <span className="marker">Here is your start.</span></>}>
          This is a suggestion, not a grade. Nothing was marked as mastered; lessons still count only when you pass them.
        </PageHeader>
        <Link href={`/lesson/${rec.id}`} className="lift pop flex items-center gap-4 rounded-3xl bg-ink text-background p-7" data-testid="link-recommended">
          <div><p className="font-mono text-xs uppercase tracking-widest text-marker">Recommended · Lesson {LESSONS.indexOf(rec) + 1}</p><p className="font-display text-2xl font-bold mt-2">{rec.title}</p><p className="text-background/70 text-sm mt-1">{rec.summary}</p></div>
          <ArrowRight className="ml-auto size-6 shrink-0" />
        </Link>
        <ul className="mt-8 space-y-2">
          {ASSESSMENT.map((x, k) => (
            <li key={k} className="flex items-start gap-3 text-sm rounded-xl border bg-card p-3">
              {a.answers[k] === x.answer ? <Check className="size-4 text-pine mt-0.5 shrink-0" /> : <X className="size-4 text-primary mt-0.5 shrink-0" />}
              <span>{x.q} <span className="text-muted-foreground">Relates to {lessonById(x.lesson)?.title}.</span></span>
            </li>
          ))}
        </ul>
        <button onClick={restart} className="press mt-6 rounded-xl border-2 px-5 py-2.5 font-medium" data-testid="button-retake">Take it again</button>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-2xl">
        <PageHeader kicker="Skills check" title={<>Six questions. <span className="marker">No pressure.</span></>}>
          You will see an explanation after each answer. At the end, Codepath suggests where to start. Guessing is fine; "I do not know" is useful data.
        </PageHeader>
        <button onClick={() => setStarted(true)} className="press inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3 font-semibold shadow-md" data-testid="button-start-assessment">Begin <ArrowRight className="size-4" /></button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8" aria-label={`Question ${i + 1} of ${ASSESSMENT.length}`}>
        {ASSESSMENT.map((_, k) => <div key={k} className={cn("h-1.5 flex-1 rounded-full transition-colors", k < i || (k === i && revealed) ? "bg-primary" : k === i ? "bg-foreground/40" : "bg-muted")} />)}
      </div>
      <div key={i} className="rise">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Question {i + 1} of {ASSESSMENT.length}</p>
        <h1 className="font-display text-3xl font-extrabold mt-2">{q.q}</h1>
        {q.code && <pre className="code-surface mt-4 rounded-xl p-4 font-mono text-sm overflow-x-auto">{q.code}</pre>}
        <div className="mt-6 grid gap-2" role="radiogroup" aria-label="Answer choices">
          {q.options.map((o, k) => (
            <button key={k} role="radio" aria-checked={pick === k} onClick={() => choose(k)} disabled={revealed}
              className={cn("press text-left flex items-center gap-3 rounded-xl border-2 px-4 py-3 font-mono text-sm transition-colors",
                revealed && k === q.answer ? "border-pine bg-pine/10" : revealed && pick === k ? "border-primary bg-primary/10" : "hover:border-foreground/50")}
              data-testid={`button-option-${k}`}>
              <span className="grid place-items-center size-6 rounded-md border text-xs">{String.fromCharCode(65 + k)}</span>{o}
            </button>
          ))}
        </div>
        {revealed && (
          <div className="rise mt-5 rounded-xl bg-card border p-4" aria-live="polite">
            <p className="text-sm"><strong>{pick === q.answer ? "Correct. " : "Good to know. "}</strong>{q.explanation}</p>
            <button onClick={nextQ} className="press mt-4 inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-5 py-2.5 font-semibold" data-testid="button-next-question">
              {finished ? "See my starting point" : "Next"} <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
