import { Link } from 'react-router-dom';
import { useDefenseOperations } from '../hooks/defenseHooks.js';
import '../styles/ui.css';
import '../styles/shopAndWiki.css';
import '../styles/charts.css';
import MoneyBar from './MoneyBar';
import PageHeader from './PageHeader';
import NavigationPanel from './NavigationPanel';

function DefenseDetailPage({ defenseKey, title, infoContent }) {
    const {
        defense,
        loading,
        actionLoading,
        error,
        successMessage,
        handleBuy,
        handleUpgrade,
    } = useDefenseOperations(defenseKey);

    const currentLevel = defense?.displayLevel || 0;
    const upgradeCost = defense?.nextActionCost || 0;
    const isOwned = defense?.isOwned || false;
    const isMaxLevel = defense?.isMaxLevel || false;

    function handleUpgradeAction() {
        if (!defense) return;

        if (defense.isOwned) {
            handleUpgrade();
        } else {
            handleBuy();
        }
    }

    const statusMessage = (
        <>
            {error && (
                <div className="status-banner status-error">
                    Error: {error}
                </div>
            )}
            {successMessage && (
                <div className="status-banner status-success">
                    {successMessage}
                </div>
            )}
        </>
    );

    if (loading) {
        return (
            <div className="shop-container">
                <PageHeader
                    leftContent={
                        <>
                            <Link to="/defenseshop" className="icon-button back-button" title="Back">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </Link>
                            <h1 className="page-header-title-inline">{title}</h1>
                        </>
                    }
                    centerContent={<MoneyBar />}
                >
                </PageHeader>
                <div className="detail-grid">
                    <NavigationPanel />
                    <div className="description-card info-card">
                        <h1 className="detail-title">{title}</h1>
                        <div className="status-banner status-neutral">
                            Loading defense data...
                        </div>
                    </div>
                    <div className="description-card management-card" aria-hidden="true">
                        <div className="chart-container">
                            <div className="chart-header">
                                <h2 className="management-title">Defense Management</h2>
                            </div>
                            <p className="management-placeholder">Loading defense controls...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="shop-container">
            <PageHeader
                leftContent={
                    <>
                        <Link to="/defenseshop" className="icon-button back-button" title="Back">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="page-header-title-inline">{title}</h1>
                    </>
                }
                centerContent={<MoneyBar />}
            >
            </PageHeader>
                <div className="detail-grid">
                    <NavigationPanel />
                    <div className="description-card info-card">
                        <h1 className="detail-title">{title}</h1>
                        {statusMessage}
                        <div className="info-content">{infoContent}</div>
                    </div>

                    <div className="description-card management-card">
                        <div className="chart-container">
                            <div className="chart-header">
                                <h2 className="management-title">Defense Management</h2>
                            </div>
                            <div className="upgrade-header">
                                <h3>Defense Level: {currentLevel}</h3>
                                <p>Status: {isOwned ? 'Owned' : 'Not Owned'}</p>
                            </div>

                            <div className="upgrade-info">
                                <div className="upgrade-details">
                                    <span className="upgrade-cost">Cost: ${upgradeCost.toLocaleString()}</span>
                                    <span className="upgrade-level">
                                        {isOwned
                                            ? isMaxLevel
                                                ? 'Max Level Achieved'
                                                : `Next: Level ${currentLevel + 1}`
                                            : 'Purchase to Own'}
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
                                            : (isOwned ? 'Upgrade Defense' : 'Purchase Defense')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

export default DefenseDetailPage;
