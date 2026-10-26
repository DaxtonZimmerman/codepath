import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { useProjects } from "@/lib/studio-db";
import { fingerprint } from "@/lib/studio-model";
import { CAPABILITIES } from "@/lib/studio-checks";

/** Only counts evidence that still matches the project's current code. */
export function Capabilities() {
  const { projects, loading } = useProjects();
  const items: { text: string; project: string; id: string }[] = [];
  for (const p of projects) {
    if (!p.evidence || p.evidence.fingerprint !== fingerprint(p.files)) continue;
    for (const [c, text] of Object.entries(CAPABILITIES)) {
      const rs = p.evidence.results.filter((r) => r.concept === c);
      if (rs.length && rs.every((r) => r.passed)) items.push({ text, project: p.title, id: p.id });
    }
  }
  return (
    <section className="mb-12 rounded-3xl border-2 border-foreground/80 bg-card p-5 sm:p-7" aria-labelledby="cap-h" data-testid="section-capabilities">
      <h2 id="cap-h" className="font-display text-xl font-bold">Project Studio behavior checks</h2>
      <p className="mt-1 text-sm text-muted-foreground">From behavior checks passing on your current project code. Change the code and a skill waits for a fresh run.</p>
      {loading ? <div className="mt-4 h-12 rounded-xl bg-muted animate-pulse" /> : items.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No current Project Studio checks yet. <Link href="/build" className="underline underline-offset-4 text-foreground">Build the Product Filter App</Link> and run its checks.</p>
      ) : (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {items.map((it) => (
            <li key={it.id + it.text}>
              <Link href={`/build/${it.id}`} className="flex gap-2.5 rounded-xl bg-pine/10 p-3 text-sm hover:bg-pine/15" data-testid="item-capability">
                <CheckCircle2 className="size-4 text-pine shrink-0 mt-0.5" /><span><span className="font-medium">{it.text}</span><span className="block text-xs text-muted-foreground">{it.project}</span></span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
