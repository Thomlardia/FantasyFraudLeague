import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';
import fflLogo from '../images/ffl_logo_ghost.png';
import MoneyBar from '../components/MoneyBar';

function DefenseShop() {
    const defenseItems = [
        { title: "Multi-Factor Authentication (MFA)", icon: "security", path: "/defenses/MultiFactorAuth" },
        { title: "User Education and Training", icon: "school", path: "/defenses/UserEducation" },
        { title: "Regular Audits", icon: "checklist", path: "/defenses/RegularAudits" },
        { title: "Network Monitoring", icon: "network_check", path: "/defenses/NetworkMonitoring" },
        { title: "Segregation of Duties", icon: "group_work", path: "/defenses/SegregationOfDuties" },
        { title: "Input Validation and Sanitization", icon: "filter_alt", path: "/defenses/InputValidation" },
        { title: "Principle of Least Privilege", icon: "lock", path: "/defenses/PrincipleOfLeastPrivilege" },
        { title: "Regular Password Changes", icon: "password", path: "/defenses/RegularPasswordChanges" },
        { title: "Email Filtering and Anti-Phishing Tools", icon: "mark_email_unread", path: "/defenses/EmailFiltering" },
        { title: "Regulated Automated Backups", icon: "backup", path: "/defenses/RegulatedAutoBackup" },
        { title: "Keep Systems and Software Updated", icon: "update", path: "/defenses/KeepUpdated" },
        { title: "DDoS Protection Services", icon: "cloud_queue", path: "/defenses/DdosProtection" },
        { title: "Traffic Filtering", icon: "filter_list", path: "/defenses/TrafficFiltering" },
        { title: "Verification Protocols (Code Words)", icon: "verified", path: "/defenses/VerificationProtocols" },
        { title: "DeepFake Detection Software", icon: "visibility", path: "/defenses/DeepfakeDetection" },
        { title: "ATM Inspections", icon: "card_membership", path: "/defenses/AtmInspections" },
        { title: "Tamper Proof Seals", icon: "verified_user", path: "/defenses/TamperProofSeals" },
        { title: "Background Checks and Regular Screenings", icon: "person_search", path: "/defenses/BackgroundChecks" },
        { title: "Use HTTPS and Encrypted Connections", icon: "https", path: "/defenses/HttpsAndEncryption" },
        { title: "VPN Usage for Remote Connections", icon: "vpn_lock", path: "/defenses/VpnUsage" }
    ];

    return (
        <div className="shop-wiki-container">
            <div className="shop-wiki-header">
                <Link to="/home" className="back-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                
                <h1 className="shop-wiki-title">
                    <img src={fflLogo} alt="FFL Shield Logo" className="title-icon" />
                    Defense Shop
                </h1>
                
                <MoneyBar />
            </div>
            
            <div className="shop-wiki-grid">
                {defenseItems.map((item, index) => (
                    <Link key={index} to={item.path} className="shop-card">
                        <span className="card-icon">{item.icon}</span>
                        <h3 className="card-title">{item.title}</h3>
                        <p className="card-level">Level 1</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default DefenseShop;