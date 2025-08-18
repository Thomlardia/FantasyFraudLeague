import { Link } from 'react-router-dom';

function NetworkMonitoring() {
    return (
        <div className="shop-container">
            <h1>Network Monitoring</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="description-card">
                <p>
                    Network monitoring involves continuous surveillance of network traffic and performance metrics to detect anomalies that may indicate attacks.
                </p>
            </div>
        </div>
    );
}

export default NetworkMonitoring;