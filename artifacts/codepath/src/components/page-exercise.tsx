import { useMemo, useState } from "react";
import { Play, Lightbulb } from "lucide-react";
import { actions, useStore, useStorageStatus } from "@/lib/store";
import { checkPageExercise, pagePreview, type PageExercise } from "@/lib/page-exercises";
import { CodeEditor } from "./code-editor";
import { CheckFeedback } from "./check-feedback";
export function PageExercisePanel({ lessonId, exercise, onResult }: { lessonId: string; exercise: PageExercise; onResult: (passed: boolean) => void }) {
  const s=useStore(), storage=useStorageStatus();
  const code=s.drafts[lessonId] ?? exercise.starter;
  const [hints,setHints]=useState(0);
  const evidence=s.learning.evidence[`lesson:${lessonId}`], stale=!!evidence && evidence.source!==code;
  const error=!stale && evidence?.results.find(r=>r.label==='Code can be checked'&&!r.passed)?.actual;
  const preview=useMemo(()=>pagePreview(exercise,code),[exercise,code]);
  function check() {
    actions.saveDraft(lessonId,code);
    try {
      const results=checkPageExercise(exercise,code), passed=results.length>0&&results.every(r=>r.passed);
      actions.saveLearningEvidence(`lesson:${lessonId}`,{at:new Date().toISOString(),source:code,mode:'tests',results},false);
      actions.recordAttempt(lessonId,passed,'challenge');onResult(passed);
    }catch(error){actions.saveLearningEvidence(`lesson:${lessonId}`,{at:new Date().toISOString(),source:code,mode:'tests',results:[{label:'Code can be checked',passed:false,actual:error instanceof Error?error.message:String(error)}]},false);actions.recordAttempt(lessonId,false,'challenge');onResult(false);}
  }
  return <div className="space-y-4"><div className="rounded-xl border bg-card p-4"><h3 className="font-semibold">Your task</h3><p className="mt-2 text-sm leading-relaxed">{exercise.prompt}</p><details className="mt-3"><summary className="cursor-pointer text-sm font-semibold">All structural checks</summary><ul className="mt-2 list-disc space-y-2 pl-5 text-sm">{exercise.checks.map(c=><li key={c.label}>{c.label}</li>)}</ul></details></div>
    <CodeEditor value={code} onChange={value=>actions.saveDraft(lessonId,value)} onRun={check} filename={exercise.language==='html'?'index.html':'styles.css'} label={`Edit ${exercise.language.toUpperCase()} exercise`}/>
    <div className="flex flex-wrap gap-2"><button onClick={check} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground" data-testid="button-check-page"><Play className="size-4"/>Check my code</button><button disabled={hints>=exercise.hints.length} onClick={()=>setHints(hints+1)} className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold disabled:opacity-40"><Lightbulb className="size-4"/>Get a hint</button></div><p role="status" className={`text-xs ${storage.error?'text-destructive':'text-muted-foreground'}`}>{storage.error?'Draft not saved — see the storage notice.':'Draft saved in this browser.'}</p>
    {exercise.hints.slice(0,hints).map((h,i)=><p key={h} className="rounded-xl bg-marker/25 p-4 text-sm"><strong>Hint {i+1}: </strong>{h}</p>)}
    <CheckFeedback results={error?null:evidence?.results} error={error || undefined} stale={stale}/>
    <section aria-label="Exercise preview"><h3 className="mb-3 font-semibold">Your page preview</h3><iframe title="Exercise preview" sandbox="" referrerPolicy="no-referrer" srcDoc={preview} className="h-72 w-full rounded-xl border bg-white"/><p className="mt-2 text-xs leading-relaxed text-muted-foreground">The preview updates as you type. Checks inspect required elements or CSS declarations. Review the actual layout and keyboard flow too. Scripts, remote resources and submissions are disabled here.</p></section>
  </div>;
}
