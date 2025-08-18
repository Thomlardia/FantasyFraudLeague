import { Link } from 'react-router-dom';

function DeepfakeDetection() {
    return (
        <div className="shop-container">
            <h1>Deepfake Detection</h1>
            <Link to="/defenseshop" className='icon-button'>く</Link>

            <div className="description-card">
                <p>
                    Deepfake detection software uses artificial intelligence and machine learning algorithms to identify artificially generated or manipulated audio, video, and image content.
                </p>
            </div>
        </div>
    );
}

export default DeepfakeDetection;