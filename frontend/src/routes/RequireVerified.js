import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import "../styles/layouts.css";

const LoadingSpinner = () => (
  <div className="page-loading">
    <div className="page-loading-spinner">
      <span className="material-symbols-outlined">hourglass_empty</span>
    </div>
  </div>
);

export default function RequireVerified() {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  // allow the verify page to render without looping
  if (!user.emailVerified && location.pathname !== "/verify-email") {
    return <Navigate to="/verify-email" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

