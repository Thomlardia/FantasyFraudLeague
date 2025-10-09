import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function Phishing() {
    return (
        <FraudDetailPage
            title="Phishing"
            infoContent={
                <>
                    <p>
                        Phishing is a cybercrime where attackers impersonate trusted organisations through fraudulent emails,
                        websites, or messages to steal credentials, personal data, or money. These scams rely on urgency and trust,
                        often mimicking brand visuals and language.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Fake banking emails requesting account verification</li>
                            <li>Fraudulent login pages that capture credentials</li>
                            <li>Urgent payment requests claiming account suspension</li>
                            <li>Spear phishing targeting specific individuals or teams</li>
                            <li>Clone phishing where legitimate emails are modified with malicious links</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            The term &quot;phishing&quot; emerged in the 1990s, inspired by &quot;fishing&quot; for victims. Attacks
                            evolved from simple email scams into sophisticated, targeted campaigns run by organised crime groups.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/MultiFactorAuth">Multi Factor Authentication</Link>
                            </li>
                            <li>
                                <Link to="/defenses/UserEducation">User Education</Link>
                            </li>
                            <li>
                                <Link to="/defenses/EmailFiltering">Email Filtering</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.cloudflare.com/learning/access-management/phishing-attack"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Phishing
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default Phishing;
