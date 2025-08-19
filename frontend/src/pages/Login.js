import { Link, useLocation } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import AuthForm from "../components/AuthForm";

export default function Login() {
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/home";

  return (
    <div>
      <h1>Login</h1>
      <Link to="/">BACK</Link>

      <AuthForm mode="login" redirectTo={redirectTo} />

      <hr style={{ margin: "20px 0" }} />

      <GoogleAuthButton text="Sign in with Google" redirectTo={redirectTo} />
    </div>
  );
}
