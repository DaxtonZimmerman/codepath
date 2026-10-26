import { describe, it, expect } from "vitest";
import "fake-indexeddb/auto";
import { validateProgress } from "./progress-schema";
import { newProject } from "./studio-content";
import { allProjects, putProjects } from "./studio-db";
import { fingerprint, isComplete } from "./studio-model";
import { projectZip } from "./studio-export";
import { unzipSync, strFromU8 } from "fflate";

const legacy = {
  version: 1, dailyGoal: 2, completed: { "js-functions": "2026-10-01T00:00:00Z" },
  attempts: [{ lessonId: "js-functions", at: "2026-10-01", passed: false, kind: "challenge" }],
  drafts: { "js-functions": "function clamp() { return 42; }" },
  reviews: { "js-functions": { due: "2026-10-26", lastResult: "miss" } },
  projects: { portfolio: { checks: { 0: true }, notes: "Keep my work", doneAt: null } },
  assessment: { at: "2026-10-01", score: 4, recommended: "array-methods", answers: [1, 2, 0] },
  activity: { "2026-10-01": 2 }, customFutureField: "keep me",
};
describe("preservation and Studio files", () => {
  it("preserves every legacy value while adding defaults without mutating input", () => {
    const original = JSON.stringify(legacy);
    const result = validateProgress(legacy);
    for (const [k, v] of Object.entries(legacy)) expect(result[k]).toEqual(v);
    expect(result.goal).toBeNull(); expect(result.showStats).toBe(false);
    expect(JSON.stringify(legacy)).toBe(original);
  });
  it("rejects malformed records, never silently resets", () => {
    expect(() => validateProgress({ ...legacy, reviews: { x: { due: "bad", lastResult: "miss" } } })).toThrow();
    expect(() => validateProgress({ ...legacy, drafts: [] })).toThrow();
  });
  it("persists and reads project code, notes and versions", async () => {
    const p = newProject("blank"); p.notes = "Important";
    p.versions.push({ id: "v1", title: "First version", at: p.createdAt, files: { ...p.files } });
    await putProjects([p], true);
    expect(await allProjects()).toEqual([p]);
  });
  it("rejects an invalid batch before replacing existing projects", async () => {
    const before = await allProjects();
    await expect(putProjects([{ ...before[0], files: {} } as never], true)).rejects.toThrow();
    expect(await allProjects()).toEqual(before);
  });
  it("exports real three-file source with relative links and README", () => {
    const p = newProject("product-filter");
    const files = unzipSync(projectZip(p));
    expect(Object.keys(files).sort()).toEqual(["README.md", "index.html", "script.js", "styles.css"]);
    expect(strFromU8(files["script.js"]!)).toBe(p.files["script.js"]);
    expect(strFromU8(files["index.html"]!)).toContain('href="styles.css"');
  });
  it("does not equate checkboxes or stale tests with completion", () => {
    const p = newProject("product-filter");
    p.manual = { responsive: true, keyboard: true };
    expect(isComplete(p)).toBe(false);
    p.evidence = { at: p.createdAt, fingerprint: fingerprint(p.files), results: Array.from({ length: 6 }, (_, i) => ({ id: String(i), label: "check", concept: "dom", passed: true, expected: "", actual: "" })) };
    expect(isComplete(p)).toBe(true);
    p.files["script.js"] += "\n// changed";
    expect(isComplete(p)).toBe(false);
  });
});
