import { Link } from 'react-router-dom';

function RegularPasswordChanges() {
    return (
        <div>
            <h1>RegularPasswordChanges</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/AccountTakeover">Account Takeover</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default RegularPasswordChanges;