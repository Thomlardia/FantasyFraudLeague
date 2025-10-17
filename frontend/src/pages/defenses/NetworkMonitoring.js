import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function NetworkMonitoring() {
    return (
        <DefenseDetailPage
            defenseKey="networkMonitoring"
            title="Network Monitoring"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Network monitoring continuously inspects traffic patterns, performance metrics, and device behaviour to
                        surface anomalies that may indicate attacks or misuse.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Detecting unusual outbound data transfers</li>
                            <li>Spotting brute-force login attempts across services</li>
                            <li>Identifying unauthorised IoT devices joining the network</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/BruteForce" className="info-link">Brute Force</Link>
                            </li>
                            <li>
                                <Link to="/frauds/CryptoJacking" className="info-link">Crypto Jacking</Link>
                            </li>
                            <li>
                                <Link to="/frauds/Ddos" className="info-link">DDoS</Link>
                            </li>
                            <li>
                                <Link to="/frauds/InsiderFraud" className="info-link">Insider Fraud</Link>
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
                                    href="https://netmonk.id/blog/the-importance-of-network-monitoring-in-preventing-ddos-attacks"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Network Monitoring
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

export default NetworkMonitoring;
