import { AlertOctagon, PartyPopper } from "lucide-react";
import { useStats } from "../context/StatsContext";
import { getQuestionsByIds } from "../data/questions";
import type { QuizConfig } from "../types";

interface MistakesBankProps {
  onStart: (config: QuizConfig) => void;
}

export function MistakesBank({ onStart }: MistakesBankProps) {
  const { mistakeIds } = useStats();
  const mistakeQuestions = getQuestionsByIds(mistakeIds);

  if (mistakeIds.length === 0) {
    return (
      <div className="mx-auto max-w-md space-y-3 text-center">
        <div className="flex justify-center">
          <div
            className="rounded-full border p-4"
            style={{ borderColor: "var(--border)", color: "var(--pen-green)" }}
          >
            <PartyPopper className="h-9 w-9" />
          </div>
        </div>
        <h1 className="text-xl font-semibold">Hata kutun boş!</h1>
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
          Şu an yanlış çözdüğün ve tekrar denemen gereken bir soru yok.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div
          className="rounded-sm border p-3"
          style={{ borderColor: "var(--border)", color: "var(--pen-red)" }}
        >
          <AlertOctagon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Hata Kutusu</h1>
          <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
            {mistakeIds.length} soru düzeltilmeyi bekliyor
          </p>
        </div>
      </div>

      <button
        onClick={() =>
          onStart({ mode: "mistakes", questionCount: mistakeQuestions.length })
        }
        className="pen-btn-solid w-full py-3 text-sm"
      >
        Hatalarımı Düzelt
      </button>

      <ul className="space-y-2">
        {mistakeQuestions.map((q) => (
          <li key={q.id} className="paper-card p-3 text-sm">
            <span
              className="mr-2 rounded-full px-2 py-0.5 text-xs font-medium"
              style={{ background: "var(--grid-line)", color: "var(--ink-soft)" }}
            >
              Bölüm {q.chapter}
            </span>
            {q.question}
          </li>
        ))}
      </ul>
    </div>
  );
}
