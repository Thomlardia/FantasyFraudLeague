import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import '../styles/ui.css';

export default function VerifyEmail() {
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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
    try {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        navigate(next, { replace: true });
      } else {
        alert("Still not verified. Click the link in your email, then try again.");
      }
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="simple-page verify-page">
      <h1>Verify your email</h1>
      <p>We sent a verification link to <b>{auth.currentUser?.email}</b>.</p>
      <div className="simple-action-row simple-page__actions">
        <button onClick={resend} disabled={sending}>
          {sending ? "Sending…" : "Resend email"}
        </button>
        <button onClick={checkAgain} disabled={checking}>
          {checking ? "Checking…" : "I’ve verified — check again"}
        </button>
      </div>
    </div>
  );
}
