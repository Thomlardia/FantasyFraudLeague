import { useEffect } from "react";

// This only prefetches our small pages
// (Remember to keep this list in sync with lazy() imports in AppRoutes.js)
const prefetchSmall = {
  // --- DEFENSES ---
  "/defenses/MultiFactorAuth":           () => import("../pages/defenses/MultiFactorAuth"),
  "/defenses/UserEducation":             () => import("../pages/defenses/UserEducation"),
  "/defenses/RegularAudits":             () => import("../pages/defenses/RegularAudits"),
  "/defenses/NetworkMonitoring":         () => import("../pages/defenses/NetworkMonitoring"),
  "/defenses/SegregationOfDuties":       () => import("../pages/defenses/SegregationOfDuties"),
  "/defenses/InputValidation":           () => import("../pages/defenses/InputValidation"),
  "/defenses/PrincipleOfLeastPrivilege": () => import("../pages/defenses/PrincipleOfLeastPrivilege"),
  "/defenses/RegularPasswordChanges":    () => import("../pages/defenses/RegularPasswordChanges"),
  "/defenses/EmailFiltering":            () => import("../pages/defenses/EmailFiltering"),
  "/defenses/RegulatedAutoBackup":       () => import("../pages/defenses/RegulatedAutoBackup"),
  "/defenses/KeepUpdated":               () => import("../pages/defenses/KeepUpdated"),
  "/defenses/DdosProtection":            () => import("../pages/defenses/DdosProtection"),
  "/defenses/TrafficFiltering":          () => import("../pages/defenses/TrafficFiltering"),
  "/defenses/VerificationProtocols":     () => import("../pages/defenses/VerificationProtocols"),
  "/defenses/DeepfakeDetection":         () => import("../pages/defenses/DeepfakeDetection"),
  "/defenses/AtmInspections":            () => import("../pages/defenses/AtmInspections"),
  "/defenses/TamperProofSeals":          () => import("../pages/defenses/TamperProofSeals"),
  "/defenses/BackgroundChecks":          () => import("../pages/defenses/BackgroundChecks"),
  "/defenses/HttpsAndEncryption":        () => import("../pages/defenses/HttpsAndEncryption"),
  "/defenses/VpnUsage":                  () => import("../pages/defenses/VpnUsage"),

  // --- FRAUDS ---
  "/frauds/Phishing":                () => import("../pages/frauds/Phishing"),
  "/frauds/Ransomware":              () => import("../pages/frauds/Ransomware"),
  "/frauds/Ddos":                    () => import("../pages/frauds/Ddos"),
  "/frauds/Deepfake":                () => import("../pages/frauds/Deepfake"),
  "/frauds/AtmSkimming":             () => import("../pages/frauds/AtmSkimming"),
  "/frauds/InsiderFraud":            () => import("../pages/frauds/InsiderFraud"),
  "/frauds/ManInTheMiddle":          () => import("../pages/frauds/ManInTheMiddle"),
  "/frauds/SqlInjection":            () => import("../pages/frauds/SqlInjection"),
  "/frauds/BusinessEmailCompromise": () => import("../pages/frauds/BusinessEmailCompromise"),
  "/frauds/ZeroDayExploit":          () => import("../pages/frauds/ZeroDayExploit"),
  "/frauds/Vishing":                 () => import("../pages/frauds/Vishing"),
  "/frauds/Xss":                     () => import("../pages/frauds/Xss"),
  "/frauds/AccountTakeover":         () => import("../pages/frauds/AccountTakeover"),
  "/frauds/InvestmentScam":          () => import("../pages/frauds/InvestmentScam"),
  "/frauds/SimSwap":                 () => import("../pages/frauds/SimSwap"),
  "/frauds/AuthPushPayments":        () => import("../pages/frauds/AuthPushPayments"),
  "/frauds/CryptoJacking":           () => import("../pages/frauds/CryptoJacking"),
  "/frauds/BruteForce":              () => import("../pages/frauds/BruteForce"),
  "/frauds/SyntIdentityTheft":       () => import("../pages/frauds/SyntIdentityTheft"),
  "/frauds/AccAndInvFraud":          () => import("../pages/frauds/AccAndInvFraud"),
};

export default function Prefetcher() {
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest?.("a");
      if (!a) return;

      try {
        const url = new URL(a.href, window.location.origin);
        const path = url.pathname;

        const importer = prefetchSmall[path];
        if (importer) importer(); // import() is cached after first call
      } catch {
        /* ignore */
      }
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
