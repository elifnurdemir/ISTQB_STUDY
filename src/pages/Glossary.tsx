import { useMemo, useState } from "react";
import { BookMarked, Sparkles } from "lucide-react";
import { glossaryTerms } from "../data/glossary";
import { confusablePairs } from "../data/confusablePairs";
import { syllabus } from "../data/syllabus";
import { Flashcard } from "../components/Flashcard";
import { useFlashcardProgress } from "../hooks/useFlashcardProgress";

type Tab = "terms" | "confusable";

export function Glossary() {
  const [tab, setTab] = useState<Tab>("terms");
  const [chapterFilter, setChapterFilter] = useState<number | "all">("all");
  const { statusOf, markStatus, learnedCount, reviewCount } = useFlashcardProgress();

  const filteredTerms = useMemo(
    () =>
      chapterFilter === "all"
        ? glossaryTerms
        : glossaryTerms.filter((t) => t.chapter === chapterFilter),
    [chapterFilter],
  );

  const filteredPairs = useMemo(
    () =>
      chapterFilter === "all"
        ? confusablePairs
        : confusablePairs.filter((p) => p.chapter === chapterFilter),
    [chapterFilter],
  );

  const totalCards = glossaryTerms.length + confusablePairs.length;

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Terimler Sözlüğü</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
          Kartın üzerine tıkla, çevir; öğrendiysen işaretle, kafan karıştıysa tekrar listesine ekle.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span
          className="hand rounded-full border px-3 py-1 text-lg"
          style={{ borderColor: "var(--pen-green)", color: "var(--pen-green)" }}
        >
          {learnedCount} öğrenildi
        </span>
        <span
          className="hand rounded-full border px-3 py-1 text-lg"
          style={{ borderColor: "var(--pen-red)", color: "var(--pen-red)" }}
        >
          {reviewCount} tekrar bekliyor
        </span>
        <span style={{ color: "var(--ink-soft)" }}>/ {totalCards} kart</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5 rounded-sm border p-1" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={() => setTab("terms")}
            className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors"
            style={{
              background: tab === "terms" ? "var(--pen-blue-soft)" : "transparent",
              color: tab === "terms" ? "var(--pen-blue)" : "var(--ink-soft)",
            }}
          >
            <BookMarked className="h-4 w-4" />
            Terimler ({glossaryTerms.length})
          </button>
          <button
            onClick={() => setTab("confusable")}
            className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors"
            style={{
              background: tab === "confusable" ? "var(--pen-blue-soft)" : "transparent",
              color: tab === "confusable" ? "var(--pen-blue)" : "var(--ink-soft)",
            }}
          >
            <Sparkles className="h-4 w-4" />
            Karıştırılan Kavramlar ({confusablePairs.length})
          </button>
        </div>

        <select
          value={chapterFilter}
          onChange={(e) =>
            setChapterFilter(e.target.value === "all" ? "all" : Number(e.target.value))
          }
          className="rounded-sm border px-3 py-1.5 text-sm"
          style={{ borderColor: "var(--border)", background: "var(--paper-card)", color: "var(--ink)" }}
        >
          <option value="all">Tüm bölümler</option>
          {syllabus.map((ch) => (
            <option key={ch.chapter} value={ch.chapter}>
              Bölüm {ch.chapter}: {ch.title}
            </option>
          ))}
        </select>
      </div>

      {tab === "terms" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredTerms.map((t) => (
            <Flashcard
              key={t.id}
              chapter={t.chapter}
              front={t.term}
              back={t.definition}
              speakText={t.definition}
              status={statusOf(t.id)}
              onMark={(s) => markStatus(t.id, s)}
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredPairs.map((p) => (
            <Flashcard
              key={p.id}
              chapter={p.chapter}
              front={p.title}
              back={
                <ul className="list-disc space-y-1 pl-4 text-left">
                  {p.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              }
              speakText={p.points.join(". ")}
              status={statusOf(p.id)}
              onMark={(s) => markStatus(p.id, s)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
