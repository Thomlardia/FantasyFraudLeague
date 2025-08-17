import { Link } from 'react-router-dom';

function DeepfakeDetection() {
    return (
        <div>
            <h1>DeepfakeDetection</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Deepfake detection software uses artificial intelligence and machine learning algorithms to identify artificially generated or manipulated audio, video, and image content.
                </p>
            </div>
        </div>
    );
}

export default DeepfakeDetection;