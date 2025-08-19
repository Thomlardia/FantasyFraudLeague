import { Link } from 'react-router-dom';

function Phishing() {
    return (
        <div>
            <h1>Phishing</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <li>
                        <Link to="/defenses/MultiFactorAuth">Multi Factor Authentication</Link>
                    </li>
                    <li>
                        <Link to="/defenses/UserEducation">User Education</Link>
                    </li>
                    <li>
                        <Link to="/defenses/EmailFiltering">Email Filtering</Link>
                    </li>
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Fraudulent emails, websites, or messages that impersonate legitimate organizations to steal credentials, personal information, or money. Examples: fake bank emails, fake login pages, urgent payment requests.
                </p>
            </div>
        </div>
    );
}

export default Phishing;