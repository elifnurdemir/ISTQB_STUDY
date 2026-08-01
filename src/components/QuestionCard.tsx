import { useState } from "react";
import { CheckCircle2, XCircle, BookOpen, Volume2, VolumeX } from "lucide-react";
import type { Question } from "../types";
import { getChapterKeyPoints } from "../data/syllabus";
import { useSpeech } from "../hooks/useSpeech";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswered: (correct: boolean) => void;
  onNext: () => void;
}

function parseCorrectKeys(correctAnswer: string): string[] {
  return correctAnswer
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswered,
  onNext,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const { speak, stop, speaking } = useSpeech();

  const correctKeys = parseCorrectKeys(question.correctAnswer);
  const isMulti = correctKeys.length > 1;
  const isCorrect =
    submitted &&
    selected.length === correctKeys.length &&
    selected.every((k) => correctKeys.includes(k));

  function toggleOption(key: string) {
    if (submitted) return;
    if (isMulti) {
      setSelected((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
      );
    } else {
      setSelected([key]);
    }
  }

  function handleSubmit() {
    if (selected.length === 0) return;
    setSubmitted(true);
    const correct =
      selected.length === correctKeys.length &&
      selected.every((k) => correctKeys.includes(k));
    onAnswered(correct);
  }

  function handleNext() {
    setSelected([]);
    setSubmitted(false);
    onNext();
  }

  const keyPoints = getChapterKeyPoints(question.chapter);

  return (
    <div className="mx-auto max-w-4xl">
      <div
        className="mb-4 flex items-center justify-between text-sm"
        style={{ color: "var(--ink-soft)" }}
      >
        <span>
          Soru {questionNumber} / {totalQuestions}
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ background: "var(--grid-line)" }}
        >
          Bölüm {question.chapter}: {question.chapterTitle}
        </span>
      </div>

      <div className="paper-card p-6">
        <p className="text-base font-medium leading-relaxed">{question.question}</p>
        {isMulti && (
          <p className="hand mt-1 text-xl" style={{ color: "var(--pen-blue)" }}>
            Birden fazla doğru cevap seçin ({correctKeys.length} seçenek)
          </p>
        )}

        <div className="mt-5 space-y-2">
          {question.options.map((opt) => {
            const isSelected = selected.includes(opt.key);
            const isTheCorrectOne = correctKeys.includes(opt.key);
            let borderColor = "var(--border)";
            let bg = "transparent";
            if (submitted) {
              if (isTheCorrectOne) {
                borderColor = "var(--pen-green)";
                bg = "var(--pen-green-soft)";
              } else if (isSelected) {
                borderColor = "var(--pen-red)";
                bg = "var(--pen-red-soft)";
              }
            } else if (isSelected) {
              borderColor = "var(--pen-blue)";
              bg = "var(--pen-blue-soft)";
            }

            return (
              <button
                key={opt.key}
                onClick={() => toggleOption(opt.key)}
                disabled={submitted}
                className="flex w-full items-start gap-3 rounded-sm border px-4 py-3 text-left text-sm transition-colors disabled:cursor-default"
                style={{ borderColor, background: bg }}
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold"
                  style={{ borderColor: "var(--border)", color: "var(--ink-soft)" }}
                >
                  {opt.key}
                </span>
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className="pen-btn-solid mt-6 w-full py-2.5 text-sm"
          >
            Cevabı Onayla
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            <div
              className="flex animate-[fadeIn_0.25s_ease-out] items-center gap-2 rounded-sm px-4 py-3 text-sm font-semibold"
              style={{
                background: isCorrect ? "var(--pen-green-soft)" : "var(--pen-red-soft)",
                color: isCorrect ? "var(--pen-green)" : "var(--pen-red)",
              }}
            >
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              {isCorrect
                ? "Doğru cevap!"
                : `Yanlış. Doğru cevap: ${correctKeys.join(", ")}`}
            </div>

            {!isCorrect && keyPoints.length > 0 && (
              <div
                className="rounded-sm border p-4 text-sm"
                style={{ borderColor: "var(--border)", background: "var(--pen-blue-soft)" }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <p
                    className="flex items-center gap-1.5 font-semibold"
                    style={{ color: "var(--pen-blue)" }}
                  >
                    <BookOpen className="h-4 w-4" />
                    Konu Özeti: Bölüm {question.chapter}
                  </p>
                  <button
                    onClick={() =>
                      speaking ? stop() : speak(keyPoints.slice(0, 3).join(". "))
                    }
                    title="Sesli dinle"
                    className="rounded-full border p-1"
                    style={{ borderColor: "var(--border)", color: "var(--pen-blue)" }}
                  >
                    {speaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <ul className="list-disc space-y-1 pl-5">
                  {keyPoints.slice(0, 3).map((kp, i) => (
                    <li key={i}>{kp}</li>
                  ))}
                </ul>
              </div>
            )}

            <button onClick={handleNext} className="pen-btn-solid w-full py-2.5 text-sm">
              {questionNumber === totalQuestions ? "Sonuçları Gör" : "Sonraki Soru"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
