import { BootcampEvidence } from "@/components/learning-roadmap";
import { Link } from "wouter";
import { useStore, dayKey, addDays, streak } from "@/lib/store";
import { LESSONS, TRACKS, lessonById, PROJECTS } from "@/lib/curriculum";
import { COURSES } from "@/lib/bootcamp";
import { prettyDate } from "@/lib/progress";
import { PageHeader } from "@/components/shell";
import { cn } from "@/lib/utils";
import { Capabilities } from "@/components/capabilities";

export default function ProgressPage() {
  const s = useStore();
  const completed = Object.entries(s.completed).sort((a, b) => b[1].localeCompare(a[1]));
  const days = Array.from({ length: 84 }, (_, i) => addDays(i - 83));
  const max = Math.max(1, ...Object.values(s.activity));
  const passRate = s.attempts.length ? Math.round((s.attempts.filter((a) => a.passed).length / s.attempts.length) * 1000) / 10 : null;
  const recent = [...s.attempts].reverse().slice(0, 12);

  return (
    <div>
      <PageHeader kicker="Progress" title={<>What you have <span className="marker">actually done.</span></>}>
        Everything here is computed from your saved activity. No estimates, no padding.
      </PageHeader>

      <BootcampEvidence />
      <Capabilities />

      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          ["Lessons passed", `${completed.length}`, `of ${LESSONS.length}`],
          ["Lesson attempts", `${s.attempts.length}`, "lesson challenges + checks"],
          ["Lesson pass rate", passRate === null ? "--" : `${passRate}%`, "of lesson attempts"],
          ["Streak", `${streak(s.activity)}`, "days in a row"],
        ].map(([k, v, sub], i) => (
          <div key={k} className="rounded-2xl border bg-card p-5 rise" style={{ animationDelay: `${i * 50}ms` }}>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k}</dt>
            <dd className="font-display text-4xl font-extrabold mt-2" data-testid={`text-${k.toLowerCase().replace(/\s/g, "-")}`}>{v}</dd>
            <dd className="text-xs text-muted-foreground">{sub}</dd>
          </div>
        ))}
      </dl>

      <section className="rounded-3xl border bg-card p-6 mb-8" aria-labelledby="act-h">
        <h2 id="act-h" className="font-display text-xl font-bold mb-4">Last 12 weeks</h2>
        <div className="grid grid-flow-col grid-rows-7 gap-1 w-fit max-w-full overflow-x-auto" role="img" aria-label="Activity heatmap of passing reps per day">
          {days.map((d) => {
            const n = s.activity[d] ?? 0;
            return <div key={d} title={`${prettyDate(d)}: ${n}`} className={cn("size-3.5 rounded-[3px]", d === dayKey() && "ring-1 ring-foreground", n === 0 ? "bg-muted" : "bg-primary")} style={n ? { opacity: 0.35 + 0.65 * (n / max) } : undefined} />;
          })}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="rounded-3xl border bg-card p-6">
          <h2 className="font-display text-xl font-bold mb-4">Lesson results by track</h2>
          <ul className="space-y-3">
            {TRACKS.map((t) => {
              const ls = LESSONS.filter((l) => l.track === t.id);
              const p = ls.filter((l) => s.completed[l.id]).length;
              return (
                <li key={t.id}>
                  <div className="flex justify-between text-sm"><Link href={`/learn/${t.id}`} className="hover:underline">{t.name}</Link><span className="font-mono text-xs">{p}/{ls.length}</span></div>
                  <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-pine transition-[width] duration-700" style={{ width: `${(p / ls.length) * 100}%` }} /></div>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">Bootcamp project reviews (self-reported): {COURSES.filter((course) => s.projects[`bootcamp-${course.id}`]?.doneAt).length} of {COURSES.length}. <Link href="/learn" className="underline">Open bootcamp</Link></p>
          <p className="mt-2 text-sm text-muted-foreground">Legacy projects marked done (self-reported): {PROJECTS.filter((p) => s.projects[p.id]?.doneAt).length} of {PROJECTS.length}</p>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border bg-card p-6">
            <h2 className="font-display text-xl font-bold mb-4">Completed lessons</h2>
            {completed.length === 0 ? (
              <div className="text-sm text-muted-foreground">None yet. A lesson counts only after you pass its challenge or quiz. <Link href="/learn" className="text-primary underline underline-offset-4" data-testid="link-start-path">Open the path</Link></div>
            ) : (
              <ul className="divide-y">{completed.map(([id, at]) => (
                <li key={id}><Link href={`/lesson/${id}`} className="flex justify-between py-2.5 text-sm hover:text-primary" data-testid={`link-completed-${id}`}><span>{lessonById(id)?.title ?? id}</span><span className="font-mono text-xs text-muted-foreground">{prettyDate(at)}</span></Link></li>
              ))}</ul>
            )}
          </div>
          <div className="rounded-3xl border bg-card p-6">
            <h2 className="font-display text-xl font-bold mb-4">Recent lesson attempts</h2>
            {recent.length === 0 ? <p className="text-sm text-muted-foreground">Your run history will appear here.</p> : (
              <ul className="space-y-1.5">{recent.map((a, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className={cn("font-mono text-[10px] uppercase w-12", a.passed ? "text-pine" : "text-primary")}>{a.passed ? "pass" : "miss"}</span>
                  <span className="truncate">{lessonById(a.lessonId)?.title}</span>
                  <span className="ml-auto font-mono text-xs text-muted-foreground shrink-0">{prettyDate(a.at)}</span>
                </li>
              ))}</ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
