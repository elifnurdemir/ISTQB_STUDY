export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable or full — silently ignore
  }
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export const STORAGE_KEYS = {
  theme: "istqb_theme",
  mistakes: "istqb_mistakes",
  attempts: "istqb_attempts",
  streak: "istqb_streak",
  dailyGoal: "istqb_daily_goal",
  flashcardStatus: "istqb_flashcard_status",
  cheatChecklist: "istqb_cheat_checklist",
} as const;
