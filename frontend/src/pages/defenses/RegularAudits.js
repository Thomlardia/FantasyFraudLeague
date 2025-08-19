import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';

function RegularAudits() {
    return (
        <div className="shop-container">
            <h1>Regular Audits</h1>
            <Link to="/defenseshop" className="icon-button" title="Back">
                <img src={iconBackArrow} alt="Back" className="icon-img" />
            </Link>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Regular audits involve systematic examination of financial records, processes, and controls to detect irregularities and ensure compliance. These reviews analyze transaction patterns, verify the legitimacy of vendors and invoices.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Reviewing employee expense claims</li>
                            <li>Checking system access logs</li>
                            <li>Validating vendor invoices</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/AccAndInvFraud">Account and Invoice Fraud</Link>
                        </li>
                        <li>
                            <Link to="/frauds/InsiderFraud">Insider Fraud</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RegularAudits;