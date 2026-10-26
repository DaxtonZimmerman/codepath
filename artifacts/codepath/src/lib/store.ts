import { useSyncExternalStore } from "react";
import { emptyLearning, type LearningProgress, type LearningEvidence, type QuizSession, type ModuleQuizAttempt } from "./learning-progress";
import { validateProgress } from "./progress-schema";

export type Attempt = { lessonId: string; at: string; passed: boolean; kind: "challenge" | "quiz" };
export type Review = { due: string; lastResult: "pass" | "miss" };
export type ProjectState = { checks: Record<number, boolean>; notes: string; doneAt: string | null };
export type AssessmentResult = { at: string; score: number; recommended: string; answers: number[] };

export type State = {
  goal: "javascript" | "portfolio" | "full" | null;
  showStats: boolean;
  version: 1;
  learning: LearningProgress;
  dailyGoal: number;
  completed: Record<string, string>;
  attempts: Attempt[];
  drafts: Record<string, string>;
  reviews: Record<string, Review>;
  projects: Record<string, ProjectState>;
  assessment: AssessmentResult | null;
  activity: Record<string, number>;
};

const KEY = "codepath:v1";
const initial = (): State => ({
  goal: null, showStats: false,
  version: 1, learning: emptyLearning(), dailyGoal: 2, completed: {}, attempts: [], drafts: {}, reviews: {}, projects: {}, assessment: null, activity: {},
});

let storageStatus = { error: null as string | null, blocked: false };
const statusListeners = new Set<() => void>();
function report(error: string | null, blocked = false) {
  storageStatus = { error, blocked };
  statusListeners.forEach((l) => l());
}

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial();
    return validateProgress(JSON.parse(raw)) as State;
  } catch (error) {
    storageStatus = { error: `Could not read saved progress. Your original data has not been changed. Export it before restoring a backup. ${error instanceof Error ? error.message : ""}`, blocked: true };
    return initial();
  }
}

let state: State = load();
const listeners = new Set<() => void>();

function set(updater: (s: State) => State) {
  if (storageStatus.blocked) return;
  state = updater(state);
  retrySave();
  listeners.forEach((l) => l());
}

export function retrySave() {
  if (storageStatus.blocked) return;
  try { localStorage.setItem(KEY, JSON.stringify(state)); report(null); }
  catch { report("Progress is not saved. Keep this tab open, export a backup, then free browser storage and retry."); }
}

export function useStorageStatus() {
  return useSyncExternalStore((l) => { statusListeners.add(l); return () => statusListeners.delete(l); }, () => storageStatus);
}

export function getProgress(): State { return structuredClone(state); }
export function getStorageStatus() { return storageStatus; }
export function downloadFile(name: string, data: Blob) {
  const url = URL.createObjectURL(data);
  const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function exportRawProgress() {
  let raw: string | null = null;
  try { raw = localStorage.getItem(KEY); } catch { /* memory remains exportable */ }
  downloadFile("codepath-progress-recovery.json", new Blob([JSON.stringify({ original: raw, inMemory: state }, null, 2)], { type: "application/json" }));
}
export function replaceProgress(next: State) {
  const valid = validateProgress(next) as State;
  // Write first. A failure must not replace either memory or the saved record.
  localStorage.setItem(KEY, JSON.stringify(valid));
  state = valid;
  report(null);
  listeners.forEach((l) => l());
}

export function useStore(): State {
  return useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb); }, () => state);
}

export const dayKey = (d = new Date()) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};
export const addDays = (n: number, d = new Date()) => { const x = new Date(d); x.setDate(x.getDate() + n); return dayKey(x); };

function bump(s: State): Record<string, number> {
  const k = dayKey();
  return { ...s.activity, [k]: (s.activity[k] ?? 0) + 1 };
}

export const actions = {
  checkReading: (lessonId: string) => set((s) => ({ ...s, learning: { ...s.learning, readings: { ...s.learning.readings, [lessonId]: new Date().toISOString() } } })),
  saveLearningEvidence: (id: string, evidence: LearningEvidence, countActivity = true) => set((s) => {
    const prior = s.learning.evidence[id];
    const passed = evidence.results.length > 0 && evidence.results.every(r=>r.passed);
    const newPass = passed && (!prior || prior.source !== evidence.source || !prior.results.every(r=>r.passed));
    return { ...s, activity: newPass && countActivity ? bump(s) : s.activity, learning: { ...s.learning, evidence: { ...s.learning.evidence, [id]: evidence } } };
  }),
  saveQuizSession: (courseId: string, active: QuizSession) => set((s) => ({ ...s, learning: { ...s.learning, quizzes: { ...s.learning.quizzes, [courseId]: { attempts: s.learning.quizzes[courseId]?.attempts ?? [], active } } } })),
  finishModuleQuiz: (courseId: string, attempt: ModuleQuizAttempt) => set((s) => {
    const old = s.learning.quizzes[courseId];
    if (old?.attempts.some((item) => item.id === attempt.id)) return s;
    return { ...s, activity: attempt.passed ? bump(s) : s.activity, learning: { ...s.learning, quizzes: { ...s.learning.quizzes, [courseId]: { active: null, attempts: [...(old?.attempts ?? []), attempt] } } } };
  }),
  setGoal: (goal: State["goal"]) => set((s) => ({ ...s, goal })),
  setShowStats: (showStats: boolean) => set((s) => ({ ...s, showStats })),
  setDailyGoal: (n: number) => set((s) => ({ ...s, dailyGoal: n })),
  saveDraft: (id: string, code: string) => set((s) => ({ ...s, drafts: { ...s.drafts, [id]: code } })),
  recordAttempt(lessonId: string, passed: boolean, kind: Attempt["kind"]) {
    set((s) => {
      const firstPass = passed && !s.completed[lessonId];
      return {
        ...s,
        attempts: [...s.attempts, { lessonId, at: new Date().toISOString(), passed, kind }],
        completed: firstPass ? { ...s.completed, [lessonId]: new Date().toISOString() } : s.completed,
        reviews: { ...s.reviews, [lessonId]: { due: addDays(passed ? 3 : 1), lastResult: passed ? "pass" : "miss" } },
        activity: passed ? bump(s) : s.activity,
      };
    });
  },
  toggleCheck(pid: string, i: number) {
    set((s) => {
      const p = s.projects[pid] ?? { checks: {}, notes: "", doneAt: null };
      return { ...s, projects: { ...s.projects, [pid]: { ...p, checks: { ...p.checks, [i]: !p.checks[i] } } } };
    });
  },
  setNotes(pid: string, notes: string) {
    set((s) => {
      const p = s.projects[pid] ?? { checks: {}, notes: "", doneAt: null };
      return { ...s, projects: { ...s.projects, [pid]: { ...p, notes } } };
    });
  },
  setProjectDone(pid: string, done: boolean) {
    set((s) => {
      const p = s.projects[pid] ?? { checks: {}, notes: "", doneAt: null };
      return { ...s, activity: done ? bump(s) : s.activity, projects: { ...s.projects, [pid]: { ...p, doneAt: done ? new Date().toISOString() : null } } };
    });
  },
  saveAssessment: (a: AssessmentResult) => set((s) => ({ ...s, assessment: a })),
  reset: () => set(() => initial()),
};

export function streak(activity: Record<string, number>): number {
  let n = 0;
  let d = new Date();
  if (!activity[dayKey(d)]) d.setDate(d.getDate() - 1);
  while (activity[dayKey(d)]) { n++; d = new Date(d); d.setDate(d.getDate() - 1); }
  return n;
}
