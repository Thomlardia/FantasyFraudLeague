import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function EmailFiltering() {
    return (
        <DefenseDetailPage
            defenseKey="emailFiltering"
            title="Email Filtering"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Email filtering and anti-phishing tools use advanced algorithms, reputation databases, and machine learning
                        to identify and block malicious emails before they reach users&apos; inboxes.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Blocking phishing attempts with malicious links</li>
                            <li>Filtering spam invoices with suspicious attachments</li>
                            <li>Auto-quarantining spoofed domains</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/Phishing" className="info-link">Phishing</Link>
                            </li>
                            <li>
                                <Link to="/frauds/BusinessEmailCompromise" className="info-link">Business Email Compromise</Link>
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
                                    href="https://www.titanhq.com/phishing-protection/anti-phishing-filter/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Email Filtering &amp; Anti-Phishing
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

export default EmailFiltering;
