import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function RegularAudits() {
    return (
        <DefenseDetailPage
            defenseKey="regularAudits"
            title="Regular Audits"
            infoContent={
                <>
                    <p>
                        Regular audits systematically examine financial records, processes, and controls to detect irregularities,
                        confirm compliance, and validate that transactions match documented policies.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Reviewing employee expense claims for anomalies</li>
                            <li>Checking privileged system access logs</li>
                            <li>Validating vendor invoices and supporting documents</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.capptions.com/blog/what-is-an-audit"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Regular Audits
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/AccAndInvFraud">Account and Invoice Fraud</Link>
                            </li>
                            <li>
                                <Link to="/frauds/InsiderFraud">Insider Fraud</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default RegularAudits;
