import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function RequireAuth() {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return <div>Loading…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

