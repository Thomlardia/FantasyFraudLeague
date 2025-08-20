import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';

function HttpsAndEncryption() {
    return (
        <div className="shop-container">
            
            <div className="header">
                <Link to="/defenseshop" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1>Https And Encryption</h1>
                <div></div>
            </div>
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