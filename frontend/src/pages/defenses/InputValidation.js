import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function InputValidation() {
    return (
        <DefenseDetailPage
            defenseKey="inputValidation"
            title="Input Validation"
            infoContent={
                <>
                    <p>
                        Input validation and sanitisation checks every piece of data submitted to applications before processing.
                        For databases, it blocks malicious SQL, and for web apps, it strips harmful scripts before they render.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Preventing SQL injection on login forms</li>
                            <li>Sanitising uploaded files prior to storage</li>
                            <li>Blocking script injections in search fields</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://medium.com/@cdxlabs.abhiram/input-validation-and-sanitization-protecting-your-application-from-malicious-input-28fee92ea0d3"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Input Validation
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/SqlInjection">SQL Injection</Link>
                            </li>
                            <li>
                                <Link to="/frauds/Xss">XSS</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default InputValidation;
