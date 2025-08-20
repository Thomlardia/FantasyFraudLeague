import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';

function PrincipleOfLeastPrivilege() {
    return (
        <div className="shop-container">
            
            <div className="header">
                <Link to="/defenseshop" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1>Principle Of Least Privilege</h1>
                <div></div>
            </div>
            <div className="content-container">
                <div className="description-card">
                    <p>
                        The principle of least privilege grants users, applications, and systems only the minimum level of access necessary to perform their required functions. For databases, certain accounts have limited query capabilities and employees only access systems relevant to their jobs.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Interns only get read-only access to databases</li>
                            <li>Finance staff can’t alter payroll code</li>
                            <li>Admin rights restricted to IT team</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/InsiderFraud">Insider Fraud</Link>
                        </li>
                        <li>
                            <Link to="/frauds/SqlInjection">SQL Injection</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PrincipleOfLeastPrivilege;