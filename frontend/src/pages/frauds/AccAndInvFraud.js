import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';
import FraudProtectionChart from '../../components/FraudProtectionChart';
import '../../styles/charts.css';

function AccAndInvFraud() {
    return (
        <FraudDetailPage
            title="Accounting and Invoice Fraud"
            secondaryCardContent={<FraudProtectionChart attackId="accAndInvFraud" variant="horizontal" />}
            infoContent={
                <>
                    <p className="info-paragraph">
                        Accounting and invoice fraud manipulates financial records or introduces fraudulent invoices to divert
                        funds or misrepresent performance. Insiders with privileged access and external attackers alike exploit
                        weak controls to fabricate expenses or vendor payments.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Ghost vendors receiving payments for non-existent services</li>
                            <li>Duplicate invoice submissions slipping through controls</li>
                            <li>Expense reimbursement fraud with fabricated receipts</li>
                            <li>Financial statement manipulation to hide losses</li>
                            <li>Procurement fraud and kickback schemes</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Accounting fraud has existed since early record keeping. Scandals like Enron and Madoff illustrate how
                            weak oversight can lead to billions in losses and organisational collapse.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/RegularAudits" className="info-link">Regular Audits</Link>
                            </li>
                            <li>
                                <Link to="/defenses/SegregationOfDuties" className="info-link">Segregation Of Duties</Link>
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
                                    href="https://precoro.com/blog/what-is-invoice-fraud/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Accounting and Invoice Fraud
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

export default AccAndInvFraud;
