import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function SegregationOfDuties() {
    return (
        <DefenseDetailPage
            defenseKey="segregationOfDuties"
            title="Segregation Of Duties"
            infoContent={
                <>
                    <p>
                        Segregation of duties divides sensitive processes between multiple people so no single individual controls an
                        entire transaction. Splitting responsibilities reduces the chance that fraud can go undetected.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Separating software developers from production deployments</li>
                            <li>One employee approves payments while another executes them</li>
                            <li>Different staff handle cash collection and account reconciliation</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://hyperproof.io/resource/segregation-of-duties/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Segregation Of Duties
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/InsiderFraud">Insider Fraud</Link>
                            </li>
                            <li>
                                <Link to="/frauds/AccAndInvFraud">Account and Invoice Fraud</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default SegregationOfDuties;
