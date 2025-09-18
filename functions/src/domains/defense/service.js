// service.js
import { Defense } from "./model.js";
import { saveDefense, getDefense, updateUserDefenseSummary } from "./repo.js";
import { getUserBalance, updateUserBalance } from "../wallet/service.js";

/**
 * Buys a defense for a specific user
 * @param {string} userId - The user ID to buy the defense for
 * @param {string} defenseId - The defense ID to buy
 * @throws {Error} If the defense is not found or if the user already owns it
 * @throws {Error} If the user has insufficient funds
 * @returns {Promise<Object>} The bought defense object
 */
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

/**
 * Upgrades a defense for a specific user
 * @param {string} userId - The user ID to upgrade the defense for
 * @param {string} defenseId - The defense ID to upgrade
 * @throws {Error} If the defense is not found or if the user already owns it
 * @throws {Error} If the user has insufficient funds
 * @returns {Promise<Object>} The upgraded defense object
 */
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
