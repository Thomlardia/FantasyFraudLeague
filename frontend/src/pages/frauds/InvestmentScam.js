import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'

function InvestmentScam() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>Investment Scams</h1>
                <Link to="/fraudwiki" className='icon-button' title="Back">
                    <img src={iconBackArrow} alt="Back" className="icon-img" />
                </Link>
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
                        <li>Use only licensed and regulated brokers</li>
                        <li>Be cautious of guaranteed high returns</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default InvestmentScam;