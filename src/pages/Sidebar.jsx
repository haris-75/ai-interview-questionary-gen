import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

import ThemeToggle from "../components/ThemeToggle";
import { NAV_ITEMS } from "../constants";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getUserDetails } from "../utils";

const SidebarHeader = ({ collapsed }) => (
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
);

const NavTooltip = ({ label }) => (
  <div className="hidden lg:block absolute left-full ml-2 px-3 py-1.5 bg-elevated border border-border rounded-lg text-sm font-medium text-fg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
    {label}
    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-elevated border-l border-b border-border transform -translate-y-1/2 rotate-45" />
  </div>
);

const SidebarNavItem = ({ item, index, collapsed, isActive }) => {
  const navigate = useNavigate();
  const active = isActive(item.to);
  const Icon = item.icon;
  const onNavigate = () => navigate(item.to);

  return (
    <button
      type="button"
      onClick={onNavigate}
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
        <Icon className="w-4 h-4" />
      </span>
      <span
        className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
          collapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
        }`}
      >
        {item.label}
      </span>
      {collapsed && <NavTooltip label={item.label} />}
    </button>
  );
};

const SidebarFooter = ({
  collapsed,
  initials,
  displayName,
  onLogout,
  pictureUrl,
}) => (
  <div className="px-3 pb-4 pt-3 border-t border-border">
    <div
      className={`flex gap-3 items-center transition-all duration-300 ${
        collapsed ? "lg:flex-col" : "flex-row"
      }`}
    >
      <div
        className={`flex gap-3 items-center transition-all duration-300 ${
          collapsed ? "lg:flex-col" : "flex-row"
        }`}
      >
        <div className="w-9 h-9 rounded-full bg-elevated flex items-center justify-center text-xs font-semibold text-fg border border-border flex-shrink-0 transition-transform duration-300 hover:scale-110 overflow-hidden">
          {pictureUrl ? (
            <img
              src={pictureUrl}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div
          className={`flex flex-col overflow-hidden transition-all duration-300 ${
            collapsed ? "lg:w-0 lg:opacity-0 lg:hidden" : "w-auto opacity-100"
          }`}
        >
          <span className="text-sm font-medium text-fg whitespace-nowrap">
            {displayName}
          </span>
          <button
            type="button"
            onClick={onLogout}
            className="text-xs text-muted hover:text-error-text transition-colors text-left whitespace-nowrap"
          >
            Logout
          </button>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ${
          collapsed ? "lg:mt-0" : "ml-auto"
        }`}
      >
        <ThemeToggle size="sm" />
      </div>
    </div>
  </div>
);

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const user = useMemo(() => getUserDetails(), []);

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
    navigate("/");
  };

  const isActive = (to) =>
    location.pathname === to || location.pathname.startsWith(to);

  const onOpen = () => setMobileOpen(true);
  const onClose = () => setMobileOpen(false);

  const onToggleCollapse = () => setCollapsed((c) => !c);

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center shadow-lg hover:bg-elevated transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-fg" />
      </button>
      {mobileOpen ? (
        <div
          className="lg:hidden fixed inset-0 bg-fg/20 backdrop-blur-sm z-40 animate-fade-in"
          onClick={onClose}
        />
      ) : null}
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
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-elevated transition-colors flex items-center justify-center"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-muted" />
        </button>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:flex absolute -right-3 top-4 z-10 w-6 h-6 rounded-full bg-surface border border-border items-center justify-center shadow-sm cursor-pointer hover:bg-elevated transition-all duration-300 hover:scale-110"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-muted" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted" />
          )}
        </button>
        <SidebarHeader collapsed={collapsed} />
        <nav className="mt-4 px-2 space-y-1 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item, index) => (
            <SidebarNavItem
              key={item.key}
              item={item}
              index={index}
              collapsed={collapsed}
              isActive={isActive}
            />
          ))}
        </nav>
        <SidebarFooter
          collapsed={collapsed}
          displayName={displayName}
          initials={initials}
          onLogout={handleLogout}
          pictureUrl={user?.picture}
        />
      </aside>
    </>
  );
};

export default Sidebar;
