import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';

function EmailFiltering() {
    return (
        <div className="shop-container">
            <h1>Email Filtering</h1>
            <Link to="/defenseshop" className="icon-button" title="Back">
                <img src={iconBackArrow} alt="Back" className="icon-img" />
            </Link>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Email filtering and anti-phishing tools use advanced algorithms, reputation databases, and machine learning to identify and block malicious emails before they reach users' inboxes.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Blocking phishing attempts with malicious links</li>
                            <li>Filtering spam invoices with suspicious attachments</li>
                            <li>Auto-quarantining spoofed domains</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/Phishing">Phishing</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default EmailFiltering;