// This bundle is instantiated ONLY inside an opaque-origin sandbox, never by Codepath.
import { parseHTML } from "linkedom";

const send = self.postMessage.bind(self);
let document: ReturnType<typeof parseHTML>["document"];
let window: ReturnType<typeof parseHTML>["window"];
let nextId = 0;
let logCount = 0;
let serializing = false;
let observer: MutationObserver | undefined;
const nativeTimeout = self.setTimeout.bind(self);
function snapshot() {
  if (!document || serializing) return;
  serializing = true;
  try {
    document.querySelectorAll("*").forEach((el) => {
      if (!el.hasAttribute("data-cp-node")) el.setAttribute("data-cp-node", String(++nextId));
    });
    const html = document.body.innerHTML;
    if (html.length > 300000) throw new Error("Preview is too large. Reduce the number of rendered elements.");
    send({ type: "render", html });
  } finally { serializing = false; }
}
function text(value: unknown): string {
  try { return (typeof value === "string" ? value : JSON.stringify(value))?.slice(0, 1500) ?? String(value); }
  catch { return "[value could not be displayed]"; }
}
function log(level: string, args: unknown[]) {
  if (++logCount <= 100) send({ type: "log", level, text: args.map(text).join(" ").slice(0, 4000) });
}
function setValue(el: Element, value: string, checked?: boolean) {
  if (el.tagName === "SELECT") {
    el.querySelectorAll("option").forEach((option) => {
      option.removeAttribute("selected");
    });
    const match = Array.from(el.querySelectorAll("option")).find((option) => option.getAttribute("value") === value);
    match?.setAttribute("selected", "");
  } else (el as HTMLInputElement).value = value;
  if (checked !== undefined) (el as HTMLInputElement).checked = checked;
}
function dispatch(selector: string, type: string, value?: string, checked?: boolean) {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`Could not find ${selector}. Keep the starter control IDs.`);
  if (value !== undefined) setValue(el, value, checked);
  const ev = new window.Event(type, { bubbles: true, cancelable: true });
  el.dispatchEvent(ev);
}
function inspect() {
  return {
    cards: Array.from(document.querySelectorAll(".product-card")).map((el) => ({ id: el.getAttribute("data-id"), text: el.textContent ?? "" })),
    empty: !!document.querySelector("#empty") && !(document.querySelector("#empty") as HTMLElement).hidden
      && (document.querySelector("#empty") as HTMLElement).style.display !== "none",
  };
}
self.onmessage = ({ data }) => {
  const id = data.id;
  try {
    if (data.type === "ping") { send({ type: "pong" }); return; }
    if (data.type === "init") {
      observer?.disconnect(); logCount = 0; nextId = 0;
      ({ document, window } = parseHTML(data.files["index.html"] || "<html><body></body></html>"));
      document.querySelectorAll("select").forEach((select) => {
        if (!select.querySelector("option[selected]")) {
          const first = select.querySelector("option");
          if (first) first.selected = true;
        }
      });
      const scripts = Array.from(document.querySelectorAll("script"));
      const inline = scripts.filter((s) => !s.src).map((s) => s.textContent ?? "").join("\n");
      scripts.forEach((s) => s.remove());
      // A virtual DOM runs off-thread. No learner script ever runs on the rendering thread.
      const consoleProxy = Object.fromEntries(["log", "info", "warn", "error", "debug"].map((level) => [level, (...args: unknown[]) => log(level, args)]));
      const timer = (fn: () => void, delay = 0) => nativeTimeout(() => {
        try { fn(); snapshot(); } catch (e) { log("error", [String(e)]); }
      }, Math.max(0, delay));
      const run = new Function("document", "window", "console", "setTimeout",
        `${inline}\n${data.files["script.js"]}\n//# sourceURL=learner-script.js`);
      run(document, window, consoleProxy, timer);
      document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true }));
      snapshot();
      // Catch asynchronous DOM updates without an unbounded mutation-message loop.
      let scheduled = false;
      observer = new window.MutationObserver(() => {
        if (!scheduled) { scheduled = true; nativeTimeout(() => { scheduled = false; snapshot(); }, 50); }
      });
      observer.observe(document, { subtree: true, childList: true, attributes: true, characterData: true });
      send({ type: "reply", id, result: inspect() });
    } else if (data.type === "event") {
      dispatch(data.selector, data.event, data.value, data.checked);
      snapshot();
      send({ type: "reply", id, result: inspect() });
    } else if (data.type === "inspect") {
      send({ type: "reply", id, result: inspect() });
    } else if (data.type === "challenge") {
      const { code, functionName, tests } = data;
      if (!/^[A-Za-z_$][\w$]*$/.test(functionName)) throw new Error("Invalid function name.");
      const fn = new Function(`${code}\nreturn ${functionName};`)();
      const canonical = (x: unknown): string => {
        if (Array.isArray(x)) return `[${x.map(canonical).join(",")}]`;
        if (x && typeof x === "object") return `{${Object.keys(x).sort().map((k) => `${JSON.stringify(k)}:${canonical((x as Record<string, unknown>)[k])}`).join(",")}}`;
        return JSON.stringify(x) ?? "undefined";
      };
      const results = tests.map((t: { args: unknown[]; expected: unknown; label: string; preserveArgs?: boolean }) => {
        try {
          const before = canonical(t.args);
          const actual = fn(...t.args);
          const unchanged = !t.preserveArgs || before === canonical(t.args);
          return { label: t.label, passed: unchanged && canonical(actual) === canonical(t.expected), actual: text(actual) + (unchanged ? "" : " (input changed)"), expected: text(t.expected) + (t.preserveArgs ? " without changing inputs" : "") };
        }
        catch (e) { return { label: t.label, passed: false, actual: String(e), expected: text(t.expected) }; }
      });
      send({ type: "reply", id, result: results });
    }
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    log("error", [error]); send({ type: "reply", id, error });
  }
};
