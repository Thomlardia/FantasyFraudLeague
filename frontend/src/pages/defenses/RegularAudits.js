import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function RegularAudits() {
    return (
        <DefenseDetailPage
            defenseKey="regularAudits"
            title="Regular Audits"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Regular audits systematically examine financial records, processes, and controls to detect irregularities,
                        confirm compliance, and validate that transactions match documented policies.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Reviewing employee expense claims for anomalies</li>
                            <li>Checking privileged system access logs</li>
                            <li>Validating vendor invoices and supporting documents</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/AccAndInvFraud" className="info-link">Account and Invoice Fraud</Link>
                            </li>
                            <li>
                                <Link to="/frauds/InsiderFraud" className="info-link">Insider Fraud</Link>
                            </li>
                            <li>
                                <Link to="/frauds/BusinessEmailCompromise" className="info-link">Business Email Compromise</Link>
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
                                    href="https://www.capptions.com/blog/what-is-an-audit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Regular Audits
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

export default RegularAudits;
