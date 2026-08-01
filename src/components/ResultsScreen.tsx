import { Award, RotateCcw, Home } from "lucide-react";
import type { Question } from "../types";

interface ResultsScreenProps {
  questions: Question[];
  correctCount: number;
  onRetry: () => void;
  onExit: () => void;
}

export function ResultsScreen({
  questions,
  correctCount,
  onRetry,
  onExit,
}: ResultsScreenProps) {
  const total = questions.length;
  const accuracy = total ? Math.round((correctCount / total) * 100) : 0;
  const pass = accuracy >= 65;

  return (
    <div className="mx-auto max-w-xl space-y-6 text-center">
      <div className="flex justify-center">
        <div
          className="rounded-full border p-4"
          style={{ borderColor: "var(--border)", color: "var(--pen-blue)" }}
        >
          <Award className="h-10 w-10" />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">Tamamlandı!</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
          {correctCount} / {total} doğru
        </p>
      </div>

      <div
        className="mx-auto h-3 w-full max-w-sm overflow-hidden rounded-full"
        style={{ background: "var(--grid-line)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${accuracy}%`,
            background: pass ? "var(--pen-green)" : "var(--pen-red)",
          }}
        />
      </div>
      <p className="hand text-6xl" style={{ color: pass ? "var(--pen-green)" : "var(--pen-red)" }}>
        %{accuracy}
      </p>

      <div className="flex justify-center gap-3">
        <button onClick={onRetry} className="pen-btn flex items-center gap-2 px-4 py-2 text-sm">
          <RotateCcw className="h-4 w-4" />
          Tekrar Dene
        </button>
        <button
          onClick={onExit}
          className="pen-btn-solid flex items-center gap-2 px-4 py-2 text-sm"
        >
          <Home className="h-4 w-4" />
          Panele Dön
        </button>
      </div>
    </div>
  );
}
