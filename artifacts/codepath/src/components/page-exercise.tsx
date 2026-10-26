import { useMemo, useState } from "react";
import { Check, X, Play, Lightbulb } from "lucide-react";
import { actions, useStore, useStorageStatus } from "@/lib/store";
import { checkPageExercise, pagePreview, type PageExercise, type PageResult } from "@/lib/page-exercises";
import { CodeEditor } from "./code-editor";

export function PageExercisePanel({ lessonId, exercise, onResult }: { lessonId: string; exercise: PageExercise; onResult: (passed: boolean) => void }) {
  const saved = useStore();
  const storage = useStorageStatus();
  const [code, setCode] = useState(() => saved.drafts[lessonId] ?? exercise.starter);
  const [results, setResults] = useState<PageResult[] | null>(null);
  const [error, setError] = useState("");
  const [hints, setHints] = useState(0);
  const doc = useMemo(() => pagePreview(exercise, code), [exercise, code]);
  function update(value: string) { setCode(value); actions.saveDraft(lessonId, value); setResults(null); setError(""); }
  function check() {
    try {
      const next = checkPageExercise(exercise, code);
      setResults(next); setError("");
      const passed = next.length > 0 && next.every((result) => result.passed);
      actions.recordAttempt(lessonId, passed, "challenge"); onResult(passed);
    } catch (error) { setError(error instanceof Error ? error.message : String(error)); }
  }
  return <div className="space-y-5">
    <div className="rounded-2xl border-2 bg-card p-5"><p className="font-mono text-xs uppercase tracking-widest text-primary">Your task</p><p className="mt-2 leading-relaxed">{exercise.prompt}</p></div>
    <CodeEditor value={code} onChange={update} onRun={check} filename={exercise.language === "html" ? "index.html" : "styles.css"} label={`Edit ${exercise.language.toUpperCase()} exercise`} />
    <div className="flex flex-wrap items-center gap-3">
      <button onClick={check} className="press inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground" data-testid="button-check-page"><Play className="size-4" /> Check my code</button>
      <button onClick={() => setHints((value) => value + 1)} disabled={hints >= exercise.hints.length} className="press inline-flex items-center gap-2 rounded-xl border-2 px-4 py-3 disabled:opacity-40"><Lightbulb className="size-4" /> Get a hint</button>
      <p role="status" className={`text-xs ${storage.error ? "text-destructive" : "text-muted-foreground"}`}>{storage.error ? "Draft not saved" : "Draft saved in this browser"}</p>
    </div>
    {exercise.hints.slice(0, hints).map((hint, index) => <p key={hint} className="rounded-xl bg-marker/25 p-4 text-sm"><strong>Hint {index + 1}: </strong>{hint}</p>)}
    <div aria-live="polite">
      {error && <p role="alert" className="rounded-xl bg-destructive/10 p-4 text-sm">{error}</p>}
      {results && <div className="space-y-2"><p className="font-semibold">{results.every((result) => result.passed) ? "All checks passed. Lesson complete." : `${results.filter((result) => result.passed).length} of ${results.length} checks passed. Keep going.`}</p>{results.map((result) => <p key={result.label} className={`flex items-center gap-2 rounded-xl border p-3 text-sm ${result.passed ? "border-pine/40 bg-pine/5" : "border-primary/40 bg-primary/5"}`}>{result.passed ? <Check className="size-4 shrink-0 text-pine" /> : <X className="size-4 shrink-0 text-primary" />}{result.label}</p>)}</div>}
    </div>
    <section aria-label="Exercise preview"><h3 className="mb-3 font-semibold">Your page preview</h3><iframe title="Exercise preview" sandbox="" referrerPolicy="no-referrer" srcDoc={doc} className="h-80 w-full rounded-xl border bg-white" /><p className="mt-2 text-xs text-muted-foreground">The preview updates as you type. Checks inspect the required elements or CSS declarations; review the visual result yourself too. Scripts, external resources, and form submission are disabled in this lesson preview.</p></section>
  </div>;
}
