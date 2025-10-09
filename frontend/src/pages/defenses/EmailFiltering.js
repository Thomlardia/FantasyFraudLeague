import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function EmailFiltering() {
    return (
        <DefenseDetailPage
            defenseKey="emailFiltering"
            title="Email Filtering"
            infoContent={
                <>
                    <p>
                        Email filtering and anti-phishing tools use advanced algorithms, reputation databases, and machine learning
                        to identify and block malicious emails before they reach users&apos; inboxes.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Blocking phishing attempts with malicious links</li>
                            <li>Filtering spam invoices with suspicious attachments</li>
                            <li>Auto-quarantining spoofed domains</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.titanhq.com/phishing-protection/anti-phishing-filter/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Email Filtering &amp; Anti-Phishing
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/Phishing">Phishing</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default EmailFiltering;
