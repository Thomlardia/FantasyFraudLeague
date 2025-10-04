import { Link } from 'react-router-dom';
import { useDefenseOperations } from '../../hooks/defenseHooks.js';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function BackgroundChecks() {
    const { defense, loading, actionLoading, error, successMessage, handleBuy, handleUpgrade } = useDefenseOperations('backgroundChecks');
    
    function getDefenseLevel() {
        return defense?.displayLevel || 0;
    }

    function getUpgradeCost() {
        return defense?.nextActionCost || 0;
    }

    function handleUpgradeAction() {
        if (!defense) return;

        if (defense.isOwned) {
            handleUpgrade();
        } else {
            handleBuy();
        }
    }

    const currentLevel = getDefenseLevel();
    const upgradeCost = getUpgradeCost();
    const isOwned = defense?.isOwned || false;
    const isMaxLevel = defense?.isMaxLevel || false;

    // loading state
    if (loading) {
        return (
            <div className="shop-container">
                <div className="content-container">
                    <div className="description-card">Loading defense data...</div>
                </div>
            </div>
        );
    }

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
                {/* error display */}
                {error && (
                    <div className="description-card" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
                        Error: {error}
                    </div>
                )}

                {/* success display */}
                {successMessage && (
                    <div className="description-card" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
                        {successMessage}
                    </div>
                )}

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
                        <p>Status: {isOwned ? 'Owned' : 'Not Owned'}</p>
                    </div>
                    
                    <div className="upgrade-info">
                        <div className="upgrade-details">
                            <span className="upgrade-cost">Cost: ${upgradeCost.toLocaleString()}</span>
                            <span className="upgrade-level">
                                {isOwned 
                                    ? `Next: Level ${currentLevel + 1}`
                                    : 'Purchase to Own'
                                }
                            </span>
                        </div>
                        
                        <button 
                            className="upgrade-button"
                            onClick={handleUpgradeAction}
                            disabled={actionLoading || isMaxLevel}
                        >
                            {actionLoading 
                                ? (isOwned ? 'Upgrading...' : 'Purchasing...')
                                : isMaxLevel 
                                    ? 'Max Level Reached' 
                                    : (isOwned ? 'Upgrade Defense' : 'Purchase Defense')
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BackgroundChecks;