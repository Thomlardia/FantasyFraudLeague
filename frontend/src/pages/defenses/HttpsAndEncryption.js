import { Link } from 'react-router-dom';

function HttpsAndEncryption() {
    return (
        <div>
            <h1>HttpsAndEncryption</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/ManInTheMiddle">AtmSkimming</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default HttpsAndEncryption;