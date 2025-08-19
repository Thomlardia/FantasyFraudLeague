import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';

function VerificationProtocols() {
    return (
        <div className="shop-container">
            <h1>Verification Protocols</h1>
            <Link to="/defenseshop" className="icon-button" title="Back">
                <img src={iconBackArrow} alt="Back" className="icon-img" />
            </Link>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Verification protocols using code words or phrases establish predetermined authentication methods for voice and video communications. These protocols involve agreeing on specific questions, phrases, or information that only legitimate parties would know.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Two-step approval for wire transfers</li>
                            <li>Caller identity verification in customer support</li>
                            <li>Supplier background validation before contracts</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/Deepfake">Deepfake fraud</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default VerificationProtocols;