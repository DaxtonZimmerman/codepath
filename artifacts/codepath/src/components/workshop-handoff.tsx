import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { courseById } from '@/lib/bootcamp';
import { MODULE_ACTIVITIES, activityKey } from '@/lib/module-activities';
import { workshopDone } from '@/lib/learning';
import { useStore } from '@/lib/store';
import { workshopAppFiles } from '@/lib/workshop-project';
import { newProject } from '@/lib/studio-content';
import { useProjects, saveProject } from '@/lib/studio-db';
import { downloadTask, initialSource } from './activity-task';
import { useToast } from '@/hooks/use-toast';
export function WorkshopHandoff({courseId}:{courseId:string}) {
 const s=useStore(),course=courseById(courseId)!, content=MODULE_ACTIVITIES[courseId];
 const {projects,loading,error}=useProjects();const [busy,setBusy]=useState(false);const [,go]=useLocation();const {toast}=useToast();
 const done=workshopDone(s,courseId), last=content.workshop.steps.at(-1)!;
 const source=s.drafts[activityKey(courseId,'workshop',last.id)]??initialSource(last);
 const inline=['web','js','data'].includes(courseId);
 const existing=[...projects].sort((a,b)=>b.lastOpenedAt.localeCompare(a.lastOpenedAt)).find(p=>p.sourceActivity===`workshop:${courseId}`);
 async function openProject(){if(busy)return;if(existing){go(`/build/${existing.id}`);return;}setBusy(true);try{const project={...newProject('blank'),title:course.project.title,description:course.project.brief,courseId,sourceActivity:`workshop:${courseId}`,files:workshopAppFiles(courseId,source),notes:'Created from my workshop code.\n\n'+course.project.deliverables.map(t=>'- '+t).join('\n')+'\n\nCustomize one feature, verify the full flow, export source, and document how to run it.'};await saveProject(project);go(`/build/${project.id}`);}catch(e){toast({title:'Could not create the project copy',description:e instanceof Error?e.message:String(e),variant:'destructive'});}finally{setBusy(false);}}
 function exportFiles(){const files=JSON.parse(source);files['NEXT-STEPS.md']='# '+course.project.title+'\n\n'+course.project.brief+'\n\n'+content.extension+'\n\n## Deliverables\n'+course.project.deliverables.map(t=>'- '+t).join('\n')+'\n\n## Reference\n'+course.resource.url+'\n\nKeep secrets out of public source. Verify your app in its real environment before publishing.\n';downloadTask({...last,files,title:course.project.title,explanation:course.project.brief,requirements:course.project.deliverables},JSON.stringify(files),`codepath-${courseId}-my-project`);}
 return <section className="mt-7 rounded-2xl border-2 border-primary/40 bg-card p-5 sm:p-6" aria-label="From workshop to real app"><p className="font-mono text-xs uppercase tracking-widest text-primary">From workshop to real app</p><h2 className="mt-2 font-display text-2xl font-bold">{inline?'Put your code on a working page.':'Keep building with your own files.'}</h2><p className="mt-3 text-sm leading-relaxed">{inline?'Create a separate Studio project using your current checked workshop code. The page supplies the interface; your functions or HTML supply the work. Your lesson drafts stay in place.':'Download your reviewed workshop files with the next project requirements. Continue in your editor or Replit and verify the actual behavior there.'}</p><p className="mt-3 text-sm"><strong>Make it yours: </strong>{content.extension}</p>{!done&&<p className="mt-4 text-sm text-muted-foreground">Finish and check all workshop steps to enable the handoff.</p>}
 {inline?<><button disabled={!done||busy||loading||!!error} onClick={openProject} className="mt-4 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-40">{busy?'Creating a separate copy…':existing?'Continue my workshop app':'Create my app in Studio'}</button>{existing&&<p className="mt-2 text-xs text-muted-foreground">Your existing Studio copy is kept as you edited it. Later workshop edits do not overwrite it.</p>}{error&&<p role="alert" className="mt-3 text-sm text-destructive">Saved projects could not be loaded. Open Build before creating another copy.</p>}</>:<button disabled={!done} onClick={exportFiles} className="mt-4 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-40">Download my project files</button>}
 <Link href={`/learn/${courseId}#project`} className="ml-0 mt-4 block text-sm font-semibold text-primary underline sm:ml-4 sm:inline-block">Project brief & evidence →</Link></section>;
}
