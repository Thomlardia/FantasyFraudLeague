import { Link } from 'react-router-dom';

function KeepUpdated() {
    return (
        <div>
            <h1>KeepUpdated</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Maintaining current systems and software involves promptly applying security patches, updating operating systems, and ensuring all applications run the latest stable versions. Many ransomware attacks exploit KNOWN vulnerabilities that have patches, so keeping systems up to date is effective.
                </p>
            </div>
        </div>
    );
}

export default KeepUpdated;