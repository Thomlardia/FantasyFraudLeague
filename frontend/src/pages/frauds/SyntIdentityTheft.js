import { Link } from 'react-router-dom';

function SyntIdentityTheft() {
    return (
        <div>
            <h1>SyntIdentityTheft</h1>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Creating fake identities using a combination of real and fabricated information to commit fraud. Examples: combining real ID nums with fake names, creating credit profiles for fraud.
                </p>
            </div>
        </div>
    );
}

export default SyntIdentityTheft;