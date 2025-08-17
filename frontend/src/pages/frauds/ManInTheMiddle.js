import { Link } from 'react-router-dom';

function ManInTheMiddle() {
    return (
        <div>
            <h1>ManInTheMiddle</h1>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Intercepting communications between two parties to eavesdrop or manipulate data. Examples: Wi-Fi eavesdropping, SSL stripping, DNS spoofing, certificate attacks.
                </p>
            </div>
        </div>
    );
}

export default ManInTheMiddle;