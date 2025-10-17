import { useState } from "react";
import { Link } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { useAuth } from "../auth/useAuth";
import '../styles/ui.css';
import PageHeader from '../components/PageHeader';

export default function UserManagement() {
  const { user, roles, refreshClaims } = useAuth();
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

  return (
    <div className="page admin-page">
      <PageHeader title="User Management" backPath="/admin">
        <Link to="/home" className="icon-button" title="My Account">
          <span className="material-symbols-outlined">account_circle</span>
        </Link>
      </PageHeader>

      <div className="admin-content">
        <div className="admin-users-container">
          <div className="admin-user-info">
            <p className="admin-info-text">
              Signed in as <strong>{user?.email || user?.uid}</strong>
            </p>
            <p className="admin-info-text">
              Roles: <strong>{roles.length ? roles.join(", ") : "(none)"}</strong>
            </p>
          </div>

          <div className="admin-actions">
            <button onClick={refreshClaims} disabled={loading} className="admin-action-btn">
              Refresh Roles
            </button>
            <button onClick={listUsers} disabled={loading} className="admin-action-btn">
              {loading ? "Loading…" : "List Users"}
            </button>
          </div>

          {err && <p className="admin-error">{err}</p>}

          {Array.isArray(users) && (
            <div className="admin-users-list">
              <h3 className="admin-section-title">User List</h3>
              <pre className="admin-users-code">
                {JSON.stringify(users, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
