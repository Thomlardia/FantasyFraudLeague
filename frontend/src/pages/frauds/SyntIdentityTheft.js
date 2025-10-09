import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function SyntIdentityTheft() {
    return (
        <FraudDetailPage
            title="Synthetic Identity Theft"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Synthetic identity theft constructs fake identities by combining real and fabricated personal data. Criminals
                        slowly build credit histories and use the synthetic identity for fraud, often evading detection for years.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Pairing real Social Security numbers with invented names and addresses</li>
                            <li>Creating credit profiles and nurturing them for larger fraud later</li>
                            <li>Opening bank accounts using synthetic identities</li>
                            <li>Claiming government benefits with fabricated personas</li>
                            <li>Laundering money through synthetic accounts</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Synthetic identity fraud grew alongside automated credit decisions and fewer in-person checks. Massive
                            data breaches provide the personal data needed to fabricate identities.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/BackgroundChecks" className="info-link">Background Checks</Link>
                            </li>
                            <li>
                                <Link to="/defenses/RegularPasswordChanges" className="info-link">Regular Password Changes</Link>
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
                                    href="https://www.equifax.com/personal/education/identity-theft/articles/-/learn/synthetic-identity-theft/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Synthetic Identity Theft
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

export default SyntIdentityTheft;
