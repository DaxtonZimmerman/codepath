import { MixedPractice } from "@/components/mixed-practice";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Search, RefreshCw, CalendarClock } from "lucide-react";
import { useStore } from "@/lib/store";
import { LESSONS, TRACKS, trackName } from "@/lib/curriculum";
import { dueReviews, upcomingReviews, lessonStatus, prettyDate } from "@/lib/progress";
import { PageHeader, StatusDot } from "@/components/shell";
import { cn } from "@/lib/utils";
import { ProjectReviews } from "@/components/project-reviews";

const STATUS = [["all", "All"], ["new", "Not started"], ["missed", "Needs work"], ["done", "Passed"]] as const;

export default function Practice() {
  const s = useStore();
  const [q, setQ] = useState("");
  const [track, setTrack] = useState("all");
  const [status, setStatus] = useState<(typeof STATUS)[number][0]>("all");
  const due = dueReviews(s);
  const upcoming = upcomingReviews(s);
  const challenges = LESSONS.filter((l) => l.challenge || l.pageExercise);
  const trackIds = Array.from(new Set(challenges.map((c) => c.track)));

  const list = useMemo(() => challenges.filter((l) => {
    const st = lessonStatus(s, l.id);
    if (track !== "all" && l.track !== track) return false;
    if (status === "done" && st !== "done") return false;
    if (status === "new" && st !== "new") return false;
    if (status === "missed" && !(st === "missed" && true)) return false;
    const term = q.toLowerCase();
    return !term || l.title.toLowerCase().includes(term) || (l.challenge?.concept ?? l.summary).toLowerCase().includes(term) || (l.challenge?.functionName ?? l.pageExercise?.language ?? "").toLowerCase().includes(term);
  }), [challenges, s, track, status, q]);

  return (
    <div>
      <PageHeader kicker="Practice" title={<>Reps, <span className="marker">spaced out.</span></>}>
        Misses come back tomorrow. Passes check in after three days. That rhythm is how things stick.
      </PageHeader>

      <MixedPractice />
      <ProjectReviews />

      <section className="grid md:grid-cols-2 gap-5 mb-12">
        <div className="rounded-3xl bg-ink text-background p-6" data-testid="section-due">
          <h2 className="font-display text-xl font-bold flex items-center gap-2"><RefreshCw className="size-5 text-marker" /> Due today ({due.length})</h2>
          {due.length === 0 ? <p className="mt-3 text-sm text-background/70">You are clear. Attempt any challenge or quiz to start your review schedule.</p> : (
            <ul className="mt-4 space-y-2">{due.map(({ lesson, review }) => (
              <li key={lesson.id}><Link href={`/lesson/${lesson.id}`} className="press flex items-center gap-3 rounded-xl bg-background/10 hover:bg-background/15 px-4 py-3" data-testid={`link-due-${lesson.id}`}>
                <span className={cn("size-2 rounded-full", review.lastResult === "miss" ? "bg-primary" : "bg-marker")} />
                <span className="text-sm font-medium">{lesson.title}</span>
                <span className="ml-auto font-mono text-[10px] uppercase opacity-60">{review.lastResult === "miss" ? "missed" : "passed"}</span>
              </Link></li>
            ))}</ul>
          )}
        </div>
        <div className="rounded-3xl border bg-card p-6">
          <h2 className="font-display text-xl font-bold flex items-center gap-2"><CalendarClock className="size-5 text-pine" /> Coming up</h2>
          {upcoming.length === 0 ? <p className="mt-3 text-sm text-muted-foreground">No reviews scheduled yet.</p> : (
            <ul className="mt-4 divide-y">{upcoming.slice(0, 6).map(({ lesson, review }) => (
              <li key={lesson.id} className="flex items-center justify-between py-2.5 text-sm"><span>{lesson.title}</span><span className="font-mono text-xs text-muted-foreground">{prettyDate(review.due)}</span></li>
            ))}</ul>
          )}
        </div>
      </section>

      <h2 className="font-display text-2xl font-bold mb-4">Code challenges</h2>
      <div className="flex flex-col gap-3 mb-6">
        <label className="relative max-w-md">
          <span className="sr-only">Search challenges</span>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or concept" className="w-full rounded-xl border-2 bg-card pl-10 pr-4 py-2.5 focus:border-foreground outline-none" data-testid="input-search" />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by track">
          {["all", ...trackIds].map((t) => (
            <button key={t} onClick={() => setTrack(t)} aria-pressed={track === t} className={cn("press rounded-full border px-3 py-1.5 text-xs font-mono", track === t ? "bg-foreground text-background border-foreground" : "hover:border-foreground/50")} data-testid={`filter-track-${t}`}>
              {t === "all" ? "All tracks" : TRACKS.find((x) => x.id === t)?.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {STATUS.map(([k, label]) => (
            <button key={k} onClick={() => setStatus(k)} aria-pressed={status === k} className={cn("press rounded-full border px-3 py-1.5 text-xs font-mono", status === k ? "bg-primary text-primary-foreground border-primary" : "hover:border-foreground/50")} data-testid={`filter-status-${k}`}>{label}</button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed p-10 text-center">
          <p className="font-display text-xl font-bold">No challenges match.</p>
          <button onClick={() => { setQ(""); setTrack("all"); setStatus("all"); }} className="mt-3 text-sm underline underline-offset-4" data-testid="button-clear-filters">Clear filters</button>
        </div>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((l) => {
            const tries = s.attempts.filter((a) => a.lessonId === l.id).length;
            return (
              <li key={l.id}>
                <Link href={`/lesson/${l.id}`} className="lift flex flex-col h-full rounded-2xl border bg-card p-5" data-testid={`card-challenge-${l.id}`}>
                  <div className="flex items-center gap-2"><StatusDot status={lessonStatus(s, l.id)} /><span className="font-mono text-xs text-muted-foreground">{trackName(l.track)}</span></div>
                  <p className="mt-3 font-mono text-sm font-semibold text-primary">{l.challenge ? `${l.challenge.functionName}()` : `${l.pageExercise!.language.toUpperCase()} lab`}</p>
                  <p className="font-semibold mt-1">{l.challenge?.concept ?? l.title}</p>
                  <p className="mt-auto pt-4 font-mono text-xs text-muted-foreground">{l.challenge?.tests.length ?? l.pageExercise!.checks.length} checks · {l.challenge?.hints.length ?? l.pageExercise!.hints.length} hints · {tries} tries</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
