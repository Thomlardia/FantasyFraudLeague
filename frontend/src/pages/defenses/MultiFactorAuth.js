import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function MultiFactorAuth() {
    function getDefenseLevelPLACEHOLDER() {
        return 0; // Starting at level 0
    }

    function getUpgradeCostPLACEHOLDER(currentLevel) {
        const baseCost = 1000;
        return baseCost * (currentLevel + 1); // Cost increases with level
    }

    function handleUpgradePLACEHOLDER() {
        console.log('Upgrading ATM Inspections - upgrade logic not implemented yet');
    }

    const currentLevel = getDefenseLevelPLACEHOLDER();
    const upgradeCost = getUpgradeCostPLACEHOLDER(currentLevel);
    return (
        <div className="shop-container">
            <div className="topbar">
            <div className="topbar-group">
                <Link to="/defenseshop" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
            </div>
            <MoneyBar />
            <div className="topbar-group"></div>
            </div>
            <div className="header">

                <h1>Multi Factor Auth</h1>
                <div></div>
            </div>
            <div className="content-container">
                <div className="description-card">
                    <p>
                        MFA adds layers of security by requiring users to provide two or more verification factors to gain access to accounts or systems. This typically combines something you know (a password) and something you have (phone, app) and something you are (biometric data).
                    </p>
                    <br />
                    <p>
                        <a href="https://csrc.nist.gov/glossary/term/multi_factor_authentication" target="_blank" rel="noopener noreferrer">
                            Reference: Multi-Factor Authentication
                        </a>.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Online banking logins</li>
                            <li>Corporate VPN access</li>
                            <li>Cloud service sign-ins</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/Phishing">Phishing</Link>
                        </li>
                        <li>
                            <Link to="/frauds/AccountTakeover">Account Takeover</Link>
                        </li>
                        <li>
                            <Link to="/frauds/BruteForce">Brute Force - Credential Stuffing</Link>
                        </li>
                        <li>
                            <Link to="/frauds/SimSwap">SIM Swap Fraud</Link>
                        </li>
                    </ul>
                </div>
                <div className="upgrade-section">
                    <div className="upgrade-header">
                        <h3>Defense Level: {currentLevel}</h3>
                    </div>
                    
                    <div className="upgrade-info">
                        <div className="upgrade-details">
                            <span className="upgrade-cost">Cost: ${upgradeCost.toLocaleString()}</span>
                            <span className="upgrade-level">Next: Level {Math.min(currentLevel + 1, 5)}</span>
                        </div>
                        
                        <button 
                            className="upgrade-button"
                            onClick={handleUpgradePLACEHOLDER}
                            disabled={currentLevel >= 5}
                        >
                            {currentLevel >= 5 ? 'Max Level Reached' : 'Upgrade Defense'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MultiFactorAuth;