import { Link } from 'react-router-dom';

function HttpsAndEncryption() {
    return (
        <div className="shop-container">
            <h1>HTTPs and Encryption</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>
            
            <div className="content-container">
                <div className="description-card">
                    <p>
                        HTTPS and encrypted connections protect data in transit by scrambling information between users and servers, making it unreadable to attackers who intercept communications.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Securing e-commerce transactions</li>
                            <li>Protecting customer logins on web apps</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/ManInTheMiddle">Man-in-the-middle</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HttpsAndEncryption;