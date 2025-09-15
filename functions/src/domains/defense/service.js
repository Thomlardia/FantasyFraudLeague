// service.js
import { Defense } from "./model.js";
import { saveDefense, getDefense, updateUserDefenseSummary } from "./repo.js";
import { getUserBalance, updateUserBalance } from "../wallet/service.js";

export async function buyDefense(userId, defenseId) {
  const defenseData = await getDefense(userId, defenseId);
  if (!defenseData) throw new Error("Defense not found in your available defenses");

  if (defenseData.owned) throw new Error("You already own this defense");

  const balance = await getUserBalance(userId);
  if (balance < defenseData.buyCost) throw new Error("Insufficient funds");

  await updateUserBalance(userId, balance - defenseData.buyCost);

  const defense = new Defense({ ...defenseData, owned: true, level: 1, userId });
  await saveDefense(defense);

  await updateUserDefenseSummary(userId, { force: true });

  return defense.toJSON();  // return plain object
}

export async function upgradeDefense(userId, defenseId) {
  const existing = await getDefense(userId, defenseId);
  if (!existing || !existing.owned) throw new Error("You don't own this defense yet");

  const balance = await getUserBalance(userId);
  if (balance < existing.upgradeCost) throw new Error("Insufficient funds");

  await updateUserBalance(userId, balance - existing.upgradeCost);

  const upgraded = new Defense({
    ...existing,
    level: existing.level,
    // calculate next level cost (helper function from users.js could be moved here)
    userId
  });
  await saveDefense(upgraded);

  await updateUserDefenseSummary(userId, { force: true });

  return upgraded.toJSON(); // return plain object
}
