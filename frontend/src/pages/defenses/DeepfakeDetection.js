import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';

function DeepfakeDetection() {
    return (
        <div className="shop-container">
            <h1>Deepfake Detection</h1>
            <Link to="/defenseshop" className='icon-button' title="Back">
                <img src={iconBackArrow} alt="Back" className="icon-img" />
            </Link>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Deepfake detection software uses artificial intelligence and machine learning algorithms to identify artificially generated or manipulated audio, video, and image content.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Screening video-based job interviews</li>
                            <li>Ensuring software updates on ATMs</li>
                            <li>Detecting fake audio commands in customer service</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/Deepfake">Deepfake</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DeepfakeDetection;