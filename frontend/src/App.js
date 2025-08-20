import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import Prefetcher from "./routes/Prefetcher";
import "./App.css";
import "./styles/ui.css";
import "./styles/shopAndWiki.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Prefetcher />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

