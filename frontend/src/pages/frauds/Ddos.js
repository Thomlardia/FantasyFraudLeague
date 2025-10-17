import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';
import FraudProtectionChart from '../../components/FraudProtectionChart';
import '../../styles/charts.css';

function Ddos() {
    return (
        <FraudDetailPage
            title="DDoS"
            secondaryCardContent={<FraudProtectionChart attackId="ddos" variant="horizontal" />}
            infoContent={
                <>
                    <p className="info-paragraph">
                        Distributed Denial of Service (DDoS) attacks overwhelm targets with coordinated floods of traffic from
                        multiple sources, making services unavailable. Botnets of compromised devices generate massive request
                        volumes that exhaust bandwidth or server resources.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Volumetric attacks saturating bandwidth</li>
                            <li>SYN floods exhausting server connection tables</li>
                            <li>Application-layer attacks targeting specific endpoints</li>
                            <li>Reflection attacks using DNS or NTP amplification</li>
                            <li>IoT botnets leveraging compromised smart devices</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Early DDoS attacks in the late 1990s were mostly pranks. By 2000, assaults on Yahoo and Amazon
                            highlighted their disruptive power. Today, motivations range from extortion to state-backed disruption.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/DdosProtection" className="info-link">DDoS Protection</Link>
                            </li>
                            <li>
                                <Link to="/defenses/NetworkMonitoring" className="info-link">Network Monitoring</Link>
                            </li>
                            <li>
                                <Link to="/defenses/TrafficFiltering" className="info-link">Traffic Filtering</Link>
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
                                    href="https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    DDoS
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

export default Ddos;
