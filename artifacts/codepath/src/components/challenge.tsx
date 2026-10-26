import { useState } from "react";
import { Play, Lightbulb, Check, X, RotateCcw, AlertTriangle } from "lucide-react";
import type { Challenge } from "@/lib/curriculum";
import { runChallenge } from "@/lib/runner";
import { actions, useStore, useStorageStatus } from "@/lib/store";
import { CodeEditor } from "./code-editor";
import { cn } from "@/lib/utils";

type Result = { passed: boolean; label: string; actual: string; expected: string };

export function ChallengePanel({ lessonId, challenge, onResult }: { lessonId: string; challenge: Challenge; onResult: (passed: boolean) => void }) {
  const s = useStore();
  const [code, setCode] = useState(() => s.drafts[lessonId] ?? challenge.starter);
  const [results, setResults] = useState<Result[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [hints, setHints] = useState(0);
  const storage = useStorageStatus();

  // Save every change immediately so quick navigation never loses the last draft.
  function update(next: string) {
    setCode(next);
    actions.saveDraft(lessonId, next);
  }

  async function run() {
    if (running) return;
    setRunning(true); setError(null); setResults(null);
    try {
      const r = await runChallenge(code, challenge.functionName, challenge.tests);
      setResults(r);
      const ok = r.every((x) => x.passed);
      actions.recordAttempt(lessonId, ok, "challenge");
      onResult(ok);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      actions.recordAttempt(lessonId, false, "challenge");
      onResult(false);
    } finally {
      setRunning(false);
    }
  }

  const passCount = results?.filter((r) => r.passed).length ?? 0;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border-2 border-foreground/80 bg-card p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Your task</p>
        <p className="text-base leading-relaxed">{challenge.prompt}</p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">Define <span className="text-foreground font-semibold">{challenge.functionName}</span>. It runs in an isolated worker with a 2 second limit.</p>
      </div>

      <CodeEditor value={code} onChange={update} onRun={run} label={`Code editor for ${challenge.functionName}`} />

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={run} disabled={running} className="press inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 font-semibold shadow-md disabled:opacity-60" data-testid="button-run-tests">
          <Play className={cn("size-4", running && "animate-pulse")} /> {running ? "Running tests..." : "Run tests"}
        </button>
        <button onClick={() => setHints((h) => Math.min(challenge.hints.length, h + 1))} disabled={hints >= challenge.hints.length}
          className="press inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 font-medium disabled:opacity-40" data-testid="button-hint">
          <Lightbulb className="size-4" /> {hints === 0 ? "Get a hint" : hints < challenge.hints.length ? "Next hint" : "All hints shown"}
        </button>
        <button onClick={() => { update(challenge.starter); setResults(null); setError(null); }} className="press inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground" data-testid="button-reset-code">
          <RotateCcw className="size-4" /> Reset code
        </button>
        <span className={cn("ml-auto font-mono text-xs", storage.error ? "text-destructive font-semibold" : "text-muted-foreground")} aria-live="polite" data-testid="status-draft">{storage.error ? "Draft not saved" : "Draft saved in this browser"}</span>
      </div>

      {hints > 0 && (
        <ol className="space-y-2" aria-label="Hints">
          {challenge.hints.slice(0, hints).map((h, i) => (
            <li key={i} className="rise flex gap-3 rounded-xl bg-marker/30 border border-marker p-4 text-sm">
              <span className="font-mono font-semibold shrink-0">Hint {i + 1}/{challenge.hints.length}</span><span>{h}</span>
            </li>
          ))}
        </ol>
      )}

      <div aria-live="polite">
        {running && (
          <div className="space-y-2">{challenge.tests.map((t) => <div key={t.label} className="h-12 rounded-xl bg-muted animate-pulse" />)}</div>
        )}
        {error && (
          <div className="rise rounded-xl border-2 border-primary bg-primary/5 p-4" data-testid="status-run-error">
            <p className="flex items-center gap-2 font-semibold"><AlertTriangle className="size-4 text-primary" /> Your code stopped before finishing</p>
            <pre className="mt-2 font-mono text-xs whitespace-pre-wrap text-muted-foreground">{error}</pre>
            <p className="mt-2 text-sm">Common causes: a typo in the function name, an infinite loop, or reading a property of undefined. This counts as a miss, so it will come back for review tomorrow.</p>
          </div>
        )}
        {results && (
          <div className="space-y-2 rise">
            <p className="font-display text-lg font-semibold" data-testid="text-test-summary">
              {passCount === results.length ? "Every test passes. Lesson complete." : `${passCount} of ${results.length} tests passing. Read the failing ones closely.`}
            </p>
            {results.map((r, i) => (
              <div key={i} className={cn("rounded-xl border p-3 font-mono text-xs", r.passed ? "border-pine/40 bg-pine/5" : "border-primary/50 bg-primary/5")} data-testid={`result-test-${i}`}>
                <div className="flex items-center gap-2 font-sans text-sm font-medium">
                  {r.passed ? <Check className="size-4 text-pine" /> : <X className="size-4 text-primary" />} {r.label}
                </div>
                {!r.passed && (
                  <div className="mt-2 grid sm:grid-cols-2 gap-2">
                    <div><span className="text-muted-foreground">expected </span>{r.expected}</div>
                    <div><span className="text-muted-foreground">received </span>{r.actual}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
