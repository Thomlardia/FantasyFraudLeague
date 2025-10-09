import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function AuthPushPayments() {
    return (
        <FraudDetailPage
            title="Auth Push Payments"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Authorised Push Payment (APP) fraud manipulates victims into authorising payments themselves, often under
                        false pretences. Because the victim initiates the transfer, banks struggle to reverse the loss.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Romance scams that build long-term trust</li>
                            <li>Fake emergency calls from family members or colleagues</li>
                            <li>Investment scams promising guaranteed returns</li>
                            <li>Purchase scams for non-existent goods or services</li>
                            <li>&quot;Safe account&quot; scams claiming the victim&apos;s bank account is compromised</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            APP fraud spiked with the adoption of instant payment systems like the UK Faster Payments Service in
                            2008. The speed and irreversibility of these transfers made them attractive to fraudsters.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/UserEducation" className="info-link">User Education</Link>
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
                                    href="https://www.fico.com/blogs/what-authorised-push-payment-fraud"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Auth Push Payments
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

export default AuthPushPayments;
