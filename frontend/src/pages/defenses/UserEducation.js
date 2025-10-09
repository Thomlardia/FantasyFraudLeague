import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function UserEducation() {
    return (
        <DefenseDetailPage
            defenseKey="userEducation"
            title="User Education"
            infoContent={
                <>
                    <p>
                        User education builds a human firewall against social engineering. Training programs help employees spot
                        suspicious messages, urgent requests, and fake websites before they fall for them.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Phishing awareness workshops with real-world simulations</li>
                            <li>Secure password creation and management sessions</li>
                            <li>Tabletop exercises covering social engineering scenarios</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.paiementor.com/fraud-prevention-psd3-customer-education/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                User Education
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/Phishing">Phishing</Link>
                            </li>
                            <li>
                                <Link to="/frauds/Ransomware">Ransomware</Link>
                            </li>
                            <li>
                                <Link to="/frauds/Vishing">Vishing</Link>
                            </li>
                            <li>
                                <Link to="/frauds/AuthPushPayments">Auth Push Payments</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default UserEducation;
