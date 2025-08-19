import { Link } from 'react-router-dom';

function BruteForce() {
    return (
        <div>
            <h1>BruteForce</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <li>
                        <Link to="/defenses/MultiFactorAuth">Multi Factor Authentication</Link>
                    </li>
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Automated attacks using compromised credentials from data breaches to gain unauthorized access. Examples: trying stolen username/password combinations across multiple services.
                </p>
            </div>
        </div>
    );
}

export default BruteForce;