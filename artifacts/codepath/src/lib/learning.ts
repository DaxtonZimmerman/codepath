import { COURSES } from './bootcamp';
import { LESSONS, lessonById } from './curriculum';
import { AUTHORED_QUESTIONS, type BankQuestion } from './question-bank';
import { MODULE_ACTIVITIES, activityKey } from './module-activities';
import { evidenceMatches, type QuizSession, type ModuleQuizAttempt } from './learning-progress';
import type { State } from './store';
export const QUESTION_BANK: BankQuestion[] = [...AUTHORED_QUESTIONS.map(q=>({...q,concept: /-(extra|applied)-/.test(q.id) ? lessonById(q.lessonId)?.title ?? q.concept : q.concept})), ...LESSONS.flatMap(lesson => (lesson.quiz ?? []).map((q,i) => ({ ...q, id:`${lesson.id}-reading-${i}`, courseId:lesson.track, lessonId:lesson.id, concept:lesson.title })))];
export const questionById = (id: string) => QUESTION_BANK.find(q => q.id === id);
export function shuffled<T>(items: T[], random = Math.random): T[] {
  const result = [...items];
  for(let i=result.length-1;i>0;i--) { const j=Math.floor(random()*(i+1)); [result[i],result[j]]=[result[j],result[i]]; }
  return result;
}
export function createQuiz(courseId: string, previous: ModuleQuizAttempt[] = [], random = Math.random): QuizSession {
  const course = COURSES.find(c=>c.id===courseId);
  if (!course) throw new Error('Unknown module');
  const last = new Set(previous.at(-1)?.questionIds ?? []);
  const pool = shuffled(QUESTION_BANK.filter(q=>q.courseId===courseId),random).sort((a,b)=>Number(last.has(a.id))-Number(last.has(b.id)));
  // Guarantee a question from every lesson, then fill the remaining slots from unused topics.
  const chosen: BankQuestion[] = [];
  for (const id of course.lessons) { const q=pool.find(q=>q.lessonId===id); if(q) chosen.push(q); }
  for (const q of pool) if (chosen.length < 10 && !chosen.some(item=>item.id===q.id)) chosen.push(q);
  if (chosen.length !== 10) throw new Error('This module needs ten questions');
  return { id:crypto.randomUUID(), version:1, startedAt:new Date().toISOString(), items:shuffled(chosen,random).map(q=>({questionId:q.id,order:shuffled([0,1,2,3],random),pick:null})) };
}
export function validSession(session: QuizSession, courseId: string) {
  return session.items.length === 10 && new Set(session.items.map(i=>i.questionId)).size===10 && session.items.every(i=>questionById(i.questionId)?.courseId===courseId && i.order.length===4 && new Set(i.order).size===4 && i.order.every(n=>Number.isInteger(n)&&n>=0&&n<4) && (i.pick===null || Number.isInteger(i.pick)&&i.pick>=0&&i.pick<4));
}
export function gradeQuiz(session: QuizSession, courseId: string): ModuleQuizAttempt {
  if(!validSession(session,courseId) || session.items.some(i=>i.pick===null)) throw new Error('Answer every question before submitting.');
  const misses=session.items.filter(i=>i.order[i.pick!]!==questionById(i.questionId)!.answer);
  return {id:session.id,at:new Date().toISOString(),questionIds:session.items.map(i=>i.questionId),picks:session.items.map(i=>i.order[i.pick!]),score:10-misses.length,total:10,passed:misses.length<=1,missedLessons:[...new Set(misses.map(i=>questionById(i.questionId)!.lessonId))]};
}
export function readingQuestions(lessonId: string) {
  const lesson=lessonById(lessonId);
  if(!lesson) return [];
  return QUESTION_BANK.filter(q=>q.lessonId===lessonId).slice(0,3);
}
export function taskSource(s: State, key: string, fallback: string) { return s.drafts[key] ?? fallback; }
export function taskPassed(s: State,key: string,starter: string) { return evidenceMatches(s.learning.evidence[key],taskSource(s,key,starter)); }
export function workshopDone(s: State,courseId:string) { return MODULE_ACTIVITIES[courseId].workshop.steps.every(step=>taskPassed(s,activityKey(courseId,'workshop',step.id),step.challenge?.starter ?? step.page?.starter ?? JSON.stringify(step.files ?? {}))); }
export function labDone(s:State,courseId:string) { const lab=MODULE_ACTIVITIES[courseId].lab; return taskPassed(s,activityKey(courseId,'lab'),lab.challenge?.starter ?? lab.page?.starter ?? JSON.stringify(lab.files ?? {})); }
export type LearningAction={href:string;title:string;courseId:string;kind:string};
export function nextLearningAction(s:State,onlyCourse?:string):LearningAction|null {
 const courses=COURSES.filter(c=>onlyCourse?c.id===onlyCourse:s.goal==='javascript'?['js','data','dom','async','test'].includes(c.id):true);
 for(const c of courses) {
  for(const id of c.lessons) { const l=lessonById(id)!; if(!s.learning.readings[id] || !s.completed[id]) return {href:`/lesson/${id}`,title:l.title,courseId:c.id,kind:!s.learning.readings[id]?'Reading + check':'Practice'}; }
  const base=`/learn/${c.id}`;
  if(!workshopDone(s,c.id)) return {href:`${base}/workshop`,title:MODULE_ACTIVITIES[c.id].workshop.title,courseId:c.id,kind:'Guided workshop'};
  if(!labDone(s,c.id)) return {href:`${base}/lab`,title:MODULE_ACTIVITIES[c.id].lab.title,courseId:c.id,kind:'Independent lab'};
  if(!s.learning.readings[`review:${c.id}`]) return {href:`${base}/review`,title:`Review: ${c.title}`,courseId:c.id,kind:'Module review'};
  if(!s.learning.quizzes[c.id]?.attempts.some(a=>a.passed)) return {href:`${base}/quiz`,title:`Check your ${c.id==='js'?'JavaScript':c.title} knowledge`,courseId:c.id,kind:'Module quiz'};
  if(!s.projects[`bootcamp-${c.id}`]?.doneAt) return {href:`${base}#project`,title:c.project.title,courseId:c.id,kind:'Apply in a real project'};
 }
 return null;
}
