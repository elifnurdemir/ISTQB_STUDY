export interface QuestionOption {
  key: string;
  text: string;
}

export interface Question {
  id: string;
  chapter: number;
  chapterTitle: string;
  examSource: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string | null;
  bloomLevel: string | null;
}

export interface SyllabusSection {
  id: string;
  title: string;
  keyPoints: string[];
}

export interface SyllabusChapter {
  chapter: number;
  title: string;
  sections: SyllabusSection[];
}

export interface MistakeEntry {
  questionId: string;
  timesWrong: number;
  lastAttempt: number;
}

export interface AttemptRecord {
  questionId: string;
  chapter: number;
  correct: boolean;
  timestamp: number;
}

export interface DailyProgress {
  date: string;
  answered: number;
  correct: number;
}

export type QuizMode = "module" | "exam" | "mistakes";

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  chapter: number;
}

export interface ConfusablePair {
  id: string;
  title: string;
  chapter: number;
  points: string[];
}

export type FlashcardStatus = "new" | "learned" | "review";

export interface QuizConfig {
  mode: QuizMode;
  chapter?: number;
  questionCount?: number;
  timeLimitMinutes?: number;
  difficulty?: "Kolay" | "Orta" | "Zor";
}
