import { useEffect, useState } from "react";
import { Calculator, CheckSquare, Square, Sparkles, Trophy } from "lucide-react";
import { formulaCards, quickReview, finalChecklist, examStrategy } from "../data/cheatSheet";
import { loadJSON, saveJSON, STORAGE_KEYS } from "../lib/storage";

export function CheatSheet() {
  const [checked, setChecked] = useState<Record<number, boolean>>(() =>
    loadJSON(STORAGE_KEYS.cheatChecklist, {}),
  );

  useEffect(() => saveJSON(STORAGE_KEYS.cheatChecklist, checked), [checked]);

  function toggle(i: number) {
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">Kopya Kağıdı</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
          Sınava son 1-2 hafta kala tüm dokümanı okumak yerine, en kritik formülleri ve
          kuralları buradan hızlıca hatırla.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="hand text-2xl" style={{ color: "var(--pen-blue)" }}>
          <Calculator className="mr-1.5 inline h-5 w-5" />
          Formüller ve Hesaplama Örnekleri
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {formulaCards.map((f) => (
            <div key={f.id} className="paper-card p-4">
              <p className="text-sm font-semibold">{f.title}</p>
              {f.formula && (
                <p
                  className="hand mt-1 text-xl"
                  style={{ color: "var(--pen-blue)" }}
                >
                  {f.formula}
                </p>
              )}
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
                {f.body.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {f.note && (
                <p
                  className="mt-2 rounded-sm border px-2 py-1 text-xs"
                  style={{ borderColor: "var(--border)", color: "var(--ink-soft)" }}
                >
                  {f.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="hand text-2xl" style={{ color: "var(--pen-blue)" }}>
          <Sparkles className="mr-1.5 inline h-5 w-5" />
          Hızlı Tekrar Kartları
        </h2>
        <div className="space-y-4">
          {quickReview.map((ch) => (
            <div key={ch.chapter} className="paper-card p-4">
              <p className="mb-2 text-sm font-semibold">Bölüm {ch.chapter}</p>
              <div className="space-y-2">
                {ch.items.map((item, i) => (
                  <details key={i} className="group">
                    <summary
                      className="cursor-pointer list-none text-sm font-medium"
                      style={{ color: "var(--ink)" }}
                    >
                      {item.question}
                    </summary>
                    <p
                      className="mt-1 pl-3 text-sm"
                      style={{ color: "var(--pen-blue)", borderLeft: "2px solid var(--border)" }}
                    >
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="hand text-2xl" style={{ color: "var(--pen-blue)" }}>
          <CheckSquare className="mr-1.5 inline h-5 w-5" />
          Son Kontrol Listesi (sınav sabahı)
        </h2>
        <div className="paper-card p-4">
          <ul className="space-y-2">
            {finalChecklist.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-2 text-left text-sm"
                >
                  {checked[i] ? (
                    <CheckSquare className="h-4 w-4 shrink-0" style={{ color: "var(--pen-green)" }} />
                  ) : (
                    <Square className="h-4 w-4 shrink-0" style={{ color: "var(--ink-soft)" }} />
                  )}
                  <span
                    style={{
                      textDecoration: checked[i] ? "line-through" : "none",
                      color: checked[i] ? "var(--ink-soft)" : "var(--ink)",
                    }}
                  >
                    {item}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="hand text-2xl" style={{ color: "var(--pen-blue)" }}>
          <Trophy className="mr-1.5 inline h-5 w-5" />
          Deneme Sınavı Hedef Skorları
        </h2>
        <div className="paper-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--grid-line)" }}>
                <th className="p-3 text-left font-semibold">Sınav</th>
                <th className="p-3 text-left font-semibold">Hedef</th>
              </tr>
            </thead>
            <tbody>
              {examStrategy.map((row, i) => (
                <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                  <td className="p-3">{row.exam}</td>
                  <td className="hand p-3 text-lg" style={{ color: "var(--pen-blue)" }}>
                    {row.target}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
