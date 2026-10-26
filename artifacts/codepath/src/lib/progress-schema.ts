import { z } from "zod";
import { learningSchema } from "./learning-progress";

const date = z.string().refine((s) => Number.isFinite(Date.parse(s)), "Invalid date");
export const progressSchema = z.object({
  version: z.literal(1),
  learning: learningSchema,
  dailyGoal: z.number().int().min(1).max(8),
  completed: z.record(z.string(), date),
  attempts: z.array(z.object({ lessonId: z.string(), at: date, passed: z.boolean(), kind: z.enum(["challenge", "quiz"]) }).passthrough()),
  drafts: z.record(z.string(), z.string()),
  reviews: z.record(z.string(), z.object({ due: date, lastResult: z.enum(["pass", "miss"]) }).passthrough()),
  projects: z.record(z.string(), z.object({ checks: z.record(z.string(), z.boolean()), notes: z.string(), doneAt: date.nullable() }).passthrough()),
  assessment: z.object({ at: date, score: z.number(), recommended: z.string(), answers: z.array(z.number().int()) }).passthrough().nullable(),
  activity: z.record(z.string(), z.number().nonnegative()),
  goal: z.enum(["javascript", "portfolio", "full"]).nullable().default(null),
  showStats: z.boolean().default(false),
}).passthrough();

export function validateProgress(input: unknown) {
  return progressSchema.parse(input);
}
