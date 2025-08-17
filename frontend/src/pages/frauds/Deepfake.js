import { Link } from 'react-router-dom';

function Deepfake() {
    return (
        <div>
            <h1>Deepfake</h1>
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