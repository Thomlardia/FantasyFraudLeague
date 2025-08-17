import { Link } from 'react-router-dom';

function TamperProofSeals() {
    return (
        <div>
            <h1>TamperProofSeals</h1>
            <Link to="/defenseshop">BACK</Link>
            
            <div className="descriptionCard">
                <p>
                    Tamper proof seals are specialized security devices that provide visual evidence if ATM components have been accessed or modified. These seals use unique patterns, materials, or technologies that make them extremely difficult to remove and replace without leaving obvious signs of tampering.
                </p>
            </div>
        </div>
    );
}

export default TamperProofSeals;