import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function UserEducation() {
    return (
        <DefenseDetailPage
            defenseKey="userEducation"
            title="User Education"
            infoContent={
                <>
                    <p className="info-paragraph">
                        User education builds a human firewall against social engineering. Training programs help employees spot
                        suspicious messages, urgent requests, and fake websites before they fall for them.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Phishing awareness workshops with real-world simulations</li>
                            <li>Secure password creation and management sessions</li>
                            <li>Tabletop exercises covering social engineering scenarios</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/Phishing" className="info-link">Phishing</Link>
                            </li>
                            <li>
                                <Link to="/frauds/Ransomware" className="info-link">Ransomware</Link>
                            </li>
                            <li>
                                <Link to="/frauds/Vishing" className="info-link">Vishing</Link>
                            </li>
                            <li>
                                <Link to="/frauds/AuthPushPayments" className="info-link">Auth Push Payments</Link>
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
                                    href="https://www.paiementor.com/fraud-prevention-psd3-customer-education/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    User Education
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

export default UserEducation;
