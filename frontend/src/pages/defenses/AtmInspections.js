import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function AtmInspections() {
    return (
        <DefenseDetailPage
            defenseKey="atmInspection"
            title="ATM Inspections"
            infoContent={
                <>
                    <p className="info-paragraph">
                        ATM inspections involve routinely checking machines for tampering, including skimming devices, hidden
                        cameras, fake keypads, or unusual attachments. Teams also verify software integrity and tamper seals so
                        customers are protected before they transact.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Checking ATMs for skimmers or hidden cameras</li>
                            <li>Ensuring critical software updates are installed</li>
                            <li>Verifying cash slot tamper seals and anti-tamper indicators</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/AtmSkimming" className="info-link">ATM Skimming</Link>
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
                                    href="https://investinatmmachines.com/blog/atm-inspections-and-audits/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    ATM Inspections
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

export default AtmInspections;
