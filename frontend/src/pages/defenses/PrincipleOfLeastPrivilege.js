import { Link } from 'react-router-dom';

function PrincipleOfLeastPrivilege() {
    return (
        <div className="shop-container">
            <h1>Principle of Least Privilege</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="description-card">
                <p>
                    The principle of least privilege grants users, applications, and systems only the minimum level of access necessary to perform their required functions. For databases, certain accounts have limited query capabilities and employees only access systems relevant to their jobs.
                </p>
            </div>
        </div>
    );
}

export default PrincipleOfLeastPrivilege;