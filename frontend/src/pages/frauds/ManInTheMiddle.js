import { Link } from 'react-router-dom';

function ManInTheMiddle() {
    return (
        <div>
            <h1>ManInTheMiddle</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <li>
                        <Link to="/defenses/HttpsAndEncryption">Https And Encryption</Link>
                    </li>
                    <li>
                        <Link to="/defenses/VpnUsage">Vpn Usage</Link>
                    </li>
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Intercepting communications between two parties to eavesdrop or manipulate data. Examples: Wi-Fi eavesdropping, SSL stripping, DNS spoofing, certificate attacks.
                </p>
            </div>
        </div>
    );
}

export default ManInTheMiddle;