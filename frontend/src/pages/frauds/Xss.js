import { Link } from 'react-router-dom';

function Xss() {
    return (
        <div>
            <h1>Xss</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Attacks whereby malicious script code is injected into a web application. Attackers can steal cookies, record keyboard strokes and capture personal information.
                </p>
            </div>
        </div>
    );
}

export default Xss;