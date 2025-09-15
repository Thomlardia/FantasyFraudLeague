// repo.js
import { db } from "../../infra/db/index.js";

export async function saveDefense(defense) {
  await db.collection("users")
    .doc(defense.userId)
    .collection("defenses")
    .doc(defense.defenseId)
    .set(defense.toJSON(), { merge: true });
}

export async function getDefense(userId, defenseId) {
  const doc = await db.collection("users")
    .doc(userId)
    .collection("defenses")
    .doc(defenseId)
    .get();

  return doc.exists ? doc.data() : null;
}

export async function getAllDefenses(userId) {
  const querySnapshot = await db.collection("users")
    .doc(userId)
    .collection("defenses")
    .get();

  return querySnapshot.docs.map(doc => ({
    defenseId: doc.id,
    ...doc.data(),
  }));
}

export async function updateUserDefenseSummary(userId) {
  const allDefenses = await getAllDefenses(userId);
  const ownedDefenses = allDefenses.filter(d => d.owned);

  const defenseSummary = {};
  const defensesList = [];

  ownedDefenses.forEach(d => {
    defenseSummary[d.defenseId] = {
      owned: true,
      level: d.level,
      buyCost: d.buyCost,
      upgradeCost: d.upgradeCost,
      defendsAgainst: d.defendsAgainst,
    };
    defensesList.push({ defenseId: d.defenseId, level: d.level });
  });

  await db.collection("users").doc(userId).update({
    ownedDefenses: defenseSummary,
    ownedDefensesList: defensesList,
    totalDefensesOwned: ownedDefenses.length,
  });
}

