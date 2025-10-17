import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireAppCheck } from "../common/authzn.js";
import { auth } from "../../infra/db/index.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const MAX_DISPLAY_NAME_LENGTH = 120;

export const auth_registerWithEmail = onCall(
  {
    region: "africa-south1",
    enforceAppCheck: true,
    consumeAppCheckToken: true,
  },
  async (request) => {
    requireAppCheck(request);

    const { email, password, displayName } = request.data || {};

    console.log("auth_registerWithEmail invoked", {
      email,
      appCheckValid: request.appCheck?.valid === true,
      appCheckAppId: request.appCheck?.appId || null,
      callerUid: request.auth?.uid || null,
    });

    if (typeof email !== "string" || !email.trim()) {
      throw new HttpsError("invalid-argument", "A valid email address is required.");
    }
    if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
      throw new HttpsError(
        "invalid-argument",
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      throw new HttpsError("invalid-argument", "Email address is invalid.");
    }

    const sanitizedDisplayName =
      typeof displayName === "string" && displayName.trim().length > 0
        ? displayName.trim().slice(0, MAX_DISPLAY_NAME_LENGTH)
        : undefined;

    // Registration guards will be enforced by beforeUserCreated trigger
    // to avoid double-checking and rate limit issues

    try {
      await auth.getUserByEmail(normalizedEmail);
      throw new HttpsError("already-exists", "An account with this email already exists.");
    } catch (lookupError) {
      if (lookupError.code !== "auth/user-not-found") {
        console.error("Failed to check existing user:", lookupError);
        throw mapAdminErrorToHttps(lookupError);
      }
    }

    try {
      const userRecord = await auth.createUser({
        email: normalizedEmail,
        password,
        displayName: sanitizedDisplayName,
        emailVerified: false,
        disabled: false,
      });

      console.log(`Created user ${userRecord.uid} via callable sign-up.`);
      let customToken;
      try {
        customToken = await auth.createCustomToken(userRecord.uid);
      } catch (tokenError) {
        console.error("Failed to mint custom token; rolling back user creation.", tokenError);
        try {
          await auth.deleteUser(userRecord.uid);
          console.log(`Rolled back user ${userRecord.uid} after token failure.`);
        } catch (cleanupError) {
          console.error(`Failed to clean up user ${userRecord.uid}`, cleanupError);
        }
        throw mapAdminErrorToHttps(tokenError);
      }

      return {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        customToken,
      };
    } catch (error) {
      console.error("Failed to create user via Admin SDK:", error);
      throw mapAdminErrorToHttps(error);
    }
  }
);

function mapAdminErrorToHttps(error) {
  switch (error?.code) {
    case "auth/email-already-exists":
      return new HttpsError("already-exists", "An account with this email already exists.");
    case "auth/invalid-email":
      return new HttpsError("invalid-argument", "Email address is invalid.");
    case "auth/invalid-password":
      return new HttpsError(
        "invalid-argument",
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
    case "auth/invalid-display-name":
      return new HttpsError("invalid-argument", "Display name is invalid.");
    default:
      return new HttpsError("internal", "Unable to complete registration right now.");
  }
}
