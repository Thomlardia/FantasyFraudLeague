import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { WalletProvider } from "./contexts/WalletContext";
import { DefenseProvider } from "./contexts/DefenseContext";
import { LeaderboardProvider } from "./contexts/LeaderboardContext";
import { AttackProvider } from "./contexts/AttackContext";
import AppRoutes from "./routes/AppRoutes";
import Prefetcher from "./routes/Prefetcher";
import MatrixBackgroundLayer from "./components/MatrixBackgroundLayer";
import "./App.css";
import "./styles/ui.css";
import "./styles/shopAndWiki.css";
import "./styles/navigationPanel.css";

export default function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <DefenseProvider>
          <LeaderboardProvider>
            <AttackProvider>
              <BrowserRouter>
                <MatrixBackgroundLayer />
                <Prefetcher />
                <AppRoutes />
              </BrowserRouter>
            </AttackProvider>
          </LeaderboardProvider>
        </DefenseProvider>
      </WalletProvider>
    </AuthProvider>
  );
}
