import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div>
            <h1>Signup</h1>
            <Link to="/">BACK</Link>

            <br />

            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />

            <Link to="/home">
                <button>Sign up</button>
            </Link>
        </div>
    );
}

export default Signup;