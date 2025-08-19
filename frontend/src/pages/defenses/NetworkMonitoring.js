import { Link } from 'react-router-dom';

function NetworkMonitoring() {
    return (
        <div className="shop-container">
            <h1>Network Monitoring</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>
            
            <div className="content-container">
                <div className="description-card">
                    <p>
                        Network monitoring involves continuous surveillance of network traffic and performance metrics to detect anomalies that may indicate attacks.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Detecting unusual outbound traffic</li>
                            <li>Spotting brute-force login attempts</li>
                            <li>Identifying unauthorized IoT devices</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/Ddos">Ddos</Link>
                        </li>
                        <li>
                            <Link to="/frauds/CryptoJacking">Crypto Jacking</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NetworkMonitoring;