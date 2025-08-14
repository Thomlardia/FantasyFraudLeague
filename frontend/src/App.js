import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Hello from './pages/Hello';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import DefenseShop from './pages/DefenseShop';
import FraudWiki from './pages/FraudWiki';
import Help from './pages/Help';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';

// DEFENSES
import MultiFactorAuth from './pages/defenses/MultiFactorAuth';
import UserEducation from './pages/defenses/UserEducation';
import RegularAudits from './pages/defenses/RegularAudits';
import NetworkMonitoring from './pages/defenses/NetworkMonitoring';
import SegregationOfDuties from './pages/defenses/SegregationOfDuties';
import InputValidation from './pages/defenses/InputValidation';
import PrincipleOfLeastPrivilege from './pages/defenses/PrincipleOfLeastPrivilege';
import RegularPasswordChanges from './pages/defenses/RegularPasswordChanges';
import EmailFiltering from './pages/defenses/EmailFiltering';
import RegulatedAutoBackup from './pages/defenses/RegulatedAutoBackup';
import KeepUpdated from './pages/defenses/KeepUpdated';
import DdosProtection from './pages/defenses/DdosProtection';
import TrafficFiltering from './pages/defenses/TrafficFiltering';
import VerificationProtocols from './pages/defenses/VerificationProtocols';
import DeepfakeDetection from './pages/defenses/DeepfakeDetection';
import AtmInspections from './pages/defenses/AtmInspections';
import TamperProofSeals from './pages/defenses/TamperProofSeals';
import BackgroundChecks from './pages/defenses/BackgroundChecks';
import HttpsAndEncryption from './pages/defenses/HttpsAndEncryption';
import VpnUsage from './pages/defenses/VpnUsage'; 

// FRAUDS
import Phishing from './pages/frauds/Phishing';
import Ransomware from './pages/frauds/Ransomware';
import Ddos from './pages/frauds/Ddos';
import Deepfake from './pages/frauds/Deepfake';
import AtmSkimming from './pages/frauds/AtmSkimming';
import InsiderFraud from './pages/frauds/InsiderFraud';
import ManInTheMiddle from './pages/frauds/ManInTheMiddle';
import SqlInjection from './pages/frauds/SqlInjection';
import BusinessEmailCompromise from './pages/frauds/BusinessEmailCompromise';
import ZeroDayExploit from './pages/frauds/ZeroDayExploit';
import Vishing from './pages/frauds/Vishing';
import Xss from './pages/frauds/Xss';
import AccountTakeover from './pages/frauds/AccountTakeover';
import InvestmentScam from './pages/frauds/InvestmentScam';
import SimSwap from './pages/frauds/SimSwap';
import AuthPushPayments from './pages/frauds/AuthPushPayments';
import CryptoJacking from './pages/frauds/CryptoJacking';
import BruteForce from './pages/frauds/BruteForce';
import SyntIdentityTheft from './pages/frauds/SyntIdentityTheft';
import AccAndInvFraud from './pages/frauds/AccAndInvFraud';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/defenseshop" element={<DefenseShop />} />
        <Route path="/fraudwiki" element={<FraudWiki />} />
        <Route path="/help" element={<Help />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings />} />


        <Route path="defenses/MultiFactorAuth" element={<MultiFactorAuth />} />
        <Route path="defenses/UserEducation" element={<UserEducation />} />
        <Route path="defenses/RegularAudits" element={<RegularAudits />} />
        <Route path="defenses/NetworkMonitoring" element={<NetworkMonitoring />} />
        <Route path="defenses/SegregationOfDuties" element={<SegregationOfDuties />} />
        <Route path="defenses/InputValidation" element={<InputValidation />} />
        <Route path="defenses/PrincipleOfLeastPrivilege" element={<PrincipleOfLeastPrivilege />} />
        <Route path="defenses/RegularPasswordChanges" element={<RegularPasswordChanges />} />
        <Route path="defenses/EmailFiltering" element={<EmailFiltering />} />
        <Route path="defenses/RegulatedAutoBackup" element={<RegulatedAutoBackup />} />
        <Route path="defenses/KeepUpdated" element={<KeepUpdated />} />
        <Route path="defenses/DdosProtection" element={<DdosProtection />} />
        <Route path="defenses/TrafficFiltering" element={<TrafficFiltering />} />
        <Route path="defenses/VerificationProtocols" element={<VerificationProtocols />} />
        <Route path="defenses/DeepfakeDetection" element={<DeepfakeDetection />} />
        <Route path="defenses/AtmInspections" element={<AtmInspections />} />
        <Route path="defenses/TamperProofSeals" element={<TamperProofSeals />} />
        <Route path="defenses/BackgroundChecks" element={<BackgroundChecks />} />
        <Route path="defenses/HttpsAndEncryption" element={<HttpsAndEncryption />} />
        <Route path="defenses/VpnUsage" element={<VpnUsage />} />

        <Route path="frauds/Phishing" element={<Phishing />} />
        <Route path="frauds/Ransomware" element={<Ransomware />} />
        <Route path="frauds/Ddos" element={<Ddos />} />
        <Route path="frauds/Deepfake" element={<Deepfake />} />
        <Route path="frauds/AtmSkimming" element={<AtmSkimming />} />
        <Route path="frauds/InsiderFraud" element={<InsiderFraud />} />
        <Route path="frauds/ManInTheMiddle" element={<ManInTheMiddle />} />
        <Route path="frauds/SqlInjection" element={<SqlInjection />} />
        <Route path="frauds/BusinessEmailCompromise" element={<BusinessEmailCompromise />} />
        <Route path="frauds/ZeroDayExploit" element={<ZeroDayExploit />} />
        <Route path="frauds/Vishing" element={<Vishing />} />
        <Route path="frauds/Xss" element={<Xss />} />
        <Route path="frauds/AccountTakeover" element={<AccountTakeover />} />
        <Route path="frauds/InvestmentScam" element={<InvestmentScam />} />
        <Route path="frauds/SimSwap" element={<SimSwap />} />
        <Route path="frauds/AuthPushPayments" element={<AuthPushPayments />} />
        <Route path="frauds/CryptoJacking" element={<CryptoJacking />} />
        <Route path="frauds/BruteForce" element={<BruteForce />} />
        <Route path="frauds/SyntIdentityTheft" element={<SyntIdentityTheft />} />
        <Route path="frauds/AccAndInvFraud" element={<AccAndInvFraud />} />
      </Routes>
    </Router>
  );
}

export default App;

