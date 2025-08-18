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

            <div className="descriptionCard">
                <p>
                    Attackers transfer victim's phone number to their own SIM card to bypass SMS-based authentication. Examples: gaining access to bank accounts, cryptocurrency wallets, social media.
                </p>
            </div>
        </div>
    );
}

export default SimSwap;