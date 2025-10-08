import { Link } from "react-router-dom";
import GoogleAuthButton from "./GoogleAuthButton";
import AuthForm from "./AuthForm";
import "../styles/ui.css";
import fflLogo from "../images/ffl_logo_ghost.png";

export default function AuthPage({ mode, redirectTo }) {
  const title = mode === "login" ? "Login" : "Sign Up";
  const googleText = mode === "login" ? "Sign in with Google" : "Sign up with Google";

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="splash-scrollable">
          <Link to="/" className="back-button back-button-left" title="Back to Home">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>

          <div className="splash-header">
            <img src={fflLogo} alt="FFL Shield Logo" className="splash-logo" />
          </div>

          <div className="title-section">
            <h1 className="splash-main-title">{title}</h1>
          </div>

          <AuthForm mode={mode} redirectTo={redirectTo} />

          <hr className="auth-divider" />

          <GoogleAuthButton text={googleText} redirectTo={redirectTo} />

          <div className="auth-bottom-spacer" />
        </div>
      </div>
    </div>
  );
}
