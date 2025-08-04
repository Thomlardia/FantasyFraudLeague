import { Link } from 'react-router-dom';

function Login() {
    return (
        <div>
            <h1>Login</h1>

            <Link to="/">BACK</Link>

            <br />

            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />

            <Link to="/home">
                <button>Login</button>
            </Link>
        </div>
    );
}

export default Login;