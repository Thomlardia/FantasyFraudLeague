import { Link } from 'react-router-dom';

function VpnUsage() {
    return (
        <div>
            <h1>VpnUsage</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                    VPNs create encrypted tunnels between remote users and corporate networks, protecting communications from interception and manipulation. VPNs encrypt all traffic between the user's device and the VPNs server, preventing attackers on local networks (such as public Wi-Fi) from accessing sensitive data or injecting malicious content.
                </p>
            </div>
        </div>
    );
}

export default VpnUsage;