import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function Vishing() {
    return (
        <FraudDetailPage
            title="Vishing"
            infoContent={
                <>
                    <p>
                        Vishing leverages phone calls or voice messages to trick victims into revealing sensitive information or
                        taking compromising actions. Attackers rely on caller ID spoofing and psychological tactics such as
                        urgency, fear, or authority.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Fake bank calls requesting account verification</li>
                            <li>Tax authority scams threatening legal action</li>
                            <li>Tech support fraud claiming malware infections</li>
                            <li>Utility company impersonation threatening disconnection</li>
                            <li>Charity scams exploiting crises or disasters</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Vishing dates back to early telephone scams but surged with VoIP and caller ID spoofing. The COVID-19
                            pandemic saw a spike as attackers targeted remote workers and vulnerable populations.
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
                                href="https://www.terranovasecurity.com/solutions/security-awareness-training/what-is-vishing"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Vishing
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default Vishing;
