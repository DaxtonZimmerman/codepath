import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams, useSearch } from "wouter";
import {
  ArrowLeft, Copy, Download, History, RotateCcw, CheckCircle2, Circle, XCircle, Lightbulb, BookOpen, Dumbbell,
  Eye, AlertTriangle, Loader2, FlaskConical, ClipboardCopy, RotateCw, FileDown, ChevronRight,
} from "lucide-react";
import { courseById } from "@/lib/bootcamp";
import { useProjects, saveProject, refreshProjects } from "@/lib/studio-db";
import { FILE_NAMES, fingerprint, isComplete, validUrl, type FileName, type StudioProject, type CheckResult } from "@/lib/studio-model";
import { MILESTONES, PRODUCT_EXAMPLE, PRODUCT_STARTER, BLANK_STARTER, PRODUCTS } from "@/lib/studio-content";
import { exportProject } from "@/lib/studio-export";
import { runProductChecks, SUITES } from "@/lib/studio-checks";
import { addDays, downloadFile, getProgress } from "@/lib/store";
import { CodeEditor, CodeBlock } from "@/components/code-editor";
import { StudioPreview } from "@/components/studio-preview";
import { CONCEPT_NAMES } from "@/components/project-reviews";
import { duplicateOf } from "@/pages/build";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type SaveState = "saved" | "pending" | "saving" | "error";
const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));
const field = "w-full min-w-0 rounded-xl border-2 bg-background px-3 py-2 outline-none focus:border-foreground";
const REFLECT = ["What did you build?", "What was difficult, and how did you solve it?", "What would you improve next?"];
const LEVELS = ["Question", "Hint", "Example of the technique"];

/** Autosave with a serialized write chain: later edits always land after earlier ones. */
function useAutosave() {
  const ref = useRef<StudioProject | null>(null);
  const [project, setProject] = useState<StudioProject | null>(null);
  const [status, setStatus] = useState<SaveState>("saved");
  const [error, setError] = useState<string | null>(null);
  const chain = useRef<Promise<void>>(Promise.resolve());
  const timer = useRef<number | undefined>(undefined);
  const version = useRef(0);
  const dirty = useRef(false);

  function flush() {
    window.clearTimeout(timer.current); timer.current = undefined;
    const snap = ref.current; if (!snap) return;
    const v = ++version.current;
    setStatus("saving");
    chain.current = chain.current.then(() => saveProject(snap)).then(
      () => { if (v === version.current) { dirty.current = false; setStatus("saved"); setError(null); } },
      (e) => { setStatus("error"); setError(msg(e)); },
    );
  }
  function update(fn: (p: StudioProject) => StudioProject, immediate = false) {
    if (!ref.current) return;
    const next = { ...fn(ref.current), updatedAt: new Date().toISOString() };
    ref.current = next; setProject(next);
    dirty.current = true;
    version.current++;
    if (immediate) { flush(); return; }
    setStatus("pending");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(flush, 500);
  }
  function init(p: StudioProject) { ref.current = p; setProject(p); }

  useEffect(() => {
    const before = (e: BeforeUnloadEvent) => { if (dirty.current) { if (timer.current) flush(); e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", before);
    return () => { window.removeEventListener("beforeunload", before); if (timer.current) flush(); };
    // flush reads refs only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { project, status, error, update, flush, init };
}

export default function Studio() {
  const { id } = useParams<{ id: string }>();
  const search = new URLSearchParams(useSearch());
  const { projects, loading, error: loadError } = useProjects();
  const { project: p, status, error, update, flush, init } = useAutosave();
  const inited = useRef<string | null>(null);
  const [, go] = useLocation();
  const { toast } = useToast();

  const [file, setFile] = useState<FileName>("script.js");
  const [step, setStep] = useState(0);
  const [help, setHelp] = useState(0);
  const [example, setExample] = useState(false);
  const [tab, setTab] = useState<"checks" | "details" | "versions" | "reflect">("checks");
  const [running, setRunning] = useState<string | null>(null);
  const [resetFile, setResetFile] = useState<FileName | null>(null);
  const [restoreV, setRestoreV] = useState<string | null>(null);
  const [vTitle, setVTitle] = useState("");

  const stored = projects.find((x) => x.id === id);
  useEffect(() => {
    if (!stored || inited.current === stored.id) return;
    inited.current = stored.id;
    const qs = Number(search.get("step"));
    const s0 = Number.isInteger(qs) && qs >= 0 && qs <= 5 && search.has("step") ? qs : stored.step;
    setStep(s0);
    if (stored.courseId === "web") setFile("index.html");
    init({ ...stored, lastOpenedAt: new Date().toISOString() });
    update((x) => ({ ...x, step: s0 }), true);
    document.title = `${stored.title} · Build · Codepath`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stored]);

  if (loading) return <div className="space-y-4" aria-label="Loading project"><div className="h-10 w-2/3 rounded-xl bg-muted animate-pulse" /><div className="h-96 rounded-2xl bg-muted animate-pulse" /></div>;
  if (loadError) return (
    <div role="alert" className="rounded-2xl border-2 border-destructive/50 bg-destructive/10 p-6">
      <p className="font-semibold">This project could not be loaded.</p><p className="text-sm text-muted-foreground break-words">{loadError}</p>
      <button onClick={() => refreshProjects()} className="press mt-3 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-3.5 py-2 text-sm font-semibold" data-testid="button-retry-load"><RotateCw className="size-4" /> Try again</button>
    </div>
  );
  if (!stored && !p) return (
    <div className="py-16 text-center">
      <p className="font-mono text-primary">Project not found</p>
      <h1 className="font-display text-3xl font-extrabold mt-2">That project is not in this browser.</h1>
      <Link href="/build" className="mt-6 inline-flex rounded-xl bg-foreground text-background px-5 py-3 font-semibold" data-testid="link-back-build">Back to Build</Link>
    </div>
  );
  if (!p) return null;

  const guided = p.kind === "product-filter";
  const starter = guided ? PRODUCT_STARTER : BLANK_STARTER;
  const stale = !!p.evidence && p.evidence.fingerprint !== fingerprint(p.files);
  const current = p.evidence && !stale ? p.evidence.results : null;
  const complete = isComplete(p);
  const ms = MILESTONES[step];
  const conceptOk = (c: string) => !!current && current.some((r) => r.concept === c) && current.filter((r) => r.concept === c).every((r) => r.passed);
  const stepDone = (i: number) => MILESTONES[i].concept === "review" ? complete : conceptOk(MILESTONES[i].concept);
  const returnTo = encodeURIComponent(`/build/${p.id}?step=${step}`);

  function pickStep(i: number) { setStep(i); setHelp(0); update((x) => ({ ...x, step: i })); }

  async function runChecks() {
    if (!p) return;
    flush();
    const files = p.files;
    setRunning(`0/${SUITES.length}`);
    try {
      const results = await runProductChecks(files, (d, t) => setRunning(`${d}/${t}`));
      update((x) => {
        const reviews = { ...x.reviews };
        for (const c of new Set(results.map((r) => r.concept))) {
          const ok = results.filter((r) => r.concept === c).every((r) => r.passed);
          if (!ok) reviews[c] = { due: addDays(1), lastResult: "miss" };
          else if (!reviews[c]) reviews[c] = { due: addDays(3), lastResult: "pass" };
        }
        return { ...x, evidence: { fingerprint: fingerprint(files), at: new Date().toISOString(), results }, reviews };
      }, true);
      const n = results.filter((r) => r.passed).length;
      toast({ title: `${n} of ${results.length} checks passed`, description: n === results.length ? "Every behavior check passes." : "Open a failed check to see what was expected." });
    } catch (e) {
      toast({ title: "Checks could not run", description: msg(e), variant: "destructive" });
    } finally { setRunning(null); }
  }

  async function duplicate() {
    if (!p) return;
    flush();
    try { const c = duplicateOf(p); await saveProject(c); toast({ title: "Copy created", description: "You are now in the copy." }); inited.current = null; go(`/build/${c.id}`); }
    catch (e) { toast({ title: "Copy failed", description: msg(e), variant: "destructive" }); }
  }
  function doExport() {
    if (!p) return;
    try { exportProject(p); toast({ title: "ZIP downloaded", description: "Unzip and open index.html. The README explains publishing." }); }
    catch (e) { toast({ title: "Export failed", description: msg(e), variant: "destructive" }); }
  }
  function emergency() {
    if (!p) return;
    downloadFile(`${p.title.replace(/[^a-z0-9_-]+/gi, "-") || "project"}-unsaved.json`, new Blob([JSON.stringify({ format: "codepath-backup", version: 1, progress: getProgress(), projects: [p] }, null, 2)], { type: "application/json" }));
  }
  function snapshot() {
    const title = vTitle.trim() || `Version ${(p?.versions.length ?? 0) + 1}`;
    update((x) => ({ ...x, versions: [{ id: crypto.randomUUID(), title, at: new Date().toISOString(), files: { ...x.files } }, ...x.versions] }), true);
    setVTitle("");
    toast({ title: "Version saved", description: title });
  }
  async function copyReflection() {
    if (!p) return;
    const text = `${p.title}\n${p.description}\n\nWhat I built: ${p.reflection[0]}\nWhat was difficult, and how I solved it: ${p.reflection[1]}\nWhat I would improve next: ${p.reflection[2]}${p.liveUrl ? `\n\nLive: ${p.liveUrl}` : ""}${p.repoUrl ? `\nCode: ${p.repoUrl}` : ""}`;
    try { await navigator.clipboard.writeText(text); toast({ title: "Copied", description: "Paste it into your portfolio." }); }
    catch { toast({ title: "Copy blocked by the browser", description: "Select the text in the fields and copy it manually.", variant: "destructive" }); }
  }

  return (
    <div className="space-y-6 min-w-0">
      {p.courseId && courseById(p.courseId) && <Link href={`/learn/${p.courseId}#project`} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 text-sm" data-testid="link-bootcamp-project"><BookOpen className="size-4 shrink-0 text-primary" /><span><strong>{courseById(p.courseId)?.title}</strong> · Open your module brief and project review</span><ChevronRight className="ml-auto size-4 shrink-0" /></Link>}
      {/* Header: where am I, save state, main actions */}
      <header className="space-y-3">
        <Link href="/build" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground" data-testid="link-back"><ArrowLeft className="size-4" /> Build</Link>
        <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
          <div className="min-w-0 flex-1 basis-64">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{guided ? `Guided project · step ${step + 1} of 6` : "Own project"}</p>
            <label className="sr-only" htmlFor="p-title">Project title</label>
            <input id="p-title" value={p.title} maxLength={160} onChange={(e) => update((x) => ({ ...x, title: e.target.value || " " }))}
              className="mt-1 w-full min-w-0 bg-transparent font-display text-3xl sm:text-4xl font-extrabold leading-tight outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary" data-testid="input-title" />
          </div>
          <SaveBadge status={status} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={doExport} className="press inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold" data-testid="button-export-zip"><Download className="size-4" /> Export ZIP</button>
          <button onClick={duplicate} className="press inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-semibold" data-testid="button-duplicate"><Copy className="size-4" /> Duplicate</button>
          <button onClick={() => setTab("versions")} className="press inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-semibold" data-testid="button-open-versions"><History className="size-4" /> Versions ({p.versions.length})</button>
          {complete && <span className="inline-flex items-center gap-1.5 rounded-xl bg-pine/15 text-pine px-3 py-2 text-sm font-semibold" data-testid="status-complete"><CheckCircle2 className="size-4" /> Complete</span>}
        </div>
        {status === "error" && (
          <div role="alert" className="rounded-2xl border-2 border-destructive/60 bg-destructive/10 p-4" data-testid="banner-save-error">
            <p className="font-semibold flex items-center gap-2"><AlertTriangle className="size-4 text-destructive" /> Your latest changes are not saved</p>
            <p className="mt-1 text-sm text-muted-foreground break-words">{error} Your work is still on screen. Retry, or download it before leaving.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={flush} className="press inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-3.5 py-2 text-sm font-semibold" data-testid="button-retry-project-save"><RotateCw className="size-4" /> Try saving again</button>
              <button onClick={emergency} className="press inline-flex items-center gap-2 rounded-lg border-2 px-3.5 py-2 text-sm font-semibold" data-testid="button-emergency-export"><FileDown className="size-4" /> Download unsaved work</button>
            </div>
          </div>
        )}
      </header>

      <div className={cn("grid gap-6 min-w-0", guided && "xl:grid-cols-[17rem_minmax(0,1fr)]")}>
        {/* Milestones */}
        {guided && (
          <aside className="min-w-0 space-y-4" aria-label="Milestones">
            <ol className="flex xl:flex-col gap-1.5 overflow-x-auto pb-1 xl:pb-0">
              {MILESTONES.map((m, i) => (
                <li key={m.title} className="shrink-0">
                  <button onClick={() => pickStep(i)} aria-current={i === step ? "step" : undefined} data-testid={`button-step-${i}`}
                    className={cn("flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                      i === step ? "bg-ink text-background" : "hover:bg-muted")}>
                    {stepDone(i) ? <CheckCircle2 className="size-4 text-pine shrink-0" aria-label="Checks passing" /> : <Circle className="size-4 opacity-40 shrink-0" aria-hidden />}
                    <span className="whitespace-nowrap xl:whitespace-normal">{i + 1}. {m.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="rounded-2xl border-2 border-foreground/80 bg-card p-4">
              <h2 className="font-display text-lg font-bold">{ms.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed">{ms.brief}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <Link href={`/lesson/${ms.lessonId}?returnTo=${returnTo}`} className="inline-flex items-center gap-1 font-semibold text-primary" data-testid="link-step-lesson"><BookOpen className="size-3.5" /> Lesson</Link>
                <Link href={`/lesson/${ms.practiceId}?returnTo=${returnTo}`} className="inline-flex items-center gap-1 font-semibold text-primary" data-testid="link-step-practice"><Dumbbell className="size-3.5" /> Practice</Link>
              </div>
              <div className="mt-4 border-t pt-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Stuck? Help in three levels</p>
                <ol className="mt-2 space-y-2">
                  {ms.hints.slice(0, help).map((h, i) => (
                    <li key={i} className="rise rounded-xl bg-marker/30 border border-marker p-3 text-sm">
                      <span className="block font-semibold text-xs mb-1">{LEVELS[i]}</span>
                      {i === 2 ? <code className="block whitespace-pre-wrap break-words font-mono text-[12px]">{h}</code> : h}
                    </li>
                  ))}
                </ol>
                {help < 3 && (
                  <button onClick={() => setHelp((h) => h + 1)} className="press mt-2 inline-flex items-center gap-1.5 text-sm font-semibold" data-testid="button-next-help">
                    <Lightbulb className="size-4" /> Show {LEVELS[help].toLowerCase()}
                  </button>
                )}
              </div>
            </div>
            <details className="rounded-2xl border bg-card p-4 text-sm">
              <summary className="cursor-pointer font-semibold">Sample data (6 products)</summary>
              <ul className="mt-2 space-y-0.5 font-mono text-xs">
                {PRODUCTS.map((x) => <li key={x.id}>{x.id} · {x.name} · {x.category} · ${x.price}</li>)}
              </ul>
              <p className="mt-2 text-xs text-muted-foreground">Already in script.js as <code>products</code>.</p>
            </details>
            <div className="rounded-2xl border border-dashed p-4 text-sm">
              <p className="font-semibold flex items-center gap-1.5"><Eye className="size-4" /> Finished example</p>
              <p className="mt-1 text-muted-foreground">See the goal from the start. It opens beside your code and never changes your files.</p>
              <button onClick={() => setExample((v) => !v)} className="press mt-2 font-semibold text-primary" data-testid="button-toggle-example">{example ? "Back to my code" : "Show full example"}</button>
            </div>
          </aside>
        )}

        {/* Workspace */}
        <div className="min-w-0 space-y-4">
          {!guided && (
            <p className="rounded-2xl bg-marker/25 border border-marker p-4 text-sm">Your own idea. Edit the three files, watch the preview, and save versions when something works. Use Notes for your plan.</p>
          )}
          {example ? (
            <div className="space-y-3" data-testid="panel-example">
              <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-ink text-background px-4 py-3">
                <p className="text-sm"><span className="font-semibold text-marker">Finished example.</span> This is not your code, and nothing here is copied into your project.</p>
                <button onClick={() => setExample(false)} className="press ml-auto rounded-lg bg-background text-foreground px-3 py-1.5 text-sm font-semibold" data-testid="button-back-to-code">Back to my code</button>
              </div>
              <CodeBlock code={PRODUCT_EXAMPLE["script.js"]} />
              <StudioPreview files={PRODUCT_EXAMPLE} />
            </div>
          ) : (
            <div className="grid gap-4 2xl:grid-cols-2 min-w-0">
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-1" role="tablist" aria-label="Files">
                  {FILE_NAMES.map((f) => (
                    <button key={f} role="tab" aria-selected={file === f} onClick={() => setFile(f)} data-testid={`tab-file-${f}`}
                      className={cn("rounded-lg px-3 py-1.5 font-mono text-xs", file === f ? "bg-ink text-background" : "hover:bg-muted text-muted-foreground")}>
                      {f}
                    </button>
                  ))}
                  <button onClick={() => setResetFile(file)} className="press ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground" data-testid="button-reset-file"><RotateCcw className="size-3.5" /> Reset {file}</button>
                </div>
                <CodeEditor filename={file} value={p.files[file]} label={`Edit ${file}`} onChange={(v) => update((x) => ({ ...x, files: { ...x.files, [file]: v } }))} />
              </div>
              <div className="min-w-0">
                <StudioPreview files={p.files} />
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  The preview runs your code in an isolated worker with a simulated page. It supports common selectors, rendering and DOM events. Network requests, storage and browser-only APIs are not available here. Exported files run normally in a real browser.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lower panels */}
      <section className="rounded-3xl border bg-card min-w-0">
        <div role="tablist" aria-label="Project panels" className="flex flex-wrap gap-1 border-b p-2">
          {([["checks", guided ? "Checks" : "Testing"], ["details", "Notes and links"], ["versions", "Versions"], ["reflect", "Reflect"]] as const).map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} data-testid={`tab-${k}`}
              className={cn("rounded-lg px-3.5 py-2 text-sm font-semibold", tab === k ? "bg-muted" : "text-muted-foreground hover:text-foreground")}>{l}</button>
          ))}
        </div>
        <div className="p-4 sm:p-6" role="tabpanel">
          {tab === "checks" && (guided ? (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={runChecks} disabled={!!running} className="press inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 font-semibold disabled:opacity-60" data-testid="button-run-checks">
                  {running ? <Loader2 className="size-4 animate-spin" /> : <FlaskConical className="size-4" />} {running ? `Running ${running}` : "Run behavior checks"}
                </button>
                <p className="text-sm text-muted-foreground">Each check starts your app fresh and uses the controls like a person would.</p>
              </div>
              {stale && <p className="rounded-xl bg-marker/30 border border-marker p-3 text-sm" data-testid="status-stale">Your code changed since the last run, so these results are out of date and do not count toward completion. Run the checks again.</p>}
              {!p.evidence ? (
                <p className="text-sm text-muted-foreground">No checks run yet. Run them any time; failing is how you find the next thing to fix.</p>
              ) : (
                <ul className={cn("space-y-2", stale && "opacity-60")}>
                  {p.evidence.results.map((r) => <CheckRow key={r.id} r={r} />)}
                </ul>
              )}
              <div className="border-t pt-5">
                <h3 className="font-semibold">Needs your own review</h3>
                <p className="text-sm text-muted-foreground">These cannot be checked reliably by code. Tick them after checking yourself.</p>
                {[["responsive", "Layout fits a phone and a desktop without sideways scrolling"], ["keyboard", "Every control works with the keyboard and shows visible focus"]].map(([k, l]) => (
                  <label key={k} className="mt-3 flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={!!p.manual[k]} onChange={(e) => update((x) => ({ ...x, manual: { ...x.manual, [k]: e.target.checked } }), true)} className="mt-1 size-4 accent-[hsl(var(--primary))]" data-testid={`checkbox-manual-${k}`} />
                    <span className="text-sm">{l} <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">manual</span></span>
                  </label>
                ))}
              </div>
              <p className="text-sm" data-testid="text-completion">
                {complete ? "Complete: all behavior checks pass on your current code and both manual reviews are ticked. Keep building; editing will ask you to re-run checks." : "Complete when all behavior checks pass on your current code and both manual reviews are ticked."}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Own projects have no automated checks. Test by using your app in the preview and watching the console. Save a version when something works.</p>
          ))}

          {tab === "details" && (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block md:col-span-2"><span className="text-sm font-semibold">Short description</span>
                <textarea rows={2} maxLength={3000} value={p.description} onChange={(e) => update((x) => ({ ...x, description: e.target.value }))} className={cn(field, "mt-1")} data-testid="input-description" /></label>
              <UrlField label="Published app URL" value={p.liveUrl} ok={validUrl(p.liveUrl)} hint="Paste it after you publish. Starts with https://" onChange={(v) => update((x) => ({ ...x, liveUrl: v }))} testid="input-live-url" />
              <UrlField label="GitHub repository URL" value={p.repoUrl} ok={validUrl(p.repoUrl, true)} hint="A github.com link." onChange={(v) => update((x) => ({ ...x, repoUrl: v }))} testid="input-repo-url" />
              <label className="block md:col-span-2"><span className="text-sm font-semibold">Notes</span>
                <textarea rows={8} maxLength={100000} value={p.notes} onChange={(e) => update((x) => ({ ...x, notes: e.target.value }))} placeholder="Plans, questions, things to try next." className={cn(field, "mt-1 font-mono text-sm")} data-testid="input-notes" /></label>
              <div className="md:col-span-2 rounded-2xl bg-muted/60 p-4 text-sm">
                <p className="font-semibold">Publishing is manual and your choice</p>
                <ol className="mt-1 list-decimal pl-5 space-y-0.5 text-muted-foreground">
                  <li>Export ZIP. The README inside has these steps too.</li>
                  <li>Import the ZIP or a GitHub repo at replit.com/import.</li>
                  <li>Publish from Replit after reviewing deployment type and cost.</li>
                  <li>Paste the live and repository URLs above.</li>
                </ol>
              </div>
            </div>
          )}

          {tab === "versions" && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <label className="sr-only" htmlFor="v-title">Version name</label>
                <input id="v-title" value={vTitle} maxLength={80} onChange={(e) => setVTitle(e.target.value)} placeholder="Name this milestone, e.g. search works" className={cn(field, "flex-1 basis-56")} data-testid="input-version-title" />
                <button onClick={snapshot} className="press rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold" data-testid="button-save-version">Save version</button>
              </div>
              {p.versions.length === 0 ? <p className="text-sm text-muted-foreground">No versions yet. Save one before experimenting so you can come back.</p> : (
                <ul className="space-y-2">
                  {p.versions.map((v) => (
                    <li key={v.id} className="flex flex-wrap items-center gap-3 rounded-xl border p-3" data-testid={`row-version-${v.id}`}>
                      <div className="min-w-0 flex-1"><p className="font-medium truncate">{v.title}</p><p className="text-xs text-muted-foreground">{new Date(v.at).toLocaleString()}</p></div>
                      <button onClick={() => setRestoreV(v.id)} className="press text-sm font-semibold text-primary" data-testid={`button-restore-version-${v.id}`}>Restore</button>
                      <button onClick={() => update((x) => ({ ...x, versions: x.versions.filter((y) => y.id !== v.id) }), true)} className="press text-sm text-muted-foreground hover:text-destructive" data-testid={`button-delete-version-${v.id}`}>Delete</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {tab === "reflect" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Three short answers. They go into your exported README and copy cleanly into a portfolio.</p>
              {REFLECT.map((q, i) => (
                <label key={q} className="block"><span className="text-sm font-semibold">{q}</span>
                  <textarea rows={3} value={p.reflection[i]} onChange={(e) => update((x) => { const r = [...x.reflection] as [string, string, string]; r[i] = e.target.value; return { ...x, reflection: r }; })} className={cn(field, "mt-1")} data-testid={`input-reflection-${i}`} /></label>
              ))}
              <button onClick={copyReflection} className="press inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-semibold" data-testid="button-copy-reflection"><ClipboardCopy className="size-4" /> Copy for portfolio</button>
            </div>
          )}
        </div>
      </section>

      <AlertDialog open={!!resetFile} onOpenChange={(o) => !o && setResetFile(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-2xl">Reset {resetFile} to the starter?</AlertDialogTitle>
            <AlertDialogDescription>Only this file changes. The other files, notes and versions stay. A version of your current code is saved first so you can undo.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-reset-file-cancel">Keep my code</AlertDialogCancel>
            <AlertDialogAction data-testid="button-reset-file-confirm" onClick={() => {
              const f = resetFile; if (!f) return;
              update((x) => ({ ...x, versions: [{ id: crypto.randomUUID(), title: `Before resetting ${f}`, at: new Date().toISOString(), files: { ...x.files } }, ...x.versions].slice(0, 40), files: { ...x.files, [f]: starter[f] } }), true);
            }}>Reset file</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!restoreV} onOpenChange={(o) => !o && setRestoreV(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-2xl">Restore this version?</AlertDialogTitle>
            <AlertDialogDescription>All three files are replaced by the saved version. Your current code is saved as a new version first.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction data-testid="button-restore-confirm" onClick={() => {
              update((x) => {
                const v = x.versions.find((y) => y.id === restoreV); if (!v) return x;
                return { ...x, files: { ...v.files }, versions: [{ id: crypto.randomUUID(), title: `Before restoring ${v.title}`.slice(0, 160), at: new Date().toISOString(), files: { ...x.files } }, ...x.versions].slice(0, 40) };
              }, true);
            }}>Restore</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SaveBadge({ status }: { status: SaveState }) {
  const map = {
    saved: ["Saved in this browser", "bg-pine/15 text-pine"],
    pending: ["Unsaved changes", "bg-marker/40 text-foreground"],
    saving: ["Saving...", "bg-muted text-muted-foreground"],
    error: ["Not saved", "bg-destructive/15 text-destructive"],
  } as const;
  const [l, c] = map[status];
  return <span role="status" aria-live="polite" className={cn("shrink-0 rounded-full px-3 py-1.5 font-mono text-xs font-semibold", c)} data-testid="status-save">{l}</span>;
}

function CheckRow({ r }: { r: CheckResult }) {
  return (
    <li className={cn("rounded-xl border-2", r.passed ? "border-pine/30" : "border-primary/40")}>
      <details>
        <summary className="flex cursor-pointer items-center gap-3 px-4 py-3">
          {r.passed ? <CheckCircle2 className="size-4 text-pine shrink-0" aria-label="Passed" /> : <XCircle className="size-4 text-primary shrink-0" aria-label="Failed" />}
          <span className="min-w-0 flex-1 text-sm font-medium">{r.label}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:inline">{CONCEPT_NAMES[r.concept] ?? r.concept}</span>
          <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
        </summary>
        <dl className="px-4 pb-4 text-sm space-y-2">
          <div><dt className="font-semibold">Expected</dt><dd className="text-muted-foreground break-words">{r.expected}</dd></div>
          <div><dt className="font-semibold">What happened</dt><dd className="text-muted-foreground break-words">{r.actual}</dd></div>
        </dl>
      </details>
    </li>
  );
}

function UrlField({ label, value, ok, hint, onChange, testid }: { label: string; value: string; ok: boolean; hint: string; onChange: (v: string) => void; testid: string }) {
  return (
    <label className="block min-w-0"><span className="text-sm font-semibold">{label}</span>
      <input type="url" inputMode="url" value={value} maxLength={2000} onChange={(e) => onChange(e.target.value)} aria-invalid={!ok} className={cn(field, "mt-1", !ok && "border-destructive")} data-testid={testid} />
      <span className={cn("mt-1 block text-xs", ok ? "text-muted-foreground" : "text-destructive")}>{ok ? hint : "That does not look like a valid link. It is saved, but check it."}</span>
    </label>
  );
}
