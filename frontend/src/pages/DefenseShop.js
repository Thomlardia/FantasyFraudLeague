import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';

function DefenseShop() {
    return (
        <div className="page">
            <h1 className="shop-title">Defense Shop</h1>
            <Link to="/home" className="icon-button">く</Link>
            
            <div className="shop-grid">
                <Link to="/defenses/MultiFactorAuth" className="shop-card">Multi-Factor Authentication</Link>
                <Link to="/defenses/UserEducation" className="shop-card">User Education</Link>               
                <Link to="/defenses/RegularAudits" className="shop-card">Regular Audits</Link>
                <Link to="/defenses/NetworkMonitoring" className="shop-card">Network Monitoring</Link>
                <Link to="/defenses/SegregationOfDuties" className="shop-card">Segregation of Duties</Link>
                <Link to="/defenses/InputValidation" className="shop-card">Input Validation</Link>
                <Link to="/defenses/PrincipleOfLeastPrivilege" className="shop-card">Principle of Least Privilege</Link>
                <Link to="/defenses/RegularPasswordChanges" className="shop-card">Regular Password Changes</Link>
                <Link to="/defenses/EmailFiltering" className="shop-card">Email Filtering</Link>
                <Link to="/defenses/RegulatedAutoBackup" className="shop-card">Regulated Auto Backup</Link>
                <Link to="/defenses/KeepUpdated" className="shop-card">Keep Updated</Link>
                <Link to="/defenses/DdosProtection" className="shop-card">DDoS Protection</Link>
                <Link to="/defenses/TrafficFiltering" className="shop-card">Traffic Filtering</Link>
                <Link to="/defenses/VerificationProtocols" className="shop-card">Verification Protocols</Link>
                <Link to="/defenses/DeepfakeDetection" className="shop-card">Deepfake Detection</Link>
                <Link to="/defenses/AtmInspections" className="shop-card">ATM Inspections</Link>
                <Link to="/defenses/TamperProofSeals" className="shop-card">Tamper Proof Seals</Link>
                <Link to="/defenses/BackgroundChecks" className="shop-card">Background Checks</Link>
                <Link to="/defenses/HttpsAndEncryption" className="shop-card">HTTPS & Encryption</Link>
                <Link to="/defenses/VpnUsage" className="shop-card">VPN Usage</Link>
            </div>
        </div>
    );
}

export default DefenseShop;