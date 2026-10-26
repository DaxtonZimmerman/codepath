import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Code2, Search, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { LESSONS } from "@/lib/curriculum";
import { COURSES } from "@/lib/bootcamp";
import { nextLesson } from "@/lib/progress";
import { PageHeader } from "@/components/shell";

export default function PathPage() {
  const s = useStore();
  const [query, setQuery] = useState("");
  const next = nextLesson(s);
  const passed = LESSONS.filter((lesson) => s.completed[lesson.id]).length;
  const reviewed = COURSES.filter((course) => s.projects[`bootcamp-${course.id}`]?.doneAt).length;
  const needle = query.trim().toLowerCase();
  const visible = COURSES.filter((course) => [course.title, course.description, ...course.outcomes, ...course.lessons.map((id) => LESSONS.find((lesson) => lesson.id === id)?.title ?? "")].join(" ").toLowerCase().includes(needle));
  return <div className="max-w-5xl">
    <PageHeader kicker="The Codepath bootcamp" title={<>From your first page <span className="marker">to a real app.</span></>}>
      A self-paced path through web development. Learn a concept, practise it, then use it in a project. Start from the beginning or choose the module you need.
    </PageHeader>
    <div className="mb-6 grid grid-cols-3 gap-3 rounded-2xl border bg-card p-4 sm:p-6">
      {[[String(COURSES.length), "modules"], [String(LESSONS.length), "lessons"], [String(COURSES.length), "project briefs"]].map(([value, label]) => <div key={label}><p className="font-display text-2xl font-extrabold sm:text-3xl">{value}</p><p className="text-xs text-muted-foreground sm:text-sm">{label}</p></div>)}
    </div>
    <section className="mb-8 rounded-3xl bg-ink p-6 text-background sm:p-8" aria-label="Your bootcamp progress">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="font-mono text-xs uppercase tracking-widest text-marker">{passed ? "Keep building your skills" : "Your first step"}</p><h2 className="mt-2 font-display text-2xl font-bold">{next?.title ?? "Every lesson passed. Put it all together."}</h2><p className="mt-2 text-sm text-background/70">{passed} of {LESSONS.length} lessons passed · {reviewed} of {COURSES.length} project reviews saved</p></div>
        <Link href={next ? `/lesson/${next.id}` : "/learn/ship"} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground" data-testid="link-bootcamp-continue">{passed ? "Continue learning" : "Start learning"}<ArrowRight className="size-4" /></Link>
      </div>
      <progress aria-label="Lessons passed" value={passed} max={LESSONS.length} className="mt-5 h-2 w-full accent-[hsl(var(--marker))]" />
    </section>
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div><h2 className="font-display text-2xl font-bold">Your curriculum</h2><p className="mt-1 text-sm text-muted-foreground">Follow the numbered path. Every module is open.</p></div>
      <label className="flex w-full items-center gap-2 rounded-xl border bg-card px-3 py-2 sm:w-72"><Search className="size-4 shrink-0 text-muted-foreground" /><span className="sr-only">Search the curriculum</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a topic or skill" className="min-w-0 w-full bg-transparent text-sm outline-none" data-testid="input-curriculum-search" /></label>
    </div>
    <ol className="grid gap-4 md:grid-cols-2" aria-label="Bootcamp modules">
      {visible.map((course) => {
        const count = course.lessons.filter((id) => s.completed[id]).length;
        const current = course.lessons.includes(next?.id ?? "");
        return <li key={course.id}><Link href={`/learn/${course.id}`} className={`lift block h-full rounded-2xl border bg-card p-5 sm:p-6 ${current ? "border-2 border-primary" : ""}`} data-testid={`link-course-${course.id}`}>
          <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-mono text-xs uppercase tracking-widest text-primary">Module {String(COURSES.indexOf(course) + 1).padStart(2, "0")} · {course.stage}</p>{count === course.lessons.length && <CheckCircle2 aria-label="All lessons passed" className="size-4 text-pine" />}</div>
          <h3 className="mt-3 font-display text-xl font-bold">{course.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{course.description}</p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><BookOpen className="size-3.5" />{count}/{course.lessons.length} lessons passed</span><span className="inline-flex items-center gap-1"><Code2 className="size-3.5" />1 project</span></p>
          <p className="mt-3 text-xs text-muted-foreground">Build: {course.project.title}</p><p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">{current ? "Your next module" : "Open module"}<ArrowRight className="size-3.5" /></p>
        </Link></li>;
      })}
    </ol>
    {visible.length === 0 && <div className="rounded-2xl border border-dashed p-8 text-center"><p className="font-semibold">No modules match “{query}”.</p><button onClick={() => setQuery("")} className="mt-3 text-sm text-primary underline">Show the full curriculum</button></div>}
    <p className="mt-8 text-sm leading-relaxed text-muted-foreground">HTML and CSS labs and JavaScript challenges run here. Projects that need real network access, React, a server, or a database include a brief for your own editor or Replit. Lesson checks record practice; project reviews are your own assessment.</p>
  </div>;
}
