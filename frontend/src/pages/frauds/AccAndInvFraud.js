import { Link } from 'react-router-dom';

function AccAndInvFraud() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>Accounting and Invoice Fraud</h1>
                <Link to="/fraudwiki" className='back-button'>BACK</Link>
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
                        <li>Regular internal and external audits</li>
                        <li>Segregation of duties in financial processes</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AccAndInvFraud;