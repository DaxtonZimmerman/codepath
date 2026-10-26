export function explainRunError(message: string, functionName?: string): { title: string; next: string } {
  if (/exceeded|infinite loop|stopped responding/i.test(message)) return { title: "The code did not finish", next: "Trace the loop with a small input. Check that its counter changes and its stopping condition can become false, then run again." };
  if (/not defined|not a function/i.test(message)) return { title: "A name or callable value is missing", next: functionName ? `Check the spelling and definition of ${functionName}. Define the function without calling it in its declaration, and inspect any other name mentioned in the error.` : "Check the name in the error and whether it was declared in the current scope. A function reference and a function call are different values." };
  if (/unexpected|syntax|missing|unterminated/i.test(message)) return { title: "The code could not be read", next: "Start with the line mentioned in the error and the line just above it. Match braces, parentheses and quotes before changing the calculation." };
  if (/cannot read|undefined|null/i.test(message)) return { title: "A value is missing where it is used", next: "Inspect the input or selected element before reading its properties. Check empty collections, missing fields and selectors that match no element." };
  if (/fetch|network|content security|connect-src/i.test(message)) return { title: "This example needs a different environment", next: "Real network requests and server tools belong in the module’s editor or Replit exercise. Use its starter files and verification instructions." };
  return { title: "The code stopped before completing the checks", next: "Read the first error, reproduce it with a small input, and compare that path with the worked example. Fix one cause before running again." };
}
export function explainMismatch(result: { actual?: string; expected?: string; label: string }): string {
  if (/input changed/.test(result.actual ?? "")) return "The returned value may be right, but the input changed. Copy the array or record before a mutating update.";
  if (result.actual === "undefined") return "The caller received undefined. Check for a missing return, a return inside the wrong branch, or an empty-input path with no result.";
  if (result.actual === "NaN") return "Trace numeric inputs before calculating. Check conversion, missing values and the accumulator’s starting value.";
  if (/Error:/.test(result.actual ?? "")) return explainRunError(result.actual!).next;
  return "Trace this input through each branch or loop. Compare the exact value, type and boundary rule with the expected result.";
}
