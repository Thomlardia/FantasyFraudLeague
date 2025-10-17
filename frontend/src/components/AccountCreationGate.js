import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { useAuth } from "../auth/useAuth";

const INITIAL_STATE = { phase: "idle", error: null, created: false };
const WAIT_RETRY_MS = 1500;

const AccountSetupCtx = createContext(null);

export function useAccountSetup() {
  const ctx = useContext(AccountSetupCtx);
  if (!ctx) {
    throw new Error("useAccountSetup must be used within an AccountCreationGate");
  }
  return ctx;
}

export default function AccountCreationGate({ children }) {
  const { user, initializing } = useAuth();
  const [state, setState] = useState(INITIAL_STATE);
  const ensuredUidRef = useRef(null);
  const runningPromiseRef = useRef(null);

  const ensureAccount = useCallback(
    ({ silent } = {}) => {
      if (!user || !user.emailVerified) {
        return Promise.reject(
          new Error("User must be signed in with a verified email before account setup.")
        );
      }

      if (ensuredUidRef.current === user.uid) {
        setState((prev) => ({
          phase: "ready",
          error: null,
          created: prev.created,
        }));
        return Promise.resolve({ status: "exists" });
      }

      if (runningPromiseRef.current) {
        return runningPromiseRef.current;
      }

      if (!silent) {
        setState({ phase: "pending", error: null, created: false });
      }

      const callable = httpsCallable(functions, "user_ensureProfile");

      const task = (async () => {
        while (true) {
          if (!user || !user.emailVerified) {
            throw new Error("Email is not verified yet. Please verify before continuing.");
          }

          try {
            await user.getIdToken(true);
          } catch (tokenError) {
            if (!silent) {
              setState({
                phase: "error",
                error: tokenError,
                created: false,
              });
            }
            throw tokenError;
          }

          try {
            const { data } = await callable({
              displayName: user.displayName ?? undefined,
            });

            ensuredUidRef.current = user.uid;
            setState({
              phase: "ready",
              error: null,
              created: data?.status === "created",
            });

            return { status: data?.status === "created" ? "created" : "exists" };
          } catch (error) {
            const code = error?.code || error?.details?.code || "";
            const message = error?.message || "";
            const isVerificationDelay =
              code === "functions/failed-precondition" ||
              code === "failed-precondition" ||
              /must be verified/i.test(message);

            if (isVerificationDelay) {
              if (!silent) {
                setState({
                  phase: "waiting-verification",
                  error: null,
                  created: false,
                });
              }
              await new Promise((resolve) => setTimeout(resolve, WAIT_RETRY_MS));
              continue;
            }

            console.error("Failed to ensure user profile", error);
            if (!silent) {
              setState({
                phase: "error",
                error,
                created: false,
              });
            }
            throw error;
          }
        }
      })();

      runningPromiseRef.current = task;
      task.finally(() => {
        if (runningPromiseRef.current === task) {
          runningPromiseRef.current = null;
        }
      });
      return task;
    },
    [user]
  );

  useEffect(() => {
    if (initializing) return;

    if (!user) {
      ensuredUidRef.current = null;
      setState(INITIAL_STATE);
      return;
    }

    if (!user.emailVerified) {
      if (state.phase !== "ready" || state.error) {
        setState({ phase: "ready", error: null, created: false });
      }
      return;
    }

    if (ensuredUidRef.current === user.uid || state.phase === "error") return;
    ensureAccount().catch(() => {});
  }, [user, initializing, ensureAccount, state.phase, state.error]);

  const needsEnsure =
    Boolean(user && user.emailVerified) && ensuredUidRef.current !== user?.uid;
  const showPending =
    state.phase === "pending" ||
    state.phase === "waiting-verification" ||
    (needsEnsure && state.phase !== "error");

  const spinnerTitle =
    state.phase === "waiting-verification"
      ? "Waiting for verification…"
      : "Setting up your account…";
  const spinnerBody =
    state.phase === "waiting-verification"
      ? "Your email verification is syncing. This can take a few seconds, and we'll move you along automatically."
      : "We’re preparing your Fantasy Fraud League profile. Hang tight — we’ll move you along automatically.";

  const contextValue = useMemo(
    () => ({
      status: state,
      ensureAccount,
    }),
    [state, ensureAccount]
  );

  let content = children;

  if (showPending) {
    content = (
      <div className="page-loading">
        <div className="page-loading-spinner">
          <span className="material-symbols-outlined">hourglass_top</span>
          <p style={{ fontWeight: 600, margin: "0 0 4px 0" }}>{spinnerTitle}</p>
          <p style={{ margin: 0, color: "var(--color-text-secondary)", maxWidth: 360, textAlign: "center" }}>
            {spinnerBody}
          </p>
        </div>
      </div>
    );
  } else if (state.phase === "error") {
    const message = state.error?.message || "Something went wrong while creating your account.";
    content = (
      <div className="page-loading">
        <div className="page-loading-spinner">
          <span className="material-symbols-outlined" style={{ color: "var(--color-red-dark)" }}>
            error
          </span>
          <p style={{ fontWeight: 600, margin: "0 0 8px 0" }}>We hit a snag setting up your profile.</p>
          <p style={{ margin: 0, color: "var(--color-text-secondary)", maxWidth: 360, textAlign: "center" }}>
            {message}
          </p>
          <button
            className="splash-button"
            style={{ marginTop: 16 }}
            onClick={() => ensureAccount().catch(() => {})}
            type="button"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <AccountSetupCtx.Provider value={contextValue}>{content}</AccountSetupCtx.Provider>
  );
}
