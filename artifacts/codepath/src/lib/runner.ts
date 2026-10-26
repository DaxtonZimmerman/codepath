import { StudioRuntime } from "./studio-runtime";
export interface ChallengeTest { args: unknown[]; expected: unknown; label: string; preserveArgs?: boolean }
export interface ChallengeResult { passed: boolean; label: string; actual: string; expected: string }
export async function runChallenge(code: string, functionName: string, tests: ChallengeTest[]): Promise<ChallengeResult[]> {
  const runtime = new StudioRuntime();
  try {
    const results = await runtime.request<ChallengeResult[]>({ type: "challenge", code, functionName, tests });
    if (!Array.isArray(results) || results.length !== tests.length || !results.every((r) => typeof r.passed === "boolean")) throw new Error("The exercise returned an invalid result.");
    return results;
  } finally { runtime.stop(); }
}
