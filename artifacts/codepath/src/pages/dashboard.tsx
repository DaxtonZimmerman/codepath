import { Link } from "wouter";
import { ArrowRight, Compass, RefreshCw, Flame, Hammer, BookOpen } from "lucide-react";
import { useStore, streak } from "@/lib/store";
import { LESSONS, trackName, PROJECTS } from "@/lib/curriculum";
import { nextLearningAction } from "@/lib/learning";
import { nextLesson, dueReviews, todayCount } from "@/lib/progress";
import { GoalPicker, goalLabel } from "@/components/goal-picker";
import { useProjects } from "@/lib/studio-db";
import { isComplete } from "@/lib/studio-model";
import { MILESTONES } from "@/lib/studio-content";

export default function Dashboard() {
  const s = useStore();
  const next = nextLesson(s);
  const learning = nextLearningAction(s);
  const due = dueReviews(s);
  const done = Object.keys(s.completed).length;
  const today = todayCount(s);
  const st = streak(s.activity);
  const projDone = PROJECTS.filter((p) => s.projects[p.id]?.doneAt).length;
  const buildFirst = s.goal === "portfolio";
  const { projects } = useProjects();
  const active = [...projects].sort((a, b) => b.lastOpenedAt.localeCompare(a.lastOpenedAt)).find((p) => !isComplete(p));

  if (!s.goal) {
    return (
      <div className="space-y-8 max-w-4xl">
        <header className="rise">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">Welcome</p>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold leading-[1.02]">What are you <span className="marker">here to do?</span></h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">Pick one. It decides where Home sends you next. You can change it later in Settings.</p>
        </header>
        <GoalPicker value={null} />
        <p className="text-sm text-muted-foreground">
          Not sure what you already know? <Link href="/assessment" className="font-semibold text-foreground underline underline-offset-4" data-testid="link-assessment-welcome">Take the six-question skills check</Link> for a suggested starting point.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <header className="rise">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">Home · {goalLabel(s.goal)}</p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-[1.02]">Here is <span className="marker">your next step.</span></h1>
      </header>

      {!buildFirst && learning ? (<Link href={learning.href} className="lift block rounded-3xl bg-ink p-6 text-background sm:p-9" data-testid="card-primary-action"><p className="font-mono text-xs uppercase tracking-widest text-marker">Bootcamp · {learning.kind}</p><h2 className="mt-3 font-display text-3xl font-extrabold">{learning.title}</h2><p className="mt-3 text-sm text-background/70">Read → practise → workshop → lab → review → quiz → your own app. Your next step follows the whole module.</p><span className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">Continue learning →</span></Link>) : active ? (
        <Link href={`/build/${active.id}`} className="lift rise group relative block overflow-hidden rounded-3xl bg-ink text-background p-6 sm:p-9" data-testid="card-primary-action">
          <div aria-hidden className="absolute -right-8 -bottom-14 font-mono text-[9rem] sm:text-[11rem] leading-none text-background/5 select-none">{"</>"}</div>
          <p className="font-mono text-xs uppercase tracking-widest text-marker">Project in progress{active.kind === "product-filter" ? ` · step ${active.step + 1} of 6` : ""}</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold max-w-md break-words">Continue building {active.title}</h2>
          <p className="mt-3 text-background/70 max-w-md">{active.kind === "product-filter" ? `Next: ${MILESTONES[active.step].title}.` : "Your own idea, right where you left it."}</p>
          <span className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform group-hover:translate-x-1">
            <Hammer className="size-4" /> Continue building <ArrowRight className="size-4" />
          </span>
        </Link>
      ) : buildFirst || !next ? (
        <Link href="/build" className="lift rise group relative block overflow-hidden rounded-3xl bg-ink text-background p-6 sm:p-9" data-testid="card-primary-action">
          <div aria-hidden className="absolute -right-8 -bottom-14 font-mono text-[9rem] sm:text-[11rem] leading-none text-background/5 select-none">{"</>"}</div>
          <p className="font-mono text-xs uppercase tracking-widest text-marker">Build</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold max-w-md">{next ? "Start a JavaScript project" : "Every lesson passed. Now build."}</h2>
          <p className="mt-3 text-background/70 max-w-md">Pick a guided project and make a real page that works. Lessons are linked from each step when you need them.</p>
          <span className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform group-hover:translate-x-1">
            <Hammer className="size-4" /> Open Build <ArrowRight className="size-4" />
          </span>
        </Link>
      ) : (
        <Link href={`/lesson/${next.id}`} className="lift rise group relative block overflow-hidden rounded-3xl bg-ink text-background p-6 sm:p-9" data-testid="card-primary-action">
          <div aria-hidden className="absolute -right-10 -bottom-16 font-mono text-[9rem] sm:text-[11rem] leading-none text-background/5 select-none">{"{ }"}</div>
          <p className="font-mono text-xs uppercase tracking-widest text-marker">Continue learning · {trackName(next.track)}</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold max-w-md break-words">{next.title}</h2>
          <p className="mt-3 text-background/70 max-w-md">{next.summary}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform group-hover:translate-x-1">
              <BookOpen className="size-4" /> Start lesson <ArrowRight className="size-4" />
            </span>
            <span className="font-mono text-xs text-background/60">{next.minutes} min · {next.challenge ? "code challenge" : "quiz"}</span>
          </div>
          {s.assessment?.recommended === next.id && <p className="mt-4 text-xs text-background/60">Suggested by your skills check. It is a starting point, not a label.</p>}
        </Link>
      )}

      {active && !buildFirst && <Link href={`/build/${active.id}`} className="block text-sm font-semibold text-primary underline">Continue your app: {active.title} →</Link>}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {buildFirst && learning ? (
          <Link href={learning.href} className="inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline" data-testid="link-secondary-lesson">Or continue learning: {learning.title} <ArrowRight className="size-3.5" /></Link>
        ) : !active && learning ? (
          <Link href="/build" className="inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline" data-testid="link-secondary-build">Or start a JavaScript project <ArrowRight className="size-3.5" /></Link>
        ) : null}
        <Link href="/learn" className="text-muted-foreground underline-offset-4 hover:underline" data-testid="link-browse-lessons">Browse all lessons</Link>
      </div>

      <section aria-labelledby="due-h" className="rounded-2xl border bg-card p-5" data-testid="section-practice-due">
        <div className="flex flex-wrap items-center gap-3">
          <RefreshCw className="size-4 text-pine shrink-0" aria-hidden />
          <h2 id="due-h" className="font-semibold">{due.length === 0 ? "No practice due" : `${due.length} practice ${due.length === 1 ? "item" : "items"} due`}</h2>
          <Link href="/practice" className="ml-auto text-sm font-semibold text-primary inline-flex items-center gap-1" data-testid="link-practice">{due.length ? "Review now" : "Practice"} <ArrowRight className="size-3.5" /></Link>
        </div>
        {due.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {due.slice(0, 3).map(({ lesson, review }) => (
              <li key={lesson.id} className="min-w-0">
                <Link href={`/lesson/${lesson.id}`} className="press inline-flex max-w-full items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:border-foreground/40" data-testid={`link-review-${lesson.id}`}>
                  <span aria-hidden className={`size-2 shrink-0 rounded-full ${review.lastResult === "miss" ? "bg-primary" : "bg-pine"}`} />
                  <span className="truncate">{lesson.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">Missed challenges come back tomorrow; passed ones check in after 3 days.</p>
        )}
      </section>

      {!s.assessment && (
        <Link href="/assessment" className="lift flex items-center gap-4 rounded-2xl bg-marker/30 p-4" data-testid="link-assessment">
          <Compass className="size-5 shrink-0" aria-hidden />
          <div className="min-w-0"><p className="font-semibold">Not sure where to start?</p><p className="text-sm text-muted-foreground">Six questions suggest a starting point. Nothing is marked as mastered.</p></div>
          <ArrowRight className="size-4 ml-auto shrink-0" aria-hidden />
        </Link>
      )}

      {s.showStats && (
        <section aria-labelledby="stats-h" className="rounded-2xl border border-dashed p-5" data-testid="section-stats">
          <h2 id="stats-h" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Optional stats</h2>
          <dl className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[["Today", `${today}/${s.dailyGoal}`], ["Streak", `${st} ${st === 1 ? "day" : "days"}`], ["Lessons", `${done}/${LESSONS.length}`], ["Projects", `${projDone}/${PROJECTS.length}`]].map(([k, v]) => (
              <div key={k}><dt className="text-xs text-muted-foreground flex items-center gap-1">{k === "Streak" && <Flame className="size-3" aria-hidden />}{k}</dt><dd className="font-display text-2xl font-extrabold" data-testid={`text-stat-${k.toLowerCase()}`}>{v}</dd></div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
