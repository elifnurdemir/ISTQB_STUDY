import { useEffect, useState } from "react";
import { loadJSON, saveJSON, STORAGE_KEYS } from "../lib/storage";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const stored = loadJSON<Theme | null>(STORAGE_KEYS.theme, null);
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    saveJSON(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}
