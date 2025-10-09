import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function DeepfakeDetection() {
    return (
        <DefenseDetailPage
            defenseKey="deepfakeDetection"
            title="Deepfake Detection"
            infoContent={
                <>
                    <p>
                        Deepfake detection tools apply AI and machine learning to flag artificially generated or manipulated audio,
                        video, and image content before it can be abused in scams.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Screening video-based job interviews for synthetic faces</li>
                            <li>Validating executive voice requests in customer service channels</li>
                            <li>Reviewing marketing assets for manipulated imagery</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.edps.europa.eu/data-protection/technology-monitoring/techsonar/deepfake-detection_en"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Deepfake Detection
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/Deepfake">Deepfake</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default DeepfakeDetection;
