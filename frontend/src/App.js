import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { WalletProvider } from "./contexts/WalletContext";
import { DefenseProvider } from "./contexts/DefenseContext";
import { LeaderboardProvider } from "./contexts/LeaderboardContext";
import AppRoutes from "./routes/AppRoutes";
import Prefetcher from "./routes/Prefetcher";
import "./App.css";
import "./styles/ui.css";
import "./styles/shopAndWiki.css";

export default function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <DefenseProvider>
          <LeaderboardProvider>
            <BrowserRouter>
              <Prefetcher />
              <AppRoutes />
            </BrowserRouter>
          </LeaderboardProvider>
        </DefenseProvider>
      </WalletProvider>
    </AuthProvider>
  );
}
