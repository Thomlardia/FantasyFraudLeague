import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function SegregationOfDuties() {
    return (
        <DefenseDetailPage
            defenseKey="segregationOfDuties"
            title="Segregation Of Duties"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Segregation of duties divides sensitive processes between multiple people so no single individual controls an
                        entire transaction. Splitting responsibilities reduces the chance that fraud can go undetected.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Separating software developers from production deployments</li>
                            <li>One employee approves payments while another executes them</li>
                            <li>Different staff handle cash collection and account reconciliation</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/InsiderFraud" className="info-link">Insider Fraud</Link>
                            </li>
                            <li>
                                <Link to="/frauds/AccAndInvFraud" className="info-link">Account and Invoice Fraud</Link>
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
                                    href="https://hyperproof.io/resource/segregation-of-duties/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Segregation Of Duties
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

export default SegregationOfDuties;
