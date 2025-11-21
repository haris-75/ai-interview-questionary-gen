import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import ROUTES from "../routes";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={`/${ROUTES.SIGNIN}`} replace />;
  }

  return <Outlet />; // all protected children render here
}
