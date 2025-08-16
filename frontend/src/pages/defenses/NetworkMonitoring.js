import { Link } from 'react-router-dom';

function NetworkMonitoring() {
    return (
        <div>
            <h1>NetworkMonitoring</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Network monitoring involves continuous surveillance of network traffic and performance metrics to detect anomalies that may indicate attacks.
                </p>
            </div>
        </div>
    );
}

export default NetworkMonitoring;