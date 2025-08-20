import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
export default function RequireRole({ role, children }) {
  const { user } = useAuth();
  const hasRole = user?.claims?.roles?.includes(role);
  return hasRole ? children : <Navigate to="/home" replace />;
}
