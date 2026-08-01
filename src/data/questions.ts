import raw from "./questions.json";
import type { Question } from "../types";
import { difficultyOf, type Difficulty } from "../lib/difficulty";

export const questions: Question[] = raw as Question[];

export function getQuestionsByChapter(chapter: number, difficulty?: Difficulty): Question[] {
  return questions.filter(
    (q) => q.chapter === chapter && (!difficulty || difficultyOf(q) === difficulty),
  );
}

export function getQuestionsByIds(ids: string[]): Question[] {
  const idSet = new Set(ids);
  return questions.filter((q) => idSet.has(q.id));
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
