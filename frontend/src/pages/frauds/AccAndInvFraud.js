import { Link } from 'react-router-dom';

function AccAndInvFraud() {
    return (
        <div>
            <h1>AccAndInvFraud</h1>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Manipulating financial records or creating fraudulent invoices for illegitimate payments. Examples: ghost vendors, duplicate invoices, expense reimbursement fraud, financial statement manipulation.
                </p>
            </div>
        </div>
    );
}

export default AccAndInvFraud;