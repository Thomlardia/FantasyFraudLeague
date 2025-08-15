import { Link } from 'react-router-dom';

function AtmSkimming() {
    return (
        <div>
            <h1>AtmSkimming</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <li>
                        <Link to="/defenses/TamperProofSeals">Tamper Proof Seals</Link>
                    </li>
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>
        </div>
    );
}

export default AtmSkimming;