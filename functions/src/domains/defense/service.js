/**
 * What can we do with defenses
 * Implements the business rules/use cases.
 * Uses model.js to create valid objects.
 * Uses data.js to fetch/save them.
 * Enforces rules (e.g., can’t buy if you already own it, can’t upgrade if you don’t own it, check wallet balance).
 */

import { DEFENSE_CONFIG } from "./defenseConfig.js";
import { Defense } from "./model.js";
import { saveDefense, getDefense } from "./repo.js";
import { getUserBalance, updateUserBalance } from "../wallet/service.js"; // pull from develop branch

/**
 * Buys a defense for the user.
 * @param {string} userId - The ID of the user buying the defense.
 * @param {string} defenseId - The ID of the defense to buy.
 * @throws {Error} If the defense does not exist.
 * @throws {Error} If the user already owns the defense.
 * @throws {Error} If the user doesn't have enough funds in their wallet.
 * @returns {Promise<Defense>} A Promise that resolves to the newly purchased defense.
 */
export async function buyDefense(userId, defenseId) {
    const config = DEFENSE_CONFIG[defenseId];
    if (!config) throw new Error("Defense not found");

    const existing = await getDefense(userId, defenseId);
    if (existing && existing.owned) throw new Error("You already own this defense");

    const balance = await getUserBalance(userId);
    if (balance < config.buyCost) throw new Error("Insufficient funds");

    await updateUserBalance(userId, balance - config.buyCost);

    const defense = new Defense({ userId, defenseId, owned: true, ...config });
    await saveDefense(defense);

    return defense;
}

/**
 * Upgrades a defense for the user.
 * @param {string} userId - The ID of the user upgrading the defense.
 * @param {string} defenseId - The ID of the defense to upgrade.
 * @throws {Error} If the defense does not exist.
 * @throws {Error} If the user doesn't own the defense.
 * @throws {Error} If the defense cannot be upgraded (e.g. it's already at max level).
 * @throws {Error} If the user doesn't have enough funds in their wallet.
 * @returns {Promise<Defense>} A Promise that resolves to the newly upgraded defense.
 */
export async function upgradeDefense(userId, defenseId) {
    const existing = await getDefense(userId, defenseId);
    if (!existing || !existing.owned) throw new Error("You don't own this defense");

    const config = DEFENSE_CONFIG[defenseId];
    if (!config.upgradesTo) throw new Error("Defense cannot be upgraded");

    const balance = await getUserBalance(userId);
    if (balance < config.upgradesTo.upgradeCost) throw new Error("Insufficient funds");

    await updateUserBalance(userId, balance - config.upgradesTo.upgradeCost);

    const upgraded = new Defense({
      ...existing,
      level: config.upgradesTo.level,
      name: config.upgradesTo.name,
      defendsAgainst: { ...existing.defendsAgainst, ...config.upgradesTo.defendsAgainst },
      upgradeCost: config.upgradesTo.upgradeCost
    });

    await saveDefense(upgraded);
    return upgraded;
}
