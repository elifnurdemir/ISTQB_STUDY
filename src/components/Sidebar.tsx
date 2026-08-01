import {
  LayoutDashboard,
  BookOpenText,
  Timer as TimerIcon,
  AlertOctagon,
  BarChart3,
  Moon,
  Sun,
  PenLine,
  BookMarked,
  NotebookPen,
  Headphones,
} from "lucide-react";
import type { View } from "../App";
import { useStats } from "../context/StatsContext";

interface SidebarProps {
  view: View;
  onNavigate: (view: View) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const NAV_ITEMS: { key: View; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Panel", icon: LayoutDashboard },
  { key: "modules", label: "Konu Bazlı Çalışma", icon: BookOpenText },
  { key: "glossary", label: "Terimler Sözlüğü", icon: BookMarked },
  { key: "cheatsheet", label: "Kopya Kağıdı", icon: NotebookPen },
  { key: "audio", label: "Sesli Mod", icon: Headphones },
  { key: "exam", label: "Deneme Sınavı", icon: TimerIcon },
  { key: "mistakes", label: "Hata Kutusu", icon: AlertOctagon },
  { key: "analytics", label: "Analiz", icon: BarChart3 },
];

export function Sidebar({ view, onNavigate, theme, onToggleTheme }: SidebarProps) {
  const { mistakeIds } = useStats();

  return (
    <aside
      className="spiral-edge relative flex h-full w-full flex-col gap-6 border-r p-4 pl-7 md:w-64"
      style={{
        background: "var(--paper-card)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="flex items-center gap-2 px-2 pt-1 text-lg font-semibold"
        style={{ color: "var(--ink)" }}
      >
        <PenLine className="h-5 w-5" style={{ color: "var(--pen-blue)" }} />
        <span style={{ fontFamily: "Georgia, serif" }}>ISTQB Defterim</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1.5">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const active = view === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className="flex items-center gap-3 rounded-sm border-l-[3px] px-3 py-2.5 text-sm font-medium transition-colors"
              style={{
                borderLeftColor: active ? "var(--pen-blue)" : "transparent",
                background: active ? "var(--pen-blue-soft)" : "transparent",
                color: active ? "var(--pen-blue)" : "var(--ink-soft)",
              }}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {key === "mistakes" && mistakeIds.length > 0 && (
                <span
                  className="hand rounded-full px-2 text-base font-semibold"
                  style={{ background: "var(--pen-red-soft)", color: "var(--pen-red)" }}
                >
                  {mistakeIds.length}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <button
        onClick={onToggleTheme}
        className="pen-btn flex items-center justify-center gap-2 px-3 py-2 text-sm"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        {theme === "dark" ? "Aydınlık Mod" : "Karanlık Mod"}
      </button>
    </aside>
  );
}
