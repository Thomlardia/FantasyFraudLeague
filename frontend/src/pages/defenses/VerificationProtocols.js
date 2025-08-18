import { Link } from 'react-router-dom';

function VerificationProtocols() {
    return (
        <div className="shop-container">
            <h1>Verification Protocols</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="description-card">
                <p>
                    Verification protocols using code words or phrases establish predetermined authentication methods for voice and video communications. These protocols involve agreeing on specific questions, phrases, or information that only legitimate parties would know.
                </p>
            </div>
        </div>
    );
}

export default VerificationProtocols;