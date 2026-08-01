import { useMemo, useState } from "react";
import { X, Flame } from "lucide-react";
import type { QuizConfig } from "../types";
import { getQuestionsByChapter, getQuestionsByIds, questions, shuffle } from "../data/questions";
import { useStats } from "../context/StatsContext";
import { QuestionCard } from "./QuestionCard";
import { Timer } from "./Timer";
import { ResultsScreen } from "./ResultsScreen";

interface QuizContainerProps {
  config: QuizConfig;
  onExit: () => void;
}

function buildQuestionList(config: QuizConfig, mistakeIds: string[]) {
  switch (config.mode) {
    case "module":
      return shuffle(getQuestionsByChapter(config.chapter ?? 0, config.difficulty));
    case "exam":
      return shuffle(questions).slice(0, config.questionCount ?? 40);
    case "mistakes":
      return shuffle(getQuestionsByIds(mistakeIds));
  }
}

export function QuizContainer({ config, onExit }: QuizContainerProps) {
  const { recordAttempt, mistakeIds } = useStats();
  const [sessionKey] = useState(0);
  const questionList = useMemo(
    () => buildQuestionList(config, mistakeIds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config, sessionKey],
  );

  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [combo, setCombo] = useState(0);
  const [comboPulse, setComboPulse] = useState<number | null>(null);

  const currentQuestion = questionList[index];

  function handleAnswered(correct: boolean) {
    if (!currentQuestion) return;
    recordAttempt(currentQuestion.id, currentQuestion.chapter, correct);
    if (correct) {
      setCorrectCount((c) => c + 1);
      setCombo((c) => {
        const next = c + 1;
        if (next >= 2) setComboPulse(Date.now());
        return next;
      });
    } else {
      setCombo(0);
    }
  }

  function handleNext() {
    if (index + 1 >= questionList.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  function handleRetry() {
    setIndex(0);
    setCorrectCount(0);
    setFinished(false);
    setCombo(0);
  }

  if (questionList.length === 0) {
    return (
      <div className="mx-auto max-w-md space-y-4 text-center">
        <p style={{ color: "var(--ink-soft)" }}>Bu modda çözülecek soru bulunamadı.</p>
        <button onClick={onExit} className="pen-btn-solid px-4 py-2 text-sm">
          Geri Dön
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <ResultsScreen
        questions={questionList}
        correctCount={correctCount}
        onRetry={handleRetry}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="relative">
      <div className="mx-auto mb-4 flex max-w-4xl items-center justify-between">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: "var(--ink-soft)" }}
        >
          <X className="h-4 w-4" />
          Çıkış
        </button>
        {config.mode === "exam" && (
          <Timer
            totalSeconds={(config.timeLimitMinutes ?? 60) * 60}
            onExpire={() => setFinished(true)}
          />
        )}
      </div>

      {comboPulse && combo >= 2 && (
        <div
          key={comboPulse}
          className="hand animate-combo pointer-events-none fixed left-1/2 top-24 z-50 -translate-x-1/2 rounded-full border-2 px-6 py-1.5 text-4xl shadow-lg"
          style={{
            borderColor: "var(--pen-blue)",
            background: "var(--paper-card)",
            color: "var(--pen-blue)",
          }}
        >
          <span className="flex items-center gap-2">
            <Flame className="h-6 w-6" style={{ color: "var(--pen-red)" }} />
            Combo x{combo}!
          </span>
        </div>
      )}

      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        questionNumber={index + 1}
        totalQuestions={questionList.length}
        onAnswered={handleAnswered}
        onNext={handleNext}
      />
    </div>
  );
}
