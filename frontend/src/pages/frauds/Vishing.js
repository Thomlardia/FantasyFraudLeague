import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function Vishing() {
    return (
        <FraudDetailPage
            title="Vishing"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Vishing leverages phone calls or voice messages to trick victims into revealing sensitive information or
                        taking compromising actions. Attackers rely on caller ID spoofing and psychological tactics such as
                        urgency, fear, or authority.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Fake bank calls requesting account verification</li>
                            <li>Tax authority scams threatening legal action</li>
                            <li>Tech support fraud claiming malware infections</li>
                            <li>Utility company impersonation threatening disconnection</li>
                            <li>Charity scams exploiting crises or disasters</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Vishing dates back to early telephone scams but surged with VoIP and caller ID spoofing. The COVID-19
                            pandemic saw a spike as attackers targeted remote workers and vulnerable populations.
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
                                    href="https://www.terranovasecurity.com/solutions/security-awareness-training/what-is-vishing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Vishing
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

export default Vishing;
