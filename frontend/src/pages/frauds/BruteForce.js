import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';
import FraudProtectionChart from '../../components/FraudProtectionChart';
import '../../styles/charts.css';

function BruteForce() {
    return (
        <FraudDetailPage
            title="Brute Force"
            secondaryCardContent={<FraudProtectionChart attackId="bruteForce" variant="horizontal" />}
            infoContent={
                <>
                    <p className="info-paragraph">
                        Brute force attacks rely on automated tools to attempt logins with stolen username-password pairs, often
                        sourced from previous data breaches. Password reuse means even small success rates generate profit.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Testing leaked credentials on banking or retail portals</li>
                            <li>Botnets running large-scale login attempts</li>
                            <li>Verifying which accounts remain active</li>
                            <li>Targeting high-value services like finance or e-commerce</li>
                            <li>Using residential proxy networks to evade detection</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Brute force attacks surged in the 2010s after mega breaches leaked billions of credential pairs. Yahoo
                            and LinkedIn breaches, for example, fed massive datasets into criminal tools.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/MultiFactorAuth" className="info-link">Multi Factor Authentication</Link>
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
                                    href="https://owasp.org/www-community/attacks/Credential_stuffing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Brute Force
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

export default BruteForce;
