import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';
import FraudProtectionChart from '../../components/FraudProtectionChart';
import '../../styles/charts.css';

function Xss() {
    return (
        <FraudDetailPage
            title="XSS"
            secondaryCardContent={<FraudProtectionChart attackId="xss" variant="horizontal" />}
            infoContent={
                <>
                    <p className="info-paragraph">
                        Cross-Site Scripting (XSS) injects malicious scripts into webpages so they execute in other users&apos;
                        browsers. Attackers can steal session cookies, hijack accounts, redirect users, or deface content.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Stored XSS in comment sections or forums</li>
                            <li>Reflected XSS delivered via crafted links</li>
                            <li>DOM-based XSS manipulating client-side scripts</li>
                            <li>Session hijacking using stolen cookies</li>
                            <li>Keylogging with injected JavaScript</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Documented in the late 1990s, XSS escalated as dynamic web applications flourished. Despite awareness, it
                            persists due to complex code paths and inconsistent validation.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/InputValidation" className="info-link">Input Validation</Link>
                            </li>
                            <li>
                                <Link to="/defenses/KeepUpdated" className="info-link">Keep Updated</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">link</span>
                            Reference
                        </h3>
                        <ul className="info-list">
                            <li>
                                <a
                                    href="https://portswigger.net/web-security/cross-site-scripting"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Cross-Site Scripting
                                    <span className="material-symbols-outlined">open_in_new</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default Xss;
