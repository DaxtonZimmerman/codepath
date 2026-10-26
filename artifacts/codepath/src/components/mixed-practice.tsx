import { useState } from 'react';
import { Link } from 'wouter';
import { QUESTION_BANK, shuffled } from '@/lib/learning';
import { COURSES } from '@/lib/bootcamp';
import { useStore } from '@/lib/store';
import { lessonById } from '@/lib/curriculum';
import { Quiz } from './quiz';
export function MixedPractice() {
 const s=useStore();const [course,setCourse]=useState('js');const [round,setRound]=useState(0);const [open,setOpen]=useState(false);
 const [questions,setQuestions]=useState(()=>shuffled(QUESTION_BANK.filter(q=>q.courseId==='js')).slice(0,5));
 const misses=[...new Set(COURSES.flatMap(c=>s.learning.quizzes[c.id]?.attempts.at(-1)?.missedLessons??[]))];
 function start(){const pool=QUESTION_BANK.filter(q=>course==='mixed'?!!s.completed[q.lessonId]||misses.includes(q.lessonId):q.courseId===course);setQuestions(shuffled(pool.length>=5?pool:QUESTION_BANK.filter(q=>q.courseId==='js')).slice(0,5));setRound(round+1);setOpen(true);}
 return <section className="mb-8 rounded-3xl border bg-card p-5 sm:p-6"><h2 className="font-display text-2xl font-bold">Recall, then apply</h2><p className="mt-2 text-sm text-muted-foreground">Five varied questions for practice. This drill does not count as a module quiz or a passed coding exercise.</p>{misses.length>0&&<div className="mt-4 rounded-xl bg-marker/25 p-4"><h3 className="text-sm font-semibold">Revisit misses from your latest module attempts</h3><ul className="mt-2 flex flex-wrap gap-3 text-sm">{misses.map(id=><li key={id}><Link href={`/lesson/${id}`} className="underline">{lessonById(id)?.title}</Link></li>)}</ul></div>}<div className="mt-5 flex flex-wrap gap-3"><label className="sr-only" htmlFor="drill-module">Practice module</label><select id="drill-module" className="rounded-xl border bg-background px-3 py-2 text-sm" value={course} onChange={e=>setCourse(e.target.value)}>{COURSES.map(c=><option key={c.id} value={c.id}>{c.title}</option>)}<option value="mixed">Mix completed and missed topics</option></select><button onClick={start} className="rounded-xl bg-foreground px-4 py-3 font-semibold text-background">{open?'New practice set':'Start five-question drill'}</button></div>{open&&<div className="mt-6"><Quiz key={round} questions={questions} onSubmit={()=>{}}/></div>}<details className="mt-5"><summary className="cursor-pointer text-sm font-semibold">Independent labs by module</summary><ul className="mt-3 grid gap-3 sm:grid-cols-2">{COURSES.map(c=><li key={c.id}><Link className="text-sm text-primary underline" href={`/learn/${c.id}/lab`}>{c.title} →</Link></li>)}</ul></details></section>;
}
