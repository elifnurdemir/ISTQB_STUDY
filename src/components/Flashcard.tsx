import { useState } from "react";
import { RotateCw, Check, RefreshCcw, Volume2, VolumeX } from "lucide-react";
import type { FlashcardStatus } from "../types";
import { useSpeech } from "../hooks/useSpeech";

interface FlashcardProps {
  chapter: number;
  front: string;
  back: React.ReactNode;
  speakText?: string;
  status: FlashcardStatus;
  onMark: (status: FlashcardStatus) => void;
}

export function Flashcard({ chapter, front, back, speakText, status, onMark }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const { speak, stop, speaking } = useSpeech();

  function handleSpeak(e: React.MouseEvent) {
    e.stopPropagation();
    if (speaking) {
      stop();
      return;
    }
    speak(`${front}. ${speakText ?? ""}`);
  }

  const statusColor =
    status === "learned"
      ? "var(--pen-green)"
      : status === "review"
        ? "var(--pen-red)"
        : "var(--ink-soft)";
  const statusLabel =
    status === "learned" ? "Öğrenildi" : status === "review" ? "Tekrar edilecek" : "Yeni";

  return (
    <div className="paper-card flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between text-xs" style={{ color: "var(--ink-soft)" }}>
        <span
          className="rounded-full px-2 py-0.5 font-medium"
          style={{ background: "var(--grid-line)" }}
        >
          Bölüm {chapter}
        </span>
        <span className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            title="Sesli dinle"
            className="rounded-full border p-1"
            style={{ borderColor: "var(--border)", color: "var(--pen-blue)" }}
          >
            {speaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>
          <span className="font-medium" style={{ color: statusColor }}>
            {statusLabel}
          </span>
        </span>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-sm border px-4 py-5 text-center transition-colors"
        style={{ borderColor: "var(--border)", background: "var(--pen-blue-soft)" }}
      >
        {!flipped ? (
          <p className="text-base font-semibold">{front}</p>
        ) : (
          <div className="text-sm leading-relaxed">{back}</div>
        )}
        <span
          className="mt-1 flex items-center gap-1 text-xs"
          style={{ color: "var(--pen-blue)" }}
        >
          <RotateCw className="h-3 w-3" />
          {flipped ? "Soruya dön" : "Cevabı gör"}
        </span>
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => onMark("learned")}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-sm border px-3 py-1.5 text-xs font-semibold transition-colors"
          style={{
            borderColor: "var(--pen-green)",
            color: "var(--pen-green)",
            background: status === "learned" ? "var(--pen-green-soft)" : "transparent",
          }}
        >
          <Check className="h-3.5 w-3.5" />
          Öğrendim
        </button>
        <button
          onClick={() => onMark("review")}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-sm border px-3 py-1.5 text-xs font-semibold transition-colors"
          style={{
            borderColor: "var(--pen-red)",
            color: "var(--pen-red)",
            background: status === "review" ? "var(--pen-red-soft)" : "transparent",
          }}
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          Tekrar Et
        </button>
      </div>
    </div>
  );
}
