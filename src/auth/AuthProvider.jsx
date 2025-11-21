import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("auth_token"));
  });

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "auth_token") setIsAuthenticated(Boolean(e.newValue));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = (token) => {
    localStorage.setItem("auth_token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
