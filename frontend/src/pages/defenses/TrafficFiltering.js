import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function TrafficFiltering() {
    return (
        <DefenseDetailPage
            defenseKey="trafficFiltering"
            title="Traffic Filtering"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Traffic filtering analyses inbound requests and blocks traffic that matches attack signatures or exceeds
                        safe thresholds, keeping malicious traffic away from critical services.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Blocking known malicious IP ranges before they touch web apps</li>
                            <li>Geo-blocking traffic from high-risk regions</li>
                            <li>Filtering bot traffic from API endpoints</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/Ddos" className="info-link">DDoS</Link>
                            </li>
                            <li>
                                <Link to="/frauds/BruteForce" className="info-link">Brute Force</Link>
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
                                    href="https://www.techslang.com/definition/what-is-traffic-filtering/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Traffic Filtering
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

export default TrafficFiltering;
