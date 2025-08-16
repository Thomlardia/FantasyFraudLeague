import { Link } from 'react-router-dom';

function AccountTakeover() {
    return (
        <div>
            <h1>AccountTakeover</h1>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Unauthorized access to user accounts through credential theft, social engineering, or security bypasses. Example: session hijacking.
                </p>
            </div>
        </div>
    );
}

export default AccountTakeover;