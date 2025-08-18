import { Link } from 'react-router-dom';

function Ransomware() {
    return (
        <div>
            <h1>Ransomware</h1>
            <section>
                <h2>How to Defend:</h2>
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
            </section>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Malicious software that encrypts victim's files and demands payment for decryption keys. Examples: CryptoLocker, WannaCry, targeting hospitals, businesses, and government systems.
                </p>
            </div>
        </div>
    );
}

export default Ransomware;