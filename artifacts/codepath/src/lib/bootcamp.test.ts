import { describe, it, expect } from "vitest";
import { COURSES } from "./bootcamp";
import { LESSONS } from "./curriculum";
import { BOOTCAMP_LESSONS, REFERENCE_SOLUTIONS } from "./bootcamp-lessons";
import { projectSchema } from "./studio-model";
import { newProject } from "./studio-content";

const legacyIds = ["html-semantics", "css-layout", "js-functions", "js-loops", "array-methods", "objects-counting", "data-shaping", "dom-basics", "dom-events", "async-promises", "fetch-json", "git-basics", "ts-types", "react-state", "node-api", "sql-basics", "testing-basics", "security-deploy"];
describe("bootcamp curriculum integrity", () => {
  it("keeps legacy progress IDs and gives each lesson exactly one ordered module", () => {
    expect(COURSES).toHaveLength(12);
    expect(LESSONS).toHaveLength(60);
    expect(new Set(LESSONS.map((lesson) => lesson.id)).size).toBe(LESSONS.length);
    for (const id of legacyIds) expect(LESSONS.some((lesson) => lesson.id === id)).toBe(true);
    const courseIds = COURSES.flatMap((course) => course.lessons);
    expect(courseIds).toEqual(LESSONS.map((lesson) => lesson.id));
    for (const course of COURSES) for (const id of course.lessons) expect(LESSONS.find((lesson) => lesson.id === id)?.track).toBe(course.id);
  });
  it("has usable instruction, assessment, and project briefs throughout the path", () => {
    for (const lesson of LESSONS) {
      expect(lesson.body.length, lesson.id).toBeGreaterThanOrEqual(3);
      expect(lesson.example.length, lesson.id).toBeGreaterThan(10);
      expect(Number(!!lesson.challenge) + Number(!!lesson.quiz) + Number(!!lesson.pageExercise), lesson.id).toBe(1);
      for (const question of lesson.quiz ?? []) {
        expect(question.options[question.answer], lesson.id).toBeTruthy();
        expect(question.explanation.length, lesson.id).toBeGreaterThan(15);
      }
      if (lesson.pageExercise) expect(lesson.pageExercise.checks.length).toBeGreaterThanOrEqual(3);
    }
    for (const course of COURSES) {
      expect(course.project.deliverables).toHaveLength(4);
      expect(course.outcomes).toHaveLength(3);
    }
  });
  for (const lesson of BOOTCAMP_LESSONS.filter((lesson) => lesson.challenge)) {
    it(`checks the authored reference against every case: ${lesson.id}`, () => {
      // Only our authored reference fixtures execute in Node, never learner code.
      const challenge = lesson.challenge!;
      const fn = new Function(`${REFERENCE_SOLUTIONS[lesson.id]}\nreturn ${challenge.functionName};`)();
      for (const test of challenge.tests) {
        const args = structuredClone(test.args);
        expect(fn(...args), test.label).toEqual(test.expected);
        if (lesson.id === "data-immutable") expect(args).toEqual(test.args);
      }
    });
  }
  it("keeps a bootcamp association through the existing project schema without changing old records", () => {
    const legacy = newProject("blank");
    expect(projectSchema.parse(legacy)).toEqual(legacy);
    const linked = { ...legacy, courseId: "web" };
    expect(projectSchema.parse(JSON.parse(JSON.stringify(linked))).courseId).toBe("web");
  });
});
