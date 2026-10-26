import { useRef, useState, type KeyboardEvent } from "react";

export function CodeEditor({ value, onChange, label, onRun, filename = "solution.js" }: { value: string; onChange: (v: string) => void; label: string; onRun?: () => void; filename?: string }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  // After Escape, the next Tab moves focus out instead of indenting.
  const [escaped, setEscaped] = useState(false);
  const lines = value.split("\n").length;

  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") { setEscaped(true); return; }
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); onRun?.(); return; }
    if (e.key === "Tab") {
      if (escaped || e.shiftKey) { setEscaped(false); return; }
      e.preventDefault();
      const el = e.currentTarget;
      const { selectionStart: a, selectionEnd: b } = el;
      onChange(value.slice(0, a) + "  " + value.slice(b));
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = a + 2; });
      return;
    }
    if (escaped) setEscaped(false);
  }

  return (
    <div className="code-surface min-w-0 max-w-full rounded-xl overflow-hidden border border-black/20 shadow-md focus-within:ring-2 focus-within:ring-marker focus-within:ring-offset-2 focus-within:ring-offset-background">
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 px-4 py-2.5 border-b border-white/10">
        <span aria-hidden className="size-2.5 rounded-full bg-primary" /><span aria-hidden className="size-2.5 rounded-full bg-marker" /><span aria-hidden className="size-2.5 rounded-full bg-pine" />
        <span className="ml-3 font-mono text-xs text-white/60 truncate min-w-0">{filename}</span>
        <span className="ml-auto font-mono text-[10px] text-white/50" id={`kbd-${filename}`} aria-live="polite">
          {escaped ? "Tab now leaves the editor" : "Tab indents · Esc then Tab leaves · Ctrl+Enter runs"}
        </span>
      </div>
      <div className="flex min-w-0 font-mono text-[13.5px] leading-6">
        <div aria-hidden className="select-none text-right pr-3 pl-3 sm:pl-4 py-4 text-white/30 shrink-0">
          {Array.from({ length: lines }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <textarea
          ref={ref}
          aria-label={label}
          aria-describedby={`kbd-${filename}`}
          data-testid="input-code"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKey}
          onBlur={() => setEscaped(false)}
          rows={Math.max(10, lines + 1)}
          className="flex-1 min-w-0 w-full bg-transparent resize-none outline-none py-4 pr-4 text-[hsl(40_40%_92%)] caret-[hsl(var(--marker))] whitespace-pre overflow-x-auto"
        />
      </div>
    </div>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="code-surface max-w-full min-w-0 rounded-xl p-5 overflow-x-auto font-mono text-[13px] leading-6 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marker" tabIndex={0} aria-label="Code example">
      <code>{code}</code>
    </pre>
  );
}
