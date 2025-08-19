import { useEffect } from "react";

// dynamic imports must mirror the lazy() paths in AppRoutes.js
const prefetchFraudWiki   = () => import("../pages/FraudWiki");
const prefetchDefenseShop = () => import("../pages/DefenseShop");

export default function Prefetcher() {
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest?.("a");
      if (!a) return;

      try {
        const url = new URL(a.href, window.location.origin);
        const path = url.pathname;
        if (path === "/fraudwiki") prefetchFraudWiki();
        if (path === "/defenseshop") prefetchDefenseShop();
      } catch {/* ignore */}
    };

    document.addEventListener("pointerover", handler, { passive: true });
    document.addEventListener("focusin", handler);
    return () => {
      document.removeEventListener("pointerover", handler);
      document.removeEventListener("focusin", handler);
    };
  }, []);

  return null;
}

