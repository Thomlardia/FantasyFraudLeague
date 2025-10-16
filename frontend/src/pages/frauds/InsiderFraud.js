import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';
import FraudProtectionChart from '../../components/FraudProtectionChart';
import '../../styles/charts.css';

function InsiderFraud() {
    return (
        <FraudDetailPage
            title="Insider Fraud"
            secondaryCardContent={<FraudProtectionChart attackId="insiderFraud" variant="horizontal" />}
            infoContent={
                <>
                    <p className="info-paragraph">
                        Insider fraud arises when employees, contractors, or other trusted individuals abuse authorised access to
                        steal data, embezzle funds, or sabotage systems. Their knowledge of controls makes detection challenging.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Data theft and sale to competitors or criminal groups</li>
                            <li>Embezzlement by manipulating financial systems</li>
                            <li>Sabotaging systems or processes for retaliation</li>
                            <li>Unauthorised access to confidential customer information</li>
                            <li>Privilege abuse to bypass security checks</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Insider fraud is as old as organised workforces. Digital systems amplified its impact, with cases like
                            Edward Snowden demonstrating how insider threats can affect national security.
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
                                <Link to="/defenses/PrincipleOfLeastPrivilege" className="info-link">Principle Of Least Privilege</Link>
                            </li>
                            <li>
                                <Link to="/defenses/SegregationOfDuties" className="info-link">Segregation Of Duties</Link>
                            </li>
                            <li>
                                <Link to="/defenses/RegulatedAutoBackup" className="info-link">Regulated Automated Backups</Link>
                            </li>
                            <li>
                                <Link to="/defenses/NetworkMonitoring" className="info-link">Network Monitoring</Link>
                            </li>
                            <li>
                                <Link to="/defenses/RegularAudits" className="info-link">Regular Audits</Link>
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
                                    href="https://www.fraud.net/glossary/internal-fraud-insider-fraud#what-is-insider-fraud"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Insider Fraud
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

export default InsiderFraud;
