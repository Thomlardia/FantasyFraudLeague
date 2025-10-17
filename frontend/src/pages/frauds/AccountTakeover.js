import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';
import FraudProtectionChart from '../../components/FraudProtectionChart';
import '../../styles/charts.css';

function AccountTakeover() {
    return (
        <FraudDetailPage
            title="Account Takeover"
            secondaryCardContent={<FraudProtectionChart attackId="accountTakeover" variant="horizontal" />}
            infoContent={
                <>
                    <p className="info-paragraph">
                        Account takeover occurs when attackers gain unauthorised access to user accounts via stolen credentials,
                        social engineering, or weak security controls. Once inside, they can steal data, drain funds, or pivot to
                        additional targets.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Credential stuffing using leaked usernames and passwords</li>
                            <li>Session hijacking through malware or network interception</li>
                            <li>Social engineering to reset account credentials</li>
                            <li>SIM swapping to bypass SMS-based authentication</li>
                            <li>Brute-force attacks against weak passwords</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            As online services and credential dumps exploded, account takeover evolved into a major threat. Dark web
                            marketplaces and credential stuffing tools lowered the bar for attackers to monetise compromised access.
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
                                    href="https://www.proofpoint.com/us/threat-reference/account-takeover-fraud"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Account Takeover
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

export default AccountTakeover;
