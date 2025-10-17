import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function KeepUpdated() {
    return (
        <DefenseDetailPage
            defenseKey="keepSoftwareUpdated"
            title="Keep Updated"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Keeping software current means promptly applying security patches, updating operating systems, and ensuring
                        critical applications run on their latest stable versions. Ransomware routinely exploits known, patched
                        vulnerabilities, so fast updates close easy attack paths.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Updating payment processing platforms after vendor advisories</li>
                            <li>Applying operating system security patches on a fixed cadence</li>
                            <li>Rolling out browser updates to block newly discovered exploits</li>
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
                                    href="https://tech.rochester.edu/news-item/software-protect-your-data-by-keeping-software-updated/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Keeping Software Updated
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

export default KeepUpdated;
