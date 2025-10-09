import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function Phishing() {
    return (
        <FraudDetailPage
            title="Phishing"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Phishing is a cybercrime where attackers impersonate trusted organisations through fraudulent emails,
                        websites, or messages to steal credentials, personal data, or money. These scams rely on urgency and trust,
                        often mimicking brand visuals and language.
                    </p>

                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Fake banking emails requesting account verification</li>
                            <li>Fraudulent login pages that capture credentials</li>
                            <li>Urgent payment requests claiming account suspension</li>
                            <li>Spear phishing targeting specific individuals or teams</li>
                            <li>Clone phishing where legitimate emails are modified with malicious links</li>
                        </ul>
                    </div>

                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            The term &quot;phishing&quot; emerged in the 1990s, inspired by &quot;fishing&quot; for victims. Attacks
                            evolved from simple email scams into sophisticated, targeted campaigns run by organised crime groups.
                        </p>
                    </div>

                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/MultiFactorAuth" className="info-link">
                                    Multi Factor Authentication
                                </Link>
                            </li>
                            <li>
                                <Link to="/defenses/UserEducation" className="info-link">
                                    User Education
                                </Link>
                            </li>
                            <li>
                                <Link to="/defenses/EmailFiltering" className="info-link">
                                    Email Filtering
                                </Link>
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
                                    href="https://www.cloudflare.com/learning/access-management/phishing-attack"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Cloudflare: Phishing Attack
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

export default Phishing;
