import { createContext, useContext, type ReactNode } from "react";
import { useQuizStats } from "../hooks/useQuizStats";

type StatsApi = ReturnType<typeof useQuizStats>;

const StatsContext = createContext<StatsApi | null>(null);

export function StatsProvider({ children }: { children: ReactNode }) {
  const stats = useQuizStats();
  return (
    <StatsContext.Provider value={stats}>{children}</StatsContext.Provider>
  );
}

export function useStats(): StatsApi {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error("useStats must be used within StatsProvider");
  return ctx;
}
