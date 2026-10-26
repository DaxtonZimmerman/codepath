import { mergeLearning, emptyLearning } from "./learning-progress";
import { z } from "zod";
import { progressSchema } from "./progress-schema";
import { getProgress, getStorageStatus, replaceProgress, downloadFile, type State } from "./store";
import { projectSchema } from "./studio-model";
import { allProjects, putProjects } from "./studio-db";

const backupSchema = z.object({ format: z.literal("codepath-backup"), version: z.literal(1), progress: progressSchema, projects: z.array(projectSchema), exportedAt: z.string().optional() });
export type Backup = z.infer<typeof backupSchema>;
export function inspectBackup(text: string): Backup {
  if (text.length > 25_000_000) throw new Error("Backup is too large (25 MB limit).");
  const result = backupSchema.parse(JSON.parse(text));
  if (new Set(result.projects.map((p) => p.id)).size !== result.projects.length) throw new Error("Backup contains duplicate project IDs.");
  return result;
}
export async function exportBackup() {
  if (getStorageStatus().blocked) throw new Error("Saved progress is unreadable. Use Download raw data to preserve the original record, not an empty progress backup.");
  const backup: Backup = { format: "codepath-backup", version: 1, exportedAt: new Date().toISOString(), progress: getProgress(), projects: await allProjects() };
  downloadFile("codepath-backup.json", new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }));
}
export function mergeProgress(current: State, imported: State): State {
  const attempts = [...current.attempts, ...imported.attempts];
  const seen = new Set<string>();
  return {
    ...imported, ...current,
    completed: { ...imported.completed, ...current.completed },
    learning: mergeLearning(current.learning ?? emptyLearning(), imported.learning ?? emptyLearning()),
    drafts: { ...imported.drafts, ...current.drafts },
    reviews: { ...imported.reviews, ...current.reviews },
    projects: { ...imported.projects, ...current.projects },
    activity: Object.fromEntries([...new Set([...Object.keys(current.activity), ...Object.keys(imported.activity)])].map((k) => [k, Math.max(current.activity[k] ?? 0, imported.activity[k] ?? 0)])),
    assessment: current.assessment ?? imported.assessment,
    attempts: attempts.filter((a) => { const k = JSON.stringify(a); if (seen.has(k)) return false; seen.add(k); return true; }),
  };
}
export async function restoreBackup(input: Backup, mode: "merge" | "replace") {
  if (mode === "merge" && getStorageStatus().blocked) throw new Error("Merge is unavailable because existing progress cannot be read. Download raw data first, then choose Replace only if you intend to overwrite it.");
  const backup = backupSchema.parse(input);
  const oldProjects = await allProjects();
  const oldProgress = getProgress();
  const imported = backup.progress as State;
  const projects = mode === "replace" ? backup.projects : [
    ...oldProjects,
    ...backup.projects.map((p) => oldProjects.some((old) => old.id === p.id)
      ? { ...p, id: crypto.randomUUID(), title: `${p.title} (imported copy)` } : p),
  ];
  // IndexedDB transactions are atomic; roll back projects if localStorage cannot commit.
  await putProjects(projects, true);
  try { replaceProgress(mode === "replace" ? imported : mergeProgress(oldProgress, imported)); }
  catch (e) {
    try { await putProjects(oldProjects, true); }
    catch { throw new Error("Restore could not fully roll back. Keep both backups and retry restore after freeing storage."); }
    throw e;
  }
}
