import { Link } from 'react-router-dom';

function UserEducation() {
    return (
        <div>
            <h1>UserEducation</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                    User education forms the human firewall against social engineering attacks. Training programs teach employees and users to recognize suspicious emails, phone calls and websites. This includes: Urgent language, requests for sensitive information, suspicious sender addresses. 
                </p>
            </div>
        </div>
    );
}

export default UserEducation;