import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function Deepfake() {
    return (
        <FraudDetailPage
            title="Deepfake"
            infoContent={
                <>
                    <p>
                        Deepfake fraud uses AI-generated synthetic media to impersonate trusted voices or faces. Attackers craft
                        realistic audio, video, or images to authorise payments or extract sensitive information.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Fake CEO voice calls requesting urgent wire transfers</li>
                            <li>Manipulated video calls during business negotiations</li>
                            <li>Synthetic identities used to open accounts</li>
                            <li>Fake audio messages from relatives requesting money</li>
                            <li>Manipulated evidence in legal disputes</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Coined in 2017 by combining &quot;deep learning&quot; and &quot;fake,&quot; the first known deepfake
                            fraud occurred in 2019 when a CEO&apos;s voice was mimicked to authorise a wire transfer. The threat has
                            grown rapidly since.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/VerificationProtocols">Verification Protocols</Link>
                            </li>
                            <li>
                                <Link to="/defenses/DeepfakeDetection">Deepfake Detection</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.feedzai.com/blog/deepfake-fraud/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Deepfake
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default Deepfake;
