import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

/** Remember to keep in sync with lazy() paths in AppRoutes.js */
const PRELOAD_TARGETS = [
  () => import("../pages/Home"),
  () => import("../pages/DefenseShop"),
  () => import("../pages/Help"),
  () => import("../pages/Settings"),
  () => import("../pages/Leaderboard"),
  () => import("../pages/FraudWiki"),
];

export default function PreloadOnAuth() {
  const did = useRef(false);
  const didAdmin = useRef(false);
  const { hasRole } = useAuth();

  useEffect(() => {
    if (did.current) return;
    did.current = true;

    const preload = () => {
      // fire-and-forget: import() results are cached for React.lazy to reuse
      Promise.allSettled(PRELOAD_TARGETS.map(fn => fn()));
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(preload);
    } else {
      setTimeout(preload, 0);
    }
  }, []);

  // Preload admin dashboard only for admins
  useEffect(() => {
    if (didAdmin.current) return;
    if (!hasRole || !hasRole("admin")) return;
    didAdmin.current = true;

    const preloadAdmin = () => {
      import("../pages/AdminDashboard");
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(preloadAdmin);
    } else {
      setTimeout(preloadAdmin, 0);
    }
  }, [hasRole]);

  // must render an Outlet so this can act as a route wrapper
  return <Outlet />;
}
