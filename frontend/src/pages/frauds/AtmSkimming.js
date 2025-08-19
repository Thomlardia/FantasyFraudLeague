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

            <div className="descriptionCard">
                <p>
                    Physical devices attached to ATMs to steal card data and PINs. Examples: card readers overlaid on ATM slots, hidden cameras recording PIN entry, Bluetooth skimmers.
                </p>
            </div>
        </div>
    );
}

export default AtmSkimming;