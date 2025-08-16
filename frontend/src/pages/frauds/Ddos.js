import { Link } from 'react-router-dom';

function Ddos() {
    return (
        <div>
            <h1>Ddos</h1>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Overwhelming a target system, server, or network with a flood of internet traffic from multiple sources to make services unavailable. Examples: botnets attacking websites, amplification attacks.
                </p>
            </div>
        </div>
    );
}

export default Ddos;