import raw from "./syllabus.json";
import type { SyllabusChapter } from "../types";

export const syllabus: SyllabusChapter[] = raw as SyllabusChapter[];

export function getChapter(chapter: number): SyllabusChapter | undefined {
  return syllabus.find((c) => c.chapter === chapter);
}

export function getChapterKeyPoints(chapter: number): string[] {
  const c = getChapter(chapter);
  if (!c) return [];
  return c.sections.flatMap((s) => s.keyPoints);
}
