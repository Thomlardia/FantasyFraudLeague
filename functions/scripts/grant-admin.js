// Bootstraps the first admin user by setting a custom claim.
// Usage:
//   node functions/scripts/grant-admin.js --email you@example.com
// OR
//   node functions/scripts/grant-admin.js you@example.com

import admin from "firebase-admin";

const getArg = (name) => {
  const prefixed = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (prefixed) return prefixed.split("=")[1];
  const idx = process.argv.findIndex((a) => a === `--${name}`);
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  return null;
};

const main = async () => {
  const positionalEmail = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : null;
  const email = getArg("email") || positionalEmail;
  const projectId = process.env.FIREBASE_CONFIG
    ? JSON.parse(process.env.FIREBASE_CONFIG).projectId
    : process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || "wario-fantasy-fraud-league";

  if (!email) {
    console.error("Usage: node functions/scripts/grant-admin.js --email you@example.com");
    process.exit(1);
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      projectId,
      credential: admin.credential.applicationDefault(),
    });
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    const prev = user.customClaims || {};
    const roles = Array.isArray(prev.roles) ? Array.from(new Set([...prev.roles, "admin"])) : ["admin"];
    await admin.auth().setCustomUserClaims(user.uid, { ...prev, roles });
    console.log(`Granted admin to ${email} (uid=${user.uid}). Roles: [${roles.join(", ")}]`);
    console.log("Have the user sign out/in to refresh their token.");
    process.exit(0);
  } catch (err) {
    console.error("Failed to grant admin:", err?.message || err);
    process.exit(1);
  }
};

main();

