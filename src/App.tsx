import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { QuizContainer } from "./components/QuizContainer";
import { Dashboard } from "./pages/Dashboard";
import { ModuleSelect } from "./pages/ModuleSelect";
import { ExamIntro } from "./pages/ExamIntro";
import { MistakesBank } from "./pages/MistakesBank";
import { Analytics } from "./pages/Analytics";
import { Glossary } from "./pages/Glossary";
import { CheatSheet } from "./pages/CheatSheet";
import { AudioCoach } from "./pages/AudioCoach";
import { PomodoroWidget } from "./components/PomodoroWidget";
import { StatsProvider } from "./context/StatsContext";
import { useTheme } from "./hooks/useTheme";
import type { QuizConfig } from "./types";

export type View =
  | "dashboard"
  | "modules"
  | "exam"
  | "mistakes"
  | "analytics"
  | "glossary"
  | "cheatsheet"
  | "audio"
  | "quiz";

function App() {
  const [view, setView] = useState<View>("dashboard");
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const { theme, toggleTheme } = useTheme();

  function startQuiz(config: QuizConfig) {
    setQuizConfig(config);
    setView("quiz");
  }

  function exitQuiz() {
    setQuizConfig(null);
    setView("dashboard");
  }

  function renderView() {
    switch (view) {
      case "dashboard":
        return <Dashboard onNavigate={setView} />;
      case "modules":
        return <ModuleSelect onStart={startQuiz} />;
      case "exam":
        return <ExamIntro onStart={startQuiz} />;
      case "mistakes":
        return <MistakesBank onStart={startQuiz} />;
      case "analytics":
        return <Analytics />;
      case "glossary":
        return <Glossary />;
      case "cheatsheet":
        return <CheatSheet />;
      case "audio":
        return <AudioCoach />;
      case "quiz":
        return quizConfig ? (
          <QuizContainer config={quizConfig} onExit={exitQuiz} />
        ) : (
          <Dashboard onNavigate={setView} />
        );
    }
  }

  return (
    <StatsProvider>
      <div
        className="flex min-h-screen flex-col md:flex-row"
        style={{ background: "var(--paper)" }}
      >
        <Sidebar
          view={view}
          onNavigate={setView}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <main className="flex-1 overflow-y-auto p-6 md:p-10">{renderView()}</main>
        <PomodoroWidget />
      </div>
    </StatsProvider>
  );
}

export default App;
