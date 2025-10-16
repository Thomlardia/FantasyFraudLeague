const friendly = {
  // Login errors
  "auth/user-not-found": "No account found with that email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/invalid-login-credentials": "Invalid email or password.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/too-many-requests": "Too many failed attempts. Please try again later.",

  // Email validation
  "auth/invalid-email": "Please enter a valid email address.",

  // Registration errors
  "auth/email-already-in-use": "That email is already in use.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/operation-not-allowed": "Email/password accounts are not enabled.",
  "already-exists": "That email is already in use.",
  "internal": "Unable to complete registration right now. Please try again later.",

  // OAuth errors
  "auth/popup-closed-by-user": "The sign-in popup was closed.",
  "auth/cancelled-popup-request": "Sign-in was cancelled.",
  "auth/popup-blocked": "Sign-in popup was blocked by your browser.",
  "auth/account-exists-with-different-credential": "An account already exists with this email using a different sign-in method.",

  // Network errors
  "auth/network-request-failed": "Network error. Please check your connection.",

  // Password reset errors
  "auth/expired-action-code": "This password reset link has expired.",
  "auth/invalid-action-code": "This password reset link is invalid.",
  "auth/user-token-expired": "Your session has expired. Please sign in again.",

  // Security errors
  "auth/requires-recent-login": "Please sign in again to complete this action.",
  "permission-denied": "Registration is restricted. Please use an approved email address.",
  "invalid-argument": "Invalid registration details. Please check your information.",
  "resource-exhausted": "Too many registration attempts. Please try again later.",
};

export const toMessage = (err) => {
  const code = err?.code || "";
  return friendly[code] || "Something went wrong. Please try again.";
};
