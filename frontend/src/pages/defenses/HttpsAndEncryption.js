import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function HttpsAndEncryption() {
    return (
        <DefenseDetailPage
            defenseKey="httpsEncryption"
            title="HTTPS And Encryption"
            infoContent={
                <>
                    <p className="info-paragraph">
                        HTTPS secures data in transit by encrypting the communication between users and servers, preventing
                        eavesdroppers from reading or modifying sensitive information.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Securing e-commerce transactions and checkout flows</li>
                            <li>Protecting customer logins on web and mobile apps</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/ManInTheMiddle" className="info-link">Man-in-the-middle</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">link</span>
                            Reference
                        </h3>
                        <ul className="info-list">
                            <li>
                                <a
                                    href="https://www.cloudflare.com/learning/ssl/what-is-https/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    HTTPS and Encryption
                                    <span className="material-symbols-outlined">open_in_new</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    </>
            }
        />
    );
}

export default HttpsAndEncryption;
