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
        handleSell,
    } = useDefenseOperations(defenseKey);

    const currentLevel = defense?.displayLevel || 0;
    const upgradeCost = defense?.nextActionCost || 0;
    const isOwned = defense?.isOwned || false;
    const isMaxLevel = defense?.isMaxLevel || false;

    // Calculate sell price (50% of total spent)
    const calculateSellPrice = () => {
        if (!defense || !isOwned) return 0;
        let totalCost = 0;
        for (let i = 0; i < currentLevel; i++) {
            totalCost += defense.cost?.[i] || 0;
        }
        return Math.floor(totalCost * 0.5);
    };

    const sellPrice = calculateSellPrice();
    const loss = isOwned ? (defense.cost?.slice(0, currentLevel).reduce((sum, c) => sum + (c || 0), 0) - sellPrice) : 0;

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
                                <span className={`defense-status-badge ${isOwned ? 'owned' : 'not-owned'}`}>
                                    {isOwned ? (isMaxLevel ? 'Max Level' : 'Owned') : 'Not Owned'}
                                </span>
                            </div>

                            <div className="defense-info-grid">
                                <div className="defense-info-row">
                                    <span className="defense-info-label">Level</span>
                                    <span className="defense-info-value">{currentLevel}</span>
                                </div>
                                {!isMaxLevel && (
                                    <div className="defense-info-row">
                                        <span className="defense-info-label">{isOwned ? 'Upgrade Cost' : 'Purchase Price'}</span>
                                        <span className="defense-info-price">${upgradeCost.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>

                            <button
                                className="defense-action-btn"
                                onClick={handleUpgradeAction}
                                disabled={actionLoading || isMaxLevel}
                            >
                                {actionLoading
                                    ? (isOwned ? 'Upgrading...' : 'Purchasing...')
                                    : isMaxLevel
                                        ? 'Max Level Reached'
                                        : (isOwned ? `Upgrade to Level ${currentLevel + 1}` : 'Buy Defense')}
                            </button>

                            {isOwned && (
                                <>
                                    <div className="defense-info-grid" style={{ marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                                        <div className="defense-info-row">
                                            <span className="defense-info-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                Sell Price
                                                <span
                                                    className="info-icon-tooltip"
                                                    onClick={() => alert('Sell price is 50% of all money paid to reach this level, including purchase cost.')}
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>info</span>
                                                </span>
                                            </span>
                                            <span className="defense-info-price" style={{ color: 'var(--color-red-dark)' }}>
                                                ${sellPrice.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        className="defense-action-btn defense-sell-btn"
                                        onClick={() => {
                                            if (window.confirm(`Are you sure you want to sell this defense for $${sellPrice.toLocaleString()}? You will lose $${loss.toLocaleString()}.`)) {
                                                handleSell();
                                            }
                                        }}
                                        disabled={actionLoading}
                                    >
                                        {actionLoading ? 'Selling...' : `Sell Defense`}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

export default DefenseDetailPage;
