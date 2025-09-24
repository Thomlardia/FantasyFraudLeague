import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function InvestmentScam() {
    return (
        <div className="fraud-container">
            <div className="topbar">
            <div className="topbar-group">
                <Link to="/fraudwiki" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
            </div>
            <MoneyBar />
            <div className="topbar-group"></div>
            </div>
            <div className="header">

                <h1>Investment Scams</h1>
                <div></div>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Investment scams trick victims into putting money into fraudulent opportunities 
                        with promises of high returns and little to no risk. Scammers exploit greed and 
                        financial insecurity, often using fake testimonials, fabricated documents, 
                        and aggressive sales tactics to build credibility.
                    </p>
                    <br />
                    <p>
                        <a href="https://consumer.ftc.gov/articles/investment-scams" target="_blank" rel="noopener noreferrer">
                            Reference: Investment Scams
                        </a>.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Ponzi schemes paying old investors with new money</li>
                        <li>Pump-and-dump stock manipulation schemes</li>
                        <li>Fake cryptocurrency investment opportunities</li>
                        <li>Advance fee fraud requiring upfront payments</li>
                        <li>Binary options scams with rigged platforms</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        Investment scams date back centuries — from the 1720 South Sea Bubble 
                        to Charles Ponzi's infamous 1920s scheme. Today, the internet and cryptocurrency 
                        enable scams to spread globally and hide financial trails with ease.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li><Link to="/defenses/UserEducation">User Education</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default InvestmentScam;