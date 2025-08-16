import { Link } from 'react-router-dom';

function RegularPasswordChanges() {
    return (
        <div>
            <h1>RegularPasswordChanges</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Regular password changes involve establishing policies that require users to update their passwords at defined intervals, typically every 60-90 days.
                </p>
            </div>
        </div>
    );
}

export default RegularPasswordChanges;