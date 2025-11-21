// TODO: Needs Refactoring
import { Menu, Sparkles, X } from "lucide-react";

import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleGetStarted = () => {
    navigate(`/${ROUTES.APP}`);
  };

  const handleLogout = () => {
    navigate("");
    setTimeout(() => {
      logout();
    }, 100);
  };

  const displayName = user?.name || "Alex";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="z-50 border-b border-border backdrop-blur-sm sticky top-0 w-full bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-onaccent" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-fg">
              /interro-ai
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted">
                  Hi,{" "}
                  <span className="font-semibold text-fg">{displayName}</span>
                </span>
                <button
                  className="px-6 py-2 rounded-lg bg-accent text-onaccent font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="px-6 py-2 rounded-lg bg-accent text-onaccent font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            )}
            {ThemeToggle && <ThemeToggle />}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 sm:hidden">
            {ThemeToggle && <ThemeToggle />}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-surface transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-fg" />
              ) : (
                <Menu className="w-6 h-6 text-fg" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4 border-t border-border">
            {isAuthenticated ? (
              <>
                <div className="px-2">
                  <span className="text-sm text-muted">
                    Hi,{" "}
                    <span className="font-semibold text-fg">{displayName}</span>
                  </span>
                </div>
                <button
                  className="w-full px-6 py-3 rounded-lg bg-accent text-onaccent font-semibold hover:shadow-lg transition-all duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="w-full px-6 py-3 rounded-lg bg-accent text-onaccent font-semibold hover:shadow-lg transition-all duration-300"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
