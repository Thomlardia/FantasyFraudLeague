import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';
import FraudProtectionChart from '../../components/FraudProtectionChart';
import '../../styles/charts.css';

function InvestmentScam() {
    return (
        <FraudDetailPage
            title="Investment Scams"
            secondaryCardContent={<FraudProtectionChart attackId="investmentScams" variant="horizontal" />}
            infoContent={
                <>
                    <p className="info-paragraph">
                        Investment scams lure victims into fraudulent opportunities by promising high returns with little risk.
                        Scammers fabricate testimonials, forge documents, and use aggressive sales tactics to build credibility fast.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Ponzi schemes paying old investors with new money</li>
                            <li>Pump-and-dump manipulation of thinly traded stocks</li>
                            <li>Fake cryptocurrency opportunities with fabricated dashboards</li>
                            <li>Advance-fee fraud requiring upfront payments</li>
                            <li>Binary options scams running rigged trading platforms</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            From the 1720 South Sea Bubble to Charles Ponzi’s 1920s scheme, investment scams have evolved with
                            markets. Today the internet and cryptocurrency allow global reach and anonymous laundering.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/UserEducation" className="info-link">User Education</Link>
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
                                    href="https://consumer.ftc.gov/articles/investment-scams"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Investment Scams
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

export default InvestmentScam;
