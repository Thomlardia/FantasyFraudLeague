import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../styles/shopAndWiki.css';
import PageHeader from '../components/PageHeader';
import FilterDropdown from '../components/FilterDropdown';
import { useDefense } from '../contexts/DefenseContext';
import { useFilters } from '../contexts/FilterContext';
import { useAttack } from '../contexts/AttackContext';

function FraudWiki() {
    const { getTotalProtectionAgainstAttack, loading } = useDefense();
    const { fraudWikiFilters, updateFraudWikiFilters } = useFilters();
    const { getAverageProtectionFromLogs, attackLogs, attackStats, fetchAttackLogs } = useAttack();
    const [filterOpen, setFilterOpen] = useState(false);
    const filterButtonRef = useRef(null);

    // Always fetch attack logs on mount to ensure fresh data
    useEffect(() => {
        console.log('[FraudWiki] Fetching attack logs on mount');
        fetchAttackLogs();
    }, [fetchAttackLogs]);

    // Debug: Log attack stats when they change
    useEffect(() => {
        console.log('[FraudWiki] Attack logs count:', attackLogs.length);
        console.log('[FraudWiki] Attack stats:', attackStats);
        console.log('[FraudWiki] Stats count:', Object.keys(attackStats).length);
    }, [attackLogs, attackStats]);

    // Destructure filters from context
    const { showFilter, sortBy, sortDirection } = fraudWikiFilters;

    const fraudItems = [
        { title: "Phishing", icon: "phishing", path: "/frauds/Phishing", attackId: "phishing" },
        { title: "Ransomware", icon: "lock_person", path: "/frauds/Ransomware", attackId: "ransomware" },
        { title: "Distributed Denial of Service (DDoS)", icon: "cloud_off", path: "/frauds/Ddos", attackId: "ddos" },
        { title: "Deepfake Fraud", icon: "theater_comedy", path: "/frauds/Deepfake", attackId: "deepfakeFraud" },
        { title: "ATM Skimming", icon: "card_membership", path: "/frauds/AtmSkimming", attackId: "skimming" },
        { title: "Insider Fraud", icon: "person_alert", path: "/frauds/InsiderFraud", attackId: "insiderFraud" },
        { title: "Man-In-The-Middle", icon: "hub", path: "/frauds/ManInTheMiddle", attackId: "mitm" },
        { title: "SQL Injection", icon: "code", path: "/frauds/SqlInjection", attackId: "sqlInjection" },
        { title: "Business Email Compromise", icon: "email", path: "/frauds/BusinessEmailCompromise", attackId: "bec" },
        { title: "Zero-Day Exploit", icon: "bug_report", path: "/frauds/ZeroDayExploit", attackId: "zeroDay" },
        { title: "Vishing", icon: "phone_in_talk", path: "/frauds/Vishing", attackId: "vishing" },
        { title: "XSS (Cross-Site Scripting)", icon: "web_asset_off", path: "/frauds/Xss", attackId: "xss" },
        { title: "Account Takeover", icon: "no_accounts", path: "/frauds/AccountTakeover", attackId: "accountTakeover" },
        { title: "Investment Scams", icon: "trending_up", path: "/frauds/InvestmentScam", attackId: "investmentScams" },
        { title: "SIM Swap Fraud", icon: "sim_card_alert", path: "/frauds/SimSwap", attackId: "simSwap" },
        { title: "Authorized Push Payments", icon: "payment", path: "/frauds/AuthPushPayments", attackId: "authorizedPushPayments" },
        { title: "Cryptojacking", icon: "memory", path: "/frauds/CryptoJacking", attackId: "cryptojacking" },
        { title: "Brute Force – Credential Stuffing", icon: "lock_open", path: "/frauds/BruteForce", attackId: "bruteForce" },
        { title: "Synthetic Identity Theft", icon: "person_add_disabled", path: "/frauds/SyntIdentityTheft", attackId: "syntheticIdentity" },
        { title: "Accounting and Invoice Fraud", icon: "receipt_long", path: "/frauds/AccAndInvFraud", attackId: "accAndInvFraud" }
    ];

    const showOptions = [
        { id: 'all', label: 'All Frauds' },
        { id: 'highProtection', label: 'High Protection (≥50%)' },
        { id: 'lowProtection', label: 'Low Protection (<50%)' },
    ];

    const sortOptions = [
        { id: 'coverage', label: 'Coverage' },
        { id: 'name', label: 'Name' },
    ];

    // Apply filter logic
    const getFilteredFrauds = () => {
        let filtered = fraudItems.map((item) => {
            const protection = getTotalProtectionAgainstAttack(item.attackId);
            return {
                ...item,
                protection: Math.round(protection)
            };
        });

        // Apply show filter
        if (showFilter === 'highProtection') {
            filtered = filtered.filter(item => item.protection >= 50);
        } else if (showFilter === 'lowProtection') {
            filtered = filtered.filter(item => item.protection < 50);
        }

        // Apply sort
        if (sortBy === 'coverage') {
            if (sortDirection === 'desc') {
                // High to Low (descending)
                filtered.sort((a, b) => b.protection - a.protection);
            } else {
                // Low to High (ascending)
                filtered.sort((a, b) => a.protection - b.protection);
            }
        } else if (sortBy === 'name') {
            if (sortDirection === 'asc') {
                // A to Z (ascending)
                filtered.sort((a, b) => a.title.localeCompare(b.title));
            } else {
                // Z to A (descending)
                filtered.sort((a, b) => b.title.localeCompare(a.title));
            }
        }

        return filtered;
    };

    const filteredFrauds = getFilteredFrauds();
    const hasResults = filteredFrauds.length > 0;

    if (loading) return <p>Loading Fraud Wiki...</p>;

    return (
        <div className="shop-wiki-container">
            <PageHeader title="Fraud Wiki" backPath="/home">
                <div className="filter-button-wrapper">
                    <button
                        ref={filterButtonRef}
                        className="icon-button"
                        title="Filter"
                        onClick={(e) => {
                            e.stopPropagation();
                            setFilterOpen(prev => !prev);
                        }}
                    >
                        <span className="material-symbols-outlined">filter_list</span>
                    </button>
                    <FilterDropdown
                        showOptions={showOptions}
                        selectedShow={showFilter}
                        onShowChange={(value) => updateFraudWikiFilters({ showFilter: value })}
                        sortOptions={sortOptions}
                        selectedSort={sortBy}
                        sortDirection={sortDirection}
                        onSortChange={(value) => updateFraudWikiFilters({ sortBy: value })}
                        onDirectionToggle={() => updateFraudWikiFilters({ sortDirection: sortDirection === 'desc' ? 'asc' : 'desc' })}
                        isOpen={filterOpen}
                        onClose={() => setFilterOpen(false)}
                        buttonRef={filterButtonRef}
                    />
                </div>
            </PageHeader>

            {hasResults ? (
                <div className="shop-wiki-grid">
                    {filteredFrauds.map((item, index) => {
                        // Get average protection from historical attack logs
                        const avgProtection = getAverageProtectionFromLogs(item.attackId);

                        // Debug first few items
                        if (index < 3) {
                            console.log(`[FraudWiki] ${item.title}: attackId="${item.attackId}", avgProtection=${avgProtection}`);
                        }

                        // Distinguish between "no data" (null) and "0% protection" (number 0)
                        const hasHistoricalData = avgProtection !== null;
                        const badgeClass = hasHistoricalData
                            ? (avgProtection >= 50 ? 'attack-history-badge badge-green' : 'attack-history-badge badge-red')
                            : 'attack-history-badge badge-gray';

                        const badgeText = hasHistoricalData ? `${avgProtection}%` : 'N/A';
                        const badgeTitle = hasHistoricalData
                            ? `Average protection from past attacks: ${avgProtection}%`
                            : 'No attack history available yet';

                        return (
                            <Link key={index} to={item.path} className="wiki-card">
                                <div className="card-content">
                                    <span className="card-icon">{item.icon}</span>
                                    <h3 className="card-title">{item.title}</h3>
                                </div>
                                <div className="card-info-row">
                                    <p className="card-coverage">{item.protection}%</p>
                                    <span className={badgeClass} title={badgeTitle}>
                                        {badgeText}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="shop-wiki-empty" role="status">
                    <span className="material-symbols-outlined">filter_alt_off</span>
                    <h3>No frauds match this filter</h3>
                    <p>Adjust your filters to see the full catalog.</p>
                </div>
            )}
        </div>
    );
}

export default FraudWiki;
