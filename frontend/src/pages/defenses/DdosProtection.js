import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function DdosProtection() {
    return (
        <DefenseDetailPage
            defenseKey="ddosProtection"
            title="DDoS Protection"
            infoContent={
                <>
                    <p className="info-paragraph">
                        DDoS protection services absorb and mitigate malicious traffic surges using distributed infrastructure,
                        traffic scrubbing, and automated rate limiting. The aim is to keep legitimate users online even when attacks
                        spike.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Protecting online banking portals during peak usage</li>
                            <li>Shielding e-commerce sites during holiday sales</li>
                            <li>Safeguarding government services portals from disruption</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/Ddos" className="info-link">DDoS</Link>
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
                                    href="https://www.ibm.com/think/topics/ddos-protection"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    DDoS Protection
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

export default DdosProtection;
