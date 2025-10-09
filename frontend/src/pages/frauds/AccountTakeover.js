import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function AccountTakeover() {
    return (
        <FraudDetailPage
            title="Account Takeover"
            infoContent={
                <>
                    <p>
                        Account takeover occurs when attackers gain unauthorised access to user accounts via stolen credentials,
                        social engineering, or weak security controls. Once inside, they can steal data, drain funds, or pivot to
                        additional targets.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Credential stuffing using leaked usernames and passwords</li>
                            <li>Session hijacking through malware or network interception</li>
                            <li>Social engineering to reset account credentials</li>
                            <li>SIM swapping to bypass SMS-based authentication</li>
                            <li>Brute-force attacks against weak passwords</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            As online services and credential dumps exploded, account takeover evolved into a major threat. Dark web
                            marketplaces and credential stuffing tools lowered the bar for attackers to monetise compromised access.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/MultiFactorAuth">Multi Factor Authentication</Link>
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
                                href="https://www.proofpoint.com/us/threat-reference/account-takeover-fraud"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Account Takeover
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default AccountTakeover;
