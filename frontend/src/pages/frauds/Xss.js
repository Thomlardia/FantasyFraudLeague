import { Link } from 'react-router-dom';

function Xss() {
    return (
        <div>
            <h1>Xss</h1>
            <Link to="/fraudwiki">BACK</Link>
        </div>
    );
}

export default Xss;