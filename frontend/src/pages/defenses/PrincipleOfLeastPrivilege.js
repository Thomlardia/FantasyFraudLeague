import { Link } from 'react-router-dom';

function PrincipleOfLeastPrivilege() {
    return (
        <div className="shop-container">
            <h1>Principle of Least Privilege</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>
            
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