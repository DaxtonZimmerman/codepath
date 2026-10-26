import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Hammer, Sparkles, Copy, Trash2, CheckCircle2, Clock, AlertTriangle, RotateCw, Lock } from "lucide-react";
import { useProjects, saveProject, putProjects, refreshProjects } from "@/lib/studio-db";
import { newProject } from "@/lib/studio-content";
import { isComplete, fingerprint, type StudioProject } from "@/lib/studio-model";
import { PageHeader } from "@/components/shell";
import { prettyDate } from "@/lib/progress";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));

export function projectStatus(p: StudioProject) {
  if (p.kind === "blank") return { label: "Own idea", tone: "muted" as const };
  if (isComplete(p)) return { label: "Complete", tone: "done" as const };
  if (!p.evidence) return { label: "Checks not run", tone: "muted" as const };
  const passed = p.evidence.results.filter((r) => r.passed).length;
  const stale = p.evidence.fingerprint !== fingerprint(p.files);
  return { label: `${passed}/${p.evidence.results.length} checks${stale ? " · code changed since" : ""}`, tone: stale ? "warn" as const : "muted" as const };
}

export function duplicateOf(p: StudioProject): StudioProject {
  const now = new Date().toISOString();
  return { ...structuredClone(p), id: crypto.randomUUID(), title: `Copy of ${p.title}`.slice(0, 160), createdAt: now, updatedAt: now, lastOpenedAt: now };
}

const NEXT = [
  { title: "Personal Tracker", uses: "Forms, state, local saving, editing, deletion", where: "Planned" },
  { title: "API Explorer", uses: "fetch, promises, loading, errors, retry", where: "Planned" },
  { title: "React Task Tracker", uses: "Components, state, tests", where: "Planned" },
  { title: "Full-stack Dashboard", uses: "An API and database", where: "Planned · separate app" },
];

export default function Build() {
  const { projects, loading, error } = useProjects();
  const [, go] = useLocation();
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const [del, setDel] = useState<StudioProject | null>(null);
  const sorted = [...projects].sort((a, b) => b.lastOpenedAt.localeCompare(a.lastOpenedAt));
  const guided = sorted.find((p) => p.kind === "product-filter");

  async function create(kind: StudioProject["kind"]) {
    setBusy(true);
    try { const p = newProject(kind); await saveProject(p); go(`/build/${p.id}`); }
    catch (e) { toast({ title: "Could not create the project", description: msg(e), variant: "destructive" }); }
    finally { setBusy(false); }
  }
  async function duplicate(p: StudioProject) {
    try { await saveProject(duplicateOf(p)); toast({ title: "Copy created", description: "Experiment freely; the original is untouched." }); }
    catch (e) { toast({ title: "Copy failed", description: msg(e), variant: "destructive" }); }
  }
  async function remove(p: StudioProject) {
    try { await putProjects(projects.filter((x) => x.id !== p.id), true); toast({ title: "Project deleted" }); }
    catch (e) { toast({ title: "Delete failed", description: `${msg(e)} Nothing was removed.`, variant: "destructive" }); }
  }

  return (
    <div className="max-w-4xl">
      <PageHeader kicker="Build" title={<>Make something <span className="marker">that works.</span></>}>
        Choose a guided project or start with your own idea. Write code, see it work, then export an app you can share.
      </PageHeader>

      <ol aria-label="How building works" className="mb-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Choose an app", "Follow a guide or bring your own idea."],
          ["Build and try it", "Edit your code and check the preview."],
          ["Make it yours", "Export your files and publish when ready."],
        ].map(([title, detail], i) => (
          <li key={title} className="flex gap-3 rounded-2xl border bg-card p-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">{i + 1}</span>
            <div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div>
          </li>
        ))}
      </ol>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-4">
        <div className="rise rounded-3xl bg-ink text-background p-6 sm:p-8" data-testid="card-guided">
          <p className="font-mono text-xs uppercase tracking-widest text-marker">Recommended · guided project</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold">Product Filter App</h2>
          <p className="mt-2 text-background/70">A clothing catalog with search, category filters, price sorting and an empty state. Six small milestones, automated checks, three levels of help.</p>
          <p className="mt-3 font-mono text-xs text-background/55">Arrays · objects · DOM rendering · events · state</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {guided ? (
              <>
                <Link href={`/build/${guided.id}`} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground" data-testid="link-continue-guided">Continue <ArrowRight className="size-4" /></Link>
                <button disabled={busy} onClick={() => create("product-filter")} className="press rounded-xl border border-background/30 px-4 py-3 text-sm font-semibold disabled:opacity-50" data-testid="button-new-guided">Start a fresh one</button>
              </>
            ) : (
              <button disabled={busy} onClick={() => create("product-filter")} className="press inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-50" data-testid="button-new-guided"><Hammer className="size-4" /> Start this project</button>
            )}
          </div>
        </div>
        <div className="rise rounded-3xl border-2 border-foreground/80 bg-card p-6 sm:p-8 flex flex-col" style={{ animationDelay: "60ms" }} data-testid="card-own">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Have an idea?</p>
          <h2 className="mt-3 font-display text-2xl font-extrabold">Start a blank app</h2>
          <p className="mt-2 text-sm text-muted-foreground">An HTML page, a stylesheet and a JavaScript file, ready to edit. Use the live preview to bring your idea to life.</p>
          <button disabled={busy} onClick={() => create("blank")} className="press mt-auto pt-6 inline-flex items-center gap-2 font-semibold text-primary disabled:opacity-50 self-start" data-testid="button-new-blank"><Sparkles className="size-4" /> Start blank project</button>
        </div>
      </div>

      <section className="mt-12" aria-labelledby="mine-h">
        <h2 id="mine-h" className="font-display text-2xl font-bold">Your projects</h2>
        {loading ? (
          <div className="mt-4 space-y-3" aria-label="Loading projects">{[0, 1].map((i) => <div key={i} className="h-20 rounded-2xl bg-muted animate-pulse" />)}</div>
        ) : error ? (
          <div role="alert" className="mt-4 rounded-2xl border-2 border-destructive/50 bg-destructive/10 p-5">
            <p className="font-semibold flex items-center gap-2"><AlertTriangle className="size-4 text-destructive" /> Projects could not be loaded</p>
            <p className="mt-1 text-sm text-muted-foreground break-words">{error}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button onClick={() => refreshProjects()} className="press inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-3.5 py-2 text-sm font-semibold" data-testid="button-retry-projects"><RotateCw className="size-4" /> Try again</button>
              <Link href="/settings" className="text-sm underline underline-offset-4 self-center">Export a backup</Link>
            </div>
          </div>
        ) : sorted.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed p-8 text-center">
            <p className="font-mono text-3xl text-muted-foreground/50" aria-hidden>{"</>"}</p>
            <p className="mt-2 font-semibold">No projects yet</p>
            <p className="text-sm text-muted-foreground">Start the guided Product Filter App above, or a blank one.</p>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {sorted.map((p) => {
              const st = projectStatus(p);
              return (
                <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-2xl border bg-card p-4" data-testid={`row-project-${p.id}`}>
                  <Link href={`/build/${p.id}`} className="min-w-0 flex-1 basis-56 group" data-testid={`link-open-${p.id}`}>
                    <p className="font-semibold truncate group-hover:underline underline-offset-4">{p.title}</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">{st.tone === "done" ? <CheckCircle2 className="size-3.5 text-pine" /> : st.tone === "warn" ? <AlertTriangle className="size-3.5 text-primary" /> : null}{st.label}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="size-3" /> opened {prettyDate(p.lastOpenedAt)}</span>
                    </p>
                  </Link>
                  <div className="flex gap-1">
                    <button onClick={() => duplicate(p)} aria-label={`Duplicate ${p.title}`} className="press p-2 rounded-lg hover:bg-muted" data-testid={`button-duplicate-${p.id}`}><Copy className="size-4" /></button>
                    <button onClick={() => setDel(p)} aria-label={`Delete ${p.title}`} className="press p-2 rounded-lg hover:bg-muted text-destructive" data-testid={`button-delete-${p.id}`}><Trash2 className="size-4" /></button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <p className="mt-6 text-sm text-muted-foreground">Your projects save in this browser. <Link href="/settings" className="underline underline-offset-4 text-foreground">Download a backup</Link> to keep a separate copy.</p>

      <details className="mt-10 rounded-2xl border border-dashed p-5">
        <summary className="cursor-pointer font-semibold">More projects on the roadmap</summary>
        <p className="mt-2 text-sm text-muted-foreground">These guides are planned. Start with Product Filter or use a blank app today.</p>
        <ol className="mt-4 grid sm:grid-cols-2 gap-3">
          {NEXT.map((n, i) => (
            <li key={n.title} className="rounded-2xl border border-dashed p-4 text-sm">
              <p className="font-semibold flex items-center gap-2"><Lock className="size-3.5 text-muted-foreground" /> {i + 2}. {n.title}</p>
              <p className="text-muted-foreground">{n.uses}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{n.where}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted-foreground">Looking for the older project checklists? <Link href="/projects" className="underline underline-offset-4 text-foreground" data-testid="link-legacy-projects">Open legacy projects</Link></p>
      </details>

      <AlertDialog open={!!del} onOpenChange={(o) => !o && setDel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-2xl">Delete {del?.title}?</AlertDialogTitle>
            <AlertDialogDescription>Its files, notes, versions and reflection are removed from this browser. Export a ZIP or backup first if you want to keep anything.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-delete-cancel">Keep it</AlertDialogCancel>
            <AlertDialogAction onClick={() => del && remove(del)} className="bg-destructive text-destructive-foreground" data-testid="button-delete-confirm">Delete project</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
