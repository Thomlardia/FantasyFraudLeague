import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function ManInTheMiddle() {
    return (
        <FraudDetailPage
            title="Man In The Middle"
            infoContent={
                <>
                    <p>
                        Man-in-the-middle (MITM) attacks intercept communications between two parties to eavesdrop, steal data, or
                        modify information. Attackers compromise network infrastructure or create rogue access points to sit inside
                        the conversation invisibly.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Wi-Fi eavesdropping on public hotspots</li>
                            <li>SSL stripping to downgrade secure connections</li>
                            <li>DNS spoofing that reroutes traffic to malicious servers</li>
                            <li>Certificate authority breaches issuing fraudulent certificates</li>
                            <li>BGP hijacking to redirect large volumes of internet traffic</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            MITM predates computers—telephone wiretapping was an early form. Digital MITM attacks grew alongside
                            internet adoption, evolving to challenge modern encryption.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/HttpsAndEncryption">HTTPS And Encryption</Link>
                            </li>
                            <li>
                                <Link to="/defenses/VpnUsage">VPN Usage</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.ibm.com/think/topics/man-in-the-middle"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Man In The Middle
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default ManInTheMiddle;
