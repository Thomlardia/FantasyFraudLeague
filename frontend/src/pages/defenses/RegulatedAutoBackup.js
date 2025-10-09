import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function RegulatedAutoBackup() {
    return (
        <DefenseDetailPage
            defenseKey="automatedBackups"
            title="Regulated Auto Backup"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Regulated automated backups schedule consistent, policy-driven snapshots of critical data. Clean recovery
                        points make it possible to restore operations after ransomware or accidental data loss without paying
                        attackers.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Daily backups of financial ledgers to isolated storage</li>
                            <li>Cloud replication of CRM datasets for rapid failover</li>
                            <li>Encrypted offsite archives for disaster recovery drills</li>
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
                                    href="https://www.techtarget.com/searchdatabackup/tip/Automated-backup-How-it-works-and-why-you-should-use-it"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Regulated Automated Backups
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

export default RegulatedAutoBackup;
