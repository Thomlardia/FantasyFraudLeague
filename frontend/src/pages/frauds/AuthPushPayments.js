import { Link } from 'react-router-dom';

function AuthPushPayments() {
    return (
        <div>
            <h1>AuthPushPayments</h1>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Fraudsters manipulate victims into authorizing legitimate payment transfers to criminal accounts. Examples: fake emergency calls, romance scams, fake invoice fraud.
                </p>
            </div>
        </div>
    );
}

export default AuthPushPayments;