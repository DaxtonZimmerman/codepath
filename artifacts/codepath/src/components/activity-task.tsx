import { useState } from 'react';
import { zipSync, strToU8 } from 'fflate';
import { actions, downloadFile, useStore } from '@/lib/store';
import { evidenceMatches } from '@/lib/learning-progress';
import type { ActivityTask } from '@/lib/module-activities';
import { runChallenge } from '@/lib/runner';
import { checkPageExercise, pagePreview } from '@/lib/page-exercises';
import { CodeEditor } from './code-editor';
export function initialSource(task: ActivityTask) { return task.challenge?.starter ?? task.page?.starter ?? JSON.stringify(task.files ?? {}); }
export function downloadTask(task:ActivityTask,source:string,name:string) {
 const files:Record<string,string>=task.files ? JSON.parse(source) : {[task.page?.language==='html'?'index.html':task.page?'styles.css':'solution.js']:source};
 if(task.page?.language==='css') files['index.html']=task.page.template;
 files['CODEPATH-INSTRUCTIONS.md']='# '+task.title+'\n\n'+task.explanation+'\n\n## Requirements\n'+task.requirements.map(r=>'- '+r).join('\n')+'\n\n## Verify\n'+(task.verify??['Run the disclosed checks in Codepath, then review the actual behavior.']).map(r=>'- '+r).join('\n')+'\n\nProgress here is self-reviewed when external tools are required.\n';
 downloadFile(name+'.zip',new Blob([new Uint8Array(zipSync(Object.fromEntries(Object.entries(files).map(([key,value])=>[key,strToU8(value)]))))],{type:'application/zip'}));
}
export function ActivityTaskPanel({task,taskId,seed,onPass}:{task:ActivityTask;taskId:string;seed?:string;onPass?:()=>void}) {
 const s=useStore();const fallback=seed??initialSource(task);const source=s.drafts[taskId]??fallback;
 const [hints,setHints]=useState(0),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const [file,setFile]=useState(Object.keys(task.files??{})[0]??'');
 const [checks,setChecks]=useState<Record<number,boolean>>(()=>{try{return JSON.parse(s.drafts[taskId+':checks']??'{}')}catch{return {}}});
 const evidence=s.learning.evidence[taskId];const passed=evidenceMatches(evidence,source);const current=evidence?.source===source?evidence:null;
 const files:Record<string,string>=task.files?JSON.parse(source):{};
 function update(value:string) {actions.saveDraft(taskId,task.files?JSON.stringify({...files,[file]:value}):value);setError('');}
 async function run() {
  setBusy(true);setError('');actions.saveDraft(taskId,source);
  try {
   const results=task.challenge?await runChallenge(source,task.challenge.functionName,task.challenge.tests):checkPageExercise(task.page!,source);
   actions.saveLearningEvidence(taskId,{at:new Date().toISOString(),source,mode:'tests',results});
   if(results.length>0&&results.every(r=>r.passed)) onPass?.();
  }catch(e){setError(e instanceof Error?e.message:String(e));actions.saveLearningEvidence(taskId,{at:new Date().toISOString(),source,mode:'tests',results:[{label:'Code must run successfully',passed:false}]});}
  finally{setBusy(false);}
 }
 function saveReview() {actions.saveDraft(taskId,source);actions.saveLearningEvidence(taskId,{at:new Date().toISOString(),source,mode:'self-review',results:task.requirements.map((label,i)=>({label,passed:!!checks[i]}))});onPass?.();}
 return <div className="space-y-5"><div className="rounded-2xl border bg-card p-5"><h2 className="font-display text-2xl font-bold">{task.title}</h2><p className="mt-3 leading-relaxed">{task.explanation}</p><h3 className="mt-5 font-semibold">Requirements you will check</h3><ul className="mt-2 list-disc space-y-2 pl-5 text-sm">{task.requirements.map(r=><li key={r}>{r}</li>)}</ul>{task.challenge&&<details className="mt-4"><summary className="cursor-pointer text-sm font-semibold">Exact input / output checks</summary><ul className="mt-2 space-y-2 text-xs font-mono">{task.challenge.tests.map(t=><li key={t.label}>{task.challenge!.functionName}({t.args.map(a=>JSON.stringify(a)).join(', ')}) → {JSON.stringify(t.expected)}{t.preserveArgs?' · input unchanged':''}</li>)}</ul></details>}</div>
 {task.files&&<div className="rounded-xl bg-marker/25 p-4 text-sm"><strong>Use your editor or Replit.</strong> Edit and download these starter files, run them in the stated environment, then record your verification below. Codepath does not run or automatically grade this environment.</div>}
 {task.files&&<div role="group" aria-label="Starter files" className="flex flex-wrap gap-2">{Object.keys(files).map(name=><button key={name} onClick={()=>setFile(name)} aria-pressed={name===file} className={`rounded-lg border px-3 py-2 text-sm ${name===file?'bg-foreground text-background':''}`}>{name}</button>)}</div>}
 <CodeEditor value={task.files?files[file]??'':source} onChange={update} label={task.files?`Edit ${file}`:`Solution for ${task.title}`} filename={task.files?file:task.page?`solution.${task.page.language}`:'solution.js'} onRun={task.files?undefined:run}/>
 {task.page&&<p className="text-xs text-muted-foreground">These checks inspect structure or CSS declarations. Review visual layout, keyboard behavior and the complete task in a normal browser as well.</p>}
 {task.page&&<iframe title="Exercise preview" sandbox="" srcDoc={pagePreview(task.page,source)} className="h-72 w-full rounded-xl border bg-white"/>}
 <div className="flex flex-wrap gap-3">{!task.files&&<button disabled={busy} onClick={run} className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-40">{busy?'Checking…':'Run checks'}</button>}<button onClick={()=>downloadTask(task,source,taskId.replaceAll(':','-'))} className="rounded-xl border px-4 py-3 font-semibold">Download {task.files?'starter files':'my work'}</button><button disabled={hints>=task.hints.length} onClick={()=>setHints(hints+1)} className="rounded-xl border px-4 py-3 disabled:opacity-40">{hints?'Next hint':'Get a hint'}</button></div>
 {hints>0&&<ol aria-label="Hints" className="space-y-2">{task.hints.slice(0,hints).map((h,i)=><li className="rounded-xl bg-marker/25 p-4 text-sm" key={h}><strong>Hint {i+1}: </strong>{h}</li>)}</ol>}
 {error&&<p role="alert" className="rounded-xl border border-destructive p-4 text-sm">{error}</p>}
 {task.files&&<section className="rounded-2xl border p-5"><h3 className="font-semibold">Verify your actual work</h3><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">{task.verify?.map(v=><li key={v}>{v}</li>)}</ol><div className="mt-4 space-y-3">{task.requirements.map((r,i)=><label key={r} className="flex gap-3 text-sm"><input type="checkbox" checked={!!checks[i]} onChange={()=>{const next={...checks,[i]:!checks[i]};setChecks(next);actions.saveDraft(taskId+':checks',JSON.stringify(next));if(passed)actions.saveLearningEvidence(taskId,{...evidence!,results:task.requirements.map((label,j)=>({label,passed:!!next[j]}))});}}/><span>{r}</span></label>)}</div><label className="mt-5 block text-sm font-semibold">Evidence and reflection<textarea rows={4} value={s.drafts[taskId+':notes']??''} onChange={e=>actions.saveDraft(taskId+':notes',e.target.value)} placeholder="Repository or file location, commands you ran, observed results, and one thing you would improve." className="mt-2 w-full rounded-xl border bg-background p-3 font-normal"/></label><button onClick={saveReview} disabled={!task.requirements.every((_,i)=>checks[i])||!(s.drafts[taskId+':notes']??'').trim()} className="mt-4 rounded-xl bg-foreground px-4 py-3 font-semibold text-background disabled:opacity-40">Save my self-review</button><p className="mt-2 text-xs text-muted-foreground">Check each requirement and add your evidence to save. This records your review, not automated proof.</p></section>}
 <div role="status" aria-live="polite">{passed&&<p className="rounded-xl bg-pine p-4 font-semibold text-background">{current?.mode==='tests'?'All disclosed checks pass for this code.':'Your self-review is saved for these files.'}</p>}{evidence&&!current&&<p className="text-sm text-muted-foreground">Your code changed since the last check. Check or review this version again.</p>}{current&&<ul className="mt-3 space-y-2 text-sm">{current.results.map((r,i)=><li key={i} className="rounded-lg border p-3">{r.passed?'✓':'○'} {r.label}{!r.passed&&r.expected!==undefined&&<p className="mt-2 whitespace-pre-wrap text-xs font-mono">Expected: {r.expected}<br/>Received: {r.actual}</p>}</li>)}</ul>}</div>
 </div>;
}
