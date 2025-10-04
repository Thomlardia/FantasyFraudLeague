import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function RequireRole({ role }) {
  const { initializing, hasRole } = useAuth();
  const location = useLocation();

  if (initializing) return <div>Loading…</div>;
  if (!hasRole(role)) return <Navigate to="/home" replace state={{ from: location }} />;
  return <Outlet />;
}
