import { useState } from "react";
import { Play, Pause, RotateCcw, Coffee, BookOpen, Timer as TimerIcon } from "lucide-react";
import { usePomodoro } from "../hooks/usePomodoro";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function PomodoroWidget() {
  const [expanded, setExpanded] = useState(false);
  const { mode, remaining, isRunning, justSwitched, start, pause, reset } = usePomodoro();

  const isBreak = mode === "break";

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {justSwitched && (
        <div
          className="hand animate-combo rounded-sm border px-4 py-1.5 text-2xl shadow-lg"
          style={{
            borderColor: "var(--pen-blue)",
            background: "var(--paper-card)",
            color: "var(--pen-blue)",
          }}
        >
          {isBreak ? "5 Dakika Mola! ☕" : "Odaklanma zamanı! 📖"}
        </div>
      )}

      {expanded && (
        <div className="paper-card w-56 p-4">
          <div
            className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
            style={{ color: isBreak ? "var(--pen-red)" : "var(--pen-blue)" }}
          >
            {isBreak ? <Coffee className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
            {isBreak ? "Mola Zamanı" : "Odaklanma"}
          </div>
          <p className="hand text-center text-5xl">{formatTime(remaining)}</p>
          <div className="mt-3 flex justify-center gap-2">
            {isRunning ? (
              <button onClick={pause} className="pen-btn flex items-center gap-1.5 px-3 py-1.5 text-xs">
                <Pause className="h-3.5 w-3.5" />
                Duraklat
              </button>
            ) : (
              <button
                onClick={start}
                className="pen-btn-solid flex items-center gap-1.5 px-3 py-1.5 text-xs"
              >
                <Play className="h-3.5 w-3.5" />
                Başlat
              </button>
            )}
            <button onClick={reset} className="pen-btn flex items-center gap-1.5 px-3 py-1.5 text-xs">
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setExpanded((e) => !e)}
        className="hand flex items-center gap-2 rounded-full border px-4 py-2 text-2xl shadow-md transition-transform hover:-translate-y-0.5"
        style={{
          borderColor: isBreak ? "var(--pen-red)" : "var(--pen-blue)",
          background: "var(--paper-card)",
          color: isBreak ? "var(--pen-red)" : "var(--pen-blue)",
        }}
      >
        <TimerIcon className="h-4 w-4" />
        {formatTime(remaining)}
      </button>
    </div>
  );
}
