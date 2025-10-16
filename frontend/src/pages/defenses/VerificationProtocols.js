import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function VerificationProtocols() {
    return (
        <DefenseDetailPage
            defenseKey="verificationProtocols"
            title="Verification Protocols"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Verification protocols establish code words, out-of-band callbacks, or shared secrets so critical requests
                        can be authenticated before action is taken. Only legitimate parties know the checks, stopping imposters in
                        their tracks.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Two-step approval workflows for high-value wire transfers</li>
                            <li>Caller identity verification questions in customer support</li>
                            <li>Supplier background validation before new contracts are signed</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/Deepfake" className="info-link">Deepfake Fraud</Link>
                            </li>
                            <li>
                                <Link to="/frauds/AuthPushPayments" className="info-link">Authorized Push Payments</Link>
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
                                    href="https://www.fraud.com/post/kyc-process"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Verification Protocols
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

export default VerificationProtocols;
