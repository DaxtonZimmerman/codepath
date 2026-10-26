import { useRef, useState } from 'react';
import { Link } from 'wouter';
import type { Lesson } from '@/lib/curriculum';
import { actions, useStore, useStorageStatus, downloadFile } from '@/lib/store';
import { StudioRuntime } from '@/lib/studio-runtime';
import { pagePreview } from '@/lib/page-exercises';
import { LESSON_COACHING } from '@/lib/lesson-coaching';
import { lessonEnvironment } from '@/lib/lesson-environment';
import { CodeEditor } from './code-editor';
import { CheckFeedback } from './check-feedback';
export function ExamplePlayground({lesson}:{lesson:Lesson}) {
 const s=useStore(), storage=useStorageStatus(), environment=lessonEnvironment(lesson);
 const id=`example:${lesson.id}`, source=s.drafts[id]??(environment.mode==='worker'?LESSON_COACHING[lesson.id].code:lesson.example);
 const [result,setResult]=useState<{source:string;lines:string[];error?:string}|null>(null),[busy,setBusy]=useState(false);
 const lock=useRef(false);
 async function run(){if(lock.current)return;lock.current=true;setBusy(true);const runtime=new StudioRuntime();try{setResult({source,lines:await runtime.request<string[]>({type:'experiment',code:source})});}catch(e){setResult({source,lines:[],error:e instanceof Error?e.message:String(e)});}finally{runtime.stop();lock.current=false;setBusy(false);}}
 const stale=!!result&&result.source!==source;
 return <div className="space-y-4"><div className="rounded-xl border bg-card p-4"><p className="text-xs font-mono uppercase tracking-widest text-primary">{environment.label}</p><p className="mt-2 text-sm leading-relaxed">{environment.instruction}</p>{environment.mode==='external'&&<Link href={`/learn/${lesson.track}/workshop`} className="mt-3 inline-block text-sm font-semibold text-primary underline">Open starter files & run instructions →</Link>}</div>
 <CodeEditor value={source} label={`Experiment with ${lesson.title}`} filename={`example.${environment.extension}`} onChange={value=>actions.saveDraft(id,value)} onRun={environment.mode==='worker'?run:undefined}/>
 <div className="flex flex-wrap gap-2">{environment.mode==='worker'&&<button disabled={busy} onClick={run} className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40">{busy?'Running…':'Run example'}</button>}<button onClick={()=>downloadFile(`codepath-${lesson.id}.${environment.extension}`,new Blob([source],{type:'text/plain'}))} className="rounded-xl border px-4 py-3 text-sm font-semibold">Download my example</button></div><p className="text-xs text-muted-foreground">{storage.error?'Draft not saved — see the storage notice.':'Edits save in this browser.'}</p>
 {environment.mode==='worker'&&<><h3 className="font-semibold text-sm">Console output</h3>{busy?<p role="status" className="rounded-xl bg-secondary p-4 text-sm">Running your example…</p>:<><CheckFeedback error={result?.error} stale={stale}/>{!stale&&!result?.error&&<pre aria-label="Example output" role="status" className="max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-secondary p-4 font-mono text-sm">{result?(result.lines.length?result.lines.map(line=>line===''?'(empty string)':line).join('\n'):'The example finished without console output. Add console.log(value) to inspect a value.'):'Run the example to see its output here.'}</pre>}</>}</>}
 {environment.mode==='page'&&<iframe sandbox="" title="Example preview" className="h-64 w-full rounded-xl border bg-white" srcDoc={pagePreview({language:environment.extension==='html'?'html':'css',prompt:'',starter:'',template:'<main><h1>Layout experiment</h1><div class="cards"><article class="card">First card</article><article class="card">Second card</article></div></main>',checks:[],hints:[]},source)}/>}
 </div>;
}
