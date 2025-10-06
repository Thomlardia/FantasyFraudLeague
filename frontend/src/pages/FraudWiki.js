import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import '../styles/shopAndWiki.css';
import PageHeader from '../components/PageHeader';
import FilterDropdown from '../components/FilterDropdown';

function FraudWiki() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const filterButtonRef = useRef(null);

    const fraudItems = [
        { title: "Phishing", icon: "phishing", path: "/frauds/Phishing" },
        { title: "Ransomware", icon: "lock_person", path: "/frauds/Ransomware" },
        { title: "Distributed Denial of Service (DDoS)", icon: "cloud_off", path: "/frauds/Ddos" },
        { title: "Deepfake Fraud", icon: "theater_comedy", path: "/frauds/Deepfake" },
        { title: "ATM Skimming", icon: "card_membership", path: "/frauds/AtmSkimming" },
        { title: "Insider Fraud", icon: "person_alert", path: "/frauds/InsiderFraud" },
        { title: "Man-In-The-Middle", icon: "hub", path: "/frauds/ManInTheMiddle" },
        { title: "SQL Injection", icon: "code", path: "/frauds/SqlInjection" },
        { title: "Business Email Compromise", icon: "email", path: "/frauds/BusinessEmailCompromise" },
        { title: "Zero-Day Exploit", icon: "bug_report", path: "/frauds/ZeroDayExploit" },
        { title: "Vishing", icon: "phone_in_talk", path: "/frauds/Vishing" },
        { title: "XSS (Cross-Site Scripting)", icon: "web_asset_off", path: "/frauds/Xss" },
        { title: "Account Takeover", icon: "no_accounts", path: "/frauds/AccountTakeover" },
        { title: "Investment Scams", icon: "trending_up", path: "/frauds/InvestmentScam" },
        { title: "SIM Swap Fraud", icon: "sim_card_alert", path: "/frauds/SimSwap" },
        { title: "Authorized Push Payments", icon: "payment", path: "/frauds/AuthPushPayments" },
        { title: "Cryptojacking", icon: "memory", path: "/frauds/CryptoJacking" },
        { title: "Brute Force – Credential Stuffing", icon: "lock_open", path: "/frauds/BruteForce" },
        { title: "Synthetic Identity Theft", icon: "person_add_disabled", path: "/frauds/SyntIdentityTheft" },
        { title: "Accounting and Invoice Fraud", icon: "receipt_long", path: "/frauds/AccAndInvFraud" }
    ];

    const filterOptions = [
        { id: 'all', label: 'All Frauds' },
        { id: 'sortAZ', label: 'A to Z' },
        { id: 'sortZA', label: 'Z to A' },
    ];

    // Apply filter logic
    const getFilteredFrauds = () => {
        let filtered = [...fraudItems];

        if (selectedFilter === 'sortAZ') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (selectedFilter === 'sortZA') {
            filtered.sort((a, b) => b.title.localeCompare(a.title));
        }

        return filtered;
    };

    const filteredFrauds = getFilteredFrauds();

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

            <div className="shop-wiki-grid">
                {filteredFrauds.map((item, index) => (
                    <Link key={index} to={item.path} className="wiki-card">
                        <span className="card-icon">{item.icon}</span>
                        <h3 className="card-title">{item.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default FraudWiki;