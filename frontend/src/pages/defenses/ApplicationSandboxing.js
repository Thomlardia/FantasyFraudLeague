import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function ApplicationSandboxing() {
    return (
        <DefenseDetailPage
            defenseKey="applicationSandboxing"
            title="Application Sandboxing"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Application sandboxing isolates programs within restricted environments that limit their access to system
                        resources, files, and network connections. Even if an application is compromised, containment keeps the
                        broader system safe.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Running browsers in sandboxed environments</li>
                            <li>Isolating financial applications from general processes</li>
                            <li>Containerizing untrusted third-party apps</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/Ransomware" className="info-link">Ransomware</Link>
                            </li>
                            <li>
                                <Link to="/frauds/ZeroDayExploit" className="info-link">Zero-Day Exploit</Link>
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
                                    href="https://www.techtarget.com/searchmobilecomputing/definition/application-sandboxing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Application Sandboxing
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

export default ApplicationSandboxing;
