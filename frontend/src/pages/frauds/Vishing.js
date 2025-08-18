import { Link } from 'react-router-dom';

function Vishing() {
    return (
        <div>
            <h1>Vishing</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <li>
                        <Link to="/defenses/UserEducation">UserEducation</Link>
                    </li>
                    
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Voice-based phishing using phone calls to trick victims into revealing sensitive information. Examples: fake bank calls, SARS scams, tech support fraud, caller ID spoofing.
                </p>
            </div>
        </div>
    );
}

export default Vishing;