import { createContext, useContext, useEffect, useState } from "react";
import { observeAuth, logout, loginWithGoogle, loginWithEmail, registerWithEmail, requestPasswordReset } from "./authService";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = observeAuth((u) => {
      setUser(u || null);
      setInitializing(false);
    });
    return unsub;
  }, []);

  const value = {
    user,
    initializing,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    requestPasswordReset,
    logout,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);

