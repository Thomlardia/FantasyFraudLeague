import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../firebase'; // Import auth and provider

function Login() {
    const navigate = useNavigate();

	// This function is called when the Google sign-in button is clicked.
    const handleGoogleSignIn = async () => {
        try {
            // This triggers the Google sign-in pop-up window
            const result = await signInWithPopup(auth, googleProvider);
            console.log("User signed in:", result.user); // See user info in the console
            
            // If sign-in is successful, navigate to the home page
            navigate('/home');
        } catch (error) {
            // If there's an error, log it to the console
            console.error("Authentication error:", error);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <Link to="/">BACK</Link>

            <br />
            <br />

            {/* Standard Login (no functionality for now) */}
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <Link to="/home">
                <button>Login</button>
            </Link>

            <hr style={{ margin: '20px 0' }} />

            {/* This button triggers the handleGoogleSignIn function */}
            <button onClick={handleGoogleSignIn}>
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;
