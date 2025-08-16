import { Link } from 'react-router-dom';

function CryptoJacking() {
    return (
        <div>
            <h1>CryptoJacking</h1>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Unauthorized use of computing resources to mine cryptocurrency. Examples: malicious websites, infected software, compromised systems mining coins for attackers.
                </p>
            </div>
        </div>
    );
}

export default CryptoJacking;