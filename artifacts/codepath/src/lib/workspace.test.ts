import { describe, expect, it } from 'vitest';
import { LESSONS } from './curriculum';
import { COURSES } from './bootcamp';
import { LESSON_COACHING } from './lesson-coaching';
import { lessonEnvironment } from './lesson-environment';
import { explainRunError, explainMismatch } from './check-feedback';
import { lessonPracticePassed, nextLearningAction } from './learning';
import { emptyLearning } from './learning-progress';
import { validateProgress } from './progress-schema';
import { workshopAppFiles } from './workshop-project';
import { projectSchema } from './studio-model';
import { newProject } from './studio-content';
import type { State } from './store';
const at='2026-10-26T12:00:00.000Z';
const state=():State=>({version:1,learning:emptyLearning(),goal:'full',showStats:false,dailyGoal:2,completed:{},attempts:[],drafts:{},reviews:{},projects:{},assessment:null,activity:{}});
describe('learning workspace content and feedback',()=>{
 it('provides original worked traces, relevant project tasks and a supported environment for every lesson',()=>{
  expect(new Set(Object.keys(LESSON_COACHING))).toEqual(new Set(LESSONS.map(l=>l.id)));
  for(const lesson of LESSONS){const c=LESSON_COACHING[lesson.id];expect(c.steps,lesson.id).toHaveLength(3);for(const field of ['code','reason','mistake','fix','apply','verify'] as const)expect(c[field].length,lesson.id+':'+field).toBeGreaterThan(15);expect(c.answer.trim().length,lesson.id).toBeGreaterThan(0);const env=lessonEnvironment(lesson);expect(env.instruction.length).toBeGreaterThan(40);expect(env.extension).toMatch(/^(js|jsx|ts|sql|sh|txt|html|css)$/);if(['js','data'].includes(lesson.track))expect(env.mode).toBe('worker');else if(lesson.track==='web')expect(env.mode).toBe('page');else expect(env.mode).toBe('external');}
  for(const course of COURSES)expect(course.lessons.every(id=>!!LESSON_COACHING[id])).toBe(true);
 });
 it('runs every trusted JavaScript worked example with visible output',()=>{
  // Only original curriculum fixtures execute here, never learner drafts.
  for(const lesson of LESSONS.filter(l=>['js','data'].includes(l.track))){const lines:unknown[][]=[];new Function('console',LESSON_COACHING[lesson.id].code)({log:(...values:unknown[])=>lines.push(structuredClone(values))});expect(lines.length,lesson.id).toBeGreaterThan(0);}
 });
 it('suggests an actionable next inspection for execution errors and mismatches',()=>{
  expect(explainRunError('Code exceeded the 2 second limit').next).toContain('counter');
  expect(explainRunError('Unexpected token }').title).toContain('could not be read');
  expect(explainRunError('checkout is not defined','checkout').next).toContain('checkout');
  expect(explainRunError('Cannot read properties of null').next).toContain('selector');
  expect(explainMismatch({label:'return',actual:'undefined'})).toContain('return');
  expect(explainMismatch({label:'preserve',actual:'[1,2] (input changed)'})).toContain('Copy');
  expect(explainMismatch({label:'total',actual:'NaN'})).toContain('numeric');
 });
 it('keeps legacy passes while requiring a fresh check for new evidence after editing',()=>{
  const s=state();s.completed['js-values']=at;expect(lessonPracticePassed(s,'js-values')).toBe(true);
  s.learning.readings['js-values']=at;s.drafts['js-values']='function makeGreeting(n){return "Hello, "+n+"!";}';
  s.learning.evidence['lesson:js-values']={at,source:s.drafts['js-values'],mode:'tests',results:[{label:'greeting',passed:true}]};expect(lessonPracticePassed(s,'js-values')).toBe(true);
  s.drafts['js-values']='function makeGreeting(){return "wrong";}';expect(lessonPracticePassed(s,'js-values')).toBe(false);expect(nextLearningAction(s,'js')?.kind).toBe('Practice');
  const roundtrip=validateProgress(JSON.parse(JSON.stringify(s)));expect(roundtrip.learning.evidence).toEqual(s.learning.evidence);expect(roundtrip.drafts).toEqual(s.drafts);
 });
 it('creates separate Studio files without changing the original draft or claiming project completion',()=>{
  const source='function checkout(){return "$1.00";}';const files=workshopAppFiles('js',source);expect(files['script.js']).toContain(source);expect(source).toBe('function checkout(){return "$1.00";}');
  const project={...newProject('blank'),files,courseId:'js',sourceActivity:'workshop:js'};const parsed=projectSchema.parse(JSON.parse(JSON.stringify(project)));expect(parsed.sourceActivity).toBe('workshop:js');expect(parsed.evidence).toBeNull();expect(()=>workshopAppFiles('node','')).toThrow();
 });
});
