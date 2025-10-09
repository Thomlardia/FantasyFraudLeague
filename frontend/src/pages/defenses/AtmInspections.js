import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function AtmInspections() {
    return (
        <DefenseDetailPage
            defenseKey="atmInspection"
            title="ATM Inspections"
            infoContent={
                <>
                    <p>
                        ATM inspections involve routinely checking machines for tampering, including skimming devices, hidden
                        cameras, fake keypads, or unusual attachments. Teams also verify software integrity and tamper seals so
                        customers are protected before they transact.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Checking ATMs for skimmers or hidden cameras</li>
                            <li>Ensuring critical software updates are installed</li>
                            <li>Verifying cash slot tamper seals and anti-tamper indicators</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://investinatmmachines.com/blog/atm-inspections-and-audits/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ATM Inspections
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/AtmSkimming">ATM Skimming</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default AtmInspections;
