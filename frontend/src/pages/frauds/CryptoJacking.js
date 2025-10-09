import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function CryptoJacking() {
    return (
        <FraudDetailPage
            title="Cryptojacking"
            infoContent={
                <>
                    <p>
                        Cryptojacking covertly abuses computing resources to mine cryptocurrency. Attackers run scripts on websites,
                        bundle miners into software, or deploy malware that hijacks processing power, causing performance issues and
                        energy waste.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Browser-based mining via malicious JavaScript</li>
                            <li>Infected mobile apps secretly mining cryptocurrency</li>
                            <li>Compromised servers used for large-scale mining</li>
                            <li>Botnets turning infected PCs into mining networks</li>
                            <li>Abuse of cloud infrastructure for industrialised mining</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Cryptojacking emerged alongside cryptocurrencies in the late 2000s but surged after 2017 when browser
                            services like Coinhive made it easy. Rising crypto values incentivised widespread criminal adoption.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/NetworkMonitoring">Network Monitoring</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.fortinet.com/resources/cyberglossary/cryptojacking"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cryptojacking
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default CryptoJacking;
