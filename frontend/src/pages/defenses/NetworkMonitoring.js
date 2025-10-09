import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function NetworkMonitoring() {
    return (
        <DefenseDetailPage
            defenseKey="networkMonitoring"
            title="Network Monitoring"
            infoContent={
                <>
                    <p>
                        Network monitoring continuously inspects traffic patterns, performance metrics, and device behaviour to
                        surface anomalies that may indicate attacks or misuse.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Detecting unusual outbound data transfers</li>
                            <li>Spotting brute-force login attempts across services</li>
                            <li>Identifying unauthorised IoT devices joining the network</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://netmonk.id/blog/the-importance-of-network-monitoring-in-preventing-ddos-attacks"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Network Monitoring
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/Ddos">DDoS</Link>
                            </li>
                            <li>
                                <Link to="/frauds/CryptoJacking">Crypto Jacking</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default NetworkMonitoring;
