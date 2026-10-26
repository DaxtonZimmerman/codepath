import { useId, useState, type ReactNode } from "react";
import { BookOpen, Code2 } from "lucide-react";

/** Both panes stay mounted so changing the phone view never discards editor or quiz state. */
export function LearningWorkspace({ reading, children, readingTitle = "Read & understand", workspaceTitle = "Your workspace" }: {
  reading: ReactNode; children: ReactNode; readingTitle?: string; workspaceTitle?: string;
}) {
  const [view, setView] = useState<"reading" | "workspace">("reading");
  const id = useId();
  function chooseView(next: "reading" | "workspace") { setView(next); requestAnimationFrame(() => document.getElementById(`${id}-${next}`)?.scrollIntoView({block:"start"})); }
  return <div className="min-w-0" data-testid="learning-workspace">
    <div className="sticky top-[4.25rem] z-20 mb-4 flex gap-2 rounded-2xl border bg-background/95 p-2 backdrop-blur md:top-0 xl:hidden" role="group" aria-label="Learning view">
      <button aria-pressed={view === "reading"} aria-controls={`${id}-reading`} onClick={() => chooseView("reading")} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold ${view === "reading" ? "bg-foreground text-background" : "hover:bg-secondary"}`}><BookOpen className="size-4" />Reading</button>
      <button aria-pressed={view === "workspace"} aria-controls={`${id}-workspace`} onClick={() => chooseView("workspace")} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold ${view === "workspace" ? "bg-foreground text-background" : "hover:bg-secondary"}`}><Code2 className="size-4" />Workspace</button>
    </div>
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <section id={`${id}-reading`} aria-labelledby={`${id}-reading-title`} tabIndex={0} className={`${view === "reading" ? "block" : "hidden"} min-w-0 scroll-mt-36 rounded-2xl border bg-card p-4 outline-offset-4 sm:p-5 xl:sticky xl:top-5 xl:block xl:max-h-[calc(100dvh-2.5rem)] xl:overflow-y-auto`}>
        <h2 id={`${id}-reading-title`} className="mb-5 flex items-center gap-2 border-b pb-3 font-display text-lg font-bold"><BookOpen className="size-4 text-primary" />{readingTitle}</h2>
        {reading}
        <button onClick={() => chooseView("workspace")} className="mt-6 w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground xl:hidden">Open the workspace →</button>
      </section>
      <section id={`${id}-workspace`} aria-labelledby={`${id}-workspace-title`} className={`${view === "workspace" ? "block" : "hidden"} min-w-0 scroll-mt-36 xl:block`}>
        <h2 id={`${id}-workspace-title`} className="mb-4 flex items-center gap-2 font-display text-lg font-bold"><Code2 className="size-4 text-primary" />{workspaceTitle}</h2>
        {children}
      </section>
    </div>
  </div>;
}
