import { Link } from 'react-router-dom';

function RegularAudits() {
    return (
        <div>
            <h1>RegularAudits</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Regular audits involve systematic examination of financial records, processes, and controls to detect irregularities and ensure compliance. These reviews analyze transaction patterns, verify the legitimacy of vendors and invoices.
                </p>
            </div>
        </div>
    );
}

export default RegularAudits;