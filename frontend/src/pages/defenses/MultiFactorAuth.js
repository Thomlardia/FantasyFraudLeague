import { Link } from 'react-router-dom';

function MultiFactorAuth() {
    return (
        <div className="shop-container">
            <h1>Multi-Factor Authentication</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        MFA adds layers of security by requiring users to provide two or more verification factors to gain access to accounts or systems. This typically combines something you know (a password) and something you have (phone, app) and something you are (biometric data).
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Online banking logins</li>
                            <li>Corporate VPN access</li>
                            <li>Cloud service sign-ins</li>
                        </ul>
                </div>
            </div>
        </div>
    );
}

export default MultiFactorAuth;