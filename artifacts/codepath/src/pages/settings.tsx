import { useRef, useState } from "react";
import { HardDrive, Minus, Plus, Trash2, Download, Upload, AlertTriangle } from "lucide-react";
import { actions, useStore, useStorageStatus } from "@/lib/store";
import { exportBackup, inspectBackup, restoreBackup, type Backup } from "@/lib/backup";
import { PageHeader } from "@/components/shell";
import { GoalPicker } from "@/components/goal-picker";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));
const card = "rounded-3xl border bg-card p-5 sm:p-8";

export default function Settings() {
  const s = useStore();
  const storage = useStorageStatus();
  const { toast } = useToast();
  const [confirm, setConfirm] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<{ name: string; backup: Backup } | null>(null);
  const [mode, setMode] = useState<"merge" | "replace">("merge");
  const [replaceOk, setReplaceOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onExport() {
    setErr(null); setBusy(true);
    try { await exportBackup(); toast({ title: "Backup downloaded", description: "Keep the JSON file somewhere safe." }); }
    catch (e) { setErr(`Export failed: ${msg(e)}`); }
    finally { setBusy(false); }
  }

  async function onFile(f: File | undefined) {
    setErr(null); setPending(null); setReplaceOk(false); setMode("merge");
    if (!f) return;
    try { setPending({ name: f.name, backup: inspectBackup(await f.text()) }); }
    catch (e) { setErr(`That file cannot be restored: ${msg(e)}`); }
    finally { if (fileRef.current) fileRef.current.value = ""; }
  }

  async function onRestore() {
    if (!pending) return;
    setErr(null); setBusy(true);
    try {
      await restoreBackup(pending.backup, mode);
      toast({ title: "Backup restored", description: mode === "merge" ? "Merged with what was already here." : "This browser now matches the backup." });
      setPending(null);
    } catch (e) { setErr(`Restore failed. Nothing was changed on purpose, but check your data: ${msg(e)}`); }
    finally { setBusy(false); }
  }

  const b = pending?.backup;

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader kicker="Settings" title={<>Make it <span className="marker">fit your week.</span></>} />

      <section className={card} aria-labelledby="g-h">
        <h2 id="g-h" className="font-display text-2xl font-bold">Your goal</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-5">Decides what Home suggests next. Nothing is locked; every lesson stays open.</p>
        <GoalPicker value={s.goal} compact />
      </section>

      <section className={card} aria-labelledby="goal-h">
        <h2 id="goal-h" className="font-display text-2xl font-bold">Daily goal and stats</h2>
        <label className="mt-4 flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={s.showStats} onChange={(e) => actions.setShowStats(e.target.checked)} className="mt-1 size-4 accent-[hsl(var(--primary))]" data-testid="checkbox-show-stats" />
          <span><span className="font-medium">Show daily goal and streak</span><span className="block text-sm text-muted-foreground">Optional. Off keeps Home focused on the next step.</span></span>
        </label>
        <div className={cn("mt-6 flex flex-wrap items-center gap-4", !s.showStats && "opacity-60")}>
          <button aria-label="Decrease daily goal" onClick={() => actions.setDailyGoal(Math.max(1, s.dailyGoal - 1))} disabled={s.dailyGoal <= 1} className="press size-11 grid place-items-center rounded-xl border-2 disabled:opacity-40" data-testid="button-goal-decrease"><Minus className="size-5" /></button>
          <output className="font-display text-5xl font-extrabold w-16 text-center" aria-live="polite" data-testid="text-daily-goal">{s.dailyGoal}</output>
          <button aria-label="Increase daily goal" onClick={() => actions.setDailyGoal(Math.min(8, s.dailyGoal + 1))} disabled={s.dailyGoal >= 8} className="press size-11 grid place-items-center rounded-xl border-2 disabled:opacity-40" data-testid="button-goal-increase"><Plus className="size-5" /></button>
          <span className="text-sm text-muted-foreground">passing {s.dailyGoal === 1 ? "rep" : "reps"} per day</span>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-foreground/80 bg-card p-5 sm:p-8" aria-labelledby="bk-h">
        <h2 id="bk-h" className="font-display text-2xl font-bold">Backup and restore</h2>
        <p className="text-sm text-muted-foreground mt-1">One JSON file with readings, workshop and lab drafts, quiz attempts, reflections, project reviews and Studio projects. Download one before big changes.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={onExport} disabled={busy} className="press inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 font-semibold disabled:opacity-60" data-testid="button-export-backup"><Download className="size-4" /> Export my Codepath data</button>
          <button onClick={() => fileRef.current?.click()} disabled={busy} className="press inline-flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 font-semibold disabled:opacity-60" data-testid="button-choose-backup"><Upload className="size-4" /> Choose a backup file</button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" aria-label="Backup file to restore" onChange={(e) => onFile(e.target.files?.[0])} data-testid="input-backup-file" />
        </div>

        {err && (
          <p role="alert" className="mt-4 flex gap-2 rounded-xl bg-destructive/10 border border-destructive/40 p-3 text-sm break-words" data-testid="text-backup-error"><AlertTriangle className="size-4 shrink-0 mt-0.5 text-destructive" />{err}</p>
        )}

        {b && pending && (
          <div className="mt-5 rounded-2xl border bg-background p-4 sm:p-5 rise" data-testid="panel-restore-preview">
            <p className="font-semibold break-all">Preview: {pending.name}</p>
            <p className="text-xs text-muted-foreground">Nothing has been restored yet.</p>
            <dl className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {[["Passed lessons", Object.keys(b.progress.completed ?? {}).length], ["Attempts", (b.progress.attempts ?? []).length], ["Code drafts", Object.keys(b.progress.drafts ?? {}).length], ["Studio projects", b.projects.length]].map(([k, v]) => (
                <div key={k}><dt className="text-muted-foreground text-xs">{k}</dt><dd className="font-display text-xl font-bold">{v}</dd></div>
              ))}
            </dl>
            <fieldset className="mt-4 space-y-2">
              <legend className="text-sm font-semibold mb-1">How should it be restored?</legend>
              {storage.blocked && <p role="alert" className="text-sm text-destructive">Merge is disabled because existing progress cannot be read. Download raw data using the recovery banner first. Replace requires confirmation and will overwrite the unreadable record.</p>}
              {([["merge", "Merge", "Keep everything here and add what is in the backup."], ["replace", "Replace", "Make this browser match the backup exactly. Current data here is overwritten."]] as const).map(([v, t, d]) => (
                <label key={v} className={cn("flex gap-3 rounded-xl border-2 p-3 cursor-pointer focus-within:ring-2 focus-within:ring-primary", mode === v ? "border-foreground" : "border-border")}>
                  <input type="radio" name="restore-mode" value={v} disabled={v === "merge" && storage.blocked} checked={mode === v} onChange={() => { setMode(v); setReplaceOk(false); }} className="mt-1 accent-[hsl(var(--primary))]" data-testid={`radio-restore-${v}`} />
                  <span><span className="font-medium">{t}</span><span className="block text-sm text-muted-foreground">{d}</span></span>
                </label>
              ))}
            </fieldset>
            {mode === "replace" && (
              <label className="mt-3 flex gap-2 text-sm">
                <input type="checkbox" checked={replaceOk} onChange={(e) => setReplaceOk(e.target.checked)} className="mt-0.5 accent-[hsl(var(--destructive))]" data-testid="checkbox-confirm-replace" />
                I understand my current data in this browser will be replaced.
              </label>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={onRestore} disabled={busy || (mode === "merge" && storage.blocked) || (mode === "replace" && !replaceOk)} className="press rounded-xl bg-foreground text-background px-5 py-2.5 font-semibold disabled:opacity-40" data-testid="button-confirm-restore">{busy ? "Restoring..." : mode === "merge" ? "Merge backup" : "Replace with backup"}</button>
              <button onClick={() => setPending(null)} className="press rounded-xl px-4 py-2.5 text-sm" data-testid="button-cancel-restore">Cancel</button>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-3xl bg-marker/30 border border-marker p-5 sm:p-8" aria-labelledby="store-h">
        <h2 id="store-h" className="font-display text-2xl font-bold flex items-center gap-2"><HardDrive className="size-5" /> Where your work lives</h2>
        <p className="mt-2 text-sm leading-relaxed">
          No account and no server. Everything is saved in this browser only. Clearing site data, a private window, or another device means starting fresh, so export a backup now and then. Your code runs in a sandbox on your machine and is never uploaded.
        </p>
      </section>

      <section className="rounded-3xl border-2 border-destructive/40 bg-card p-5 sm:p-8" aria-labelledby="reset-h">
        <h2 id="reset-h" className="font-display text-2xl font-bold">Reset learning progress</h2>
        <p className="text-sm text-muted-foreground mt-1">Erases reading checks, workshop and lab progress, active quizzes and quiz history, lesson attempts, drafts, reviews, skills check and project checklists in this browser. Studio projects are not deleted.</p>
        <AlertDialog onOpenChange={() => setConfirm("")}>
          <AlertDialogTrigger asChild>
            <button className="press mt-5 inline-flex items-center gap-2 rounded-xl bg-destructive text-destructive-foreground px-5 py-2.5 font-semibold" data-testid="button-reset-open"><Trash2 className="size-4" /> Reset learning progress</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-display text-2xl">Erase learning progress?</AlertDialogTitle>
              <AlertDialogDescription>
                {Object.keys(s.completed).length} passed lessons, {s.attempts.length} attempts, drafts, reviews and legacy project notes will be deleted. Studio projects stay. Type RESET to confirm.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <label className="sr-only" htmlFor="reset-confirm">Type RESET to confirm</label>
            <input id="reset-confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="RESET" className="rounded-xl border-2 px-3 py-2 font-mono focus:border-foreground outline-none" data-testid="input-reset-confirm" />
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="button-reset-cancel">Keep my progress</AlertDialogCancel>
              <AlertDialogAction disabled={confirm !== "RESET"} onClick={() => { actions.reset(); toast({ title: "Learning progress reset", description: "Studio projects were kept." }); }} className="bg-destructive text-destructive-foreground" data-testid="button-reset-confirm">
                Erase learning progress
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  );
}
