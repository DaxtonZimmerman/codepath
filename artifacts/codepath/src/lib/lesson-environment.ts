import type { Lesson } from './curriculum';
export function lessonEnvironment(lesson: Lesson): { mode: 'worker' | 'page' | 'external'; label: string; extension: string; instruction: string } {
  if(['js','data'].includes(lesson.track)) return { mode:'worker',label:'JavaScript scratchpad',extension:'js',instruction:'Run the example, change one input, then explain the difference. This scratchpad does not pass your practice checks.' };
  if(lesson.track==='web') return { mode:'page',label:lesson.id.startsWith('html')?'HTML preview':'CSS preview',extension:lesson.id.startsWith('html')?'html':'css',instruction:'Change the example and inspect the preview. Scripts, remote assets and form submissions are disabled here.' };
  const tools:Record<string,[string,string]>={dom:['Browser page','js'],async:['Browser with network access','js'],git:['Your project terminal','sh'],ts:['TypeScript project','ts'],react:['React project','jsx'],node:['Node.js server','js'],db:['PostgreSQL exercise database','sql'],test:['Your project test runner','js'],ship:['Your release tools','txt']};
  const [label,extension]=tools[lesson.track];
  return { mode:'external',label,extension,instruction:`Edit or download this example for ${label.toLowerCase()}. It is not executed or graded in this scratchpad. The module workshop includes starter files and run instructions.` };
}
