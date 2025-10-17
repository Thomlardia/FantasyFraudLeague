import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';
import FraudProtectionChart from '../../components/FraudProtectionChart';
import '../../styles/charts.css';

function ManInTheMiddle() {
    return (
        <FraudDetailPage
            title="Man In The Middle"
            secondaryCardContent={<FraudProtectionChart attackId="mitm" variant="horizontal" />}
            infoContent={
                <>
                    <p className="info-paragraph">
                        Man-in-the-middle (MITM) attacks intercept communications between two parties to eavesdrop, steal data, or
                        modify information. Attackers compromise network infrastructure or create rogue access points to sit inside
                        the conversation invisibly.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Wi-Fi eavesdropping on public hotspots</li>
                            <li>SSL stripping to downgrade secure connections</li>
                            <li>DNS spoofing that reroutes traffic to malicious servers</li>
                            <li>Certificate authority breaches issuing fraudulent certificates</li>
                            <li>BGP hijacking to redirect large volumes of internet traffic</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            MITM predates computers—telephone wiretapping was an early form. Digital MITM attacks grew alongside
                            internet adoption, evolving to challenge modern encryption.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/HttpsAndEncryption" className="info-link">HTTPS And Encryption</Link>
                            </li>
                            <li>
                                <Link to="/defenses/VpnUsage" className="info-link">VPN Usage</Link>
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
                                    href="https://www.ibm.com/think/topics/man-in-the-middle"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Man In The Middle
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

export default ManInTheMiddle;
