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
        </div>
    );
}

export default ManInTheMiddle;