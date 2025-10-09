import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function Ransomware() {
    return (
        <FraudDetailPage
            title="Ransomware"
            infoContent={
                <>
                    <p>
                        Ransomware encrypts a victim&apos;s files and demands payment—usually in cryptocurrency—for the decryption
                        key. Modern attacks frequently use double extortion: encrypting files while exfiltrating data and
                        threatening to leak it.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>CryptoLocker (2013) — early large-scale ransomware family</li>
                            <li>WannaCry (2017) — global outbreak impacting hospitals and governments</li>
                            <li>NotPetya (2017) — destructive campaign initially targeting Ukraine</li>
                            <li>Ryuk — highly targeted ransomware focused on enterprises</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Ransomware dates back to the 1989 AIDS Trojan, but cryptocurrencies in the 2010s enabled anonymous
                            payments. The 2017 WannaCry outbreak showcased the global disruption potential.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/RegulatedAutoBackup">Regulated Automated Backups</Link>
                            </li>
                            <li>
                                <Link to="/defenses/KeepUpdated">Keep Updated</Link>
                            </li>
                            <li>
                                <Link to="/defenses/UserEducation">User Education</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/ransomware"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ransomware
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default Ransomware;
