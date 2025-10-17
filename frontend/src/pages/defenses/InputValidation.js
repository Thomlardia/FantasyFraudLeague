import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function InputValidation() {
    return (
        <DefenseDetailPage
            defenseKey="inputValidation"
            title="Input Validation"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Input validation and sanitisation checks every piece of data submitted to applications before processing.
                        For databases, it blocks malicious SQL, and for web apps, it strips harmful scripts before they render.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Preventing SQL injection on login forms</li>
                            <li>Sanitising uploaded files prior to storage</li>
                            <li>Blocking script injections in search fields</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/SqlInjection" className="info-link">SQL Injection</Link>
                            </li>
                            <li>
                                <Link to="/frauds/Xss" className="info-link">XSS</Link>
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
                                    href="https://medium.com/@cdxlabs.abhiram/input-validation-and-sanitization-protecting-your-application-from-malicious-input-28fee92ea0d3"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Input Validation
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

export default InputValidation;
