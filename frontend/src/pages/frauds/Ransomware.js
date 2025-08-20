import { Link } from 'react-router-dom';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';

function Ransomware() {
    return (
        <div className="fraud-container">
            <div className="header">
                <Link to="/fraudwiki" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1>Ransomware</h1>
                <div></div>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Ransomware is malicious software designed to encrypt a victim's files and demand payment
                        (usually in cryptocurrency) in exchange for the decryption key. Modern ransomware attacks 
                        often involve double extortion - encrypting files while simultaneously stealing sensitive 
                        data to threaten public release. These attacks typically spread through phishing emails, 
                        exploit kits, or compromised remote desktop connections. The ransomware-as-a-service 
                        (RaaS) model has made these attacks accessible to less technical criminals.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>CryptoLocker (2013): One of the first major ransomware families</li>
                        <li>WannaCry (2017): Global outbreak affecting hospitals and government systems</li>
                        <li>NotPetya (2017): Destructive attack initially targeting Ukraine</li>
                        <li>Ryuk: High-value targeted ransomware focusing on enterprises</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        Ransomware emerged in the late 1980s with the AIDS Trojan, but became widespread in the 
                        2010s with the rise of cryptocurrencies enabling anonymous payments. The 2017 WannaCry 
                        outbreak marked a turning point, showing ransomware's global disruption potential.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>
                            <Link to="/defenses/RegulatedAutoBackup">Regulated Automated Backups</Link>
                        </li>
                        <li>
                            <Link to="/defenses/KeepUpdated">Keep Systems and Software Updated</Link>
                        </li>
                        <li>
                            <Link to="/defenses/UserEducation">User Education</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Ransomware;