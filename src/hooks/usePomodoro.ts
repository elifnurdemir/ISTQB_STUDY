import { useEffect, useState } from "react";

export type PomodoroMode = "focus" | "break";

const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

function playChime() {
  try {
    const ctx = new AudioContext();
    const notes = [660, 880];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + i * 0.18 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.18 + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.18);
      osc.stop(ctx.currentTime + i * 0.18 + 0.36);
    });
    setTimeout(() => ctx.close(), 900);
  } catch {
    // audio unavailable — silently skip the chime
  }
}

export function usePomodoro() {
  const [mode, setMode] = useState<PomodoroMode>("focus");
  const [remaining, setRemaining] = useState(FOCUS_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [justSwitched, setJustSwitched] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          playChime();
          setMode((m) => {
            const nextMode: PomodoroMode = m === "focus" ? "break" : "focus";
            setRemaining(nextMode === "focus" ? FOCUS_SECONDS : BREAK_SECONDS);
            return nextMode;
          });
          setJustSwitched(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    if (!justSwitched) return;
    const t = setTimeout(() => setJustSwitched(false), 4000);
    return () => clearTimeout(t);
  }, [justSwitched]);

  function start() {
    setIsRunning(true);
  }
  function pause() {
    setIsRunning(false);
  }
  function reset() {
    setIsRunning(false);
    setMode("focus");
    setRemaining(FOCUS_SECONDS);
  }

  return { mode, remaining, isRunning, justSwitched, start, pause, reset };
}
