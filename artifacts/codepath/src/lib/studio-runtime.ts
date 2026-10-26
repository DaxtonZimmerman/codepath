import type { Files } from "./studio-model";

export type Inspection = { cards: { id: string | null; text: string }[]; empty: boolean };
export type RuntimeEvents = { render?: (html: string) => void; log?: (level: string, text: string) => void; error?: (error: string) => void };
let sourcePromise: Promise<string> | null = null;
async function source() {
  if (!sourcePromise) sourcePromise = fetch(`${import.meta.env.BASE_URL}runtime/studio-worker.js`).then(async (r) => {
    if (!r.ok) throw new Error("Preview runtime is unavailable. Reload Codepath and retry.");
    return r.text();
  }).catch((e) => { sourcePromise = null; throw e; });
  return sourcePromise;
}

/** Opaque iframe creates an opaque blob Worker. CSP, not global deletion, blocks network.
 * Only code and its own DOM enter the worker; no app storage, secrets, or backups enter.
 */
export class StudioRuntime {
  private frame: HTMLIFrameElement | null = null;
  private seq = 0;
  private token = crypto.randomUUID();
  private pending = new Map<number, { resolve: (x: unknown) => void; reject: (e: Error) => void; timer: ReturnType<typeof setTimeout> }>();
  private started: Promise<void> | null = null;
  private listener: ((e: MessageEvent) => void) | null = null;
  private disposed = false;
  constructor(private events: RuntimeEvents = {}) {}
  private async start() {
    if (this.disposed) throw new Error("Preview stopped. Run it again.");
    if (this.started) return this.started;
    this.started = (async () => {
      const code = await source();
      if (this.disposed) throw new Error("Preview stopped.");
      const frame = document.createElement("iframe");
      frame.hidden = true; frame.title = "Isolated code execution";
      frame.setAttribute("sandbox", "allow-scripts");
      frame.setAttribute("referrerpolicy", "no-referrer");
      this.frame = frame;
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => { reject(new Error("Sandbox did not start. Reload and retry.")); this.stop(); }, 5000);
        this.listener = (e) => {
          if (e.source !== frame.contentWindow || e.data?.token !== this.token) return;
          const msg = e.data;
          if (msg.type === "ready") {
            clearTimeout(timer); frame.contentWindow?.postMessage({ token: this.token, type: "boot", code }, "*"); resolve();
          } else if (msg.type === "reply" && Number.isInteger(msg.id)) {
            const p = this.pending.get(msg.id);
            if (!p) return;
            this.pending.delete(msg.id); clearTimeout(p.timer);
            if (msg.error) p.reject(new Error(String(msg.error).slice(0, 4000))); else p.resolve(msg.result);
          } else if (msg.type === "render" && typeof msg.html === "string" && msg.html.length <= 300000) this.events.render?.(msg.html);
          else if (msg.type === "log" && typeof msg.text === "string") this.events.log?.(String(msg.level), msg.text.slice(0, 4000));
          else if (msg.type === "timeout") { this.events.error?.("Your code stopped responding. Check for an infinite loop, then run again."); this.stop(); }
        };
        window.addEventListener("message", this.listener);
        const nonce = crypto.randomUUID().replace(/-/g, "");
        frame.srcdoc = `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}' 'unsafe-eval' blob:; worker-src blob:; connect-src 'none'; img-src 'none'; style-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'"><script nonce="${nonce}">
          (() => {
            const token = ${JSON.stringify(this.token)};
            const send = data => parent.postMessage({...data,token}, "*");
            let worker, url, lastPong = Date.now();
            const timer = setInterval(() => {
              if (!worker) return;
              if (Date.now()-lastPong > 2500) {worker.terminate();worker=null;send({type:"timeout"});return;}
              worker.postMessage({type:"ping"});
            }, 400);
            addEventListener("message", e => {
              if(e.source !== parent || e.data?.token !== token) return;
              if(e.data.type === "boot") {
                try {
                  url = URL.createObjectURL(new Blob([e.data.code],{type:"text/javascript"}));
                  worker = new Worker(url);
                  worker.onmessage = ({data}) => { if(data?.type==="pong") lastPong=Date.now(); else send(data); };
                  worker.onerror = e => {send({type:"log",level:"error",text:e.message});};
                  lastPong=Date.now();
                } catch(e) {send({type:"timeout"});}
              } else if(e.data.type==="stop") {worker?.terminate();clearInterval(timer);if(url)URL.revokeObjectURL(url);}
              else worker?.postMessage(e.data.payload);
            });
            send({type:"ready"});
          })();
        </script>`;
        document.body.append(frame);
      });
    })();
    return this.started;
  }
  async request<T = Inspection>(payload: Record<string, unknown>): Promise<T> {
    await this.start();
    return new Promise<T>((resolve, reject) => {
      const id = ++this.seq;
      const timer = setTimeout(() => {
        this.pending.delete(id); reject(new Error("Code exceeded the 2 second limit. Check for an infinite loop."));
        this.stop();
      }, 2000);
      this.pending.set(id, { resolve: (v) => resolve(v as T), reject, timer });
      this.frame?.contentWindow?.postMessage({ token: this.token, type: "request", payload: { ...payload, id } }, "*");
    });
  }
  run(files: Files) { return this.request({ type: "init", files }); }
  event(selector: string, event: string, value?: string, checked?: boolean) { return this.request({ type: "event", selector, event, value, checked }); }
  stop() {
    this.disposed = true;
    this.frame?.contentWindow?.postMessage({ token: this.token, type: "stop" }, "*");
    this.frame?.remove(); this.frame = null;
    if (this.listener) window.removeEventListener("message", this.listener);
    for (const p of this.pending.values()) { clearTimeout(p.timer); p.reject(new Error("Preview stopped.")); }
    this.pending.clear();
  }
}
