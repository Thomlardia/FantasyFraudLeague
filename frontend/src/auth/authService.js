import {
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { auth, googleProvider, functions } from "../firebase";

const registerCallable = httpsCallable(functions, "auth_registerWithEmail", {
  limitedUseAppCheckTokens: true,
});

// --- Observer ---

export const observeAuth = (cb) => onAuthStateChanged(auth, cb);

// --- Email/Password Authentication ---

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = async (email, password, displayName) => {
  const { data } = await registerCallable({ email, password, displayName });
  const customToken = data?.customToken;
  if (!customToken) {
    throw new Error("Registration failed. Please try again.");
  }

  const cred = await signInWithCustomToken(auth, customToken);
  if (displayName) await updateProfile(cred.user, { displayName });

  const actionCodeSettings = {
    url: `${window.location.origin}/login`,
    handleCodeInApp: false,
  };
  await sendEmailVerification(cred.user, actionCodeSettings);

  return cred;
};

// --- Password Reset ---
export const requestPasswordReset = (email) =>
  sendPasswordResetEmail(auth, email);

// --- Google Authentication ---

const redirectFallbackCodes = new Set([
  "auth/operation-not-supported-in-this-environment",
  "auth/popup-blocked",
  "auth/third-party-cookie-used",
]);

export const loginWithGoogle = async (method = "popup") => {
  if (method === "redirect") {
    return signInWithRedirect(auth, googleProvider);
  }

  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    if (redirectFallbackCodes.has(error?.code)) {
      console.warn(
        `Popup Google sign-in failed with ${error.code}; retrying with redirect flow.`
      );
      return signInWithRedirect(auth, googleProvider);
    }
    throw error;
  }
};

// --- Log out ---

export const logout = () => signOut(auth);
