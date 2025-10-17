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

export default function RequireRole({ role }) {
  const { initializing, hasRole } = useAuth();
  const location = useLocation();

  if (initializing) return <LoadingSpinner />;
  if (!hasRole(role)) return <Navigate to="/home" replace state={{ from: location }} />;
  return <Outlet />;
}
