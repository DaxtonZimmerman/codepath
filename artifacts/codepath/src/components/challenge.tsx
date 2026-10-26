import { useRef, useState } from "react";
import { Play, Lightbulb, RotateCcw } from "lucide-react";
import type { Challenge } from "@/lib/curriculum";
import { runChallenge } from "@/lib/runner";
import { actions, useStore, useStorageStatus } from "@/lib/store";
import { CodeEditor } from "./code-editor";
import { CheckFeedback } from "./check-feedback";

export function ChallengePanel({ lessonId, challenge, onResult }: { lessonId: string; challenge: Challenge; onResult: (passed: boolean) => void }) {
  const s = useStore(), storage = useStorageStatus();
  const code = s.drafts[lessonId] ?? challenge.starter;
  const latest = useRef(code); latest.current = code;
  const lock = useRef(false);
  const [running, setRunning] = useState(false), [hints, setHints] = useState(0);
  const evidence = s.learning.evidence[`lesson:${lessonId}`];
  const stale = !!evidence && evidence.source !== code;
  const error = !stale && evidence?.results.find(r => r.label === "Code runs successfully" && !r.passed)?.actual;
  function update(value: string) { latest.current = value; actions.saveDraft(lessonId, value); }
  async function run() {
    if(lock.current) return;
    lock.current = true; setRunning(true);
    const source = latest.current;
    actions.saveDraft(lessonId, source);
    try {
      const results = await runChallenge(source, challenge.functionName, challenge.tests);
      const passed = results.length > 0 && results.every(r => r.passed);
      actions.saveLearningEvidence(`lesson:${lessonId}`, { at: new Date().toISOString(), source, mode: "tests", results }, false);
      actions.recordAttempt(lessonId, passed, "challenge");
      if(latest.current === source) onResult(passed);
    } catch(error) {
      const message = error instanceof Error ? error.message : String(error);
      actions.saveLearningEvidence(`lesson:${lessonId}`, { at: new Date().toISOString(), source, mode: "tests", results: [{ label: "Code runs successfully", passed: false, actual: message }] }, false);
      actions.recordAttempt(lessonId, false, "challenge");
      if(latest.current === source) onResult(false);
    } finally { lock.current = false; setRunning(false); }
  }
  return <div className="space-y-4">
    <div className="rounded-xl border bg-card p-4"><h3 className="font-semibold">Your task</h3><p className="mt-2 text-sm leading-relaxed">{challenge.prompt}</p><p className="mt-3 text-xs text-muted-foreground">Define <code className="font-semibold text-foreground">{challenge.functionName}</code>. Checks compare its returned values with the disclosed cases.</p><details className="mt-3"><summary className="cursor-pointer text-sm font-semibold">See every input and expected result</summary><ul className="mt-3 space-y-2 text-xs font-mono">{challenge.tests.map(t => <li key={t.label} className="overflow-auto rounded-lg bg-secondary p-3"><p className="mb-1 font-sans font-semibold">{t.label}</p>{challenge.functionName}({t.args.map(a => JSON.stringify(a)).join(", ")}) → {JSON.stringify(t.expected)}{t.preserveArgs && <p className="mt-1">Input must stay unchanged.</p>}</li>)}</ul></details></div>
    <CodeEditor value={code} onChange={update} onRun={run} label={`Code editor for ${challenge.functionName}`} />
    <div className="flex flex-wrap gap-2"><button disabled={running} onClick={run} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40" data-testid="button-run-tests"><Play className="size-4" />{running ? "Checking…" : "Run tests"}</button><button disabled={hints >= challenge.hints.length} onClick={() => setHints(hints + 1)} className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold disabled:opacity-40"><Lightbulb className="size-4" />{hints ? "Next hint" : "Get a hint"}</button><button onClick={() => update(challenge.starter)} className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-muted-foreground"><RotateCcw className="size-4" />Reset code</button></div>
    <p role="status" className={`text-xs ${storage.error ? "text-destructive" : "text-muted-foreground"}`}>{storage.error ? "Draft not saved — see the storage notice." : "Draft saved in this browser."} Run with Ctrl+Enter or Command+Enter.</p>
    {hints > 0 && <ol className="space-y-2" aria-label="Hints">{challenge.hints.slice(0,hints).map((hint,i) => <li key={i} className="rounded-xl bg-marker/25 p-4 text-sm"><strong>Hint {i+1}: </strong>{hint}</li>)}</ol>}
    {running ? <p role="status" className="rounded-xl bg-secondary p-4 text-sm">Checking the disclosed cases…</p> : <CheckFeedback results={error ? null : evidence?.results} error={error || undefined} stale={stale} functionName={challenge.functionName} />}
  </div>;
}
