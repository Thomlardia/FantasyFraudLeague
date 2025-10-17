import { useLocation } from "react-router-dom";
import AuthPage from "../components/AuthPage";

export default function Signup() {
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/home";

  return <AuthPage mode="signup" redirectTo={redirectTo} />;
}
