import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';

function SegregationOfDuties() {
    return (
        <div className="shop-container">
            
            <div className="header">
                <Link to="/defenseshop" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1>Segregation Of Duties</h1>
                <div></div>
            </div>
            <div className="content-container">
                <div className="description-card">
                    <p>
                    Segregation of duties divides critical processes among multiple individuals to prevent any single person from having complete control over sensitive operations. For example, the person who approves payments should be different from the person who processes them, and the individual who reconciles accounts should be separate from those who handle transactions.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Separate software developers from production deployment</li>
                            <li>One employee approves payments, another executes them</li>
                            <li>Different roles for cash handling and reconciliation</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/InsiderFraud">Insider Fraud</Link>
                        </li>
                        <li>
                            <Link to="/frauds/AccAndInvFraud">Account and Invoice Fraud</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SegregationOfDuties;