import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function Deepfake() {
    return (
        <FraudDetailPage
            title="Deepfake"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Deepfake fraud uses AI-generated synthetic media to impersonate trusted voices or faces. Attackers craft
                        realistic audio, video, or images to authorise payments or extract sensitive information.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Fake CEO voice calls requesting urgent wire transfers</li>
                            <li>Manipulated video calls during business negotiations</li>
                            <li>Synthetic identities used to open accounts</li>
                            <li>Fake audio messages from relatives requesting money</li>
                            <li>Manipulated evidence in legal disputes</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Coined in 2017 by combining &quot;deep learning&quot; and &quot;fake,&quot; the first known deepfake
                            fraud occurred in 2019 when a CEO&apos;s voice was mimicked to authorise a wire transfer. The threat has
                            grown rapidly since.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/VerificationProtocols" className="info-link">Verification Protocols</Link>
                            </li>
                            <li>
                                <Link to="/defenses/DeepfakeDetection" className="info-link">Deepfake Detection</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">link</span>
                            Reference
                        </h3>
                        <ul className="info-list">
                            <li>
                                <a
                                    href="https://www.feedzai.com/blog/deepfake-fraud/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Deepfake
                                    <span className="material-symbols-outlined">open_in_new</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default Deepfake;
