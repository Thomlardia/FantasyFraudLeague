import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { toMessage } from "../auth/errorMap";

export default function GoogleAuthButton({ text = "Continue with Google", redirectTo = "/home", method = "popup" }) {
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    if (loading) return;
    setErr("");
    setLoading(true);
    try {
      await loginWithGoogle(method);
      navigate(redirectTo);
    } catch (e) {
      setErr(toMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <button
        onClick={handleClick}
        disabled={loading}
        className="splash-button"
      >
        {loading ? "Please wait…" : text}
      </button>
      {err && <p className="error-message">{err}</p>}
    </div>
  );
}

