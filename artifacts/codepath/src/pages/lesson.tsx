import { useState } from "react";
import { Link, useParams, useSearch } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { LESSONS, lessonById, trackName, type Lesson } from "@/lib/curriculum";
import { actions, useStore } from "@/lib/store";
import { prettyDate } from "@/lib/progress";
import { ExamplePlayground } from "@/components/example-playground";
import { lessonPracticePassed, readingQuestions } from "@/lib/learning";
import { LESSON_COACHING } from "@/lib/lesson-coaching";
import { PageExercisePanel } from "@/components/page-exercise";
import { courseById } from "@/lib/bootcamp";
import { Quiz } from "@/components/quiz";
import { ChallengePanel } from "@/components/challenge";
import { LearningWorkspace } from "@/components/learning-workspace";
import { WorkedTrace, ProjectConnection } from "@/components/lesson-coach";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

function LessonWorkspace({ lesson, returnTo }: { lesson: Lesson; returnTo: string | null }) {
  const s = useStore(), { toast } = useToast();
  const coding = !!(lesson.challenge || lesson.pageExercise);
  const [tab, setTab] = useState(() => {
    const saved = s.drafts[`workspace-tab:${lesson.id}`];
    return saved === "example" || saved === "check" || coding && saved === "practice" ? saved : s.learning.readings[lesson.id] && coding ? "practice" : "example";
  });
  const course = courseById(lesson.track)!;
  const lessons = LESSONS.filter(item => item.track === lesson.track), index = lessons.indexOf(lesson);
  const previous = lessons[index - 1], next = lessons[index + 1];
  const readingPassed = !!s.learning.readings[lesson.id], practicePassed = lessonPracticePassed(s, lesson.id);
  const complete = readingPassed && practicePassed;
  const coach = LESSON_COACHING[lesson.id];
  function result(passed: boolean) {
    toast({ title: passed ? "Code checks passed" : "Use the first difference to guide your next edit", description: passed ? readingPassed ? "Both lesson checkpoints are saved." : "Finish the reading check when you’re ready." : "The feedback shows what to inspect next." });
  }
  function chooseTab(value: string) { setTab(value); actions.saveDraft(`workspace-tab:${lesson.id}`, value); }
  const reading = <div className="space-y-6">
    <section className="space-y-4 text-[15px] leading-relaxed"><p className="text-lg font-semibold">{lesson.summary}</p>{lesson.body.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</section>
    <section className="rounded-xl bg-marker/20 p-4"><h3 className="text-sm font-semibold">Keep these ideas</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm">{lesson.takeaways.map(t => <li key={t}>{t}</li>)}</ul></section>
    <WorkedTrace lessonId={lesson.id} />
    {coding && <section className="border-t pt-5"><p className="font-mono text-xs uppercase tracking-widest text-primary">Your practice goal</p><p className="mt-3 text-sm leading-relaxed">{lesson.challenge?.prompt ?? lesson.pageExercise?.prompt}</p>{lesson.challenge && <p className="mt-3 text-sm"><strong>Function to define: </strong><code>{lesson.challenge.functionName}</code></p>}</section>}
    <section className="rounded-xl border p-4"><h3 className="text-sm font-semibold">A common mistake to catch</h3><p className="mt-2 text-sm">{coach.mistake}</p><p className="mt-2 text-sm text-muted-foreground"><strong>Look here: </strong>{coach.fix}</p></section>
    {lesson.lab && <details className="rounded-xl border p-4"><summary className="cursor-pointer font-semibold text-sm">Apply this in your own editor</summary><p className="mt-3 text-sm font-medium">{lesson.lab.task}</p><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">{lesson.lab.steps.map(step => <li key={step}>{step}</li>)}</ol><p className="mt-3 text-sm"><strong>Verify: </strong>{lesson.lab.verify}</p><p className="mt-2 text-xs text-muted-foreground">This practical work is self-reviewed; the reading check records your understanding separately.</p></details>}
    <ProjectConnection lessonId={lesson.id} courseId={course.id} />
  </div>;
  return <article className="min-w-0">
    <Link href={`/learn/${course.id}`} className="mb-5 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Module syllabus</Link>
    {returnTo && <Link href={returnTo} className="mb-5 block rounded-xl bg-ink p-4 text-sm font-semibold text-background">← Back to your project step. Your draft is saved.</Link>}
    <header><p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">Lesson {index + 1} of {lessons.length} · {trackName(lesson.track)}</p><h1 className="mt-2 font-display text-3xl font-extrabold leading-tight sm:text-4xl">{lesson.title}</h1><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><Clock className="size-3.5" />About {lesson.minutes} min</span><span>Read → predict → experiment → check → apply</span>{s.completed[lesson.id] && <span>Previous pass saved {prettyDate(s.completed[lesson.id])}</span>}</div></header>
    <div className="my-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-3 text-sm" aria-label="Lesson checkpoints"><p><span className={readingPassed ? "font-semibold text-pine" : "text-muted-foreground"}>{readingPassed ? "✓" : "○"} Reading check</span>{coding && <span className={`ml-4 ${practicePassed ? "font-semibold text-pine" : "text-muted-foreground"}`}>{practicePassed ? "✓" : "○"} {s.learning.evidence[`lesson:${lesson.id}`] ? "Current code checks" : "Practice checkpoint"}</span>}</p><Link href={`/learn/${course.id}#project`} className="text-sm font-semibold text-primary underline underline-offset-4">Module project</Link></div>
    <LearningWorkspace reading={reading}>
      <Tabs value={tab} onValueChange={chooseTab}>
        <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start gap-1 p-1" aria-label="Lesson activities"><TabsTrigger value="example" className="flex-1 py-2.5">Example</TabsTrigger>{coding && <TabsTrigger value="practice" className="flex-1 py-2.5">Practice</TabsTrigger>}<TabsTrigger value="check" className="flex-1 py-2.5">Reading check</TabsTrigger></TabsList>
        <TabsContent value="example" forceMount className="data-[state=inactive]:hidden"><ExamplePlayground lesson={lesson} /><div className="mt-5 rounded-xl border bg-card p-4 text-sm"><p className="font-semibold">Change one thing, then explain the difference.</p><p className="mt-2 text-muted-foreground">Compare an ordinary input with an empty or boundary case. Use the worked trace in Reading when the result surprises you.</p><button onClick={() => chooseTab(coding ? "practice" : "check")} className="mt-3 font-semibold text-primary underline">{coding ? "Try your own solution" : "Check your understanding"} →</button></div></TabsContent>
        {coding && <TabsContent value="practice" forceMount className="data-[state=inactive]:hidden"><h3 className="sr-only">Your practice</h3>{['js-values','js-loops','js-debugging'].includes(lesson.id) && s.drafts[lesson.id] && /makeProfile|fizzBuzz|sumNumbers/.test(s.drafts[lesson.id]) && <p className="mb-4 rounded-xl border p-3 text-sm">Your draft is from the earlier exercise. It is kept here; copy it before choosing Reset code if you want to start the new task.</p>}{lesson.pageExercise ? <PageExercisePanel lessonId={lesson.id} exercise={lesson.pageExercise} onResult={result} /> : <ChallengePanel lessonId={lesson.id} challenge={lesson.challenge!} onResult={result} />}<button onClick={() => chooseTab("check")} className="mt-5 text-sm font-semibold text-primary underline">Open the reading check →</button></TabsContent>}
        <TabsContent value="check" forceMount className="data-[state=inactive]:hidden"><div className="mb-5 rounded-xl bg-card border p-4"><h3 className="font-display text-xl font-bold">Explain the idea</h3><p className="mt-2 text-sm text-muted-foreground">Three questions about this reading. {coding ? "This check is separate from running your code." : "Practical work in your own tools remains a separate self-review."}</p>{readingPassed && <p className="mt-2 text-sm font-semibold text-pine">✓ Your reading check is saved.</p>}</div><Quiz questions={readingQuestions(lesson.id)} onSubmit={ok => { if(ok) actions.checkReading(lesson.id); if(!coding) actions.recordAttempt(lesson.id,ok,"quiz"); toast({title:ok?"Reading check passed":"Review the explanations and try again"}); }} /><label className="mt-6 block text-sm font-semibold">Explain it in your own words<textarea rows={3} value={s.drafts[`reflection:${lesson.id}`] ?? ""} onChange={e => actions.saveDraft(`reflection:${lesson.id}`,e.target.value)} className="mt-2 w-full rounded-xl border bg-card p-3 font-normal" placeholder="What changed? Why does it work? What would you test next?" /></label></TabsContent>
      </Tabs>
    </LearningWorkspace>
    {complete && <Link href={next ? `/lesson/${next.id}` : `/learn/${course.id}/workshop`} className="mt-7 flex items-center gap-3 rounded-2xl bg-pine p-5 text-background" data-testid="link-continue"><CheckCircle2 className="size-5 shrink-0" /><div><p className="font-semibold">Lesson checkpoints saved</p><p className="mt-1 text-sm opacity-85">{next ? `Continue: ${next.title}` : "Put the ideas together in the guided workshop."}</p></div><ArrowRight className="ml-auto size-5 shrink-0" /></Link>}
    <nav aria-label="Lesson navigation" className="mt-8 flex justify-between gap-4 border-t pt-5 text-sm">{previous ? <Link href={`/lesson/${previous.id}`} className="flex items-center gap-1 hover:text-primary"><ArrowLeft className="size-4 shrink-0" />{previous.title}</Link> : <span />}{next ? <Link href={`/lesson/${next.id}`} className="flex items-center gap-1 text-right hover:text-primary">{next.title}<ArrowRight className="size-4 shrink-0" /></Link> : <Link href={`/learn/${course.id}/workshop`} className="text-primary">Open the guided workshop →</Link>}</nav>
  </article>;
}
export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lesson = lessonById(id ?? "");
  const requested = new URLSearchParams(useSearch()).get("returnTo");
  const returnTo = requested && /^\/build\/[\w-]+(\?step=\d)?$/.test(requested) ? requested : null;
  if(!lesson) return <div className="py-12"><h1 className="font-display text-3xl font-bold">Lesson not found</h1><Link href="/learn" className="mt-5 inline-block underline">Open the curriculum</Link></div>;
  return <LessonWorkspace key={lesson.id} lesson={lesson} returnTo={returnTo} />;
}
