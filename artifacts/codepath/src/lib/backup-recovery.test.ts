import { expect, it, vi } from "vitest";

it("blocks merge and normal backup while original progress is unreadable", async () => {
  vi.resetModules();
  const raw = '{"version":1,"drafts":"malformed but valuable original data"}';
  const setItem = vi.fn();
  vi.stubGlobal("localStorage", { getItem: () => raw, setItem });
  const { getStorageStatus } = await import("./store");
  const { restoreBackup, exportBackup } = await import("./backup");
  expect(getStorageStatus().blocked).toBe(true);
  await expect(restoreBackup({} as never, "merge")).rejects.toThrow("Merge is unavailable");
  await expect(exportBackup()).rejects.toThrow("Download raw data");
  expect(setItem).not.toHaveBeenCalled();
  expect(localStorage.getItem("codepath:v1")).toBe(raw);
  vi.unstubAllGlobals();
});
