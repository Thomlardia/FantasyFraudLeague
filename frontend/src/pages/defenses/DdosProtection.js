import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function DdosProtection() {
    return (
        <DefenseDetailPage
            defenseKey="ddosProtection"
            title="DDoS Protection"
            infoContent={
                <>
                    <p>
                        DDoS protection services absorb and mitigate malicious traffic surges using distributed infrastructure,
                        traffic scrubbing, and automated rate limiting. The aim is to keep legitimate users online even when attacks
                        spike.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Protecting online banking portals during peak usage</li>
                            <li>Shielding e-commerce sites during holiday sales</li>
                            <li>Safeguarding government services portals from disruption</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.ibm.com/think/topics/ddos-protection"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                DDoS Protection
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/Ddos">DDoS</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default DdosProtection;
