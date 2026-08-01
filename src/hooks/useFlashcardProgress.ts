import { useEffect, useState } from "react";
import { loadJSON, saveJSON, STORAGE_KEYS } from "../lib/storage";
import type { FlashcardStatus } from "../types";

export function useFlashcardProgress() {
  const [statusMap, setStatusMap] = useState<Record<string, FlashcardStatus>>(() =>
    loadJSON(STORAGE_KEYS.flashcardStatus, {}),
  );

  useEffect(
    () => saveJSON(STORAGE_KEYS.flashcardStatus, statusMap),
    [statusMap],
  );

  function markStatus(id: string, status: FlashcardStatus) {
    setStatusMap((prev) => ({ ...prev, [id]: status }));
  }

  function statusOf(id: string): FlashcardStatus {
    return statusMap[id] ?? "new";
  }

  const learnedCount = Object.values(statusMap).filter((s) => s === "learned").length;
  const reviewCount = Object.values(statusMap).filter((s) => s === "review").length;

  return { statusMap, markStatus, statusOf, learnedCount, reviewCount };
}
