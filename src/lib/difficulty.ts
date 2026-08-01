import type { Question } from "../types";

export type Difficulty = "Kolay" | "Orta" | "Zor";

export const DIFFICULTIES: Difficulty[] = ["Kolay", "Orta", "Zor"];

export function difficultyOf(question: Question): Difficulty {
  if (question.bloomLevel === "K1") return "Kolay";
  if (question.bloomLevel === "K3") return "Zor";
  return "Orta";
}

export const UNLOCK_THRESHOLD_ACCURACY = 70;
export const UNLOCK_MIN_ATTEMPTS = 5;
