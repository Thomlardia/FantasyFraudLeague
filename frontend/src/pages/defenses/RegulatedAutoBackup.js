import { Link } from 'react-router-dom';

function RegulatedAutoBackup() {
    return (
        <div className="shop-container">
            <h1>Regulated Auto Backup</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="description-card">
                <p>
                    Regulated automated backups involve systematic, scheduled creation of data copies following established policies and procedures. In the event of ransomware encryption, organizations can restore systems and data from clean backups rather than paying ransom demands.
                </p>
            </div>
        </div>
    );
}

export default RegulatedAutoBackup;