import { Link } from 'react-router-dom';

function KeepUpdated() {
    return (
        <div className="shop-container">
            <h1>Keep Updated</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Maintaining current systems and software involves promptly applying security patches, updating operating systems, and ensuring all applications run the latest stable versions. Many ransomware attacks exploit KNOWN vulnerabilities that have patches, so keeping systems up to date is effective.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Updating payment processing software</li>
                            <li>Applying OS security patches</li>
                            <li>Rolling out browser updates against exploits</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/Ransomware">Ransomware</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default KeepUpdated;