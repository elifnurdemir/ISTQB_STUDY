import { syllabus } from "../data/syllabus";
import { useStats } from "../context/StatsContext";

function barColor(accuracy: number): string {
  if (accuracy >= 80) return "var(--pen-green)";
  if (accuracy >= 50) return "var(--pen-blue)";
  return "var(--pen-red)";
}

export function Analytics() {
  const { attempts, chapterStats } = useStats();
  const totalCorrect = attempts.filter((a) => a.correct).length;
  const overallAccuracy = attempts.length
    ? Math.round((totalCorrect / attempts.length) * 100)
    : 0;

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Konu Bazlı Başarı Analizi</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
          Zayıf olduğun bölümleri tespit et ve oraya odaklan.
        </p>
      </div>

      <div className="paper-card p-5">
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
          Genel Başarı Oranı
        </p>
        <p className="hand mt-1 text-5xl">%{overallAccuracy}</p>
        <p className="text-xs" style={{ color: "var(--ink-soft)" }}>
          Toplam {attempts.length} soru denendi, {totalCorrect} doğru
        </p>
      </div>

      <div className="space-y-4">
        {syllabus.map((ch) => {
          const stat = chapterStats(ch.chapter);
          return (
            <div key={ch.chapter}>
              <div className="mb-1 flex items-baseline justify-between text-sm">
                <span className="font-medium">
                  Bölüm {ch.chapter}: {ch.title}
                </span>
                <span style={{ color: "var(--ink-soft)" }}>
                  {stat.correct}/{stat.total} · %{stat.accuracy}
                </span>
              </div>
              <div
                className="h-2.5 w-full overflow-hidden rounded-full"
                style={{ background: "var(--grid-line)" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${stat.total ? stat.accuracy : 0}%`,
                    background: barColor(stat.accuracy),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
