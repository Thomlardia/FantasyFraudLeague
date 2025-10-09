import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function MultiFactorAuth() {
    return (
        <DefenseDetailPage
            defenseKey="mfa"
            title="Multi Factor Auth"
            infoContent={
                <>
                    <p>
                        Multi-factor authentication (MFA) requires users to supply two or more verification factors before access is
                        granted. Combining knowledge, possession, and biometric factors drastically reduces the impact of compromised
                        passwords.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Online banking logins that pair passwords with one-time codes</li>
                            <li>Corporate VPN access requiring hardware tokens</li>
                            <li>Cloud service sign-ins that prompt for push approvals</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://csrc.nist.gov/glossary/term/multi_factor_authentication"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Multi-Factor Authentication
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/Phishing">Phishing</Link>
                            </li>
                            <li>
                                <Link to="/frauds/AccountTakeover">Account Takeover</Link>
                            </li>
                            <li>
                                <Link to="/frauds/BruteForce">Brute Force &mdash; Credential Stuffing</Link>
                            </li>
                            <li>
                                <Link to="/frauds/SimSwap">SIM Swap Fraud</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default MultiFactorAuth;
