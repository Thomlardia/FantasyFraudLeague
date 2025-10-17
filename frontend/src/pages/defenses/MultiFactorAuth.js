import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function MultiFactorAuth() {
    return (
        <DefenseDetailPage
            defenseKey="mfa"
            title="Multi Factor Auth"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Multi-factor authentication (MFA) requires users to supply two or more verification factors before access is
                        granted. Combining knowledge, possession, and biometric factors drastically reduces the impact of compromised
                        passwords.
                    </p>

                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">check_circle</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Online banking logins that pair passwords with one-time codes</li>
                            <li>Corporate VPN access requiring hardware tokens</li>
                            <li>Cloud service sign-ins that prompt for push approvals</li>
                        </ul>
                    </div>

                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/Phishing" className="info-link">
                                    Phishing
                                </Link>
                            </li>
                            <li>
                                <Link to="/frauds/AccountTakeover" className="info-link">
                                    Account Takeover
                                </Link>
                            </li>
                            <li>
                                <Link to="/frauds/BruteForce" className="info-link">
                                    Brute Force &mdash; Credential Stuffing
                                </Link>
                            </li>
                            <li>
                                <Link to="/frauds/SimSwap" className="info-link">
                                    SIM Swap Fraud
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
                                    href="https://csrc.nist.gov/glossary/term/multi_factor_authentication"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    NIST: Multi-Factor Authentication
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

export default MultiFactorAuth;
