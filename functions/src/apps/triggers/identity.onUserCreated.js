import * as functionsV1 from "firebase-functions/v1";
import { db } from "../../infra/db/index.js";

export const userDocOnCreate = functionsV1
  .region("europe-west1")
  .auth
  .user()
  .onCreate(async (user) => {
    if (!user) return;
    const uid = user.uid;
    const email = user.email || null;
    const name = user.displayName || email.split("@")[0] || "Unknown User";

    const ref = db.collection("users").doc(uid);
    const snap = await ref.get();
    if (snap.exists) return; // idempotent

    await ref.set(
      {
        id: uid,
        email,
        name,
        balance: 1_000_000,
        ownedDefensesList: [],
        ownedDefenses: {},
        totalDefensesOwned: 0,
        userType: "player",
        createdAt: new Date(),
      },
      { merge: true }
    );
  });
