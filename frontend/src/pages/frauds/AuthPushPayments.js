import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function AuthPushPayments() {
    return (
        <FraudDetailPage
            title="Auth Push Payments"
            infoContent={
                <>
                    <p>
                        Authorised Push Payment (APP) fraud manipulates victims into authorising payments themselves, often under
                        false pretences. Because the victim initiates the transfer, banks struggle to reverse the loss.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Romance scams that build long-term trust</li>
                            <li>Fake emergency calls from family members or colleagues</li>
                            <li>Investment scams promising guaranteed returns</li>
                            <li>Purchase scams for non-existent goods or services</li>
                            <li>&quot;Safe account&quot; scams claiming the victim&apos;s bank account is compromised</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            APP fraud spiked with the adoption of instant payment systems like the UK Faster Payments Service in
                            2008. The speed and irreversibility of these transfers made them attractive to fraudsters.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/UserEducation">User Education</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.fico.com/blogs/what-authorised-push-payment-fraud"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Auth Push Payments
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default AuthPushPayments;
