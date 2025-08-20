import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';

function RegulatedAutoBackup() {
    return (
        <div className="shop-container">
            
            <div className="header">
                <Link to="/defenseshop" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1>Regulated Auto Backup</h1>
                <div></div>
            </div>
            <div className="content-container">
                <div className="description-card">
                    <p>
                        Regulated automated backups involve systematic, scheduled creation of data copies following established policies and procedures. In the event of ransomware encryption, organizations can restore systems and data from clean backups rather than paying ransom demands.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Daily backup of financial ledgers</li>
                            <li>Cloud replication of CRM data</li>
                            <li>Encrypted offsite storage for disaster recovery</li>
                        </ul>
                </div>
                
                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/Ransomware">Ransomware</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RegulatedAutoBackup;