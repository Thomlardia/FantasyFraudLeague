import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function KeepUpdated() {
    return (
        <DefenseDetailPage
            defenseKey="keepSoftwareUpdated"
            title="Keep Updated"
            infoContent={
                <>
                    <p>
                        Keeping software current means promptly applying security patches, updating operating systems, and ensuring
                        critical applications run on their latest stable versions. Ransomware routinely exploits known, patched
                        vulnerabilities, so fast updates close easy attack paths.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Updating payment processing platforms after vendor advisories</li>
                            <li>Applying operating system security patches on a fixed cadence</li>
                            <li>Rolling out browser updates to block newly discovered exploits</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://tech.rochester.edu/news-item/software-protect-your-data-by-keeping-software-updated/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Keeping Software Updated
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/Ransomware">Ransomware</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default KeepUpdated;
