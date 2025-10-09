import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function VpnUsage() {
    return (
        <DefenseDetailPage
            defenseKey="vpnUsage"
            title="VPN Usage"
            infoContent={
                <>
                    <p>
                        VPNs create encrypted tunnels between remote users and corporate networks, shielding communications from
                        interception and manipulation on untrusted networks like public Wi-Fi.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Remote employees connecting securely to the company intranet</li>
                            <li>Protecting communications while travelling over public Wi-Fi</li>
                            <li>Securing access to internal databases and admin consoles</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.computershare.com/hk/en/antifraud-vpn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                VPN Usage
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/ManInTheMiddle">Man-in-the-middle</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default VpnUsage;
