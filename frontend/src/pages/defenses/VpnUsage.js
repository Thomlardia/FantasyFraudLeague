import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';

function VpnUsage() {
    return (
        <div className="shop-container">
            
            <div className="header">
                <Link to="/defenseshop" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1>Vpn Usage</h1>
                <div></div>
            </div>
            <div className="content-container">
                <div className="description-card">
                    <p>
                        VPNs create encrypted tunnels between remote users and corporate networks, protecting communications from interception and manipulation. VPNs encrypt all traffic between the user's device and the VPNs server, preventing attackers on local networks (such as public Wi-Fi) from accessing sensitive data or injecting malicious content.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Remote employees connecting to company intranet</li>
                            <li>Protecting communications over public Wi-Fi</li>
                            <li>Securing access to internal databases</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/ManInTheMiddle">Man-in-the-middle</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default VpnUsage;