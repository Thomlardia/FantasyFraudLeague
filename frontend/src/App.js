import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./auth/AuthProvider";
import { WalletProvider } from "./contexts/WalletContext";
import { DefenseProvider } from "./contexts/DefenseContext";
import { LeaderboardProvider } from "./contexts/LeaderboardContext";
import { AttackProvider } from "./contexts/AttackContext";
import { FilterProvider } from "./contexts/FilterContext";
import AppRoutes from "./routes/AppRoutes";
import Prefetcher from "./routes/Prefetcher";
import MatrixBackgroundLayer from "./components/MatrixBackgroundLayer";
import { initGA, usePageTracking } from "./analytics/GoogleAnalytics";
import { reportWebVitals } from "./analytics/PerformanceMonitoring";
import "./App.css";
import "./styles/ui.css";
import "./styles/shopAndWiki.css";
import "./styles/navigationPanel.css";

// Inner component to use the hook inside BrowserRouter
function AnalyticsWrapper() {
  usePageTracking();
  return (
    <>
      <MatrixBackgroundLayer />
      <Prefetcher />
      <AppRoutes />
    </>
  );
}

export default function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();

    // Initialize Firebase Performance Monitoring with Web Vitals
    reportWebVitals();
  }, []);

  return (
    <AuthProvider>
      <WalletProvider>
        <DefenseProvider>
          <LeaderboardProvider>
            <AttackProvider>
              <FilterProvider>
                <BrowserRouter>
                  <AnalyticsWrapper />
                </BrowserRouter>
              </FilterProvider>
            </AttackProvider>
          </LeaderboardProvider>
        </DefenseProvider>
      </WalletProvider>
    </AuthProvider>
  );
}
