import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function VpnUsage() {
    return (
        <DefenseDetailPage
            defenseKey="vpnUsage"
            title="VPN Usage"
            infoContent={
                <>
                    <p className="info-paragraph">
                        VPNs create encrypted tunnels between remote users and corporate networks, shielding communications from
                        interception and manipulation on untrusted networks like public Wi-Fi.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Remote employees connecting securely to the company intranet</li>
                            <li>Protecting communications while travelling over public Wi-Fi</li>
                            <li>Securing access to internal databases and admin consoles</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/ManInTheMiddle" className="info-link">Man-in-the-middle</Link>
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
                                    href="https://www.computershare.com/hk/en/antifraud-vpn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    VPN Usage
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

export default VpnUsage;
