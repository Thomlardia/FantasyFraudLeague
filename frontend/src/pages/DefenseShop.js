import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import '../styles/shopAndWiki.css';
import PageHeader from '../components/PageHeader';
import MoneyBar from '../components/MoneyBar';
import FilterDropdown from '../components/FilterDropdown';
import { useDefense } from '../contexts/DefenseContext';
import { useFilters } from '../contexts/FilterContext';

function DefenseShop() {
    const { defenses, loading } = useDefense();
    const { defenseShopFilters, updateDefenseShopFilters } = useFilters();
    const [filterOpen, setFilterOpen] = useState(false);
    const filterButtonRef = useRef(null);

    // Destructure filters from context
    const { showFilter, sortBy, sortDirection } = defenseShopFilters;

    const defenseItems = [
        { title: "Multi-Factor Authentication (MFA)", icon: "security", path: "/defenses/MultiFactorAuth", id: "mfa" },
        { title: "User Education and Training", icon: "school", path: "/defenses/UserEducation", id: "userEducation" },
        { title: "Regular Audits", icon: "checklist", path: "/defenses/RegularAudits", id: "regularAudits" },
        { title: "Network Monitoring", icon: "network_check", path: "/defenses/NetworkMonitoring", id: "networkMonitoring" },
        { title: "Segregation of Duties", icon: "group_work", path: "/defenses/SegregationOfDuties", id: "segregationOfDuties" },
        { title: "Input Validation and Sanitization", icon: "filter_alt", path: "/defenses/InputValidation", id: "inputValidation" },
        { title: "Principle of Least Privilege", icon: "lock", path: "/defenses/PrincipleOfLeastPrivilege", id: "principleOfLeastPrivilege" },
        { title: "Regular Password Changes", icon: "password", path: "/defenses/RegularPasswordChanges", id: "passwordPolicies" },
        { title: "Email Filtering and Anti-Phishing Tools", icon: "mark_email_unread", path: "/defenses/EmailFiltering", id: "emailFiltering" },
        { title: "Regulated Automated Backups", icon: "backup", path: "/defenses/RegulatedAutoBackup", id: "automatedBackups" },
        { title: "Keep Systems and Software Updated", icon: "update", path: "/defenses/KeepUpdated", id: "keepSoftwareUpdated" },
        { title: "DDoS Protection Services", icon: "cloud_queue", path: "/defenses/DdosProtection", id: "ddosProtection" },
        { title: "Traffic Filtering", icon: "filter_list", path: "/defenses/TrafficFiltering", id: "trafficFiltering" },
        { title: "Verification Protocols (Code Words)", icon: "verified", path: "/defenses/VerificationProtocols", id: "verificationProtocols" },
        { title: "DeepFake Detection Software", icon: "visibility", path: "/defenses/DeepfakeDetection", id: "deepfakeDetection" },
        { title: "ATM Inspections", icon: "card_membership", path: "/defenses/AtmInspections", id: "atmInspection" },
        { title: "Background Checks and Regular Screenings", icon: "person_search", path: "/defenses/BackgroundChecks", id: "backgroundChecks" },
        { title: "Use HTTPS and Encrypted Connections", icon: "https", path: "/defenses/HttpsAndEncryption", id: "httpsEncryption" },
        { title: "VPN Usage for Remote Connections", icon: "vpn_lock", path: "/defenses/VpnUsage", id: "vpnUsage" },
        { title: "Application Sandboxing", icon: "grid_view", path: "/defenses/ApplicationSandboxing", id: "applicationSandboxing" },
    ];

    const showOptions = [
        { id: 'all', label: 'All Defenses' },
        { id: 'owned', label: 'Owned' },
        { id: 'notOwned', label: 'Not Owned' },
    ];

    const sortOptions = [
        { id: 'effectiveness', label: 'Impact' },
        { id: 'level', label: 'Level' },
        { id: 'name', label: 'Name' },
    ];

    // Calculate total portfolio effectiveness increase from buying/upgrading this defense
    // Uses multiplicative stacking: considers current protection from all defenses
    // and calculates increase in protection for each attack type this defense affects
    const calculateEffectivenessIncrease = (defense) => {
        if (!defense || !defense.defendsAgainst) return 0;

        const currentLevel = defense.level || 0;
        const defendsAgainst = defense.defendsAgainst;

        // Determine what this defense will provide at next level
        const nextLevel = currentLevel === 0 ? 0 : currentLevel;
        if (nextLevel >= (defense.cost?.length || 0)) return 0; // Max level reached

        let totalPortfolioIncrease = 0;

        // For each attack type this defense protects against
        Object.entries(defendsAgainst).forEach(([attackId, percentages]) => {
            if (!percentages || percentages.length === 0) return;

            const nextDefenseEffectiveness = percentages[nextLevel] || 0;
            if (nextDefenseEffectiveness === 0) return; // No benefit at next level

            // Calculate CURRENT total protection (includes this defense at current level if owned)
            const currentTotalProtection = getTotalProtectionAgainstAttack(attackId, defense.defenseId, currentLevel);

            // Calculate NEW total protection (with this defense at next level)
            const newTotalProtection = getTotalProtectionAgainstAttack(attackId, defense.defenseId, nextLevel + 1);

            // Calculate increase for this attack type
            const increase = newTotalProtection - currentTotalProtection;
            totalPortfolioIncrease += increase;
        });

        return Math.round(totalPortfolioIncrease);
    };

    // Helper: Get total protection against an attack with a specific defense at a specific level
    // simulatedLevel: 0 = not owned, 1+ = owned at that level
    const getTotalProtectionAgainstAttack = (attackId, simulatedDefenseId, simulatedLevel) => {
        let damageMultiplier = 1.0;

        defenses.forEach(defense => {
            let effectiveLevel = defense.level;

            // Override level for the defense being simulated
            if (defense.defenseId === simulatedDefenseId) {
                effectiveLevel = simulatedLevel;
            }

            // Only include defenses that are owned (level > 0)
            if (effectiveLevel > 0 && defense.defendsAgainst && defense.defendsAgainst[attackId]) {
                const percentages = defense.defendsAgainst[attackId];
                const effectiveness = percentages[effectiveLevel - 1] || 0;
                damageMultiplier *= (1 - effectiveness / 100);
            }
        });

        const totalProtection = (1 - damageMultiplier) * 100;
        return totalProtection;
    };

    // Apply filter logic
    const getFilteredDefenses = () => {
        let filtered = defenseItems.map((item) => {
            const myDefense = defenses.find(d => d.defenseId === item.id);
            const effectivenessIncrease = calculateEffectivenessIncrease(myDefense);
            return {
                ...item,
                level: myDefense?.level || 0,
                effectivenessIncrease: effectivenessIncrease,
                isMaxLevel: myDefense?.isMaxLevel || false,
            };
        });

        // Apply show filter
        if (showFilter === 'owned') {
            filtered = filtered.filter(item => item.level > 0);
        } else if (showFilter === 'notOwned') {
            filtered = filtered.filter(item => item.level === 0);
        }

        // Apply sort
        if (sortBy === 'effectiveness') {
            if (sortDirection === 'desc') {
                // High to Low (descending)
                filtered.sort((a, b) => b.effectivenessIncrease - a.effectivenessIncrease);
            } else {
                // Low to High (ascending)
                filtered.sort((a, b) => a.effectivenessIncrease - b.effectivenessIncrease);
            }
        } else if (sortBy === 'level') {
            if (sortDirection === 'desc') {
                // High to Low (descending)
                filtered.sort((a, b) => b.level - a.level);
            } else {
                // Low to High (ascending)
                filtered.sort((a, b) => a.level - b.level);
            }
        } else if (sortBy === 'name') {
            if (sortDirection === 'desc') {
                // Z to A (descending)
                filtered.sort((a, b) => b.title.localeCompare(a.title));
            } else {
                // A to Z (ascending)
                filtered.sort((a, b) => a.title.localeCompare(b.title));
            }
        }

        return filtered;
    };

    const filteredDefenses = getFilteredDefenses();
    const hasResults = filteredDefenses.length > 0;

    if (loading) return <p>Loading Defenses...</p>;

    return (
        <div className="shop-wiki-container">
            <PageHeader
                leftContent={
                    <>
                        <Link to="/home" className="back-button" title="Back">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="page-header-title-inline">Defense Shop</h1>
                    </>
                }
                centerContent={<MoneyBar />}
            >
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
                        onShowChange={(value) => updateDefenseShopFilters({ showFilter: value })}
                        sortOptions={sortOptions}
                        selectedSort={sortBy}
                        sortDirection={sortDirection}
                        onSortChange={(value) => updateDefenseShopFilters({ sortBy: value })}
                        onDirectionToggle={() => updateDefenseShopFilters({ sortDirection: sortDirection === 'desc' ? 'asc' : 'desc' })}
                        isOpen={filterOpen}
                        onClose={() => setFilterOpen(false)}
                        buttonRef={filterButtonRef}
                    />
                </div>
            </PageHeader>

            {hasResults ? (
                <div className="shop-wiki-grid">
                    {filteredDefenses.map((item, index) => (
                        <Link key={index} to={item.path} className="shop-card">
                            <div className="card-content">
                                <span className="card-icon">{item.icon}</span>
                                <h3 className="card-title">{item.title}</h3>
                            </div>
                            <div className="card-info-row">
                                <p className="card-level">Level {item.level}</p>
                                {!item.isMaxLevel && item.effectivenessIncrease > 0 && (
                                    <p className="card-effectiveness">+{item.effectivenessIncrease}%</p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="shop-wiki-empty" role="status">
                    <span className="material-symbols-outlined">filter_alt_off</span>
                    <h3>No defenses match this filter</h3>
                    <p>Adjust your filters to see the full catalog.</p>
                </div>
            )}
        </div>
    );
}

export default DefenseShop;
