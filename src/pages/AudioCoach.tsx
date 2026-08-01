import { useMemo, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Square, Headphones, AlertTriangle } from "lucide-react";
import { syllabus } from "../data/syllabus";
import { getQuestionsByIds } from "../data/questions";
import { useStats } from "../context/StatsContext";
import { useSpeech } from "../hooks/useSpeech";

type Source = "syllabus" | "mistakes";

interface PlaylistItem {
  label: string;
  text: string;
}

export function AudioCoach() {
  const [source, setSource] = useState<Source>("syllabus");
  const [chapterFilter, setChapterFilter] = useState<number | "all">("all");
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { speak, stop, speaking, supported } = useSpeech();
  const { mistakeIds } = useStats();

  const playlist: PlaylistItem[] = useMemo(() => {
    if (source === "syllabus") {
      const chapters =
        chapterFilter === "all" ? syllabus : syllabus.filter((c) => c.chapter === chapterFilter);
      return chapters.flatMap((ch) =>
        ch.sections.flatMap((sec) =>
          sec.keyPoints.map((kp) => ({
            label: `Bölüm ${ch.chapter} · ${sec.title}`,
            text: kp,
          })),
        ),
      );
    }
    const mistakeQuestions = getQuestionsByIds(mistakeIds).filter(
      (q) => chapterFilter === "all" || q.chapter === chapterFilter,
    );
    return mistakeQuestions.map((q) => ({
      label: `Bölüm ${q.chapter} · ${q.examSource}`,
      text: `Soru: ${q.question} Doğru cevap: ${q.correctAnswer}.`,
    }));
  }, [source, chapterFilter, mistakeIds]);

  const current = playlist[index];

  function playCurrent(fromIndex = index) {
    const item = playlist[fromIndex];
    if (!item) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    speak(item.text, () => {
      setIndex((i) => {
        const next = i + 1;
        if (next < playlist.length) {
          playCurrent(next);
          return next;
        }
        setIsPlaying(false);
        return i;
      });
    });
  }

  function handlePlayPause() {
    if (isPlaying || speaking) {
      stop();
      setIsPlaying(false);
      return;
    }
    playCurrent(index);
  }

  function handleSkip(delta: number) {
    stop();
    setIsPlaying(false);
    setIndex((i) => Math.min(Math.max(i + delta, 0), Math.max(playlist.length - 1, 0)));
  }

  function handleStop() {
    stop();
    setIsPlaying(false);
    setIndex(0);
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Sesli Mod</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
          Arkana yaslan, syllabus özetlerini veya yanlış yaptığın soruları dinle.
        </p>
      </div>

      {!supported && (
        <div
          className="flex items-center gap-2 rounded-sm border p-3 text-sm"
          style={{ borderColor: "var(--pen-red)", color: "var(--pen-red)" }}
        >
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Tarayıcın sesli okuma (Web Speech API) desteklemiyor.
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5 rounded-sm border p-1" style={{ borderColor: "var(--border)" }}>
          {(["syllabus", "mistakes"] as Source[]).map((s) => (
            <button
              key={s}
              onClick={() => {
                handleStop();
                setSource(s);
              }}
              className="rounded-sm px-3 py-1.5 text-sm font-medium transition-colors"
              style={{
                background: source === s ? "var(--pen-blue-soft)" : "transparent",
                color: source === s ? "var(--pen-blue)" : "var(--ink-soft)",
              }}
            >
              {s === "syllabus" ? "Konu Özetleri" : `Hatalarım (${mistakeIds.length})`}
            </button>
          ))}
        </div>

        <select
          value={chapterFilter}
          onChange={(e) => {
            handleStop();
            setChapterFilter(e.target.value === "all" ? "all" : Number(e.target.value));
          }}
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

      <div className="paper-card flex flex-col items-center gap-5 p-8 text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full border"
          style={{ borderColor: "var(--pen-blue)", color: "var(--pen-blue)" }}
        >
          <Headphones className="h-7 w-7" />
        </div>

        {playlist.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
            {source === "mistakes"
              ? "Hata kutun boş, dinlenecek bir şey yok."
              : "Bu bölümde özet bulunamadı."}
          </p>
        ) : (
          <>
            <p className="text-xs" style={{ color: "var(--ink-soft)" }}>
              {current?.label} · {index + 1}/{playlist.length}
            </p>
            <p className="text-base leading-relaxed">{current?.text}</p>
          </>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSkip(-1)}
            disabled={playlist.length === 0}
            className="pen-btn p-2 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            onClick={handlePlayPause}
            disabled={playlist.length === 0 || !supported}
            className="pen-btn-solid flex items-center gap-2 px-5 py-2.5 text-sm disabled:cursor-not-allowed"
          >
            {isPlaying || speaking ? (
              <>
                <Pause className="h-4 w-4" />
                Durdur
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Dinle
              </>
            )}
          </button>
          <button
            onClick={() => handleSkip(1)}
            disabled={playlist.length === 0}
            className="pen-btn p-2 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <SkipForward className="h-4 w-4" />
          </button>
          <button
            onClick={handleStop}
            disabled={playlist.length === 0}
            className="pen-btn p-2 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Square className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
