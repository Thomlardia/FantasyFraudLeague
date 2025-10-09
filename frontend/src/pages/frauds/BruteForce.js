import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function BruteForce() {
    return (
        <FraudDetailPage
            title="Brute Force"
            infoContent={
                <>
                    <p>
                        Brute force attacks rely on automated tools to attempt logins with stolen username-password pairs, often
                        sourced from previous data breaches. Password reuse means even small success rates generate profit.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Testing leaked credentials on banking or retail portals</li>
                            <li>Botnets running large-scale login attempts</li>
                            <li>Verifying which accounts remain active</li>
                            <li>Targeting high-value services like finance or e-commerce</li>
                            <li>Using residential proxy networks to evade detection</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Brute force attacks surged in the 2010s after mega breaches leaked billions of credential pairs. Yahoo
                            and LinkedIn breaches, for example, fed massive datasets into criminal tools.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/MultiFactorAuth">Multi Factor Authentication</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://owasp.org/www-community/attacks/Credential_stuffing"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Brute Force
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default BruteForce;
