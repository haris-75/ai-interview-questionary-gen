import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") setTheme(stored);
    else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      setTheme("dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
