import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function HttpsAndEncryption() {
    return (
        <DefenseDetailPage
            defenseKey="httpsEncryption"
            title="HTTPS And Encryption"
            infoContent={
                <>
                    <p>
                        HTTPS secures data in transit by encrypting the communication between users and servers, preventing
                        eavesdroppers from reading or modifying sensitive information.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Securing e-commerce transactions and checkout flows</li>
                            <li>Protecting customer logins on web and mobile apps</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.cloudflare.com/learning/ssl/what-is-https/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                HTTPS and Encryption
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/ManInTheMiddle">Man-in-the-middle</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default HttpsAndEncryption;
