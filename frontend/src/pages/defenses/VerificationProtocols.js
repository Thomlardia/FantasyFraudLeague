import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function VerificationProtocols() {
    return (
        <DefenseDetailPage
            defenseKey="verificationProtocols"
            title="Verification Protocols"
            infoContent={
                <>
                    <p>
                        Verification protocols establish code words, out-of-band callbacks, or shared secrets so critical requests
                        can be authenticated before action is taken. Only legitimate parties know the checks, stopping imposters in
                        their tracks.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Two-step approval workflows for high-value wire transfers</li>
                            <li>Caller identity verification questions in customer support</li>
                            <li>Supplier background validation before new contracts are signed</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.fraud.com/post/kyc-process"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Verification Protocols
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/Deepfake">Deepfake Fraud</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default VerificationProtocols;
