import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function BackgroundChecks() {
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
                <h1>Background Checks</h1>
                <div></div>
            </div>
            
            <div className="content-container">
                <div className="description-card">
                    <p>
                        Background checks and regular screenings involve verification of employees' criminal history, financial status, references, and other relevant factors before hiring AND periodically throughout employment. This process helps identify individuals who may pose higher risks for fraudulent behavior due to financial pressures, criminal history, or other concerning factors. Ongoing screenings can detect changes in an employee's circumstances that might increase fraud risk.
                    </p>
                    <br />
                    <p>
                        <a href="https://www.fticonsulting.com/insights/articles/safeguard-against-fraud-importance-background-checks" target="_blank" rel="noopener noreferrer">
                            Reference: Background Checks
                        </a>.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Screening finance department hires</li>
                            <li>Vetting contractors with system access</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/InsiderFraud">Insider Fraud</Link>
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

export default BackgroundChecks;