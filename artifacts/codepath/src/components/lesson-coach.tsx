import { Link } from "wouter";
import { actions, useStore } from "@/lib/store";
import { LESSON_COACHING } from "@/lib/lesson-coaching";
import { CodeBlock } from "./code-editor";

export function WorkedTrace({ lessonId }: { lessonId: string }) {
  const s = useStore(), coach = LESSON_COACHING[lessonId];
  const key = `prediction:${lessonId}`, revealed = s.drafts[`${key}:revealed`] === "yes";
  return <section className="space-y-3 border-t pt-5" aria-label="Predict and trace">
    <p className="font-mono text-xs uppercase tracking-widest text-primary">Predict → trace → explain</p>
    <h3 className="font-display text-xl font-bold">What happens here?</h3>
    <CodeBlock code={coach.code} />
    <label className="block text-sm font-semibold">Your prediction<textarea rows={3} value={s.drafts[key] ?? ""} onChange={e => actions.saveDraft(key, e.target.value)} className="mt-2 w-full rounded-xl border bg-background p-3 font-normal" placeholder="Predict the output or behavior. Explain why." /></label>
    <button onClick={() => actions.saveDraft(`${key}:revealed`, revealed ? "no" : "yes")} className="rounded-xl border px-4 py-2.5 text-sm font-semibold">{revealed ? "Hide the worked explanation" : "Reveal the worked explanation"}</button>
    {revealed && <div className="space-y-3 rounded-xl bg-pine/10 p-4" data-testid="worked-explanation"><p className="text-sm"><strong>Expected behavior: </strong>{coach.answer}</p><ol className="list-decimal space-y-2 pl-5 text-sm">{coach.steps.map(step => <li key={step}>{step}</li>)}</ol><p className="text-sm font-medium">{coach.reason}</p><p className="text-xs text-muted-foreground">Compare your reasoning. This is practice; revealing the explanation does not pass a lesson.</p></div>}
  </section>;
}
export function ProjectConnection({ lessonId, courseId }: { lessonId: string; courseId: string }) {
  const coach = LESSON_COACHING[lessonId];
  return <section className="rounded-xl border border-primary/30 bg-primary/5 p-4" aria-label="Use this in your app"><h3 className="font-semibold">Use this in your app</h3><p className="mt-2 text-sm leading-relaxed">{coach.apply}</p><p className="mt-2 text-sm"><strong>Verify it: </strong>{coach.verify}</p><Link href={`/learn/${courseId}#project`} className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open the module project →</Link></section>;
}
