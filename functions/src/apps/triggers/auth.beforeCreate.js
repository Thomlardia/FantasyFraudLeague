import * as functionsV2 from "firebase-functions/v2/identity";
import { HttpsError } from "firebase-functions/v2/https";
import { enforceRegistrationGuards } from "../common/registrationGuards.js";

/**
 * Blocking function that runs BEFORE a user account is created.
 * This intercepts ALL registration attempts (email/password, OAuth, etc.)
 * and allows you to reject suspicious registrations.
 *
 * Protects against:
 * - Disposable email addresses
 * - Rapid registration attacks
 * - Bot registrations
 * - Email domain restrictions
 */
export const beforeUserCreated = functionsV2.beforeUserCreated(
  { region: "africa-south1" },
  async (event) => {
    const user = event.data;
    const email = user.email || "";
    const providerId = event.additionalUserInfo?.providerId || "unknown";

    // Allow OAuth providers (Google, etc.) to bypass email/password restrictions
    if (providerId !== "password") {
      console.log(`Allowing OAuth registration: ${email}`);
      return;
    }

    const hasAppCheck = Boolean(event.app?.appId);
    if (!hasAppCheck) {
      console.warn(`Blocked password registration without App Check: ${email}`);
      throw new HttpsError(
        "failed-precondition",
        "App Check verification required to create email/password accounts."
      );
    }

    console.log(`Registration attempt - email: ${email}, provider: ${providerId}`);

    try {
      await enforceRegistrationGuards({ email, providerId });
      console.log(`✅ Registration approved: ${email}`);
    } catch (error) {
      console.error(`❌ Registration rejected: ${email}`, error);

      // Re-throw the error so it blocks the registration
      // The error from enforceRegistrationGuards is already an HttpsError
      throw error;
    }
  }
);
