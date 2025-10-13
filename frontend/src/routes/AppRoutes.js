import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import RequireAuth from "./RequireAuth";
import RequireVerified from "./RequireVerified";
import PreloadOnAuth from "./PreloadOnAuth";
import RequireRole from "./RequireRole";

// --- Eager (small, first-touch) ---
import Hello from "../pages/Hello";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

// --- Lazy (everything else) ---
// verification if needed
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));

// only load if relevant
const Home = lazy(() => import("../pages/Home"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const UserManagement = lazy(() => import("../pages/UserManagement"));

// player related main pages
const DefenseShop   = lazy(() => import("../pages/DefenseShop"));
const Help          = lazy(() => import("../pages/Help"));
const Settings      = lazy(() => import("../pages/Settings"));

// shared pages
const Leaderboard   = lazy(() => import("../pages/Leaderboard"));
const FraudWiki     = lazy(() => import("../pages/FraudWiki"));

// DEFENSES (lazy)
const MultiFactorAuth           = lazy(() => import("../pages/defenses/MultiFactorAuth"));
const UserEducation             = lazy(() => import("../pages/defenses/UserEducation"));
const RegularAudits             = lazy(() => import("../pages/defenses/RegularAudits"));
const NetworkMonitoring         = lazy(() => import("../pages/defenses/NetworkMonitoring"));
const SegregationOfDuties       = lazy(() => import("../pages/defenses/SegregationOfDuties"));
const InputValidation           = lazy(() => import("../pages/defenses/InputValidation"));
const PrincipleOfLeastPrivilege = lazy(() => import("../pages/defenses/PrincipleOfLeastPrivilege"));
const RegularPasswordChanges    = lazy(() => import("../pages/defenses/RegularPasswordChanges"));
const EmailFiltering            = lazy(() => import("../pages/defenses/EmailFiltering"));
const RegulatedAutoBackup       = lazy(() => import("../pages/defenses/RegulatedAutoBackup"));
const KeepUpdated               = lazy(() => import("../pages/defenses/KeepUpdated"));
const DdosProtection            = lazy(() => import("../pages/defenses/DdosProtection"));
const TrafficFiltering          = lazy(() => import("../pages/defenses/TrafficFiltering"));
const VerificationProtocols     = lazy(() => import("../pages/defenses/VerificationProtocols"));
const DeepfakeDetection         = lazy(() => import("../pages/defenses/DeepfakeDetection"));
const AtmInspections            = lazy(() => import("../pages/defenses/AtmInspections"));
const BackgroundChecks          = lazy(() => import("../pages/defenses/BackgroundChecks"));
const HttpsAndEncryption        = lazy(() => import("../pages/defenses/HttpsAndEncryption"));
const VpnUsage                  = lazy(() => import("../pages/defenses/VpnUsage"));
const ApplicationSandboxing     = lazy(() => import("../pages/defenses/ApplicationSandboxing"));

// FRAUDS (lazy)
const Phishing                  = lazy(() => import("../pages/frauds/Phishing"));
const Ransomware                = lazy(() => import("../pages/frauds/Ransomware"));
const Ddos                      = lazy(() => import("../pages/frauds/Ddos"));
const Deepfake                  = lazy(() => import("../pages/frauds/Deepfake"));
const AtmSkimming               = lazy(() => import("../pages/frauds/AtmSkimming"));
const InsiderFraud              = lazy(() => import("../pages/frauds/InsiderFraud"));
const ManInTheMiddle            = lazy(() => import("../pages/frauds/ManInTheMiddle"));
const SqlInjection              = lazy(() => import("../pages/frauds/SqlInjection"));
const BusinessEmailCompromise   = lazy(() => import("../pages/frauds/BusinessEmailCompromise"));
const ZeroDayExploit            = lazy(() => import("../pages/frauds/ZeroDayExploit"));
const Vishing                   = lazy(() => import("../pages/frauds/Vishing"));
const Xss                       = lazy(() => import("../pages/frauds/Xss"));
const AccountTakeover           = lazy(() => import("../pages/frauds/AccountTakeover"));
const InvestmentScam            = lazy(() => import("../pages/frauds/InvestmentScam"));
const SimSwap                   = lazy(() => import("../pages/frauds/SimSwap"));
const AuthPushPayments          = lazy(() => import("../pages/frauds/AuthPushPayments"));
const CryptoJacking             = lazy(() => import("../pages/frauds/CryptoJacking"));
const BruteForce                = lazy(() => import("../pages/frauds/BruteForce"));
const SyntIdentityTheft         = lazy(() => import("../pages/frauds/SyntIdentityTheft"));
const AccAndInvFraud            = lazy(() => import("../pages/frauds/AccAndInvFraud"));

const NotFound = () => <div className="simple-page simple-page--centered">404 — Not Found</div>;

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Hello />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private (guarded) */}
        <Route element={<RequireAuth />}>
          <Route element={<PreloadOnAuth />}>
            <Route path="/verify-email" element={<VerifyEmail />} />
              <Route element={<RequireVerified />}>

                {/* ADMIN-only routes */}
                <Route element={<RequireRole role="admin" />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<UserManagement />} />
                </Route>

                {/* Normal app routes (no auto-redirect for admins) */}
                <Route path="/home" element={<Home />} />
                <Route path="/defenseshop" element={<DefenseShop />} />
                <Route path="/fraudwiki" element={<FraudWiki />} />                                                     
                <Route path="/help" element={<Help />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/settings" element={<Settings />} />

                {/* DEFENSES */}
                <Route path="/defenses/MultiFactorAuth" element={<MultiFactorAuth />} />
                <Route path="/defenses/UserEducation" element={<UserEducation />} />
                <Route path="/defenses/RegularAudits" element={<RegularAudits />} />
                <Route path="/defenses/NetworkMonitoring" element={<NetworkMonitoring />} />
                <Route path="/defenses/SegregationOfDuties" element={<SegregationOfDuties />} />
                <Route path="/defenses/InputValidation" element={<InputValidation />} />
                <Route path="/defenses/PrincipleOfLeastPrivilege" element={<PrincipleOfLeastPrivilege />} />
                <Route path="/defenses/RegularPasswordChanges" element={<RegularPasswordChanges />} />
                <Route path="/defenses/EmailFiltering" element={<EmailFiltering />} />
                <Route path="/defenses/RegulatedAutoBackup" element={<RegulatedAutoBackup />} />
                <Route path="/defenses/KeepUpdated" element={<KeepUpdated />} />
                <Route path="/defenses/DdosProtection" element={<DdosProtection />} />
                <Route path="/defenses/TrafficFiltering" element={<TrafficFiltering />} />
                <Route path="/defenses/VerificationProtocols" element={<VerificationProtocols />} />
                <Route path="/defenses/DeepfakeDetection" element={<DeepfakeDetection />} />
                <Route path="/defenses/AtmInspections" element={<AtmInspections />} />
                <Route path="/defenses/BackgroundChecks" element={<BackgroundChecks />} />
                <Route path="/defenses/HttpsAndEncryption" element={<HttpsAndEncryption />} />
                <Route path="/defenses/VpnUsage" element={<VpnUsage />} />
                <Route path="/defenses/ApplicationSandboxing" element={<ApplicationSandboxing />} />

                {/* FRAUDS */}
                <Route path="/frauds/Phishing" element={<Phishing />} />
                <Route path="/frauds/Ransomware" element={<Ransomware />} />
                <Route path="/frauds/Ddos" element={<Ddos />} />
                <Route path="/frauds/Deepfake" element={<Deepfake />} />
                <Route path="/frauds/AtmSkimming" element={<AtmSkimming />} />
                <Route path="/frauds/InsiderFraud" element={<InsiderFraud />} />
                <Route path="/frauds/ManInTheMiddle" element={<ManInTheMiddle />} />
                <Route path="/frauds/SqlInjection" element={<SqlInjection />} />
                <Route path="/frauds/BusinessEmailCompromise" element={<BusinessEmailCompromise />} />
                <Route path="/frauds/ZeroDayExploit" element={<ZeroDayExploit />} />
                <Route path="/frauds/Vishing" element={<Vishing />} />
                <Route path="/frauds/Xss" element={<Xss />} />
                <Route path="/frauds/AccountTakeover" element={<AccountTakeover />} />
                <Route path="/frauds/InvestmentScam" element={<InvestmentScam />} />
                <Route path="/frauds/SimSwap" element={<SimSwap />} />
                <Route path="/frauds/AuthPushPayments" element={<AuthPushPayments />} />
                <Route path="/frauds/CryptoJacking" element={<CryptoJacking />} />
                <Route path="/frauds/BruteForce" element={<BruteForce />} />
                <Route path="/frauds/SyntIdentityTheft" element={<SyntIdentityTheft />} />
                <Route path="/frauds/AccAndInvFraud" element={<AccAndInvFraud />} />
              </Route>
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
