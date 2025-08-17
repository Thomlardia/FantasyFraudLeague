import { Link } from 'react-router-dom';

function Phishing() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>Phishing</h1>
                <Link to="/fraudwiki" className='back-button'>BACK</Link>
            </div>

            <div className="content-container">
                <div className="description-card">
                <p>
                    Phishing is a cybercrime where attackers impersonate legitimate organizations through fraudulent emails, websites, or messages to steal sensitive information such as credentials, personal data or money.
                     Phishing attacks exploit human psychology by creating a sense of urgency or trust. Attackers often replicate the visual design and communication style of trusted brands to deceive victims. These attacks
                      evolved from simple email scams to sophisticated techniques like spear phishing, clone phishing, and whaling, targeting specific individuals or organizations.
                </p>
                <br />
                </div>
                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Fake banking emails requesting account verification</li>
                        <li>Fraudulent login pages that capture credentials</li>
                        <li>Urgent payment request messages claiming account suspension</li>
                        <li>Spear phishing targeting specific individuals or organizations</li>
                        <li>Clone phishing using legitimate emails with malicious links replaced</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3> Historical Context:</h3>
                    <p> The term "phishing" originated in the mid 1990s, derived from "fishing" - the idea of baiting victims. Early phishing attacks were email scams but they have since evolved into sophisticated operations often run by large crime syndicates</p>
                </div>
                

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>Multi-Factor Authentication (MFA)</li>
                        <li>User Education and Awareness Training</li>
                        <li>Email filtering and anti-phishing tools</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Phishing;