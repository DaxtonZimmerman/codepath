import { z } from "zod";

export const FILE_NAMES = ["index.html", "styles.css", "script.js"] as const;
export type FileName = typeof FILE_NAMES[number];
const filesSchema = z.object({ "index.html": z.string().max(300000), "styles.css": z.string().max(300000), "script.js": z.string().max(300000) });
export type Files = z.infer<typeof filesSchema>;
const date = z.string().refine((s) => Number.isFinite(Date.parse(s)));
export const checkSchema = z.object({ id: z.string(), label: z.string(), passed: z.boolean(), expected: z.string(), actual: z.string(), concept: z.string() });
export type CheckResult = z.infer<typeof checkSchema>;
export const projectSchema = z.object({
  id: z.string().min(1).max(100), kind: z.enum(["product-filter", "blank"]),
  title: z.string().min(1).max(160), description: z.string().max(3000),
  files: filesSchema, notes: z.string().max(100000),
  createdAt: date, updatedAt: date, lastOpenedAt: date,
  step: z.number().int().min(0).max(5),
  liveUrl: z.string().max(2000), repoUrl: z.string().max(2000),
  reflection: z.tuple([z.string(), z.string(), z.string()]),
  manual: z.record(z.string(), z.boolean()),
  evidence: z.object({ fingerprint: z.string(), at: date, results: z.array(checkSchema) }).nullable(),
  versions: z.array(z.object({ id: z.string(), title: z.string(), at: date, files: filesSchema })),
  reviews: z.record(z.string(), z.object({ due: date, lastResult: z.enum(["pass", "miss"]) })),
}).passthrough();
export type StudioProject = z.infer<typeof projectSchema>;
export function fingerprint(files: Files): string {
  // Exact source identity avoids hash collisions in completion evidence.
  return JSON.stringify(FILE_NAMES.map((f) => files[f]));
}
export function isComplete(p: StudioProject): boolean {
  return p.kind === "product-filter" && p.evidence?.fingerprint === fingerprint(p.files)
    && p.evidence.results.length >= 6 && p.evidence.results.every((r) => r.passed)
    && p.manual.responsive === true && p.manual.keyboard === true;
}
export function validUrl(s: string, github = false) {
  if (!s.trim()) return true;
  try { const u = new URL(s); return ["https:", "http:"].includes(u.protocol) && (!github || u.hostname === "github.com"); }
  catch { return false; }
}
