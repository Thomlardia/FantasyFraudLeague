import { Link } from 'react-router-dom';

function BusinessEmailCompromise() {
    return (
        <div>
            <h1>BusinessEmailCompromise</h1>
            <Link to="/fraudwiki">BACK</Link>

             <div className="descriptionCard">
                <p>
                    Sophisticated scams targeting businesses through compromised or spoofed email accounts to initiate fraudulent transfers. Examples: CEO fraud, vendor impersonation, invoice fraud.
                </p>
            </div>
        </div>
    );
}

export default BusinessEmailCompromise;