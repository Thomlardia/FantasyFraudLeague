import { Link } from 'react-router-dom';
import { useDefenseOperations } from '../../hooks/defenseHooks.js';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function NetworkMonitoring() {
    const { defense, loading, actionLoading, error, successMessage, handleBuy, handleUpgrade } = useDefenseOperations('networkMonitoring');
    
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

                <h1>Network Monitoring</h1>
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
                        Network monitoring involves continuous surveillance of network traffic and performance metrics to detect anomalies that may indicate attacks.
                    </p>
                    <br />
                    <p>
                        <a href="https://netmonk.id/blog/the-importance-of-network-monitoring-in-preventing-ddos-attacks" target="_blank" rel="noopener noreferrer">
                            Reference: Network Monitoring
                        </a>.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Detecting unusual outbound traffic</li>
                            <li>Spotting brute-force login attempts</li>
                            <li>Identifying unauthorized IoT devices</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/Ddos">DDoS</Link>
                        </li>
                        <li>
                            <Link to="/frauds/CryptoJacking">Crypto Jacking</Link>
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

export default NetworkMonitoring;