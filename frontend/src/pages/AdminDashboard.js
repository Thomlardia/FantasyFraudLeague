import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { useAuth } from "../auth/useAuth";

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
    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>
      <p>
        Signed in as <strong>{user?.email || user?.uid}</strong>
      </p>
      <p>Roles: {roles.length ? roles.join(", ") : "(none)"}</p>

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
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

      {err && <p style={{ color: "#c00", marginTop: 12 }}>{err}</p>}

      {Array.isArray(users) && (
        <div style={{ marginTop: 16 }}>
          <h3>Users</h3>
          <pre style={{ background: "#111", color: "#eee", padding: 12, overflowX: "auto" }}>
            {JSON.stringify(users, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
