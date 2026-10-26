import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Check, Flag, Undo2 } from "lucide-react";
import { PROJECTS, lessonById, type Project } from "@/lib/curriculum";
import { actions, useStore } from "@/lib/store";
import { prettyDate } from "@/lib/progress";
import { PageHeader } from "@/components/shell";
import { cn } from "@/lib/utils";

function Notes({ pid, initial }: { pid: string; initial: string }) {
  const [v, setV] = useState(initial);
  const [saved, setSaved] = useState(true);
  const t = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(t.current), []);
  return (
    <div>
      <label htmlFor={`notes-${pid}`} className="flex justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
        <span>Your notes</span><span aria-live="polite">{saved ? "saved" : "typing..."}</span>
      </label>
      <textarea id={`notes-${pid}`} value={v} rows={4} placeholder="Decisions, blockers, links to your repo..."
        onChange={(e) => { setV(e.target.value); setSaved(false); window.clearTimeout(t.current); const val = e.target.value; t.current = window.setTimeout(() => { actions.setNotes(pid, val); setSaved(true); }, 500); }}
        className="w-full rounded-xl border-2 bg-background p-3 text-sm focus:border-foreground outline-none" data-testid={`input-notes-${pid}`} />
    </div>
  );
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const s = useStore();
  const st = s.projects[p.id] ?? { checks: {}, notes: "", doneAt: null };
  const count = p.steps.filter((_, k) => st.checks[k]).length;
  const pct = (count / p.steps.length) * 100;
  return (
    <article className="rounded-3xl border-2 border-foreground/80 bg-card overflow-hidden rise" style={{ animationDelay: `${i * 80}ms` }} data-testid={`card-project-${p.id}`}>
      <div className={cn("p-6 sm:p-8", i === 0 ? "bg-marker/40" : i === 1 ? "bg-pine/15" : "bg-primary/10")}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest">{String(i + 1).padStart(2, "0")} · {p.level}</span>
          {st.doneAt && <span className="pop rounded-full bg-pine text-background px-3 py-1 text-xs font-semibold flex items-center gap-1"><Check className="size-3" /> Marked done {prettyDate(st.doneAt)}</span>}
        </div>
        <h2 className="mt-2 font-display text-3xl font-extrabold">{p.title}</h2>
        <p className="mt-1 text-muted-foreground">{p.tagline}</p>
      </div>
      <div className="p-6 sm:p-8 grid lg:grid-cols-[1.2fr_1fr] gap-8">
        <div>
          <p className="leading-relaxed">{p.brief}</p>
          <p className="mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">Builds on</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.uses.map((u) => <Link key={u} href={`/lesson/${u}`} className={cn("rounded-full border px-3 py-1 text-xs hover:border-foreground", s.completed[u] && "border-pine text-pine")} data-testid={`link-uses-${p.id}-${u}`}>{lessonById(u)?.title}</Link>)}
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">Stretch goals</p>
          <ul className="mt-2 text-sm space-y-1">{p.stretch.map((x) => <li key={x}>+ {x}</li>)}</ul>
          <div className="mt-6"><Notes pid={p.id} initial={st.notes} /></div>
        </div>
        <div>
          <div className="flex justify-between items-baseline">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Checklist</p>
            <span className="font-mono text-xs" data-testid={`text-progress-${p.id}`}>{count}/{p.steps.length}</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full bg-pine transition-[width] duration-500" style={{ width: `${pct}%` }} /></div>
          <ul className="mt-4 space-y-2">
            {p.steps.map((step, k) => (
              <li key={k}>
                <label className="press flex items-start gap-3 rounded-xl border px-3 py-2.5 cursor-pointer hover:border-foreground/40">
                  <input type="checkbox" className="peer sr-only" checked={!!st.checks[k]} onChange={() => actions.toggleCheck(p.id, k)} data-testid={`checkbox-${p.id}-${k}`} />
                  <span className={cn("mt-0.5 grid place-items-center size-5 rounded-md border-2 shrink-0 transition-colors peer-focus-visible:ring-2 ring-primary", st.checks[k] ? "bg-pine border-pine text-background" : "border-foreground/40")}>
                    {st.checks[k] && <Check className="size-3.5 pop" />}
                  </span>
                  <span className={cn("text-sm", st.checks[k] && "line-through text-muted-foreground")}>{step}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl bg-muted p-4">
            <p className="text-xs text-muted-foreground">Projects are self-reported. Nothing here inspects your repo; mark it done when you would be proud to show it.</p>
            {st.doneAt ? (
              <button onClick={() => actions.setProjectDone(p.id, false)} className="press mt-3 inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-medium" data-testid={`button-undone-${p.id}`}><Undo2 className="size-4" /> Mark not done</button>
            ) : (
              <button onClick={() => actions.setProjectDone(p.id, true)} className="press mt-3 inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold" data-testid={`button-done-${p.id}`}><Flag className="size-4" /> I finished this project</button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <div>
      <PageHeader kicker="Projects" title={<>Learn it by <span className="marker">shipping it.</span></>}>
        Three real briefs that tie the lessons together. Your checklist and notes stay in this browser.
      </PageHeader>
      <div className="space-y-8">{PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}</div>
    </div>
  );
}
