import { Link, useLocation } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import AuthForm from "../components/AuthForm";
import "../styles/ui.css";
import fflLogo from '../images/ffl_logo_ghost.png';

export default function Signup() {
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/home";

  return (
    <div className="splash">
      <div className="splash-header">
        <img src={fflLogo} alt="FFL Shield Logo" className="splash-logo" />
      </div>
      
      <h1 className="splash-main-title">Sign Up</h1>
      
      <Link to="/" className="splash-button secondary" style={{ marginBottom: "20px" }}>
        Back
      </Link>

      <AuthForm mode="signup" redirectTo={redirectTo} />

      <hr style={{ margin: "20px 0", border: "none", height: "1px", background: "rgba(255, 255, 255, 0.2)" }} />

      <GoogleAuthButton text="Sign up with Google" redirectTo={redirectTo} />
    </div>
  );
}
