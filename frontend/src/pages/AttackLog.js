import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';
import PageHeader from '../components/PageHeader';
import { useAttack } from '../contexts/AttackContext';
import { useFilters } from '../contexts/FilterContext';

function AttackLog() {
    const { attackLogs, logsLoading, logsError, refreshAttackLogs } = useAttack();
    const { attackLogTab, setAttackLogTab } = useFilters();
    const [expandedLogIndex, setExpandedLogIndex] = useState(null);

    // Fetch logs on mount
    useEffect(() => {
        refreshAttackLogs();
    }, [refreshAttackLogs]);

    const handleRefresh = () => {
        refreshAttackLogs();
    };

    // Filter logs based on active tab
    const displayedLogs = attackLogTab === 'lastattack' && attackLogs.length > 0
        ? [attackLogs[0]] // Show only most recent
        : attackLogs; // Show all

    const toggleLogExpansion = (index) => {
        setExpandedLogIndex(expandedLogIndex === index ? null : index);
    };

    // Format timestamp helper
    const formatTimestamp = (timestamp) => {
        let date;
        if (timestamp?.toDate && typeof timestamp.toDate === 'function') {
            date = timestamp.toDate();
        } else if (timestamp?.seconds) {
            date = new Date(timestamp.seconds * 1000);
        } else if (timestamp instanceof Date) {
            date = timestamp;
        } else {
            date = new Date();
        }
        return date.toLocaleString();
    };

    return (
        <div className="shop-wiki-container">
            <PageHeader
                leftContent={
                    <>
                        <Link to="/home" className="back-button" title="Back">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="page-header-title-inline">Attack Log</h1>
                    </>
                }
                centerContent={
                    <div className="tab-selector-bar">
                        <button
                            className={`tab-bar-button ${attackLogTab === 'alltime' ? 'active' : ''}`}
                            onClick={() => setAttackLogTab('alltime')}
                        >
                            All Time
                        </button>
                        <button
                            className={`tab-bar-button ${attackLogTab === 'lastattack' ? 'active' : ''}`}
                            onClick={() => setAttackLogTab('lastattack')}
                        >
                            Last Attack
                        </button>
                    </div>
                }
            >
                <button
                    onClick={handleRefresh}
                    className="icon-button"
                    title="Refresh Attack Log"
                    disabled={logsLoading}
                >
                    <span className="material-symbols-outlined">refresh</span>
                </button>
            </PageHeader>

            <div className="leaderboard-content">
                <div className="leaderboard-card">
                    {logsLoading ? (
                        <div className="attack-log-status">
                            <span className="material-symbols-outlined">hourglass_empty</span>
                            <p>Loading attack logs...</p>
                        </div>
                    ) : logsError ? (
                        <div className="attack-log-status attack-log-status--error">
                            <span className="material-symbols-outlined">error</span>
                            <p>Error: {logsError}</p>
                        </div>
                    ) : displayedLogs.length === 0 ? (
                        <div className="attack-log-status">
                            <span className="material-symbols-outlined">shield</span>
                            <p>No attacks received yet</p>
                            <p className="attack-log-status-subtitle">You're safe... for now!</p>
                        </div>
                    ) : (
                        <div className="attack-log-list">
                            {displayedLogs.map((log, logIndex) => {
                                const isExpanded = expandedLogIndex === logIndex;
                                const totalDamage = log.totalDamage || 0;
                                const attackCount = log.attacks?.length || 0;
                                const totalPrevented = log.attacks?.reduce((sum, attack) => sum + (attack.damageReduced || 0), 0) || 0;
                                const oldBalance = log.oldBalance || 0;
                                const newBalance = log.newBalance || 0;
                                const netChange = newBalance - oldBalance;
                                const changeClassName = netChange > 0
                                    ? 'attack-log-damage attack-log-damage--positive'
                                    : netChange < 0
                                        ? 'attack-log-damage attack-log-damage--negative'
                                        : 'attack-log-damage attack-log-damage--neutral';
                                const formattedNetChange = `${netChange > 0 ? '+' : netChange < 0 ? '-' : ''}$${Math.abs(Math.round(netChange)).toLocaleString()}`;
                                
                                // Calculate defense effectiveness and star rating
                                const totalOriginalDamage = log.attacks?.reduce((sum, attack) => sum + (attack.originalDamage || 0), 0) || 0;
                                const defenseEffectiveness = totalOriginalDamage > 0 ? (totalPrevented / totalOriginalDamage) * 100 : 0;
                                
                                let starRating = "";
                                if (defenseEffectiveness >= 90) {
                                    starRating = "⭐⭐⭐⭐⭐";
                                } else if (defenseEffectiveness >= 75) {
                                    starRating = "⭐⭐⭐⭐";
                                } else if (defenseEffectiveness >= 50) {
                                    starRating = "⭐⭐⭐";
                                } else if (defenseEffectiveness >= 30) {
                                    starRating = "⭐⭐";
                                } else if (defenseEffectiveness >= 10) {
                                    starRating = "⭐";
                                } else {
                                    starRating = "";
                                }

                                return (
                                    <div key={log.id || logIndex} className="attack-log-item">
                                        <div
                                            className="attack-log-summary"
                                            onClick={() => toggleLogExpansion(logIndex)}
                                        >
                                            <div className="attack-log-summary-info">
                                                <span className="attack-log-date">{formatTimestamp(log.timestamp)}</span>
                                                <span className="attack-log-attacks">{attackCount} attack{attackCount !== 1 ? 's' : ''}</span>
                                                {starRating && <span className="attack-log-stars">{starRating}</span>}
                                            </div>
                                            <div className="attack-log-summary-stats">
                                                <span className={changeClassName}>{formattedNetChange}</span>
                                                <span className="material-symbols-outlined attack-log-expand-icon">
                                                    {isExpanded ? 'expand_less' : 'expand_more'}
                                                </span>
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div className="attack-log-details">
                                                <div className="attack-log-summary-section">
                                                    <div className="attack-log-stat-row">
                                                        <span className="attack-log-stat-label">Old Balance:</span>
                                                        <span className="attack-log-stat-value">${(log.oldBalance || 0).toLocaleString()}</span>
                                                    </div>
                                                    <div className="attack-log-stat-row">
                                                        <span className="attack-log-stat-label">Damage Taken:</span>
                                                        <span className="attack-log-stat-value attack-log-stat-value--negative">-${totalDamage.toLocaleString()}</span>
                                                    </div>
                                                    <div className="attack-log-stat-row">
                                                        <span className="attack-log-stat-label">Damage Prevented:</span>
                                                        <span className="attack-log-stat-value attack-log-stat-value--positive">+${totalPrevented.toLocaleString()}</span>
                                                    </div>
                                                    {(log.interestEarned || 0) > 0 && (
                                                        <div className="attack-log-stat-row">
                                                            <span className="attack-log-stat-label">Interest Earned:</span>
                                                            <span className="attack-log-stat-value attack-log-stat-value--positive">+${(log.interestEarned || 0).toLocaleString()}</span>
                                                        </div>
                                                    )}
                                                    {(log.bonusIncome || 0) > 0 && (
                                                        <div className="attack-log-stat-row">
                                                            <span className="attack-log-stat-label">Defense Bonus:</span>
                                                            <span className="attack-log-stat-value attack-log-stat-value--positive">+${(log.bonusIncome || 0).toLocaleString()}</span>
                                                        </div>
                                                    )}
                                                    <div className="attack-log-stat-row attack-log-stat-row--highlight">
                                                        <span className="attack-log-stat-label">New Balance:</span>
                                                        <span className="attack-log-stat-value">${(log.newBalance || 0).toLocaleString()}</span>
                                                    </div>
                                                </div>

                                                {log.attacks && log.attacks.length > 0 && (
                                                    <div className="attack-log-attacks-section">
                                                        <h4 className="attack-log-section-title">Attack Details</h4>
                                                        {log.attacks.map((attack, attackIndex) => (
                                                            <div key={attackIndex} className="attack-detail-card">
                                                                <div className="attack-detail-header">
                                                                    <span className="attack-detail-name">{attack.attackName || 'Unknown Attack'}</span>
                                                                    <span className="attack-detail-reduction">{attack.reductionPercent || 0}% blocked</span>
                                                                </div>
                                                                <div className="attack-detail-stats">
                                                                    <div className="attack-detail-stat">
                                                                        <span className="attack-detail-stat-label">Original:</span>
                                                                        <span>${(attack.originalDamage || 0).toLocaleString()}</span>
                                                                    </div>
                                                                    <div className="attack-detail-stat">
                                                                        <span className="attack-detail-stat-label">Final:</span>
                                                                        <span className="attack-detail-stat-value--negative">${(attack.finalDamage || 0).toLocaleString()}</span>
                                                                    </div>
                                                                    <div className="attack-detail-stat">
                                                                        <span className="attack-detail-stat-label">Blocked:</span>
                                                                        <span className="attack-detail-stat-value--positive">${(attack.damageReduced || 0).toLocaleString()}</span>
                                                                    </div>
                                                                </div>

                                                                {attack.defensesApplied && attack.defensesApplied.length > 0 && (
                                                                    <div className="attack-defenses-applied">
                                                                        <span className="attack-defenses-label">Defenses Used:</span>
                                                                        <div className="attack-defenses-list">
                                                                            {attack.defensesApplied.map((defense, defIndex) => (
                                                                                <div key={defIndex} className="attack-defense-badge">
                                                                                    {defense.defenseName} L{defense.level} ({defense.reductionPercent}%)
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AttackLog;
