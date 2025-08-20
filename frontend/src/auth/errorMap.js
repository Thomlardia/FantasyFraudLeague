const friendly = {
  "auth/user-not-found": "No account found with that email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/invalid-email": "Please enter a valid email.",
  "auth/email-already-in-use": "That email is already in use.",
  "auth/popup-closed-by-user": "The sign-in popup was closed.",
};

export const toMessage = (err) => {
  const code = err?.code || "";
  return friendly[code] || "Something went wrong. Please try again.";
};

