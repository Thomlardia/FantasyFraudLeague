import { Link } from 'react-router-dom';

function HttpsAndEncryption() {
    return (
        <div className="shop-container">
            <h1>HTTPs and Encryption</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>
            
            <div className="description-card">
                <p>
                    HTTPS and encrypted connections protect data in transit by scrambling information between users and servers, making it unreadable to attackers who intercept communications.
                </p>
            </div>
        </div>
    );
}

export default HttpsAndEncryption;