import { useEffect, useRef, useState } from "react";
import { AlarmClock } from "lucide-react";

interface TimerProps {
  totalSeconds: number;
  onExpire: () => void;
}

export function Timer({ totalSeconds, onExpire }: TimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          onExpireRef.current();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const low = remaining <= 60;

  return (
    <div
      className="hand flex items-center gap-1.5 rounded-full border px-3 py-1 text-2xl"
      style={{
        borderColor: low ? "var(--pen-red)" : "var(--border)",
        color: low ? "var(--pen-red)" : "var(--pen-blue)",
      }}
    >
      <AlarmClock className="h-4 w-4" />
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
