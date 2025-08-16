import { Link } from 'react-router-dom';

function HttpsAndEncryption() {
    return (
        <div>
            <h1>HttpsAndEncryption</h1>
            <Link to="/defenseshop">BACK</Link>
            
            <div className="descriptionCard">
                <p>
                    HTTPS and encrypted connections protect data in transit by scrambling information between users and servers, making it unreadable to attackers who intercept communications.
                </p>
            </div>
        </div>
    );
}

export default HttpsAndEncryption;