import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import '../styles/shopAndWiki.css';
import PageHeader from '../components/PageHeader';
import MoneyBar from '../components/MoneyBar';
import FilterDropdown from '../components/FilterDropdown';
import { useDefense } from '../contexts/DefenseContext';

function DefenseShop() {
    const { defenses, loading } = useDefense();
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const filterButtonRef = useRef(null);

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

    const filterOptions = [
        { id: 'all', label: 'All Defenses' },
        { id: 'owned', label: 'Owned Only' },
        { id: 'notOwned', label: 'Not Owned' },
        { id: 'sortLevelAsc', label: 'Level: Low to High' },
        { id: 'sortLevelDesc', label: 'Level: High to Low' },
    ];

    // Apply filter logic
    const getFilteredDefenses = () => {
        let filtered = defenseItems.map((item) => {
            const myDefense = defenses.find(d => d.defenseId === item.id);
            return { ...item, level: myDefense?.level || 0 };
        });

        // Filter by ownership
        if (selectedFilter === 'owned') {
            filtered = filtered.filter(item => item.level > 0);
        } else if (selectedFilter === 'notOwned') {
            filtered = filtered.filter(item => item.level === 0);
        }

        // Sort by level
        if (selectedFilter === 'sortLevelAsc') {
            filtered.sort((a, b) => a.level - b.level);
        } else if (selectedFilter === 'sortLevelDesc') {
            filtered.sort((a, b) => b.level - a.level);
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
                        options={filterOptions}
                        selected={selectedFilter}
                        onChange={(filterId) => {
                            setSelectedFilter(filterId);
                            setFilterOpen(false);
                        }}
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
                            <span className="card-icon">{item.icon}</span>
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-level">Level {item.level}</p>
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
