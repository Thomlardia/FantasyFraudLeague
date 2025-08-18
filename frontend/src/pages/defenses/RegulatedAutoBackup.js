import { Link } from 'react-router-dom';

function RegulatedAutoBackup() {
    return (
        <div>
            <h1>RegulatedAutoBackup</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/Ransomware">Ransomware</Link>
                    </li>
                    
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default RegulatedAutoBackup;