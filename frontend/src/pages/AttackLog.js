import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';
import PageHeader from '../components/PageHeader';
import { useAttack } from '../contexts/AttackContext';
import { useFilters } from '../contexts/FilterContext';

function AttackLog() {
    const {
        attackLogs,
        scheduledAttacks,
        logsLoading,
        scheduledLoading,
        logsError,
        scheduledError,
        refreshAttackLogs,
    } = useAttack();
    const { attackLogTab, setAttackLogTab } = useFilters();
    const [expandedLogIndex, setExpandedLogIndex] = useState(null);

    // Fetch logs on mount
    useEffect(() => {
        refreshAttackLogs();
    }, [refreshAttackLogs]);

    useEffect(() => {
        setExpandedLogIndex(null);
    }, [attackLogTab]);

    const handleRefresh = () => {
        refreshAttackLogs();
    };

    // Helper to normalize timestamp-like values into Date objects
    const coerceToDate = (value) => {
        if (value?.toDate && typeof value.toDate === 'function') {
            return value.toDate();
        }
        if (typeof value?._seconds === 'number') {
            const millis = value._seconds * 1000 + Math.round((value._nanoseconds || 0) / 1e6);
            return new Date(millis);
        }
        if (typeof value?.seconds === 'number') {
            const millis = value.seconds * 1000 + Math.round((value.nanoseconds || 0) / 1e6);
            return new Date(millis);
        }
        if (value instanceof Date) {
            return value;
        }
        if (typeof value === 'string' || typeof value === 'number') {
            const parsed = new Date(value);
            if (!Number.isNaN(parsed.getTime())) {
                return parsed;
            }
        }
        return null;
    };

    const isUpcomingTab = attackLogTab === 'upcoming';
    const displayedUpcoming = [...(scheduledAttacks || [])].sort((a, b) => {
        const aDate = coerceToDate(a?.scheduledAt || a?.scheduledFor || a?.scheduledTime);
        const bDate = coerceToDate(b?.scheduledAt || b?.scheduledFor || b?.scheduledTime);
        return (aDate?.getTime() || 0) - (bDate?.getTime() || 0);
    });
    const displayedPast = attackLogs;
    const displayedLogs = isUpcomingTab ? displayedUpcoming : displayedPast;

    const toggleLogExpansion = (index) => {
        setExpandedLogIndex(expandedLogIndex === index ? null : index);
    };

    // Format timestamp helper
    const formatTimestamp = (timestamp) => {
        const date = coerceToDate(timestamp) ?? new Date();
        return date.toLocaleString();
    };

    const formatRelativeTime = (date) => {
        if (!date) {
            return 'Time TBD';
        }
        const diffMs = date.getTime() - Date.now();
        const ahead = diffMs >= 0;
        const abs = Math.abs(diffMs);
        const minutes = Math.floor(abs / 60000);

        if (abs < 60000) {
            return ahead ? 'In <1 min' : '<1 min ago';
        }
        if (minutes < 60) {
            return ahead ? `In ${minutes} min` : `${minutes} min ago`;
        }
        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            const remMinutes = minutes % 60;
            const suffix = remMinutes ? `${hours}h ${remMinutes}m` : `${hours}h`;
            return ahead ? `In ${suffix}` : `${suffix} ago`;
        }
        const days = Math.floor(hours / 24);
        return ahead ? `In ${days}d` : `${days}d ago`;
    };

    const loadingState = isUpcomingTab ? scheduledLoading : logsLoading;
    const errorState = isUpcomingTab ? scheduledError : logsError;

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
                            className={`tab-bar-button ${attackLogTab === 'past' ? 'active' : ''}`}
                            onClick={() => setAttackLogTab('past')}
                        >
                            Past
                        </button>
                        <button
                            className={`tab-bar-button ${attackLogTab === 'upcoming' ? 'active' : ''}`}
                            onClick={() => setAttackLogTab('upcoming')}
                        >
                            Upcoming
                        </button>
                    </div>
                }
            >
                <button
                    onClick={handleRefresh}
                    className="icon-button"
                    title="Refresh Attack Log"
                    disabled={logsLoading || scheduledLoading}
                >
                    <span className="material-symbols-outlined">refresh</span>
                </button>
            </PageHeader>

            <div className="leaderboard-content">
                <div className="leaderboard-card">
                    {loadingState ? (
                        <div className="attack-log-status">
                            <span className="material-symbols-outlined">hourglass_empty</span>
                            <p>{isUpcomingTab ? 'Loading scheduled attacks...' : 'Loading attack logs...'}</p>
                        </div>
                    ) : errorState ? (
                        <div className="attack-log-status attack-log-status--error">
                            <span className="material-symbols-outlined">error</span>
                            <p>Error: {errorState}</p>
                        </div>
                    ) : displayedLogs.length === 0 ? (
                        <div className="attack-log-status">
                            <span className="material-symbols-outlined">
                                {isUpcomingTab ? 'schedule' : 'shield'}
                            </span>
                            <p>{isUpcomingTab ? 'No upcoming attacks scheduled' : 'No attacks received yet'}</p>
                            <p className="attack-log-status-subtitle">
                                {isUpcomingTab
                                    ? 'Scheduled attacks will appear here once created.'
                                    : "You're safe... for now!"}
                            </p>
                        </div>
                    ) : (
                        <div className="attack-log-list">
                            {displayedLogs.map((log, logIndex) => {
                                const isExpanded = expandedLogIndex === logIndex;

                                if (isUpcomingTab) {
                                    const scheduledDate = coerceToDate(log.scheduledAt || log.scheduledFor || log.scheduledTime);
                                    const status = (log.status || 'pending').toUpperCase();
                                    const relative = formatRelativeTime(scheduledDate);
                                    const displayDate = scheduledDate ? scheduledDate.toLocaleString() : 'Unknown time';
                                    const notes = log.notes || log.description || '';
                                    const waveSummary = 'Attack wave scheduled';

                                    return (
                                        <div key={log.id || logIndex} className="attack-log-item">
                                            <div
                                                className="attack-log-summary"
                                                onClick={() => toggleLogExpansion(logIndex)}
                                            >
                                                <div className="attack-log-summary-info">
                                                    <span className="attack-log-date">{displayDate}</span>
                                                    <span className="attack-log-attacks">{waveSummary}</span>
                                                    <span className="attack-log-status-chip">{status}</span>
                                                </div>
                                                <div className="attack-log-summary-stats">
                                                    <span className="attack-log-damage attack-log-damage--neutral">{relative}</span>
                                                    <span className="material-symbols-outlined attack-log-expand-icon">
                                                        {isExpanded ? 'expand_less' : 'expand_more'}
                                                    </span>
                                                </div>
                                            </div>

                                            {isExpanded && (
                                                <div className="attack-log-details">
                                                    <div className="attack-log-summary-section">
                                                        <div className="attack-log-stat-row">
                                                            <span className="attack-log-stat-label">Scheduled For:</span>
                                                            <span className="attack-log-stat-value">{displayDate}</span>
                                                        </div>
                                                        <div className="attack-log-stat-row">
                                                            <span className="attack-log-stat-label">Status:</span>
                                                            <span className="attack-log-stat-value">{status}</span>
                                                        </div>
                                                        <div className="attack-log-stat-row">
                                                            <span className="attack-log-stat-label">Wave Details:</span>
                                                            <span className="attack-log-stat-value">Revealed once the attack executes.</span>
                                                        </div>
                                                        {notes && (
                                                            <div className="attack-log-stat-row">
                                                                <span className="attack-log-stat-label">Notes:</span>
                                                                <span className="attack-log-stat-value">{notes}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

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
