import { Link } from 'react-router-dom';

function DefenseShop() {
    return (
        <div>
            <h1>DefenseShop</h1>
            <Link to="/home">BACK</Link>
            <br />

            <Link to="/defenses/MultiFactorAuth">MultiFactorAuth</Link>
            <br />
            <Link to="/defenses/UserEducation">UserEducation</Link>
            <br />
            <Link to="/defenses/RegularAudits">RegularAudits</Link>
            <br />
            <Link to="/defenses/NetworkMonitoring">NetworkMonitoring</Link>
            <br />
            <Link to="/defenses/SegregationOfDuties">SegregationOfDuties</Link>
            <br />
            <Link to="/defenses/InputValidation">InputValidation</Link>
            <br />
            <Link to="/defenses/PrincipleOfLeastPrivilege">PrincipleOfLeastPrivilege</Link>
            <br />
            <Link to="/defenses/RegularPasswordChanges">RegularPasswordChanges</Link>
            <br />
            <Link to="/defenses/EmailFiltering">EmailFiltering</Link>
            <br />
            <Link to="/defenses/RegulatedAutoBackup">RegulatedAutoBackup</Link>
            <br />
            <Link to="/defenses/KeepUpdated">KeepUpdated</Link>
            <br />
            <Link to="/defenses/DdosProtection">DdosProtection</Link>
            <br />
            <Link to="/defenses/TrafficFiltering">TrafficFiltering</Link>
            <br />
            <Link to="/defenses/VerificationProtocols">VerificationProtocols</Link>
            <br />
            <Link to="/defenses/DeepfakeDetection">DeepfakeDetection</Link>
            <br />
            <Link to="/defenses/AtmInspections">AtmInspections</Link>
            <br />
            <Link to="/defenses/TamperProofSeals">TamperProofSeals</Link>
            <br />
            <Link to="/defenses/BackgroundChecks">BackgroundChecks</Link>
            <br />
            <Link to="/defenses/HttpsAndEncryption">HttpsAndEncryption</Link>
            <br />
            <Link to="/defenses/VpnUsage">VpnUsage</Link>
        </div>
    );
}

export default DefenseShop;