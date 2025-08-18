import { Link } from 'react-router-dom';

function Ddos() {
    return (
        <div>
            <h1>Ddos</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <li>
                        <Link to="/defenses/DdosProtection">Ddos Protection</Link>
                    </li>
                    <li>
                        <Link to="/defenses/NetworkMonitoring">Network Monitoring</Link>
                    </li>
                    <li>
                        <Link to="/defenses/TrafficFiltering">Traffic Filtering</Link>
                    </li>
                </ul>
                 
            </section>
            <Link to="/fraudwiki">BACK</Link>
        </div>
    );
}

export default Ddos;