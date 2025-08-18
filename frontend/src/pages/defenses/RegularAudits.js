import { Link } from 'react-router-dom';

function RegularAudits() {
    return (
        <div className="shop-container">
            <h1>Regular Audits</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="description-card">
                <p>
                    Regular audits involve systematic examination of financial records, processes, and controls to detect irregularities and ensure compliance. These reviews analyze transaction patterns, verify the legitimacy of vendors and invoices.
                </p>
            </div>
        </div>
    );
}

export default RegularAudits;