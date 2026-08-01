import { useState } from "react";
import { ChevronDown, ChevronRight, Lock, Sprout, Flame, Skull } from "lucide-react";
import { syllabus } from "../data/syllabus";
import { getQuestionsByChapter } from "../data/questions";
import { useStats } from "../context/StatsContext";
import {
  DIFFICULTIES,
  UNLOCK_MIN_ATTEMPTS,
  UNLOCK_THRESHOLD_ACCURACY,
  type Difficulty,
} from "../lib/difficulty";
import type { QuizConfig } from "../types";

interface ModuleSelectProps {
  onStart: (config: QuizConfig) => void;
}

const TIER_ICON: Record<Difficulty, typeof Sprout> = {
  Kolay: Sprout,
  Orta: Flame,
  Zor: Skull,
};

export function ModuleSelect({ onStart }: ModuleSelectProps) {
  const { chapterStats, chapterDifficultyStats } = useStats();
  const [expanded, setExpanded] = useState<number | null>(null);

  function isUnlocked(chapter: number, difficulty: Difficulty): boolean {
    if (difficulty === "Kolay") return true;
    const prevTier = difficulty === "Orta" ? "Kolay" : "Orta";
    const pool = getQuestionsByChapter(chapter, prevTier);
    if (pool.length === 0) return true;
    const stat = chapterDifficultyStats(chapter, prevTier);
    return stat.total >= UNLOCK_MIN_ATTEMPTS && stat.accuracy >= UNLOCK_THRESHOLD_ACCURACY;
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Konu Bazlı Çalışma</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
          Bir bölüm seç. Önce Kolay sorularla başla — %{UNLOCK_THRESHOLD_ACCURACY} başarı
          yakalayınca bir sonraki seviyenin kilidi açılır.
        </p>
      </div>

      <div className="space-y-3">
        {syllabus.map((ch) => {
          const pool = getQuestionsByChapter(ch.chapter);
          const stat = chapterStats(ch.chapter);
          const isOpen = expanded === ch.chapter;
          return (
            <div key={ch.chapter} className="paper-card overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : ch.chapter)}
                disabled={pool.length === 0}
                className="flex w-full items-center justify-between p-4 text-left disabled:cursor-not-allowed disabled:opacity-40"
              >
                <div>
                  <p className="font-semibold">
                    Bölüm {ch.chapter}: {ch.title}
                  </p>
                  <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                    {pool.length} soru · Genel başarı: %{stat.accuracy}
                  </p>
                </div>
                {isOpen ? (
                  <ChevronDown className="h-5 w-5" style={{ color: "var(--ink-soft)" }} />
                ) : (
                  <ChevronRight className="h-5 w-5" style={{ color: "var(--ink-soft)" }} />
                )}
              </button>

              {isOpen && (
                <div
                  className="grid gap-2 border-t p-4 sm:grid-cols-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  {DIFFICULTIES.map((difficulty) => {
                    const tierPool = getQuestionsByChapter(ch.chapter, difficulty);
                    const tierStat = chapterDifficultyStats(ch.chapter, difficulty);
                    const unlocked = isUnlocked(ch.chapter, difficulty) && tierPool.length > 0;
                    const Icon = TIER_ICON[difficulty];
                    return (
                      <button
                        key={difficulty}
                        disabled={!unlocked}
                        onClick={() =>
                          onStart({
                            mode: "module",
                            chapter: ch.chapter,
                            difficulty,
                            questionCount: tierPool.length,
                          })
                        }
                        className="flex flex-col items-center gap-1.5 rounded-sm border p-3 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {unlocked ? (
                          <Icon className="h-5 w-5" style={{ color: "var(--pen-blue)" }} />
                        ) : (
                          <Lock className="h-5 w-5" style={{ color: "var(--ink-soft)" }} />
                        )}
                        <span className="text-sm font-semibold">{difficulty}</span>
                        <span className="text-xs" style={{ color: "var(--ink-soft)" }}>
                          {tierPool.length === 0
                            ? "soru yok"
                            : unlocked
                              ? `${tierPool.length} soru · %${tierStat.accuracy}`
                              : `%${UNLOCK_THRESHOLD_ACCURACY} başarı ile açılır`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
