import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function InsiderFraud() {
    return (
        <FraudDetailPage
            title="Insider Fraud"
            infoContent={
                <>
                    <p>
                        Insider fraud arises when employees, contractors, or other trusted individuals abuse authorised access to
                        steal data, embezzle funds, or sabotage systems. Their knowledge of controls makes detection challenging.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Data theft and sale to competitors or criminal groups</li>
                            <li>Embezzlement by manipulating financial systems</li>
                            <li>Sabotaging systems or processes for retaliation</li>
                            <li>Unauthorised access to confidential customer information</li>
                            <li>Privilege abuse to bypass security checks</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Insider fraud is as old as organised workforces. Digital systems amplified its impact, with cases like
                            Edward Snowden demonstrating how insider threats can affect national security.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/BackgroundChecks">Background Checks</Link>
                            </li>
                            <li>
                                <Link to="/defenses/PrincipleOfLeastPrivilege">Principle Of Least Privilege</Link>
                            </li>
                            <li>
                                <Link to="/defenses/SegregationOfDuties">Segregation Of Duties</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.fraud.net/glossary/internal-fraud-insider-fraud#what-is-insider-fraud"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Insider Fraud
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default InsiderFraud;
