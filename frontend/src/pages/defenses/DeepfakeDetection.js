import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function DeepfakeDetection() {
    return (
        <DefenseDetailPage
            defenseKey="deepfakeDetection"
            title="Deepfake Detection"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Deepfake detection tools apply AI and machine learning to flag artificially generated or manipulated audio,
                        video, and image content before it can be abused in scams.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Screening video-based job interviews for synthetic faces</li>
                            <li>Validating executive voice requests in customer service channels</li>
                            <li>Reviewing marketing assets for manipulated imagery</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/Deepfake" className="info-link">Deepfake</Link>
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
                                    href="https://www.edps.europa.eu/data-protection/technology-monitoring/techsonar/deepfake-detection_en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Deepfake Detection
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

export default DeepfakeDetection;
