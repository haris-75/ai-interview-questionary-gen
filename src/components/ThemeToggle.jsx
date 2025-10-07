import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ toggleTheme, isDark }) => (
  <button
    onClick={toggleTheme}
    className="fixed top-6 right-6 p-3 rounded-full shadow-lg transition-all z-50 bg-surface text-fg hover:bg-elevated border border-border focus:outline-none focus:ring-2 focus:ring-ring"
    aria-label="Toggle theme"
  >
    {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
  </button>
);

export default ThemeToggle;
