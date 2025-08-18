import { Link } from 'react-router-dom';

function MultiFactorAuth() {
    return (
        <div>
            <h1>MultiFactorAuth</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/Phishing">Phishing</Link>
                    </li>
                    <li>
                        <Link to="/frauds/AccountTakeover">Account Takeover</Link>
                    </li>
                    <li>
                        <Link to="/frauds/BruteForce">Brute Force - Credential Stuffing</Link>
                    </li>
                    <li>
                        <Link to="/frauds/SimSwap">SIM Swap Fraud</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default MultiFactorAuth;