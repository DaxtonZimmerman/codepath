import { Link } from "wouter";
import { Code2, ListChecks } from "lucide-react";
import { useStore } from "@/lib/store";
import { LESSONS, TRACKS } from "@/lib/curriculum";
import { lessonStatus, nextLesson } from "@/lib/progress";
import { PageHeader, StatusDot } from "@/components/shell";
import { cn } from "@/lib/utils";

export default function PathPage() {
  const s = useStore();
  const next = nextLesson(s);
  let n = 0;
  return (
    <div>
      <PageHeader kicker="The path" title={<>Web development, <span className="marker">in order.</span></>}>
        Twelve tracks from your first tag to a deployed, tested app. Go in sequence or jump to what you need.
      </PageHeader>
      <div className="flex flex-wrap gap-4 mb-8 text-xs font-mono text-muted-foreground">
        {(["done", "missed", "attempted", "new"] as const).map((k) => (
          <span key={k} className="flex items-center gap-2"><StatusDot status={k} /> {{ done: "passed", missed: "needs another pass", attempted: "in progress", new: "not started" }[k]}</span>
        ))}
      </div>
      <ol className="relative border-l-2 border-dashed border-foreground/20 ml-3 space-y-10">
        {TRACKS.map((t, ti) => {
          const lessons = LESSONS.filter((l) => l.track === t.id);
          const passed = lessons.filter((l) => s.completed[l.id]).length;
          return (
            <li key={t.id} className="pl-8 relative rise" style={{ animationDelay: `${ti * 40}ms` }}>
              <span className={cn("absolute -left-[11px] top-1 size-5 rounded-full border-2 border-background", passed === lessons.length ? "bg-pine" : passed ? "bg-marker" : "bg-foreground/25")} aria-hidden />
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-xs text-primary">{String(ti + 1).padStart(2, "0")}</span>
                <h2 className="font-display text-2xl font-bold">{t.name}</h2>
                <span className="font-mono text-xs text-muted-foreground">{passed}/{lessons.length}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t.blurb}</p>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {lessons.map((l) => {
                  n++;
                  const st = lessonStatus(s, l.id);
                  return (
                    <li key={l.id}>
                      <Link href={`/lesson/${l.id}`} className={cn("lift block rounded-2xl border bg-card p-4 h-full", next?.id === l.id && "border-2 border-primary")} data-testid={`link-lesson-${l.id}`}>
                        <div className="flex items-center gap-3">
                          <StatusDot status={st} />
                          <span className="font-mono text-xs text-muted-foreground">L{n}</span>
                          {next?.id === l.id && <span className="ml-auto rounded-full bg-primary text-primary-foreground text-[10px] font-mono uppercase px-2 py-0.5">next</span>}
                        </div>
                        <p className="mt-2 font-semibold leading-snug">{l.title}</p>
                        <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground font-mono">
                          {l.challenge ? <><Code2 className="size-3.5" /> code challenge</> : <><ListChecks className="size-3.5" /> quiz</>} · {l.minutes} min
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
