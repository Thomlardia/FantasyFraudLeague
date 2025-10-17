import { db } from "../../infra/db/index.js";

/**
 * Ensures that a Firestore profile document exists for the provided user.
 * Returns a flag indicating whether a new document was created during this call.
 */
export async function ensureUserProfile({ uid, email, displayName }) {
  if (!uid) throw new Error("Missing uid for ensureUserProfile");

  const ref = db.collection("users").doc(uid);
  const snap = await ref.get();
  if (snap.exists) {
    return {
      created: false,
      data: snap.data(),
    };
  }

  const fallbackName =
    displayName ||
    (typeof email === "string" && email.includes("@") ? email.split("@")[0] : null) ||
    "Unknown User";

  const initialDoc = {
    id: uid,
    email: email ?? null,
    name: fallbackName,
    balance: 1_000_000,
    totalSpent: 0,
    netWorth: 1_000_000,
    ownedDefensesList: [],
    ownedDefenses: {},
    totalDefensesOwned: 0,
    createdAt: new Date(),
  };

  await ref.set(initialDoc, { merge: true });

  return {
    created: true,
    data: initialDoc,
  };
}
