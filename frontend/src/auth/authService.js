import {
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

// --- Observer ---

export const observeAuth = (cb) => onAuthStateChanged(auth, cb);

// --- Email/Password Authentication ---

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = async (email, password, displayName) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) await updateProfile(cred.user, { displayName });

  // Send verification email
  const actionCodeSettings = {
    url: `${window.location.origin}/login`, // where to land after clicking the email link
    handleCodeInApp: false,                 // not allowed access yet
  };
  await sendEmailVerification(cred.user, actionCodeSettings);

  return cred;
};

// --- Password Reset ---
export const requestPasswordReset = (email) =>
  sendPasswordResetEmail(auth, email);

// --- Google Authentication ---

export const loginWithGoogle = (method = "popup") =>
  method === "redirect"
    ? signInWithRedirect(auth, googleProvider)
    : signInWithPopup(auth, googleProvider);

// --- Log out ---

export const logout = () => signOut(auth);

