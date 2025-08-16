import { Link } from 'react-router-dom';

function EmailFiltering() {
    return (
        <div>
            <h1>EmailFiltering</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Email filtering and anti-phishing tools use advanced algorithms, reputation databases, and machine learning to identify and block malicious emails before they reach users' inboxes.
                </p>
            </div>
        </div>
    );
}

export default EmailFiltering;