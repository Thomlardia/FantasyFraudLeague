import { Link } from 'react-router-dom';

function UserEducation() {
    return (
        <div className="shop-container">
            <h1>User Education</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        User education forms the human firewall against social engineering attacks. Training programs teach employees and users to recognize suspicious emails, phone calls and websites. This includes: Urgent language, requests for sensitive information, suspicious sender addresses. 
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Phishing awareness training</li>
                            <li>Secure password creation workshops</li>
                            <li>Social engineering scam simulations</li>
                        </ul>
                </div>
            </div>
        </div>
    );
}

export default UserEducation;