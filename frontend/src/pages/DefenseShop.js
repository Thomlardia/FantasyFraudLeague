import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';

function DefenseShop() {
    return (
        <div className="shopContainer">
            <h1 className="shopTitle">Defense Shop</h1>
            <Link to="/home" className="backButton">BACK</Link>
            
            <div className="shopGrid">
                <Link to="/defenses/MultiFactorAuth" className="shopCard">Multi-Factor Authentication</Link>
                <Link to="/defenses/UserEducation" className="shopCard">User Education</Link>               
                <Link to="/defenses/RegularAudits" className="shopCard">Regular Audits</Link>
                <Link to="/defenses/NetworkMonitoring" className="shopCard">Network Monitoring</Link>
                <Link to="/defenses/SegregationOfDuties" className="shopCard">Segregation of Duties</Link>
                <Link to="/defenses/InputValidation" className="shopCard">Input Validation</Link>
                <Link to="/defenses/PrincipleOfLeastPrivilege" className="shopCard">Principle of Least Privilege</Link>
                <Link to="/defenses/RegularPasswordChanges" className="shopCard">Regular Password Changes</Link>
                <Link to="/defenses/EmailFiltering" className="shopCard">Email Filtering</Link>
                <Link to="/defenses/RegulatedAutoBackup" className="shopCard">Regulated Auto Backup</Link>
                <Link to="/defenses/KeepUpdated" className="shopCard">Keep Updated</Link>
                <Link to="/defenses/DdosProtection" className="shopCard">DDoS Protection</Link>
                <Link to="/defenses/TrafficFiltering" className="shopCard">Traffic Filtering</Link>
                <Link to="/defenses/VerificationProtocols" className="shopCard">Verification Protocols</Link>
                <Link to="/defenses/DeepfakeDetection" className="shopCard">Deepfake Detection</Link>
                <Link to="/defenses/AtmInspections" className="shopCard">ATM Inspections</Link>
                <Link to="/defenses/TamperProofSeals" className="shopCard">Tamper Proof Seals</Link>
                <Link to="/defenses/BackgroundChecks" className="shopCard">Background Checks</Link>
                <Link to="/defenses/HttpsAndEncryption" className="shopCard">HTTPS & Encryption</Link>
                <Link to="/defenses/VpnUsage" className="shopCard">VPN Usage</Link>
            </div>
        </div>
    );
}

export default DefenseShop;