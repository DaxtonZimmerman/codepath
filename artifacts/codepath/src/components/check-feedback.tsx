import { explainMismatch, explainRunError } from "@/lib/check-feedback";
export type FeedbackResult = { label: string; passed: boolean; actual?: string; expected?: string };
export function CheckFeedback({ results, error, stale = false, functionName }: { results?: FeedbackResult[] | null; error?: string | null; stale?: boolean; functionName?: string }) {
  const diagnostic = error ? explainRunError(error, functionName) : null;
  const firstMiss = results?.find(result => !result.passed);
  return <section aria-label="Check feedback" aria-live="polite" className="space-y-3">
    {stale && <p className="rounded-xl border bg-secondary p-4 text-sm">Your code changed. These results belong to the earlier version; run the checks again.</p>}
    {!stale && diagnostic && <div role="alert" className="rounded-xl border border-primary/50 bg-primary/5 p-4"><h3 className="font-semibold">{diagnostic.title}</h3><pre className="mt-2 overflow-auto whitespace-pre-wrap break-words text-xs">{error}</pre><p className="mt-3 text-sm"><strong>Try next: </strong>{diagnostic.next}</p></div>}
    {!stale && results && results.length > 0 && <>
      <p className="font-semibold">{results.every(r => r.passed) ? "All disclosed checks pass for this version." : `${results.filter(r => r.passed).length} of ${results.length} checks pass. Start with the first difference.`}</p>
      {firstMiss && <div className="rounded-xl bg-marker/25 p-4 text-sm"><strong>Try next: </strong>{firstMiss.actual !== undefined ? explainMismatch(firstMiss) : `Inspect “${firstMiss.label}” in the requirements. Compare the selector, content or declaration with your current code.`}</div>}
      <ul className="space-y-2">{results.map((r, i) => <li key={i} className={`rounded-xl border p-3 text-sm ${r.passed ? "border-pine/30 bg-pine/5" : "border-primary/40 bg-primary/5"}`}><p className="font-medium">{r.passed ? "✓" : "○"} {r.label}</p>{!r.passed && r.expected !== undefined && <dl className="mt-2 grid gap-2 text-xs sm:grid-cols-2"><div className="min-w-0"><dt className="text-muted-foreground">Expected</dt><dd className="mt-1 whitespace-pre-wrap break-words font-mono">{r.expected}</dd></div><div className="min-w-0"><dt className="text-muted-foreground">Received</dt><dd className="mt-1 whitespace-pre-wrap break-words font-mono">{r.actual}</dd></div></dl>}</li>)}</ul>
    </>}
  </section>;
}
