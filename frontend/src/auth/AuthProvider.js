import { createContext, useContext, useEffect, useState } from "react";
import { getIdTokenResult } from "firebase/auth";
import { auth } from "../firebase";
import { observeAuth, logout, loginWithGoogle, loginWithEmail, registerWithEmail, requestPasswordReset } from "./authService";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [claims, setClaims] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = observeAuth(async (u) => {
      if (!u) {
        setUser(null);
        setClaims(null);
        setInitializing(false);
        return;
      }

      setUser(u);
      try {
        // pull custom claims from the ID token
        const tr = await getIdTokenResult(u);
        setClaims(tr?.claims || {});
      } catch (_e) {
        setClaims({});
      } finally {
        setInitializing(false);
      }
    });
    return unsub;
  }, []);

  const roles = Array.isArray(claims?.roles) ? claims.roles : [];
  const hasRole = (role) => roles.includes(role);

  const refreshClaims = async () => {
    if (!auth.currentUser) return null;
    const tr = await getIdTokenResult(auth.currentUser, true);
    setClaims(tr?.claims || {});
    return tr?.claims || {};
  };

  const value = {
    user,
    claims,
    roles,
    initializing,
    hasRole,
    refreshClaims,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    requestPasswordReset,
    logout,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
