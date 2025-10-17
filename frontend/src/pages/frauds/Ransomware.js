import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';
import FraudProtectionChart from '../../components/FraudProtectionChart';
import '../../styles/charts.css';

function Ransomware() {
    return (
        <FraudDetailPage
            title="Ransomware"
            secondaryCardContent={<FraudProtectionChart attackId="ransomware" variant="horizontal" />}
            infoContent={
                <>
                    <p className="info-paragraph">
                        Ransomware encrypts a victim&apos;s files and demands payment—usually in cryptocurrency—for the decryption
                        key. Modern attacks frequently use double extortion: encrypting files while exfiltrating data and
                        threatening to leak it.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>CryptoLocker (2013) — early large-scale ransomware family</li>
                            <li>WannaCry (2017) — global outbreak impacting hospitals and governments</li>
                            <li>NotPetya (2017) — destructive campaign initially targeting Ukraine</li>
                            <li>Ryuk — highly targeted ransomware focused on enterprises</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Ransomware dates back to the 1989 AIDS Trojan, but cryptocurrencies in the 2010s enabled anonymous
                            payments. The 2017 WannaCry outbreak showcased the global disruption potential.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/RegulatedAutoBackup" className="info-link">Regulated Automated Backups</Link>
                            </li>
                            <li>
                                <Link to="/defenses/KeepUpdated" className="info-link">Keep Updated</Link>
                            </li>
                            <li>
                                <Link to="/defenses/ApplicationSandboxing" className="info-link">Application Sandboxing</Link>
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
                                    href="https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/ransomware"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Ransomware
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

export default Ransomware;
