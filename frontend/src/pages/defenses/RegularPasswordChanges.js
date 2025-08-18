import { Link } from 'react-router-dom';

function RegularPasswordChanges() {
    return (
        <div className="shop-container">
            <h1>Regular Password Changes</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="description-card">
                <p>
                    Regular password changes involve establishing policies that require users to update their passwords at defined intervals, typically every 60-90 days.
                </p>
            </div>
        </div>
    );
}

export default RegularPasswordChanges;