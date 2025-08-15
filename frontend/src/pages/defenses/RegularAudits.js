import { Link } from 'react-router-dom';

function RegularAudits() {
    return (
        <div>
            <h1>RegularAudits</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/AccAndInvFraud">Account and Invoice Fraud</Link>
                    </li>
                    <li>
                        <Link to="/frauds/InsiderFraud">Insider Fraud</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default RegularAudits;