import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function TrafficFiltering() {
    return (
        <DefenseDetailPage
            defenseKey="trafficFiltering"
            title="Traffic Filtering"
            infoContent={
                <>
                    <p>
                        Traffic filtering analyses inbound requests and blocks traffic that matches attack signatures or exceeds
                        safe thresholds, keeping malicious traffic away from critical services.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Blocking known malicious IP ranges before they touch web apps</li>
                            <li>Geo-blocking traffic from high-risk regions</li>
                            <li>Filtering bot traffic from API endpoints</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.techslang.com/definition/what-is-traffic-filtering/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Traffic Filtering
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/Ddos">DDoS</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default TrafficFiltering;
