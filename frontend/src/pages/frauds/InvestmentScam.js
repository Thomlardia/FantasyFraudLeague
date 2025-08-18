import { Link } from 'react-router-dom';

function InvestmentScam() {
    return (
        <div>
            <h1>InvestmentScam</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Fraudulent investment schemes promising high returns with little risk. Examples: Ponzi schemes, pump-and-dump stocks, fake cryptocurrency investments, advance fee fraud.
                </p>
            </div>
        </div>
    );
}

export default InvestmentScam;