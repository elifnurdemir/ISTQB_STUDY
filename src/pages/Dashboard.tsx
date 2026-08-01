import { Flame, Target, TrendingUp, AlertOctagon, Timer, BookOpenText } from "lucide-react";
import { useStats } from "../context/StatsContext";
import { syllabus } from "../data/syllabus";
import { questions } from "../data/questions";
import type { View } from "../App";

interface DashboardProps {
  onNavigate: (view: View) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { attempts, streak, dailyGoal, answeredToday, mistakeIds, chapterStats } =
    useStats();

  const totalCorrect = attempts.filter((a) => a.correct).length;
  const overallAccuracy = attempts.length
    ? Math.round((totalCorrect / attempts.length) * 100)
    : 0;
  const goalProgress = Math.min(100, Math.round((answeredToday / dailyGoal) * 100));

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Çalışma Defterim</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
          ISTQB Foundation Level sınavına hazırlık yolculuğuna devam et.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Genel Başarı"
          value={`%${overallAccuracy}`}
          sub={`${attempts.length} soru çözüldü`}
        />
        <StatCard
          icon={<Flame className="h-4 w-4" style={{ color: "var(--pen-red)" }} />}
          label="Seri"
          value={`${streak.current} gün`}
          sub={`En iyi: ${streak.best} gün`}
        />
        <StatCard
          icon={<Target className="h-4 w-4" style={{ color: "var(--pen-green)" }} />}
          label="Günlük Hedef"
          value={`${answeredToday}/${dailyGoal}`}
          sub={`%${goalProgress} tamamlandı`}
        />
        <StatCard
          icon={<AlertOctagon className="h-4 w-4" style={{ color: "var(--pen-red)" }} />}
          label="Hata Kutusu"
          value={`${mistakeIds.length}`}
          sub="düzeltilmeyi bekliyor"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={() => onNavigate("exam")}
          className="paper-card group flex items-center gap-4 p-5 text-left transition hover:-translate-y-0.5"
        >
          <div
            className="rounded-sm border p-3"
            style={{ borderColor: "var(--border)", color: "var(--pen-blue)" }}
          >
            <Timer className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold">Deneme Sınavı Başlat</p>
            <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
              40 soru · 60 dakika · gerçek sınav formatı
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigate("modules")}
          className="paper-card group flex items-center gap-4 p-5 text-left transition hover:-translate-y-0.5"
        >
          <div
            className="rounded-sm border p-3"
            style={{ borderColor: "var(--border)", color: "var(--pen-green)" }}
          >
            <BookOpenText className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold">Konu Bazlı Çalış</p>
            <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
              Tek bir syllabus bölümüne odaklan
            </p>
          </div>
        </button>
      </div>

      <div>
        <h2
          className="hand mb-2 text-2xl"
          style={{ color: "var(--pen-blue)" }}
        >
          Bölümlere genel bakış
        </h2>
        <div className="space-y-2">
          {syllabus.map((ch) => {
            const total = questions.filter((q) => q.chapter === ch.chapter).length;
            const stat = chapterStats(ch.chapter);
            return (
              <div
                key={ch.chapter}
                className="paper-card flex items-center justify-between px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    Bölüm {ch.chapter}: {ch.title}
                  </p>
                  <p className="text-xs" style={{ color: "var(--ink-soft)" }}>
                    {total} soru havuzunda
                  </p>
                </div>
                <div className="text-right">
                  <p className="hand text-2xl">%{stat.accuracy}</p>
                  <p className="text-xs" style={{ color: "var(--ink-soft)" }}>
                    {stat.total} denendi
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="paper-card p-4">
      <div className="flex items-center gap-2" style={{ color: "var(--ink-soft)" }}>
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="hand mt-1 text-3xl">{value}</p>
      <p className="text-xs" style={{ color: "var(--ink-soft)" }}>
        {sub}
      </p>
    </div>
  );
}
