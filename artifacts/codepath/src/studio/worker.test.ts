import { beforeAll, describe, expect, it, vi } from "vitest";
import { PRODUCT_EXAMPLE } from "../lib/studio-content";
import { SUITES } from "../lib/studio-checks";

// Trusted authored fixture only. Never evaluate user-provided projects in Node.
const messages: any[] = [];
const scope = { postMessage: (m: unknown) => messages.push(m), setTimeout, onmessage: (_: any) => {} };
beforeAll(async () => {
  vi.stubGlobal("self", scope);
  await import("./worker");
});
function request(data: object) {
  messages.length = 0;
  scope.onmessage({ data: { id: 1, ...data } });
  const reply = messages.find((m) => m.type === "reply");
  expect(reply?.error).toBeUndefined();
  return reply.result;
}
describe("authored Product Filter reference", () => {
  for (const suite of SUITES) it(`passes the actual Studio suite: ${suite.id}`, () => {
    let result = request({ type: "init", files: PRODUCT_EXAMPLE });
    for (const step of suite.steps) result = request({ type: "event", selector: step.sel, event: step.ev, value: step.value });
    const ids = result.cards.map((c: any) => Number(c.id));
    expect(suite.ordered ? ids : ids.sort((a: number, b: number) => a - b)).toEqual(suite.ordered ? suite.ids : [...suite.ids].sort((a, b) => a - b));
    expect(result.empty).toBe(suite.empty);
  });
  it("defaults to all products like a browser select", () => {
    const result = request({ type: "init", files: PRODUCT_EXAMPLE });
    expect(result.cards).toHaveLength(6);
    expect(result.empty).toBe(false);
  });
  it("combines category and sorting", () => {
    request({ type: "init", files: PRODUCT_EXAMPLE });
    request({ type: "event", selector: "#category", event: "change", value: "bottoms" });
    const result = request({ type: "event", selector: "#sort", event: "change", value: "desc" });
    expect(result.cards.map((c: any) => c.id)).toEqual(["3", "4"]);
  });
  it("normalizes search and restores empty results", () => {
    request({ type: "init", files: PRODUCT_EXAMPLE });
    expect(request({ type: "event", selector: "#search", event: "input", value: "  LINEN  " }).cards.map((c: any) => c.id)).toEqual(["1"]);
    expect(request({ type: "event", selector: "#search", event: "input", value: "zzzz" }).empty).toBe(true);
    expect(request({ type: "event", selector: "#search", event: "input", value: "" }).cards).toHaveLength(6);
  });
});

// Both implementations below are trusted test fixtures authored for this check.
it("rejects mutation even when the returned value matches", () => {
  const tests = [{ args: [["html"], "css"], expected: ["html", "css"], label: "preserve input", preserveArgs: true }];
  const bad = request({ type: "challenge", functionName: "addTag", code: "function addTag(tags, tag) { tags.push(tag); return tags; }", tests: structuredClone(tests) });
  expect(bad[0].passed).toBe(false);
  const good = request({ type: "challenge", functionName: "addTag", code: "function addTag(tags, tag) { return [...tags, tag]; }", tests: structuredClone(tests) });
  expect(good[0].passed).toBe(true);
});

it("runs reading experiments through the worker with bounded console output", () => {
  expect(request({type:"experiment",code:'console.log("hello", 3); console.warn({done:true});'})).toEqual(['hello 3','{"done":true}']);
  expect(request({type:"experiment",code:'for(let i=0;i<200;i++) console.log(i);'})).toHaveLength(100);
  messages.length=0;
  scope.onmessage({data:{id:1,type:"experiment",code:'throw new Error("example failed");'}});
  expect(messages.find(m=>m.type==='reply').error).toBe('example failed');
});
