import { LESSONS, type Lesson } from "./curriculum";
import { dayKey, type State } from "./store";

export function nextLesson(s: State): Lesson | null {
  const rec = s.assessment?.recommended;
  const candidates = s.goal === "javascript" ? LESSONS.filter((l) => ["js", "data", "dom", "async", "test"].includes(l.track)) : LESSONS;
  if (rec && !s.completed[rec] && candidates.some((l) => l.id === rec)) return candidates.find((l) => l.id === rec) ?? null;
  return candidates.find((l) => !s.completed[l.id]) ?? null;
}

export function dueReviews(s: State) {
  const today = dayKey();
  return Object.entries(s.reviews)
    .filter(([, r]) => r.due <= today)
    .map(([id, r]) => ({ lesson: LESSONS.find((l) => l.id === id)!, review: r }))
    .filter((x) => x.lesson)
    .sort((a, b) => (a.review.lastResult === "miss" ? -1 : 1) - (b.review.lastResult === "miss" ? -1 : 1));
}

export function upcomingReviews(s: State) {
  const today = dayKey();
  return Object.entries(s.reviews)
    .filter(([, r]) => r.due > today)
    .map(([id, r]) => ({ lesson: LESSONS.find((l) => l.id === id)!, review: r }))
    .filter((x) => x.lesson)
    .sort((a, b) => a.review.due.localeCompare(b.review.due));
}

export const todayCount = (s: State) => s.activity[dayKey()] ?? 0;

export function lessonStatus(s: State, id: string): "done" | "missed" | "attempted" | "new" {
  if (s.completed[id]) return "done";
  const a = s.attempts.filter((x) => x.lessonId === id);
  if (!a.length) return "new";
  return a.some((x) => !x.passed) ? "missed" : "attempted";
}

export function prettyDate(iso: string) {
  const d = new Date(iso.length === 10 ? iso + "T12:00:00" : iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
