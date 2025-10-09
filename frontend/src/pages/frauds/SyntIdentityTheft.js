import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function SyntIdentityTheft() {
    return (
        <FraudDetailPage
            title="Synthetic Identity Theft"
            infoContent={
                <>
                    <p>
                        Synthetic identity theft constructs fake identities by combining real and fabricated personal data. Criminals
                        slowly build credit histories and use the synthetic identity for fraud, often evading detection for years.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Pairing real Social Security numbers with invented names and addresses</li>
                            <li>Creating credit profiles and nurturing them for larger fraud later</li>
                            <li>Opening bank accounts using synthetic identities</li>
                            <li>Claiming government benefits with fabricated personas</li>
                            <li>Laundering money through synthetic accounts</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Synthetic identity fraud grew alongside automated credit decisions and fewer in-person checks. Massive
                            data breaches provide the personal data needed to fabricate identities.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/BackgroundChecks">Background Checks</Link>
                            </li>
                            <li>
                                <Link to="/defenses/RegularPasswordChanges">Regular Password Changes</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.equifax.com/personal/education/identity-theft/articles/-/learn/synthetic-identity-theft/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Synthetic Identity Theft
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default SyntIdentityTheft;
