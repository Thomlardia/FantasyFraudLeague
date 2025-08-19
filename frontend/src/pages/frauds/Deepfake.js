import { Link } from 'react-router-dom';

function Deepfake() {
    return (
        <div>
            <h1>Deepfake</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <li>
                        <Link to="/defenses/VerificationProtocols">Verification Protocols</Link>
                    </li>
                    <li>
                        <Link to="/defenses/TamperProofSeals">Tamper Proof Seals</Link>
                    </li>
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    AI-generated fake audio, video, or images used to impersonate individuals for fraud. Examples: fake CEO voice calls requesting wire transfers, manipulated video calls, identity theft.
                </p>
            </div>
        </div>
    );
}

export default Deepfake;