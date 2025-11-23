import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";

const ThemeToggle = ({ size = "lg" }) => {
  const { toggleTheme, isDark } = useTheme();
  const paddingClass = size === "sm" ? "p-2" : "xsmd:p-3 p-2";
  const iconSizeClass = size === "sm" ? "w-5 h-5" : "xsmd:w-6 xsmd:h-6 w-5 h-5";
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
