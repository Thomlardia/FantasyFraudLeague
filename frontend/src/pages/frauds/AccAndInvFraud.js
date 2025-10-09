import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function AccAndInvFraud() {
    return (
        <FraudDetailPage
            title="Accounting and Invoice Fraud"
            infoContent={
                <>
                    <p>
                        Accounting and invoice fraud manipulates financial records or introduces fraudulent invoices to divert
                        funds or misrepresent performance. Insiders with privileged access and external attackers alike exploit
                        weak controls to fabricate expenses or vendor payments.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Ghost vendors receiving payments for non-existent services</li>
                            <li>Duplicate invoice submissions slipping through controls</li>
                            <li>Expense reimbursement fraud with fabricated receipts</li>
                            <li>Financial statement manipulation to hide losses</li>
                            <li>Procurement fraud and kickback schemes</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Accounting fraud has existed since early record keeping. Scandals like Enron and Madoff illustrate how
                            weak oversight can lead to billions in losses and organisational collapse.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/RegularAudits">Regular Audits</Link>
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
                                href="https://precoro.com/blog/what-is-invoice-fraud/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Accounting and Invoice Fraud
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default AccAndInvFraud;
