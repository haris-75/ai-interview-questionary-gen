import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";

const ThemeToggle = ({ size = "lg" }) => {
  const { toggleTheme, isDark } = useTheme();
  const paddingClass = size === "sm" ? "p-2" : "p-3";
  const iconSizeClass = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  return (
    <button
      onClick={toggleTheme}
      className={
        " rounded-full shadow-lg transition-all z-50 bg-surface text-fg hover:bg-elevated border border-border focus:outline-none focus:ring-2 focus:ring-ring" +
        ` ${paddingClass}`
      }
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className={`${iconSizeClass}`} />
      ) : (
        <Moon className={`${iconSizeClass}`} />
      )}
    </button>
  );
};

export default ThemeToggle;
