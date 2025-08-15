import { Link } from 'react-router-dom';

function VerificationProtocols() {
    return (
        <div>
            <h1>VerificationProtocols</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/Deepfake">Deepfake fraud</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default VerificationProtocols;