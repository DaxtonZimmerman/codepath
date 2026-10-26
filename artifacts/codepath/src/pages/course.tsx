import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Code2, ExternalLink, Hammer } from "lucide-react";
import { COURSES, courseById } from "@/lib/bootcamp";
import { lessonById } from "@/lib/curriculum";
import { actions, useStore } from "@/lib/store";
import { lessonStatus, prettyDate } from "@/lib/progress";
import { newProject } from "@/lib/studio-content";
import { saveProject, useProjects } from "@/lib/studio-db";
import { PageHeader, StatusDot } from "@/components/shell";
import { useToast } from "@/hooks/use-toast";

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseById(courseId ?? "");
  const s = useStore();
  const { projects, loading, error } = useProjects();
  const [busy, setBusy] = useState(false);
  const [, go] = useLocation();
  const { toast } = useToast();
  useEffect(() => { if (window.location.hash === "#project") document.getElementById("project")?.scrollIntoView(); }, [courseId]);
  if (!course) return <div><h1 className="font-display text-3xl font-bold">Module not found</h1><Link href="/learn" className="mt-4 inline-block underline">Open the bootcamp</Link></div>;
  const index = COURSES.indexOf(course);
  const nextCourse = COURSES[index + 1];
  const lessons = course.lessons.map((id) => lessonById(id)!);
  const passed = lessons.filter((lesson) => s.completed[lesson.id]).length;
  const next = lessons.find((lesson) => !s.completed[lesson.id]);
  const key = `bootcamp-${course.id}`;
  const review = s.projects[key];
  const reviewed = course.project.deliverables.every((_, i) => review?.checks[i]);
  const project = [...projects].sort((a, b) => b.lastOpenedAt.localeCompare(a.lastOpenedAt)).find((project) => project.courseId === course.id);
  async function startProject() {
    if (busy || !course) return;
    if (project) { go(`/build/${project.id}`); return; }
    setBusy(true);
    try {
      const p = { ...newProject(course.project.kind ?? "blank"), courseId: course.id, title: course.project.title, description: course.project.brief, notes: course.project.deliverables.map((text) => `- ${text}`).join("\n") };
      if (course.id === "web") p.files = {
        "index.html": '<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>My project page</title><link rel="stylesheet" href="styles.css"></head>\n<body>\n<main>\n  <h1>Your name</h1>\n  <p>Introduce yourself and the app you want to build.</p>\n  <!-- Add your project section, links, and form. -->\n</main>\n</body>\n</html>',
        "styles.css": '* { box-sizing: border-box; }\nbody { margin: 0; font-family: system-ui, sans-serif; line-height: 1.6; }\nmain { max-width: 960px; margin: auto; padding: 24px; }\n/* Add your responsive layout and visible focus styles. */',
        "script.js": '// This module focuses on HTML and CSS. No JavaScript is required.\n',
      };
      await saveProject(p); go(`/build/${p.id}`);
    } catch (error) { toast({ title: "Project could not be created", description: error instanceof Error ? error.message : String(error), variant: "destructive" }); }
    finally { setBusy(false); }
  }
  return <div className="max-w-4xl">
    <Link href="/learn" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground"><ArrowLeft className="size-4" /> Bootcamp curriculum</Link>
    <PageHeader kicker={`Module ${index + 1} of ${COURSES.length} · ${course.stage}`} title={course.title}>{course.description}</PageHeader>
    <div className="mb-8 rounded-2xl bg-ink p-5 text-background sm:p-6"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-semibold">{passed} of {lessons.length} lessons passed</p><p className="mt-1 text-sm text-background/65">{review?.doneAt ? `Project self-review saved ${prettyDate(review.doneAt)}` : "Then apply the skills in your module project."}</p></div>{next ? <Link href={`/lesson/${next.id}`} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground">{passed ? "Continue module" : "Start module"}<ArrowRight className="size-4" /></Link> : <a href="#project" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground">Open project brief<ArrowRight className="size-4" /></a>}</div><progress value={passed} max={lessons.length} aria-label="Module lessons passed" className="mt-4 h-2 w-full accent-[hsl(var(--marker))]" /></div>
    <section className="mb-9"><h2 className="font-display text-xl font-bold">What you’ll be able to do</h2><ul className="mt-3 space-y-2">{course.outcomes.map((outcome) => <li key={outcome} className="flex gap-2 text-sm"><span aria-hidden className="text-primary">→</span>{outcome}</li>)}</ul></section>
    <section aria-labelledby="lessons-heading"><h2 id="lessons-heading" className="font-display text-2xl font-bold">Your lessons</h2><ol className="mt-4 space-y-3">{lessons.map((lesson, i) => <li key={lesson.id}><Link href={`/lesson/${lesson.id}`} className={`lift flex items-center gap-3 rounded-2xl border bg-card p-4 ${next?.id === lesson.id ? "border-primary" : ""}`} data-testid={`link-lesson-${lesson.id}`}><StatusDot status={lessonStatus(s, lesson.id)} /><span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span><div className="min-w-0 flex-1"><p className="font-semibold">{lesson.title}</p><p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">{lesson.challenge || lesson.pageExercise ? <Code2 className="size-3.5" /> : <BookOpen className="size-3.5" />}{lesson.pageExercise ? `${lesson.pageExercise.language.toUpperCase()} lab` : lesson.challenge ? "Coding challenge" : "Lesson + knowledge check"} · about {lesson.minutes} min</p></div><ArrowRight className="size-4 shrink-0" /></Link></li>)}</ol></section>
    <section id="project" className="mt-10 scroll-mt-6 rounded-3xl border-2 border-foreground/70 bg-card p-5 sm:p-8" aria-labelledby="project-heading">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">Module project</p><h2 id="project-heading" className="mt-2 font-display text-2xl font-bold">{course.project.title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{course.project.brief}</p>
      {course.project.environment === "studio" ? <div><button onClick={startProject} disabled={busy || loading || !!error} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-50" data-testid="button-course-project"><Hammer className="size-4" />{busy ? "Creating…" : project ? "Continue in Project Studio" : "Start in Project Studio"}</button>{error && <p role="alert" className="mt-2 text-sm text-destructive">Saved projects could not be loaded. Check Build before creating another project.</p>}</div> : <p className="mt-4 rounded-xl bg-secondary p-4 text-sm"><strong>Build in your own editor or Replit.</strong> This project needs tools beyond the browser lesson runner. Keep the brief open, work in a separate project, and paste your repository and live links below.</p>}
      <h3 className="mt-7 font-semibold">Review your deliverables</h3><p className="mt-1 text-sm text-muted-foreground">Check each item after trying the actual project. This is a self-review, separate from automated lesson results.</p>
      <div className="mt-4 space-y-3">{course.project.deliverables.map((text, i) => <label key={text} className="flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm"><input className="mt-1 size-4 shrink-0 accent-[hsl(var(--primary))]" type="checkbox" checked={!!review?.checks[i]} onChange={() => { actions.toggleCheck(key, i); if (review?.doneAt) actions.setProjectDone(key, false); }} /><span>{text}</span></label>)}</div>
      <label className="mt-5 block text-sm font-semibold" htmlFor="project-notes">Your links and reflection</label><p className="mt-1 text-xs text-muted-foreground">Add repository and live URLs, what you built, one difficult part, and what you would improve.</p><textarea id="project-notes" value={review?.notes ?? ""} onChange={(event) => actions.setNotes(key, event.target.value)} rows={5} className="mt-2 w-full rounded-xl border bg-background p-3 text-sm" placeholder="Repository: https://github.com/…\nLive app: https://…\nWhat I built and learned:" />
      <button disabled={!reviewed || !!review?.doneAt} onClick={() => actions.setProjectDone(key, true)} className="mt-4 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background disabled:opacity-40" data-testid="button-save-course-review">Save my project review</button><p role="status" className="mt-2 text-xs text-muted-foreground">{review?.doneAt ? "Your self-review is saved in this browser." : "Check every deliverable to save your self-review."}</p>
    </section>
    <a href={course.resource.url} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">Official reference: {course.resource.label}<ExternalLink className="size-3.5" /></a>
    {nextCourse && <Link href={`/learn/${nextCourse.id}`} className="mt-8 flex items-center justify-between gap-3 rounded-2xl border p-5"><div><p className="text-xs text-muted-foreground">Next module</p><p className="mt-1 font-semibold">{nextCourse.title}</p></div><ArrowRight className="size-4 shrink-0" /></Link>}
  </div>;
}
