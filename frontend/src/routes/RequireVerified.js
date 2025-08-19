// routes/RequireVerified.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function RequireVerified() {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return <div>Loading…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  // allow the verify page to render without looping
  if (!user.emailVerified && location.pathname !== "/verify-email") {
    return <Navigate to="/verify-email" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

