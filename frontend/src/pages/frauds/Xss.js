import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function Xss() {
    return (
        <FraudDetailPage
            title="XSS"
            infoContent={
                <>
                    <p>
                        Cross-Site Scripting (XSS) injects malicious scripts into webpages so they execute in other users&apos;
                        browsers. Attackers can steal session cookies, hijack accounts, redirect users, or deface content.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Stored XSS in comment sections or forums</li>
                            <li>Reflected XSS delivered via crafted links</li>
                            <li>DOM-based XSS manipulating client-side scripts</li>
                            <li>Session hijacking using stolen cookies</li>
                            <li>Keylogging with injected JavaScript</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Documented in the late 1990s, XSS escalated as dynamic web applications flourished. Despite awareness, it
                            persists due to complex code paths and inconsistent validation.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/InputValidation">Input Validation</Link>
                            </li>
                            <li>
                                <Link to="/defenses/KeepUpdated">Keep Updated</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://portswigger.net/web-security/cross-site-scripting"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cross-Site Scripting
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default Xss;
