import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';
import fflLogo from '../images/ffl_logo_ghost.png';
import MoneyBar from '../components/MoneyBar';
import { useDefenseOperations } from '../hooks/defenseHooks.js';
import { useDefense } from '../contexts/DefenseContext';

function DefenseShop() {
    const { defenses, loading } = useDefense();

    const defenseItems = [
        { title: "Multi-Factor Authentication (MFA)", icon: "security", path: "/defenses/MultiFactorAuth", id: "mfa" },
        { title: "User Education and Training", icon: "school", path: "/defenses/UserEducation", id: "userEducation" },
        { title: "Regular Audits", icon: "checklist", path: "/defenses/RegularAudits", id: "regularAudits" },
        { title: "Network Monitoring", icon: "network_check", path: "/defenses/NetworkMonitoring", id: "networkMonitoring" },
        { title: "Segregation of Duties", icon: "group_work", path: "/defenses/SegregationOfDuties", id: "segregationOfDuties" },
        { title: "Input Validation and Sanitization", icon: "filter_alt", path: "/defenses/InputValidation", id: "inputValidation" },
        { title: "Principle of Least Privilege", icon: "lock", path: "/defenses/PrincipleOfLeastPrivilege", id: "principleOfLeastPrivilege" },
        { title: "Regular Password Changes", icon: "password", path: "/defenses/RegularPasswordChanges", id: "passwordPolicies" },
        { title: "Email Filtering and Anti-Phishing Tools", icon: "mark_email_unread", path: "/defenses/EmailFiltering", id: "emailFiltering" },
        { title: "Regulated Automated Backups", icon: "backup", path: "/defenses/RegulatedAutoBackup", id: "automatedBackups" },
        { title: "Keep Systems and Software Updated", icon: "update", path: "/defenses/KeepUpdated", id: "keepSoftwareUpdated" },
        { title: "DDoS Protection Services", icon: "cloud_queue", path: "/defenses/DdosProtection", id: "ddosProtection" },
        { title: "Traffic Filtering", icon: "filter_list", path: "/defenses/TrafficFiltering", id: "trafficFiltering" },
        { title: "Verification Protocols (Code Words)", icon: "verified", path: "/defenses/VerificationProtocols", id: "verificationProtocols" },
        { title: "DeepFake Detection Software", icon: "visibility", path: "/defenses/DeepfakeDetection", id: "deepfakeDetection" },
        { title: "ATM Inspections", icon: "card_membership", path: "/defenses/AtmInspections", id: "atmInspection" },
        { title: "Background Checks and Regular Screenings", icon: "person_search", path: "/defenses/BackgroundChecks", id: "backgroundChecks" },
        { title: "Use HTTPS and Encrypted Connections", icon: "https", path: "/defenses/HttpsAndEncryption", id: "httpsEncryption" },
        { title: "VPN Usage for Remote Connections", icon: "vpn_lock", path: "/defenses/VpnUsage", id: "vpnUsage" },
        { title: "Application Sandboxing", icon: "grid_view", path: "/defenses/ApplicationSandboxing", id: "applicationSandboxing" },
    ];


    if (loading) return <p>Loading Defenses...</p>;

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
                
                <div></div>
            </div>
            
            <div className="money-bar-container">
                <MoneyBar />
            </div>
            
            <div className="shop-wiki-grid">
                {defenseItems.map((item, index) => {
                    const myDefense = defenses.find(d => d.defenseId === item.id);
                    const level = myDefense?.displayLevel || 0;
                    const cost = myDefense?.nextActionCost || 0;
                    const isOwned = myDefense?.isOwned || false;

                    return (
                        <Link key={index} to={item.path} className="shop-card">
                            <span className="card-icon">{item.icon}</span>
                            <h3 className="card-title">{item.title}</h3>
                            <div className="card-meta">
                                <p className="card-level">Level {level}</p>
                                <p className="card-cost">${cost.toLocaleString()}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default DefenseShop;