import { Link } from 'react-router-dom';

function SimSwap() {
    return (
        <div>
            <h1>SimSwap</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <Link to="/defenses/MultiFactorAuth">Multi Factor Authentication</Link>
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>
        </div>
    );
}

export default SimSwap;