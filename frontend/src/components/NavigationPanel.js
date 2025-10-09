import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navigationPanel.css';

function NavigationPanel() {
    const location = useLocation();
    const navPanelRef = useRef(null);
    const [expanded, setExpanded] = useState({
        defenses: true,
        frauds: true
    });

    // Restore scroll position on mount and when navigating
    useEffect(() => {
        const savedScrollPosition = localStorage.getItem('navPanelScrollPosition');
        if (savedScrollPosition && navPanelRef.current) {
            navPanelRef.current.scrollTop = parseInt(savedScrollPosition, 10);
        }
    }, [location.pathname]);

    // Save scroll position when scrolling
    const handleScroll = () => {
        if (navPanelRef.current) {
            localStorage.setItem('navPanelScrollPosition', navPanelRef.current.scrollTop.toString());
        }
    };

    const toggleSection = (section) => {
        setExpanded(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const defenses = [
        { path: '/defenses/MultiFactorAuth', label: 'Multi Factor Auth' },
        { path: '/defenses/UserEducation', label: 'User Education' },
        { path: '/defenses/RegularAudits', label: 'Regular Audits' },
        { path: '/defenses/NetworkMonitoring', label: 'Network Monitoring' },
        { path: '/defenses/SegregationOfDuties', label: 'Segregation Of Duties' },
        { path: '/defenses/InputValidation', label: 'Input Validation' },
        { path: '/defenses/PrincipleOfLeastPrivilege', label: 'Principle Of Least Privilege' },
        { path: '/defenses/RegularPasswordChanges', label: 'Regular Password Changes' },
        { path: '/defenses/EmailFiltering', label: 'Email Filtering' },
        { path: '/defenses/RegulatedAutoBackup', label: 'Regulated Auto Backup' },
        { path: '/defenses/KeepUpdated', label: 'Keep Updated' },
        { path: '/defenses/DdosProtection', label: 'DDoS Protection' },
        { path: '/defenses/TrafficFiltering', label: 'Traffic Filtering' },
        { path: '/defenses/VerificationProtocols', label: 'Verification Protocols' },
        { path: '/defenses/DeepfakeDetection', label: 'Deepfake Detection' },
        { path: '/defenses/AtmInspections', label: 'ATM Inspections' },
        { path: '/defenses/BackgroundChecks', label: 'Background Checks' },
        { path: '/defenses/HttpsAndEncryption', label: 'HTTPS & Encryption' },
        { path: '/defenses/VpnUsage', label: 'VPN Usage' },
        { path: '/defenses/ApplicationSandboxing', label: 'Application Sandboxing' }
    ];

    const frauds = [
        { path: '/frauds/Phishing', label: 'Phishing' },
        { path: '/frauds/Ransomware', label: 'Ransomware' },
        { path: '/frauds/Ddos', label: 'DDoS' },
        { path: '/frauds/Deepfake', label: 'Deepfake' },
        { path: '/frauds/AtmSkimming', label: 'ATM Skimming' },
        { path: '/frauds/InsiderFraud', label: 'Insider Fraud' },
        { path: '/frauds/ManInTheMiddle', label: 'Man In The Middle' },
        { path: '/frauds/SqlInjection', label: 'SQL Injection' },
        { path: '/frauds/BusinessEmailCompromise', label: 'Business Email Compromise' },
        { path: '/frauds/ZeroDayExploit', label: 'Zero-Day Exploit' },
        { path: '/frauds/Vishing', label: 'Vishing' },
        { path: '/frauds/Xss', label: 'XSS' },
        { path: '/frauds/AccountTakeover', label: 'Account Takeover' },
        { path: '/frauds/InvestmentScam', label: 'Investment Scam' },
        { path: '/frauds/SimSwap', label: 'SIM Swap' },
        { path: '/frauds/AuthPushPayments', label: 'Authorized Push Payments' },
        { path: '/frauds/CryptoJacking', label: 'Cryptojacking' },
        { path: '/frauds/BruteForce', label: 'Brute Force' },
        { path: '/frauds/SyntIdentityTheft', label: 'Synthetic Identity Theft' },
        { path: '/frauds/AccAndInvFraud', label: 'Account & Investment Fraud' }
    ];

    return (
        <nav
            className="navigation-panel"
            aria-label="Main navigation"
            ref={navPanelRef}
            onScroll={handleScroll}
        >
            {/* Search Box Placeholder */}
            <div className="nav-search-container">
                <span className="material-symbols-outlined nav-search-icon">search</span>
                <input
                    type="text"
                    className="nav-search-input"
                    placeholder="Search defenses/frauds..."
                    disabled
                    aria-label="Search navigation (coming soon)"
                />
            </div>

            {/* Defenses Section */}
            <div className="nav-section">
                <button
                    className="nav-section-header"
                    onClick={() => toggleSection('defenses')}
                    aria-expanded={expanded.defenses}
                    aria-controls="defenses-list"
                >
                    <span className="nav-section-icon material-symbols-outlined">shield</span>
                    <span className="nav-section-title">DEFENSES</span>
                    <span className={`nav-section-arrow material-symbols-outlined ${expanded.defenses ? 'expanded' : ''}`}>
                        expand_more
                    </span>
                </button>
                <ul
                    id="defenses-list"
                    className={`nav-list ${expanded.defenses ? 'expanded' : 'collapsed'}`}
                    role="list"
                >
                    {defenses.map((defense) => (
                        <li key={defense.path} className="nav-item">
                            <Link
                                to={defense.path}
                                className={`nav-link ${location.pathname === defense.path ? 'active' : ''}`}
                            >
                                {defense.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Frauds Section */}
            <div className="nav-section">
                <button
                    className="nav-section-header"
                    onClick={() => toggleSection('frauds')}
                    aria-expanded={expanded.frauds}
                    aria-controls="frauds-list"
                >
                    <span className="nav-section-icon material-symbols-outlined">warning</span>
                    <span className="nav-section-title">FRAUDS</span>
                    <span className={`nav-section-arrow material-symbols-outlined ${expanded.frauds ? 'expanded' : ''}`}>
                        expand_more
                    </span>
                </button>
                <ul
                    id="frauds-list"
                    className={`nav-list ${expanded.frauds ? 'expanded' : 'collapsed'}`}
                    role="list"
                >
                    {frauds.map((fraud) => (
                        <li key={fraud.path} className="nav-item">
                            <Link
                                to={fraud.path}
                                className={`nav-link ${location.pathname === fraud.path ? 'active' : ''}`}
                            >
                                {fraud.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default NavigationPanel;
