import { Link } from 'react-router-dom';

function EmailFiltering() {
    return (
        <div className="shop-container">
            <h1>Email Filtering</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="description-card">
                <p>
                    Email filtering and anti-phishing tools use advanced algorithms, reputation databases, and machine learning to identify and block malicious emails before they reach users' inboxes.
                </p>
            </div>
        </div>
    );
}

export default EmailFiltering;