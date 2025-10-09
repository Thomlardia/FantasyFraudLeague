import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function ApplicationSandboxing() {
    return (
        <DefenseDetailPage
            defenseKey="applicationSandboxing"
            title="Application Sandboxing"
            infoContent={
                <>
                    <p>
                        Application sandboxing isolates programs within restricted environments that limit their access to system
                        resources, files, and network connections. Even if an application is compromised, containment keeps the
                        broader system safe.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Running browsers in sandboxed environments</li>
                            <li>Isolating financial applications from general processes</li>
                            <li>Containerizing untrusted third-party apps</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.techtarget.com/searchmobilecomputing/definition/application-sandboxing"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Application Sandboxing
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/Ransomware">Ransomware</Link>
                            </li>
                            <li>
                                <Link to="/frauds/ZeroDayExploit">Zero-Day Exploit</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default ApplicationSandboxing;
