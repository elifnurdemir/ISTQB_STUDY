import { Timer, ListChecks, AlarmClock } from "lucide-react";
import type { QuizConfig } from "../types";

interface ExamIntroProps {
  onStart: (config: QuizConfig) => void;
}

export function ExamIntro({ onStart }: ExamIntroProps) {
  return (
    <div className="mx-auto max-w-xl space-y-6 text-center">
      <div className="flex justify-center">
        <div
          className="rounded-full border p-4"
          style={{ borderColor: "var(--border)", color: "var(--pen-blue)" }}
        >
          <Timer className="h-9 w-9" />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">Deneme Sınavı</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
          Gerçek ISTQB CTFL sınav formatını simüle eder.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-left">
        <div className="paper-card flex items-center gap-3 p-4">
          <ListChecks className="h-5 w-5" style={{ color: "var(--pen-blue)" }} />
          <div>
            <p className="text-sm font-semibold">40 Soru</p>
            <p className="text-xs" style={{ color: "var(--ink-soft)" }}>
              Tüm konulardan karışık
            </p>
          </div>
        </div>
        <div className="paper-card flex items-center gap-3 p-4">
          <AlarmClock className="h-5 w-5" style={{ color: "var(--pen-blue)" }} />
          <div>
            <p className="text-sm font-semibold">60 Dakika</p>
            <p className="text-xs" style={{ color: "var(--ink-soft)" }}>
              Geri sayım sayacı
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => onStart({ mode: "exam", questionCount: 40, timeLimitMinutes: 60 })}
        className="pen-btn-solid px-6 py-3 text-sm"
      >
        Sınavı Başlat
      </button>
    </div>
  );
}
