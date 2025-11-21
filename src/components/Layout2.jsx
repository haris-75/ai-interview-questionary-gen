// TODO: Needs Refactoring
// Layout2.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Upload,
  User,
  History,
  X,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import ROUTES from "../routes";
import ThemeToggle from "./ThemeToggle";

const Layout2 = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const displayName = user?.name || "Alex Johnson";
  const initials = useMemo(() => {
    return displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("");
  }, [displayName]);

  const handleLogout = () => {
    logout();
    navigate("/"); // go to Home after logout
  };

  const items = [
    {
      key: "resume",
      label: "Generate via resume",
      icon: <Upload className="w-4 h-4" />,
      to: `/${ROUTES.APP}/${ROUTES.SHARE_RESUME}`,
    },
    {
      key: "details",
      label: "Share details",
      icon: <User className="w-4 h-4" />,
      to: `/${ROUTES.APP}/${ROUTES.SHARE_DETAILS}`,
    },
    {
      key: "history",
      label: "See history",
      icon: <History className="w-4 h-4" />,
      to: `/${ROUTES.APP}/${ROUTES.HISTORY}`, // ensure ROUTES.HISTORY exists
    },
  ];

  const isActive = (to) =>
    location.pathname === to || location.pathname.startsWith(to);

  return (
    <div className="h-screen bg-gradient-to-br from-bg to-elevated flex transition-colors duration-300 font-sans overflow-auto">
      {/* Sidebar */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center shadow-lg hover:bg-elevated transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-fg" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-fg/20 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          flex flex-col border-r border-border bg-main backdrop-blur-sm
          transition-all duration-300 ease-in-out
          ${collapsed ? "lg:w-16" : "lg:w-64"}
          ${
            mobileOpen
              ? "w-64 translate-x-0"
              : "w-64 -translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-elevated transition-colors flex items-center justify-center"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-muted" />
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="hidden lg:flex absolute -right-3 top-4 z-10 w-6 h-6 rounded-full bg-surface border border-border items-center justify-center shadow-sm cursor-pointer hover:bg-elevated transition-all duration-300 hover:scale-110"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-muted" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted" />
          )}
        </button>

        {/* Sidebar header */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
            <Menu className="w-4 h-4 text-onaccent" />
          </div>
          <div
            className={`flex flex-col overflow-hidden transition-all duration-300 ${
              collapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
            }`}
          >
            <span className="text-sm font-semibold text-fg whitespace-nowrap">
              /interro-ai
            </span>
            <span className="text-xs text-muted whitespace-nowrap">
              Interview workspace
            </span>
          </div>
        </div>

        {/* Primary actions (top) */}
        <nav className="mt-4 px-2 space-y-1 flex-1 overflow-y-auto">
          {items.map((item, index) => {
            const active = isActive(item.to);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => navigate(item.to)}
                className={`
                  group relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium 
                  transition-all duration-300
                  ${
                    active
                      ? "bg-accent text-onaccent shadow-md"
                      : "text-fg hover:bg-elevated hover:translate-x-1"
                  }
                `}
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
                }}
              >
                <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    collapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
                  }`}
                >
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="hidden lg:block absolute left-full ml-2 px-3 py-1.5 bg-elevated border border-border rounded-lg text-sm font-medium text-fg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                    {item.label}
                    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-elevated border-l border-b border-border transform -translate-y-1/2 rotate-45" />
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom section: profile + theme */}
        <div className="px-3 pb-4 pt-3 border-t border-border">
          <div
            className={`flex gap-3 items-center transition-all duration-300 ${
              collapsed ? "lg:flex-col" : "flex-row"
            }`}
          >
            {/* Profile + logout */}
            <div
              className={`flex items-center gap-3 ${
                collapsed ? "lg:flex-col lg:gap-2" : ""
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-elevated flex items-center justify-center text-xs font-semibold text-fg border border-border flex-shrink-0 transition-transform duration-300 hover:scale-110">
                {initials}
              </div>
              <div
                className={`flex flex-col overflow-hidden transition-all duration-300 ${
                  collapsed
                    ? "lg:w-0 lg:opacity-0 lg:hidden"
                    : "w-auto opacity-100"
                }`}
              >
                <span className="text-sm font-medium text-fg whitespace-nowrap">
                  {displayName}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs text-muted hover:text-error-text transition-colors text-left whitespace-nowrap"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Theme toggle */}
            <div
              className={`transition-all duration-300 ${
                collapsed ? "lg:mt-0" : "ml-auto"
              }`}
            >
              {ThemeToggle ? <ThemeToggle size="sm" /> : <DemoThemeToggle />}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout2;
