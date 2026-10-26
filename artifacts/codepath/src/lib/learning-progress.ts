import { z } from "zod";
const timestamp = z.string().refine((value) => Number.isFinite(Date.parse(value)));
const result = z.object({ label: z.string(), passed: z.boolean(), actual: z.string().optional(), expected: z.string().optional() });
export const evidenceSchema = z.object({ at: timestamp, source: z.string(), mode: z.enum(["tests", "self-review"]), results: z.array(result) });
const item = z.object({ questionId: z.string(), order: z.array(z.number().int().min(0).max(3)).length(4), pick: z.number().int().min(0).max(3).nullable() });
export const sessionSchema = z.object({ id: z.string(), version: z.literal(1), startedAt: timestamp, items: z.array(item) });
export const quizAttemptSchema = z.object({ id: z.string(), at: timestamp, questionIds: z.array(z.string()), picks: z.array(z.number().int()), score: z.number().int().nonnegative(), total: z.number().int().positive(), passed: z.boolean(), missedLessons: z.array(z.string()) });
export const learningSchema = z.object({
  readings: z.record(z.string(), timestamp).default({}),
  evidence: z.record(z.string(), evidenceSchema).default({}),
  quizzes: z.record(z.string(), z.object({ active: sessionSchema.nullable().default(null), attempts: z.array(quizAttemptSchema).default([]) })).default({}),
}).default({ readings: {}, evidence: {}, quizzes: {} });
export type LearningProgress = z.infer<typeof learningSchema>;
export type LearningEvidence = z.infer<typeof evidenceSchema>;
export type QuizSession = z.infer<typeof sessionSchema>;
export type ModuleQuizAttempt = z.infer<typeof quizAttemptSchema>;
export const emptyLearning = (): LearningProgress => ({ readings: {}, evidence: {}, quizzes: {} });
export function evidenceMatches(evidence: LearningEvidence | undefined, source: string) {
  return !!evidence && evidence.source === source && evidence.results.length > 0 && evidence.results.every((item) => item.passed);
}
export function mergeLearning(current: LearningProgress, imported: LearningProgress): LearningProgress {
  const latest = <T extends { at: string }>(a: Record<string, T>, b: Record<string, T>) => {
    const merged = { ...b };
    for (const [key, value] of Object.entries(a)) if (!merged[key] || value.at >= merged[key].at) merged[key] = value;
    return merged;
  };
  const quizzes: LearningProgress["quizzes"] = {};
  for (const id of new Set([...Object.keys(current.quizzes), ...Object.keys(imported.quizzes)])) {
    const a = current.quizzes[id], b = imported.quizzes[id];
    const attempts = [...new Map([...(b?.attempts ?? []), ...(a?.attempts ?? [])].map((attempt) => [attempt.id, attempt])).values()].sort((x, y) => x.at.localeCompare(y.at));
    const finished = new Set(attempts.map(attempt => attempt.id));
    const active = [a?.active, b?.active].filter((session): session is QuizSession => !!session && !finished.has(session.id)).sort((x,y)=>y.startedAt.localeCompare(x.startedAt))[0] ?? null;
    quizzes[id] = { active, attempts };
  }
  const readings = { ...imported.readings };
  for (const [id, at] of Object.entries(current.readings)) if (!readings[id] || at > readings[id]) readings[id] = at;
  return { readings, evidence: latest(current.evidence, imported.evidence), quizzes };
}
