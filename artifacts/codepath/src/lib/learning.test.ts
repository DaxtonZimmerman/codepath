import { describe,it,expect } from 'vitest';
import { COURSES } from './bootcamp';
import { LESSONS } from './curriculum';
import { MODULE_ACTIVITIES,activityKey } from './module-activities';
import { QUESTION_BANK,createQuiz,gradeQuiz,validSession,questionById,readingQuestions,nextLearningAction,workshopDone } from './learning';
import { emptyLearning,evidenceMatches,mergeLearning } from './learning-progress';
import { validateProgress } from './progress-schema';
import { inspectBackup,mergeProgress } from './backup';
import type { State } from './store';
const at='2026-10-26T00:00:00.000Z';
const old={version:1 as const,goal:'full' as const,showStats:false,dailyGoal:2,completed:{},attempts:[],drafts:{},reviews:{},projects:{},assessment:null,activity:{}};
const state=():State=>({...structuredClone(old),learning:emptyLearning()});
const fixtures:Record<string,string>={
 checkout:'function subtotal(p,q){return p*q;} function discountTotal(p,q,m){const t=subtotal(p,q);return m&&t>=5000?Math.round(t*.9):t;} function checkout(p,q,m){if(!Number.isInteger(p)||p<0||!Number.isInteger(q)||q<0||typeof m!=="boolean")return "Invalid input";return "$"+(discountTotal(p,q,m)/100).toFixed(2);}',
 catalog:'function searchProducts(ps,q){return ps.filter(p=>p.name.toLowerCase().includes(q.trim().toLowerCase()));}function selectProducts(ps,q,c){return searchProducts(ps,q).filter(p=>c==="all"||p.category===c);}function catalog(ps,q,c){return [...selectProducts(ps,q,c)].sort((a,b)=>a.price-b.price);}',
 shippingQuote:'function shippingQuote(s,m){if(!Number.isInteger(s)||s<0)return "Invalid input";return m||s>=7500?0:599;}',
 summarizeTasks:'function summarizeTasks(tasks){return {total:tasks.length,done:tasks.filter(t=>t.done===true).length,titles:tasks.map(t=>t.title.trim()).filter(Boolean).sort((a,b)=>a.localeCompare(b))};}'
};
describe('bootcamp assessment and activity integrity',()=>{
 it('has authored valid questions, complete reading checks and lesson links throughout all modules',()=>{
  expect(new Set(QUESTION_BANK.map(q=>q.id)).size).toBe(QUESTION_BANK.length);
  for(const q of QUESTION_BANK){expect(q.options).toHaveLength(4);expect(new Set(q.options).size,q.id).toBe(4);expect(q.options[q.answer],q.id).toBeTruthy();expect(LESSONS.some(l=>l.id===q.lessonId&&l.track===q.courseId),q.id).toBe(true);expect(q.explanation.length).toBeGreaterThan(15);}
  for(const l of LESSONS){expect(readingQuestions(l.id),l.id).toHaveLength(3);const ids=COURSES.find(c=>c.id===l.track)!.lessons;for(const q of readingQuestions(l.id))expect(q.lessonId,l.id).toBe(l.id);}
  for(const c of COURSES){expect(QUESTION_BANK.filter(q=>q.courseId===c.id).length).toBeGreaterThanOrEqual(18);const a=MODULE_ACTIVITIES[c.id];expect(a.workshop.steps).toHaveLength(3);expect(a.extension.length).toBeGreaterThan(40);for(const task of [...a.workshop.steps,a.lab]){expect(task.requirements.length).toBeGreaterThanOrEqual(3);expect(task.explanation.length).toBeGreaterThan(30);expect(Number(!!task.challenge)+Number(!!task.page)+Number(!!task.files)).toBe(1);if(task.files){expect(Object.keys(task.files).length).toBeGreaterThan(0);expect(task.verify!.length).toBeGreaterThan(0);for(const [name,content] of Object.entries(task.files))if(name==='package.json')expect(()=>JSON.parse(content)).not.toThrow();}}}
 });
 it('samples every lesson, persists shuffled option identity, grades at 90%, and varies retakes',()=>{
  for(const c of COURSES){const quiz=createQuiz(c.id);expect(validSession(quiz,c.id)).toBe(true);expect(new Set(quiz.items.map(i=>questionById(i.questionId)!.lessonId))).toEqual(new Set(c.lessons));expect(()=>gradeQuiz(quiz,c.id)).toThrow();
   quiz.items.forEach(i=>{i.pick=i.order.indexOf(questionById(i.questionId)!.answer)});
   const restored=JSON.parse(JSON.stringify(quiz));const full=gradeQuiz(restored,c.id);expect(full.score).toBe(10);expect(full.passed).toBe(true);
   restored.items[0].pick=(restored.items[0].pick+1)%4;expect(gradeQuiz(restored,c.id).passed).toBe(true);
   restored.items[1].pick=(restored.items[1].pick+1)%4;const miss=gradeQuiz(restored,c.id);expect(miss.score).toBe(8);expect(miss.passed).toBe(false);expect(miss.missedLessons.length).toBeGreaterThan(0);
   const next=createQuiz(c.id,[full]);expect(next.items.some(i=>!full.questionIds.includes(i.questionId)),c.id).toBe(true);
   restored.items[0].order=[0,0,1,2];expect(validSession(restored,c.id)).toBe(false);expect(()=>gradeQuiz(restored,c.id)).toThrow();
  }
 });
 it('checks every authored executable workshop and independent lab against all disclosed cases',()=>{
  for(const a of Object.values(MODULE_ACTIVITIES))for(const task of [...a.workshop.steps,a.lab])if(task.challenge){const ch=task.challenge;const source=('solution'in task?task.solution:undefined)??fixtures[ch.functionName];expect(source,ch.functionName).toBeTruthy();const fn=new Function(`${source};return ${ch.functionName}`)();for(const t of ch.tests){const args=structuredClone(t.args);expect(fn(...args),ch.functionName+':'+t.label).toEqual(t.expected);if(t.preserveArgs)expect(args).toEqual(t.args);}}
 });
 it('keeps old backups readable and round-trips new active quizzes, drafts and evidence',()=>{
  expect(validateProgress(old).learning).toEqual(emptyLearning());
  const current=state();const quiz=createQuiz('js');quiz.items[0].pick=2;current.learning.quizzes.js={active:quiz,attempts:[]};current.drafts['workshop:js:subtotal']='unfinished learner code';current.learning.evidence['lab:js']={source:'saved code',at,mode:'tests',results:[{label:'zero boundary',passed:true}]};
  const text=JSON.stringify({format:'codepath-backup',version:1,progress:current,projects:[]});const backup=inspectBackup(text);expect(backup.progress).toEqual(current);expect(mergeProgress(state(),backup.progress as State).learning).toEqual(current.learning);
  expect(inspectBackup(JSON.stringify({format:'codepath-backup',version:1,progress:old,projects:[]})).progress.learning).toEqual(emptyLearning());
 });
 it('invalidates current-code evidence on edits and recommends activities before skipping to the next module',()=>{
  const s=state();expect(evidenceMatches({at,source:'old',mode:'tests',results:[{label:'ok',passed:true}]},'edited')).toBe(false);expect(evidenceMatches({at,source:'code',mode:'tests',results:[]},'code')).toBe(false);
  for(const id of COURSES[0].lessons){s.completed[id]=at;s.learning.readings[id]=at;}
  expect(nextLearningAction(s)?.kind).toBe('Guided workshop');
  for(const step of MODULE_ACTIVITIES.web.workshop.steps){const key=activityKey('web','workshop',step.id);s.drafts[key]='working '+step.id;s.learning.evidence[key]={at,source:s.drafts[key],mode:'tests',results:[{label:'all',passed:true}]};}
  expect(workshopDone(s,'web')).toBe(true);expect(nextLearningAction(s)?.kind).toBe('Independent lab');s.drafts['workshop:web:form']='edited';expect(workshopDone(s,'web')).toBe(false);
 });
 it('merges newer evidence and deduplicates quiz history without reviving a completed session',()=>{
  const a=emptyLearning(),b=emptyLearning();const q=createQuiz('js');q.items.forEach(i=>i.pick=i.order.indexOf(questionById(i.questionId)!.answer));const attempt=gradeQuiz(q,'js');a.quizzes.js={active:null,attempts:[attempt]};b.quizzes.js={active:q,attempts:[]};expect(mergeLearning(a,b).quizzes.js.active).toBeNull();expect(mergeLearning(a,a).quizzes.js.attempts).toHaveLength(1);
 });
});
