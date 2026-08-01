import { useEffect, useState } from "react";
import { loadJSON, saveJSON, STORAGE_KEYS, todayKey } from "../lib/storage";
import { questions } from "../data/questions";
import { difficultyOf, type Difficulty } from "../lib/difficulty";
import type { AttemptRecord, MistakeEntry } from "../types";

const questionDifficultyMap: Record<string, Difficulty> = Object.fromEntries(
  questions.map((q) => [q.id, difficultyOf(q)]),
);

interface StreakState {
  current: number;
  best: number;
  lastGoalDate: string | null;
}

const DEFAULT_STREAK: StreakState = { current: 0, best: 0, lastGoalDate: null };

export function useQuizStats() {
  const [attempts, setAttempts] = useState<AttemptRecord[]>(() =>
    loadJSON(STORAGE_KEYS.attempts, []),
  );
  const [mistakes, setMistakes] = useState<Record<string, MistakeEntry>>(() =>
    loadJSON(STORAGE_KEYS.mistakes, {}),
  );
  const [streak, setStreak] = useState<StreakState>(() =>
    loadJSON(STORAGE_KEYS.streak, DEFAULT_STREAK),
  );
  const [dailyGoal, setDailyGoal] = useState<number>(() =>
    loadJSON(STORAGE_KEYS.dailyGoal, 20),
  );

  useEffect(() => saveJSON(STORAGE_KEYS.attempts, attempts), [attempts]);
  useEffect(() => saveJSON(STORAGE_KEYS.mistakes, mistakes), [mistakes]);
  useEffect(() => saveJSON(STORAGE_KEYS.streak, streak), [streak]);
  useEffect(() => saveJSON(STORAGE_KEYS.dailyGoal, dailyGoal), [dailyGoal]);

  function recordAttempt(
    questionId: string,
    chapter: number,
    correct: boolean,
  ) {
    const timestamp = Date.now();
    setAttempts((prev) => [...prev, { questionId, chapter, correct, timestamp }]);

    setMistakes((prev) => {
      if (correct) {
        if (!(questionId in prev)) return prev;
        const next = { ...prev };
        delete next[questionId];
        return next;
      }
      const existing = prev[questionId];
      return {
        ...prev,
        [questionId]: {
          questionId,
          timesWrong: (existing?.timesWrong ?? 0) + 1,
          lastAttempt: timestamp,
        },
      };
    });

    const todayForGoal = todayKey();
    const answeredTodaySoFar = attempts.filter(
      (a) => new Date(a.timestamp).toISOString().slice(0, 10) === todayForGoal,
    ).length + 1;

    if (answeredTodaySoFar === dailyGoal && streak.lastGoalDate !== todayForGoal) {
      setStreak((prev) => {
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .slice(0, 10);
        const current = prev.lastGoalDate === yesterday ? prev.current + 1 : 1;
        return {
          current,
          best: Math.max(prev.best, current),
          lastGoalDate: todayForGoal,
        };
      });
    }
  }

  function clearMistake(questionId: string) {
    setMistakes((prev) => {
      if (!(questionId in prev)) return prev;
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  }

  function chapterStats(chapter: number) {
    const relevant = attempts.filter((a) => a.chapter === chapter);
    const correct = relevant.filter((a) => a.correct).length;
    return {
      total: relevant.length,
      correct,
      accuracy: relevant.length ? Math.round((correct / relevant.length) * 100) : 0,
    };
  }

  function chapterDifficultyStats(chapter: number, difficulty: Difficulty) {
    const relevant = attempts.filter(
      (a) => a.chapter === chapter && questionDifficultyMap[a.questionId] === difficulty,
    );
    const correct = relevant.filter((a) => a.correct).length;
    return {
      total: relevant.length,
      correct,
      accuracy: relevant.length ? Math.round((correct / relevant.length) * 100) : 0,
    };
  }

  const today = todayKey();
  const answeredToday = attempts.filter(
    (a) => new Date(a.timestamp).toISOString().slice(0, 10) === today,
  ).length;

  return {
    attempts,
    mistakes,
    mistakeIds: Object.keys(mistakes),
    streak,
    dailyGoal,
    setDailyGoal,
    answeredToday,
    recordAttempt,
    clearMistake,
    chapterStats,
    chapterDifficultyStats,
  };
}
