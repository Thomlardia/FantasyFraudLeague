import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';
import fflLogo from '../images/ffl_logo_ghost.png';

function FraudWiki() {
    const fraudItems = [
        { title: "Phishing", icon: "phishing", path: "/frauds/Phishing" },
        { title: "Ransomware", icon: "lock_person", path: "/frauds/Ransomware" },
        { title: "Distributed Denial of Service (DDoS)", icon: "cloud_off", path: "/frauds/Ddos" },
        { title: "Deepfake Fraud", icon: "theater_comedy", path: "/frauds/Deepfake" },
        { title: "ATM Skimming", icon: "card_membership", path: "/frauds/AtmSkimming" },
        { title: "Insider Fraud", icon: "person_alert", path: "/frauds/InsiderFraud" },
        { title: "Man-In-The-Middle", icon: "hub", path: "/frauds/ManInTheMiddle" },
        { title: "SQL Injection", icon: "code", path: "/frauds/SqlInjection" },
        { title: "Business Email Compromise", icon: "email", path: "/frauds/BusinessEmailCompromise" },
        { title: "Zero-Day Exploit", icon: "bug_report", path: "/frauds/ZeroDayExploit" },
        { title: "Vishing", icon: "phone_in_talk", path: "/frauds/Vishing" },
        { title: "XSS (Cross-Site Scripting)", icon: "web_asset_off", path: "/frauds/Xss" },
        { title: "Account Takeover", icon: "no_accounts", path: "/frauds/AccountTakeover" },
        { title: "Investment Scams", icon: "trending_up", path: "/frauds/InvestmentScam" },
        { title: "SIM Swap Fraud", icon: "sim_card_alert", path: "/frauds/SimSwap" },
        { title: "Authorized Push Payments", icon: "payment", path: "/frauds/AuthPushPayments" },
        { title: "Cryptojacking", icon: "memory", path: "/frauds/CryptoJacking" },
        { title: "Brute Force – Credential Stuffing", icon: "lock_open", path: "/frauds/BruteForce" },
        { title: "Synthetic Identity Theft", icon: "person_add_disabled", path: "/frauds/SyntIdentityTheft" },
        { title: "Accounting and Invoice Fraud", icon: "receipt_long", path: "/frauds/AccAndInvFraud" }
    ];

    return (
        <div className="shop-wiki-container">
            <div className="shop-wiki-header">
                <Link to="/home" className="back-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                
                <h1 className="shop-wiki-title">
                    <img src={fflLogo} alt="FFL Shield Logo" className="title-icon" />
                    Fraud Wiki
                </h1>
                
                <div style={{ width: "48px" }}></div> {/* Spacer for centering */}
            </div>
            
            <div className="shop-wiki-grid">
                {fraudItems.map((item, index) => (
                    <Link key={index} to={item.path} className="wiki-card">
                        <span className="card-icon">{item.icon}</span>
                        <h3 className="card-title">{item.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default FraudWiki;