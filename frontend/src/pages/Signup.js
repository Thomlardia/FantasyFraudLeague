import { Link, useLocation } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import AuthForm from "../components/AuthForm";

export default function Signup() {
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/home";

  return (
    <div>
      <h1>Sign Up</h1>
      <Link to="/">BACK</Link>

      <AuthForm mode="signup" redirectTo={redirectTo} />

      <hr style={{ margin: "20px 0" }} />

      <GoogleAuthButton text="Sign up with Google" redirectTo={redirectTo} />
    </div>
  );
}
