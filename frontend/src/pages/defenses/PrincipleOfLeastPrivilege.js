import { Link } from 'react-router-dom';

function PrincipleOfLeastPrivilege() {
    return (
        <div>
            <h1>PrincipleOfLeastPrivilege</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/InsiderFraud">Insider Fraud</Link>
                    </li>
                    <li>
                        <Link to="/frauds/SqlInjection">SQL Injection</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default PrincipleOfLeastPrivilege;