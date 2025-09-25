import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function AccAndInvFraud() {
    return (
        <div className="fraud-container">
            <div className="topbar">
            <div className="topbar-group">
                <Link to="/fraudwiki" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
            </div>
            <MoneyBar />
            <div className="topbar-group"></div>
            </div>
            <div className="header">

                <h1>Accountng and invoice fraud</h1>
                <div></div>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Accounting and invoice fraud manipulates financial records or introduces fake invoices 
                        to divert funds or misrepresent financial health. It may be carried out by employees 
                        with insider access or external actors infiltrating accounting systems. 
                        This type of fraud ranges from simple expense manipulation to large-scale corporate scandals.
                    </p>
                    <br />
                    <p>
                        <a href="https://precoro.com/blog/what-is-invoice-fraud/" target="_blank" rel="noopener noreferrer">
                            Reference: Accounting and Invoice Fraud
                        </a>.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Ghost vendors receiving payments for non-existent services</li>
                        <li>Duplicate invoice submissions</li>
                        <li>Expense reimbursement fraud with fabricated receipts</li>
                        <li>Financial statement manipulation to hide losses</li>
                        <li>Procurement fraud and kickback schemes</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        Accounting fraud has existed since the earliest financial records. 
                        High-profile scandals like Enron (2001) and Bernie Madoff's Ponzi scheme 
                        exposed the scale of damage it can cause, from billions in losses 
                        to complete organizational collapse.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>
                            <Link to="/defenses/RegularAudits">Regular Audits</Link>
                        </li>
                        <li>
                            <Link to="/defenses/SegregationOfDuties">Segregation Of Duties</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AccAndInvFraud;