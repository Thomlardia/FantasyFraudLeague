import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// Initialize Google Analytics
const TRACKING_ID = "G-7J4KVQFZ75";

export function initGA() {
  ReactGA.initialize(TRACKING_ID);
}

// Component to track page views on route changes
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
}

export default ReactGA;
