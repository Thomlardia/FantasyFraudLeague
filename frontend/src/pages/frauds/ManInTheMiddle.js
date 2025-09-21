import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function ManInTheMiddle() {
    return (

        <div className="fraud-container">
            <div className="topbar">
            <div className="topbar-group">
                <Link to="/fraudwiki" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
            </div>
            <MoneyBar />
            <div className="topbar-group"></div>
            </div>
            <div className="header">

                <h1>Man In The Middle</h1>
                <div></div>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Man-In-The-Middle (MITM) attacks involve intercepting communications between two 
                        parties to eavesdrop, steal data, or manipulate information without their knowledge. 
                        Attackers often achieve this by compromising network infrastructure or creating rogue 
                        access points. These attacks can target protocols such as HTTP, HTTPS, DNS, and wireless 
                        communications.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Wi-Fi eavesdropping on public networks</li>
                        <li>SSL stripping to downgrade secure connections</li>
                        <li>DNS spoofing to redirect traffic to malicious servers</li>
                        <li>Certificate authority attacks using fraudulent certificates</li>
                        <li>BGP hijacking to redirect internet traffic</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        MITM attacks predate digital communications, with telephone wiretapping being an 
                        early example. Digital MITM attacks became more prominent with the growth of 
                        internet communications, evolving alongside encryption technologies.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>
                            <Link to="/defenses/HttpsAndEncryption">Https And Encryption</Link>
                        </li>
                        <li>
                            <Link to="/defenses/VpnUsage">Vpn Usage</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ManInTheMiddle;