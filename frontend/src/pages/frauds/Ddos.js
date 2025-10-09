import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function Ddos() {
    return (
        <FraudDetailPage
            title="DDoS"
            infoContent={
                <>
                    <p>
                        Distributed Denial of Service (DDoS) attacks overwhelm targets with coordinated floods of traffic from
                        multiple sources, making services unavailable. Botnets of compromised devices generate massive request
                        volumes that exhaust bandwidth or server resources.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Volumetric attacks saturating bandwidth</li>
                            <li>SYN floods exhausting server connection tables</li>
                            <li>Application-layer attacks targeting specific endpoints</li>
                            <li>Reflection attacks using DNS or NTP amplification</li>
                            <li>IoT botnets leveraging compromised smart devices</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Early DDoS attacks in the late 1990s were mostly pranks. By 2000, assaults on Yahoo and Amazon
                            highlighted their disruptive power. Today, motivations range from extortion to state-backed disruption.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/DdosProtection">DDoS Protection</Link>
                            </li>
                            <li>
                                <Link to="/defenses/NetworkMonitoring">Network Monitoring</Link>
                            </li>
                            <li>
                                <Link to="/defenses/TrafficFiltering">Traffic Filtering</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                DDoS
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default Ddos;
