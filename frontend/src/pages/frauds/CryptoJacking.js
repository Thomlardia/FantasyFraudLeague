import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';

function CryptoJacking() {
    return (
        <div className="fraud-container">
            <div className="header">
                <Link to="/fraudwiki" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1>Crypto Jacking</h1>
                <div></div>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Cryptojacking is the unauthorized use of computing resources to mine cryptocurrency, 
                        often without the victim's knowledge. It can occur through malicious websites running 
                        mining scripts, infected software installations, or malware that hijacks system power. 
                        This leads to degraded performance, higher electricity bills, and potential hardware damage.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Browser-based mining via malicious JavaScript</li>
                        <li>Infected mobile apps secretly mining cryptocurrency</li>
                        <li>Compromised servers used for large-scale mining</li>
                        <li>Botnets converting infected PCs into mining networks</li>
                        <li>Abuse of cloud infrastructure for mining</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        Cryptojacking emerged alongside cryptocurrencies in the late 2000s 
                        but surged after 2017 when browser-based services like Coinhive made it easy. 
                        The rising value of cryptocurrencies fueled widespread adoption by cybercriminals.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>
                            <Link to="/defenses/NetworkMonitoring">Network Monitoring</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CryptoJacking;