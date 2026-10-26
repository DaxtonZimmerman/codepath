import { useState } from "react";
import { Link, useParams, useSearch } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { LESSONS, lessonById, trackName } from "@/lib/curriculum";
import { actions, useStore } from "@/lib/store";
import { prettyDate } from "@/lib/progress";
import { CodeBlock } from "@/components/code-editor";
import { PageExercisePanel } from "@/components/page-exercise";
import { courseById } from "@/lib/bootcamp";
import { Quiz } from "@/components/quiz";
import { ChallengePanel } from "@/components/challenge";
import { useToast } from "@/hooks/use-toast";

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lesson = lessonById(id ?? "");
  const s = useStore();
  const { toast } = useToast();
  const [passedId, setPassedId] = useState<string | null>(null);
  const justPassed = passedId === lesson?.id;
  const rt = new URLSearchParams(useSearch()).get("returnTo");
  const returnTo = rt && /^\/build\/[\w-]+(\?step=\d)?$/.test(rt) ? rt : null;

  if (!lesson) {
    return (
      <div className="py-20 text-center rise">
        <p className="font-mono text-primary">404 · lesson not found</p>
        <h1 className="font-display text-4xl font-extrabold mt-2">That lesson is not on the path.</h1>
        <Link href="/learn" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-5 py-3 font-semibold" data-testid="link-back-path">See all lessons</Link>
      </div>
    );
  }

  const course = courseById(lesson.track);
  const courseLessons = LESSONS.filter((item) => item.track === lesson.track);
  const idx = courseLessons.indexOf(lesson);
  const prev = courseLessons[idx - 1];
  const next = courseLessons[idx + 1];
  const completedAt = s.completed[lesson.id];
  const review = s.reviews[lesson.id];
  const tries = s.attempts.filter((a) => a.lessonId === lesson.id).length;

  function handle(passed: boolean) {
    if (passed) {
      setPassedId(lesson!.id);
      toast({ title: completedAt ? "Passed again" : "Lesson complete", description: "Review scheduled in 3 days." });
    } else {
      setPassedId(null);
      toast({ title: "Not yet, and that is useful", description: "This concept is queued for review tomorrow." });
    }
  }

  return (
    <article key={lesson.id} className="max-w-3xl">
      <Link href={`/learn/${lesson.track}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6" data-testid="link-back">
        <ArrowLeft className="size-4" /> Module syllabus
      </Link>
      {returnTo && (
        <Link href={returnTo} className="mb-6 flex items-center gap-3 rounded-2xl bg-ink text-background px-4 py-3 text-sm" data-testid="link-return-project">
          <ArrowLeft className="size-4 text-marker shrink-0" /> <span><span className="font-semibold">Back to your project step.</span> <span className="text-background/70">Your code is saved where you left it.</span></span>
        </Link>
      )}
      <header className="rise">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Lesson {idx + 1} of {courseLessons.length} · {trackName(lesson.track)}</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold leading-[1.02]">{lesson.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock className="size-4" /> {lesson.minutes} min</span>
          {completedAt && <span className="flex items-center gap-1.5 text-pine font-medium" data-testid="status-completed"><CheckCircle2 className="size-4" /> Passed {prettyDate(completedAt)}</span>}
          {review && <span className="font-mono text-xs" data-testid="text-review-due">review {prettyDate(review.due)}</span>}
          {tries > 0 && <span className="font-mono text-xs">{tries} {tries === 1 ? "attempt" : "attempts"}</span>}
        </div>
      </header>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-4 text-sm">
        <p>{course?.title} · {courseLessons.filter((item) => s.completed[item.id]).length}/{courseLessons.length} lessons passed</p>
        <Link href={`/learn/${lesson.track}#project`} className="font-semibold text-primary underline underline-offset-4">Module project</Link>
      </div>

      <section className="mt-10 space-y-5 text-[17px] leading-relaxed rise" style={{ animationDelay: "60ms" }}>
        <p className="text-xl font-medium">{lesson.summary}</p>
        {lesson.body.map((p, i) => <p key={i}>{p}</p>)}
      </section>

      <section className="mt-8" aria-label="Example">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Example</p>
        <CodeBlock code={lesson.example} />
      </section>

      <section className="mt-8 rounded-2xl bg-marker/25 border border-marker p-5">
        <p className="font-mono text-xs uppercase tracking-widest mb-3">Keep these</p>
        <ul className="space-y-1.5">{lesson.takeaways.map((t) => <li key={t} className="flex gap-2"><span className="text-primary font-mono">-&gt;</span>{t}</li>)}</ul>
      </section>

      {lesson.lab && <section className="mt-8 rounded-2xl border-2 border-primary/50 bg-card p-5" aria-label="Apply it in your project">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Apply it in your own editor</p>
        <h2 className="mt-2 font-display text-xl font-bold">{lesson.lab.task}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">{lesson.lab.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        <p className="mt-4 text-sm"><strong>Verify it: </strong>{lesson.lab.verify}</p>
        <p className="mt-3 text-xs text-muted-foreground">This lab is reviewed by you. The knowledge check below records your lesson result separately.</p>
      </section>}

      <section className="mt-12" aria-labelledby="practice-h">
        <h2 id="practice-h" className="font-display text-3xl font-extrabold mb-5">{lesson.challenge || lesson.pageExercise ? "Now you write it" : "Check your understanding"}</h2>
        {lesson.pageExercise ? <PageExercisePanel key={lesson.id} lessonId={lesson.id} exercise={lesson.pageExercise} onResult={handle} /> : lesson.challenge
          ? <ChallengePanel key={lesson.id} lessonId={lesson.id} challenge={lesson.challenge} onResult={handle} />
          : <Quiz key={lesson.id} questions={lesson.quiz ?? []} onSubmit={(ok) => { actions.recordAttempt(lesson.id, ok, "quiz"); handle(ok); }} />}
      </section>

      {justPassed && next && (
        <Link href={`/lesson/${next.id}`} className="pop mt-8 flex items-center gap-4 rounded-2xl bg-pine text-background p-5" data-testid="link-continue">
          <CheckCircle2 className="size-6" /><div><p className="font-semibold">Nice work. Keep momentum?</p><p className="text-sm opacity-80">{next.title}</p></div><ArrowRight className="ml-auto size-5" />
        </Link>
      )}

      {justPassed && !next && <Link href={`/learn/${lesson.track}#project`} className="mt-8 flex items-center gap-3 rounded-2xl bg-pine p-5 text-background" data-testid="link-module-project"><CheckCircle2 className="size-5 shrink-0" /><div><p className="font-semibold">You passed this lesson. Put the module skills to work.</p><p className="mt-1 text-sm opacity-80">Open the project brief and review your deliverables.</p></div><ArrowRight className="ml-auto size-5 shrink-0" /></Link>}

      <nav className="mt-14 pt-6 border-t flex justify-between gap-4" aria-label="Lesson navigation">
        {prev ? <Link href={`/lesson/${prev.id}`} className="text-sm hover:text-primary flex items-center gap-1" data-testid="link-prev-lesson"><ArrowLeft className="size-4" /> {prev.title}</Link> : <span />}
        {next ? <Link href={`/lesson/${next.id}`} className="text-sm hover:text-primary flex items-center gap-1 text-right" data-testid="link-next-lesson">{next.title} <ArrowRight className="size-4" /></Link> : <Link href={`/learn/${lesson.track}#project`} className="text-right text-sm text-primary">Open the module project <ArrowRight className="inline size-4" /></Link>}
      </nav>
    </article>
  );
}
