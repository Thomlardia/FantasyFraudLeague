import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';

function RegularPasswordChanges() {
    return (
        <div className="shop-container">
            <h1>Regular Password Changes</h1>
            <Link to="/defenseshop" className="icon-button" title="Back">
                <img src={iconBackArrow} alt="Back" className="icon-img" />
            </Link>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Regular password changes involve establishing policies that require users to update their passwords at defined intervals, typically every 60-90 days.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Rotating database admin credentials</li>
                            <li>Enforcing 90-day password reset in corporate systems</li>
                            <li>Updating service account keys</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/AccountTakeover">Account Takeover</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RegularPasswordChanges;