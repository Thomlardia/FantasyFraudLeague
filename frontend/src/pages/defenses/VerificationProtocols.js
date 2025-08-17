import { Link } from 'react-router-dom';

function VerificationProtocols() {
    return (
        <div>
            <h1>VerificationProtocols</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Verification protocols using code words or phrases establish predetermined authentication methods for voice and video communications. These protocols involve agreeing on specific questions, phrases, or information that only legitimate parties would know.
                </p>
            </div>
        </div>
    );
}

export default VerificationProtocols;