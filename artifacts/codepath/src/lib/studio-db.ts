import { useSyncExternalStore } from "react";
import { projectSchema, type StudioProject } from "./studio-model";

let view = { projects: [] as StudioProject[], loading: true, error: null as string | null };
const listeners = new Set<() => void>();
let opening: Promise<IDBDatabase> | null = null;
const emit = () => listeners.forEach((l) => l());
export function openStudioDB() {
  if (!opening) opening = new Promise<IDBDatabase>((resolve, reject) => {
    const req = indexedDB.open("codepath-studio", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("projects", { keyPath: "id" });
    req.onsuccess = () => { req.result.onversionchange = () => { req.result.close(); opening = null; }; resolve(req.result); };
    req.onerror = () => { opening = null; reject(req.error); };
    req.onblocked = () => { opening = null; reject(new Error("Close other Codepath tabs and retry.")); };
  });
  return opening;
}
export async function allProjects(): Promise<StudioProject[]> {
  const db = await openStudioDB();
  return new Promise((resolve, reject) => {
    const req = db.transaction("projects").objectStore("projects").getAll();
    req.onsuccess = () => {
      try { resolve(req.result.map((p: unknown) => projectSchema.parse(p))); }
      catch { reject(new Error("Project data needs recovery. No saved records have been changed.")); }
    };
    req.onerror = () => reject(req.error);
  });
}
export async function refreshProjects() {
  try { view = { projects: await allProjects(), loading: false, error: null }; }
  catch (e) { view = { ...view, loading: false, error: String(e) }; }
  emit();
}
export function useProjects() {
  return useSyncExternalStore((l) => { listeners.add(l); if (view.loading) void refreshProjects(); return () => listeners.delete(l); }, () => view);
}
export async function putProjects(projects: StudioProject[], replace = false) {
  const values = projects.map((p) => projectSchema.parse(p));
  const db = await openStudioDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction("projects", "readwrite");
    const store = tx.objectStore("projects");
    if (replace) store.clear();
    values.forEach((p) => store.put(p));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error("Project save failed."));
    tx.onabort = () => reject(tx.error || new Error("Project save was interrupted."));
  });
  await refreshProjects();
}
export async function saveProject(p: StudioProject) { await putProjects([p]); }
