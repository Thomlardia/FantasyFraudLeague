import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function RegulatedAutoBackup() {
    return (
        <DefenseDetailPage
            defenseKey="automatedBackups"
            title="Regulated Auto Backup"
            infoContent={
                <>
                    <p>
                        Regulated automated backups schedule consistent, policy-driven snapshots of critical data. Clean recovery
                        points make it possible to restore operations after ransomware or accidental data loss without paying
                        attackers.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Daily backups of financial ledgers to isolated storage</li>
                            <li>Cloud replication of CRM datasets for rapid failover</li>
                            <li>Encrypted offsite archives for disaster recovery drills</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.techtarget.com/searchdatabackup/tip/Automated-backup-How-it-works-and-why-you-should-use-it"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Regulated Automated Backups
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

export default RegulatedAutoBackup;
