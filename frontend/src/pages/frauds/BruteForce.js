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
        </div>
    );
}

export default BruteForce;