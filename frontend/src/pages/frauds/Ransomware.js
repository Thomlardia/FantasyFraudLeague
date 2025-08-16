import { Link } from 'react-router-dom';

function Ransomware() {
    return (
        <div>
            <h1>Ransomware</h1>
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