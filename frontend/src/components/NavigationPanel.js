import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/navigationPanel.css';

function NavigationPanel() {
    const location = useLocation();
    const navigate = useNavigate();
    const navPanelRef = useRef(null);
    const [expanded, setExpanded] = useState({
        defenses: true,
        frauds: true
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [isAtBottom, setIsAtBottom] = useState(false);
    const savedScrollPositionRef = useRef(0);

    // Detect if scrolled to bottom
    useEffect(() => {
        const scrollContainer = navPanelRef.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
            const atBottom = scrollHeight - scrollTop - clientHeight < 10; // 10px threshold
            setIsAtBottom(atBottom);
        };

        scrollContainer.addEventListener('scroll', handleScroll);
        // Check initial state
        handleScroll();

        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle scroll indicator click
    const handleScrollIndicatorClick = () => {
        if (!navPanelRef.current) return;

        // Check if any folder is minimized
        const anyMinimized = !expanded.defenses || !expanded.frauds;

        if (anyMinimized) {
            // Open all folders first
            setExpanded({
                defenses: true,
                frauds: true
            });
            // Wait for DOM to update, then scroll to bottom
            setTimeout(() => {
                if (navPanelRef.current) {
                    navPanelRef.current.scrollTo({
                        top: navPanelRef.current.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            }, 200);
        } else if (isAtBottom) {
            // Scroll to top
            navPanelRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Scroll to bottom
            navPanelRef.current.scrollTo({
                top: navPanelRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    // Auto-scroll to active item and expand its section when pathname changes
    useEffect(() => {
        // If navigation was from a click, restore scroll position instantly (no animation)
        if (location.state?.fromNavClick && location.state?.scrollPosition !== undefined) {
            if (navPanelRef.current) {
                navPanelRef.current.scrollTop = location.state.scrollPosition;
            }
            return;
        }

        // Determine which section contains the current path
        const isDefense = location.pathname.startsWith('/defenses/');
        const isFraud = location.pathname.startsWith('/frauds/');

        // Expand the appropriate section if it's collapsed
        if (isDefense && !expanded.defenses) {
            setExpanded(prev => ({ ...prev, defenses: true }));
        } else if (isFraud && !expanded.frauds) {
            setExpanded(prev => ({ ...prev, frauds: true }));
        }

        // Wait for DOM to update after expansion, then scroll to active link with animation
        setTimeout(() => {
            const activeLink = navPanelRef.current?.querySelector('.nav-link.active');
            if (activeLink) {
                activeLink.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 150); // Delay to ensure section expansion animation completes
    }, [location.pathname, location.state]);

    // Handle link clicks - save scroll position and navigate with state
    const handleLinkClick = (e, path) => {
        e.preventDefault();

        // Save current scroll position
        const scrollPosition = navPanelRef.current?.scrollTop || 0;

        // Navigate with state to indicate this was a click
        navigate(path, {
            state: {
                fromNavClick: true,
                scrollPosition: scrollPosition
            }
        });
    };

    const toggleSection = (section) => {
        setExpanded(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Auto-expand both sections when user starts typing
        if (query.trim()) {
            setExpanded({
                defenses: true,
                frauds: true
            });
        }
    };

    // Filter items based on search query
    const filterItems = (items) => {
        if (!searchQuery.trim()) return items;
        return items.filter(item =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // Handle Enter key to navigate to first result
    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Get first result from defenses, if none then from frauds
            const filteredDefenses = filterItems(defenses);
            const filteredFrauds = filterItems(frauds);

            const firstResult = filteredDefenses.length > 0
                ? filteredDefenses[0]
                : filteredFrauds.length > 0
                    ? filteredFrauds[0]
                    : null;

            if (firstResult) {
                // Navigate to the first result without page reload
                navigate(firstResult.path);
            }
        }
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
        >
            {/* Search Box - Fixed */}
            <div className="nav-search-container">
                <span className="material-symbols-outlined nav-search-icon">search</span>
                <input
                    type="text"
                    className="nav-search-input"
                    placeholder="Search defenses/frauds..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    aria-label="Search navigation"
                />
            </div>

            {/* Scrollable Content */}
            <div
                className="nav-scrollable-content"
                ref={navPanelRef}
            >
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
                    {filterItems(defenses).map((defense) => (
                        <li key={defense.path} className="nav-item">
                            <Link
                                to={defense.path}
                                className={`nav-link ${location.pathname === defense.path ? 'active' : ''}`}
                                onClick={(e) => handleLinkClick(e, defense.path)}
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
                    {filterItems(frauds).map((fraud) => (
                        <li key={fraud.path} className="nav-item">
                            <Link
                                to={fraud.path}
                                className={`nav-link ${location.pathname === fraud.path ? 'active' : ''}`}
                                onClick={(e) => handleLinkClick(e, fraud.path)}
                            >
                                {fraud.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            </div>

            {/* Bottom Scroll Indicator - Fixed */}
            <div className="nav-bottom-indicator">
                <button
                    className={`nav-scroll-hint ${(!expanded.defenses || !expanded.frauds) ? 'down' : (isAtBottom ? 'up' : 'down')}`}
                    onClick={handleScrollIndicatorClick}
                    aria-label={(!expanded.defenses || !expanded.frauds) ? "Expand all and scroll to bottom" : (isAtBottom ? "Scroll to top" : "Scroll to bottom")}
                >
                    <span className="material-symbols-outlined">
                        {(!expanded.defenses || !expanded.frauds) ? 'expand_more' : (isAtBottom ? 'expand_less' : 'expand_more')}
                    </span>
                </button>
            </div>
        </nav>
    );
}

export default NavigationPanel;
