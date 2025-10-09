import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function InvestmentScam() {
    return (
        <FraudDetailPage
            title="Investment Scams"
            infoContent={
                <>
                    <p>
                        Investment scams lure victims into fraudulent opportunities by promising high returns with little risk.
                        Scammers fabricate testimonials, forge documents, and use aggressive sales tactics to build credibility fast.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Ponzi schemes paying old investors with new money</li>
                            <li>Pump-and-dump manipulation of thinly traded stocks</li>
                            <li>Fake cryptocurrency opportunities with fabricated dashboards</li>
                            <li>Advance-fee fraud requiring upfront payments</li>
                            <li>Binary options scams running rigged trading platforms</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            From the 1720 South Sea Bubble to Charles Ponzi’s 1920s scheme, investment scams have evolved with
                            markets. Today the internet and cryptocurrency allow global reach and anonymous laundering.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/UserEducation">User Education</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://consumer.ftc.gov/articles/investment-scams"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Investment Scams
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default InvestmentScam;
