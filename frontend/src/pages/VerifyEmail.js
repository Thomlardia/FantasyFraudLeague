import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAccountSetup } from "../components/AccountCreationGate";
import { toMessage } from "../auth/errorMap";
import '../styles/ui.css';

export default function VerifyEmail() {
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { ensureAccount } = useAccountSetup();
  const next = location.state?.from?.pathname || "/home";

  const resend = async () => {
    if (!auth.currentUser) return;
    setSending(true);
    try {
      await auth.currentUser.sendEmailVerification({
        url: `${window.location.origin}/login`,
        handleCodeInApp: false,
      });
      alert("Verification email sent. Check your inbox (and spam).");
    } finally {
      setSending(false);
    }
  };

  const checkAgain = async () => {
    if (!auth.currentUser) return;
    setChecking(true);
    setError("");
    try {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        try {
          await auth.currentUser.getIdToken(true);
          await ensureAccount();
          navigate(next, { replace: true });
        } catch (setupError) {
          const msg = toMessage(setupError);
          setError(msg);
          alert(msg);
        }
      } else {
        alert("Still not verified. Click the link in your email, then try again.");
      }
    } catch (err) {
      const msg = toMessage(err);
      setError(msg);
      alert(msg);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="splash-scrollable">
          <Link to="/login" className="back-button back-button-left" title="Back to Login">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>

          <div className="splash-header">
            <img
              src="/ffl_logo_ghost.png"
              alt="FFL Shield Logo"
              className="splash-logo"
              fetchpriority="high"
              loading="eager"
            />
          </div>

          <div className="auth-stack">
            <div className="title-section auth-title-section">
              <h1 className="splash-main-title auth-page-title">Verify Your Email</h1>
            </div>

            <p style={{ textAlign: 'center', color: 'var(--color-text-primary)', fontWeight: 600, margin: '0 0 8px 0' }}>
              We sent a verification link to <b>{auth.currentUser?.email}</b>.
            </p>

            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '14px', margin: '0 0 16px 0' }}>
              Click the link in your email to verify your account, then return here.
            </p>

            {error && (
              <p style={{ textAlign: 'center', color: 'var(--color-red-dark)', fontSize: '14px', margin: '0 0 16px 0' }}>
                {error}
              </p>
            )}

            <div className="auth-form-actions">
              <button
                className="splash-button"
                onClick={checkAgain}
                disabled={checking}
                style={{ width: '100%' }}
              >
                {checking ? "Checking…" : "I've verified — check again"}
              </button>

              <button
                className="splash-button"
                onClick={resend}
                disabled={sending}
                style={{ width: '100%' }}
              >
                {sending ? "Sending…" : "Resend email"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
