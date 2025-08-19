import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'

function Ddos() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>Distributed Denial of Service (DDoS)</h1>
                <Link to="/fraudwiki" className='icon-button' title="Back">
                    <img src={iconBackArrow} alt="Back" className="icon-img" />
                </Link>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Distributed Denial of Service (DDoS) attacks overwhelm target systems, servers, or 
                        networks with a coordinated flood of internet traffic from multiple sources, 
                        making services unavailable to legitimate users. These attacks often leverage 
                        botnets - networks of compromised devices - to generate massive traffic volumes. 
                        Modern attacks can reach hundreds of gigabits per second and may employ volumetric, 
                        protocol, or application-layer techniques, often using amplification methods 
                        to multiply attack traffic.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Volumetric attacks flooding bandwidth</li>
                        <li>SYN flood attacks exhausting server resources</li>
                        <li>Application-layer attacks targeting specific services</li>
                        <li>Reflection attacks using DNS or NTP servers for amplification</li>
                        <li>IoT botnet attacks utilizing compromised smart devices</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        Early DDoS attacks in the late 1990s were primarily pranks or hacktivism. 
                        The 2000 attacks on major websites like Yahoo and Amazon demonstrated 
                        their disruptive potential. Today, many attacks are financially motivated 
                        or state-sponsored.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
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
                </div>
            </div>
        </div>
    );
}

export default Ddos;