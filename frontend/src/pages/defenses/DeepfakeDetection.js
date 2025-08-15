import { Link } from 'react-router-dom';

function DeepfakeDetection() {
    return (
        <div>
            <h1>DeepfakeDetection</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/Deepfake">Deepfake</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default DeepfakeDetection;