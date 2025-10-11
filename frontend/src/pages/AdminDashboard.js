import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { useAuth } from "../auth/useAuth";
import '../styles/ui.css';

export default function AdminDashboard() {
  const { user, roles, refreshClaims } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [users, setUsers] = useState(null);

  const listUsers = async () => {
    setErr("");
    setLoading(true);
    try {
      const call = httpsCallable(functions, "admin_listUsers");
      const res = await call();
      setUsers(res.data || []);
    } catch (e) {
      setErr(e?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // on first visit, ensure claims are fresh if the user just got promoted
    refreshClaims?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="simple-page admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>
        Signed in as <strong>{user?.email || user?.uid}</strong>
      </p>
      <p>Roles: {roles.length ? roles.join(", ") : "(none)"}</p>

      <div className="simple-action-row simple-page__actions">
        <button onClick={refreshClaims} disabled={loading}>
          Refresh Roles
        </button>
        <button onClick={listUsers} disabled={loading}>
          {loading ? "Loading…" : "List Users"}
        </button>
        <button
          onClick={() => navigate(location.state?.from?.pathname || "/home", { replace: true })}
        >
          Continue to App
        </button>
      </div>

      {err && <p className="simple-error">{err}</p>}

      {Array.isArray(users) && (
        <div className="admin-users">
          <h3>Users</h3>
          <pre className="admin-users__code">
            {JSON.stringify(users, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
