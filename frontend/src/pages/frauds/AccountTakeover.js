import { Link } from 'react-router-dom';

function AccountTakeover() {
    return (
        <div>
            <h1>AccountTakeover</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <li>
                        <Link to="/defenses/MultiFactorAuth">Multi Factor Authentication</Link>
                    </li>
                    <li>
                        <Link to="/defenses/RegularPasswordChanges">Regular Password Changes</Link>
                    </li>
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Unauthorized access to user accounts through credential theft, social engineering, or security bypasses. Example: session hijacking.
                </p>
            </div>
        </div>
    );
}

export default AccountTakeover;