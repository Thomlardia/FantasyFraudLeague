import { Link } from 'react-router-dom';

function TamperProofSeals() {
    return (
        <div className="shop-container">
            <h1>Tamper Proof Seals</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>
            
            <div className="description-card">
                <p>
                    Tamper proof seals are specialized security devices that provide visual evidence if ATM components have been accessed or modified. These seals use unique patterns, materials, or technologies that make them extremely difficult to remove and replace without leaving obvious signs of tampering.
                </p>
            </div>
        </div>
    );
}

export default TamperProofSeals;