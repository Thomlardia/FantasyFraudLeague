import { Link } from 'react-router-dom';

function UserEducation() {
    return (
        <div>
            <h1>UserEducation</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/Phishing">Phishing</Link>
                    </li>
                    <li>
                        <Link to="/frauds/Ransomware">Ransomware</Link>
                    </li>
                     <li>
                        <Link to="/frauds/Vishing">Vishing</Link>
                    </li>
                    <li>
                        <Link to="/frauds/AuthPushPayments">AuthPushPayments</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default UserEducation;