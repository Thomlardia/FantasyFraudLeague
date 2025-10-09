import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function CryptoJacking() {
    return (
        <FraudDetailPage
            title="Cryptojacking"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Cryptojacking covertly abuses computing resources to mine cryptocurrency. Attackers run scripts on websites,
                        bundle miners into software, or deploy malware that hijacks processing power, causing performance issues and
                        energy waste.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Browser-based mining via malicious JavaScript</li>
                            <li>Infected mobile apps secretly mining cryptocurrency</li>
                            <li>Compromised servers used for large-scale mining</li>
                            <li>Botnets turning infected PCs into mining networks</li>
                            <li>Abuse of cloud infrastructure for industrialised mining</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Cryptojacking emerged alongside cryptocurrencies in the late 2000s but surged after 2017 when browser
                            services like Coinhive made it easy. Rising crypto values incentivised widespread criminal adoption.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/NetworkMonitoring" className="info-link">Network Monitoring</Link>
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
                                    href="https://www.fortinet.com/resources/cyberglossary/cryptojacking"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Cryptojacking
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

export default CryptoJacking;
