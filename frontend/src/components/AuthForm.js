import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { toMessage } from "../auth/errorMap";

export default function AuthForm({ mode = "login", redirectTo = "/home" }) {
  const { loginWithEmail, registerWithEmail, requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await registerWithEmail(email, password, displayName);
      } else {
        await loginWithEmail(email, password);
      }
      navigate(redirectTo);
    } catch (e) {
      setErr(toMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const onForgot = async () => {
    try {
      await requestPasswordReset(email);
      alert("Password reset email sent.");
    } catch (e) {
      setErr(toMessage(e));
    }
  };

  return (
    <form onSubmit={onSubmit} className="auth-form">
      {mode === "signup" && (
        <input
          placeholder="Display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete={mode === "signup" ? "new-password" : "current-password"}
      />
      <div className="auth-form-actions">
        <button
          type="submit"
          disabled={loading}
          className="splash-button auth-primary-button"
        >
          {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"}
        </button>
        {mode === "login" && (
          <button
            type="button"
            onClick={onForgot}
            className="splash-button auth-secondary-button"
          >
            Forgot password?
          </button>
        )}
      </div>
      {err && <p className="error-message">{err}</p>}
    </form>
  );
}
