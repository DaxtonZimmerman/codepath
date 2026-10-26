import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { StudioRuntime } from "@/lib/studio-runtime";
import type { Files } from "@/lib/studio-model";

export function StudioPreview({ files }: { files: Files }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const runtime = useRef<StudioRuntime | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState("Preview not running");
  const [doc, setDoc] = useState("");
  const session = useRef("");
  const focusNode = useRef<string | null>(null);
  const currentFiles = useRef(files); currentFiles.current = files;
  function render(html: string) {
    const nonce = crypto.randomUUID().replace(/-/g, "");
    const clean = DOMPurify.sanitize(html, { FORBID_TAGS: ["script", "iframe", "object", "embed", "link", "meta", "base", "style", "svg", "math"], FORBID_ATTR: ["src", "srcset", "href", "action", "formaction", "nonce"] });
    const css = currentFiles.current["styles.css"].replace(/</g, "\\3c ");
    setDoc(`<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}'; style-src 'unsafe-inline'; img-src 'none'; connect-src 'none'; frame-src 'none'; base-uri 'none'; form-action 'none'"><style>${css}</style></head><body>${clean}<script nonce="${nonce}">
    const token=${JSON.stringify(session.current)};
    const focusNode=${JSON.stringify(focusNode.current)};
    if(focusNode){const input=document.querySelector('[data-cp-node="'+focusNode+'"]');if(input){input.focus();try{input.setSelectionRange(input.value.length,input.value.length);}catch{}}}
    for(const type of ["input","change","click","submit"]) document.addEventListener(type,e=>{
      if(type==="submit")e.preventDefault();
      const target=e.target.closest("[data-cp-node]");
      if(!target)return;
      parent.postMessage({token,type:"event",node:target.dataset.cpNode,event:type,value:target.value,checked:target.checked},"*");
    });
    </script></body></html>`);
  }
  async function run() {
    runtime.current?.stop(); session.current = crypto.randomUUID(); setLogs([]); setStatus("Running…");
    const rt = new StudioRuntime({
      render,
      log: (level, text) => setLogs((l) => [...l.slice(-99), `${level}: ${text}`]),
      error: (text) => setStatus(text),
    });
    runtime.current = rt;
    try { await rt.run(currentFiles.current); setStatus("Preview running"); }
    catch (e) { setStatus(String(e)); }
  }
  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow || e.data?.token !== session.current || e.data.type !== "event") return;
      if (!/^\d+$/.test(e.data.node) || !["input", "change", "click", "submit"].includes(e.data.event)) return;
      focusNode.current = e.data.event === "input" ? e.data.node : null;
      void runtime.current?.event(`[data-cp-node="${e.data.node}"]`, e.data.event, typeof e.data.value === "string" ? e.data.value : undefined, typeof e.data.checked === "boolean" ? e.data.checked : undefined).catch((error) => setStatus(String(error)));
    };
    window.addEventListener("message", listener);
    return () => { window.removeEventListener("message", listener); runtime.current?.stop(); };
  }, []);
  return <section className="min-w-0 space-y-3" aria-label="Live preview">
    <div className="flex flex-wrap gap-2">
      <button className="rounded-xl bg-primary text-primary-foreground px-4 py-2" onClick={run}>Run preview</button>
      <button className="rounded-xl border px-4 py-2" onClick={() => { runtime.current?.stop(); setDoc(""); setStatus("Preview stopped"); }}>Stop preview</button>
    </div>
    <p role="status" className="text-sm break-words">{status}</p>
    <iframe ref={frame} title="Your app preview" sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={doc} className="w-full min-w-0 h-96 border rounded-xl bg-white" />
    <details className="text-xs text-muted-foreground"><summary>Preview safety and supported features</summary><p>Code runs in an interruptible worker with a virtual DOM, not on Codepath's page. Common selectors, DOM rendering and events work. Network, browser storage, modules, canvas and layout-measurement APIs are not supported here. Run preview after edits. Exported files run in a normal browser without these preview limits.</p></details>
    <div className="rounded-xl bg-ink text-white p-4"><div className="flex justify-between"><h3>Console</h3><button onClick={() => setLogs([])}>Clear console</button></div><pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-all text-xs" aria-live="polite">{logs.join("\n") || "No output yet."}</pre></div>
  </section>;
}
