import { buyDefense, upgradeDefense } from "./src/domains/defense/service.js";
import { getUserBalance, updateUserBalance } from "./src/domains/wallet/service.js";
import { getAllDefenses } from "./src/domains/defense/repo.js";

async function run() {
  const testUserId = "egoiYvgpczH6WJRiy797fH7LZ7XB";

  // Give user starting balance
  await updateUserBalance(testUserId, 1000000);

  console.log("Seeded defenses and set balance to 1,000,000");

  // Test buying defenses
  const defenseIds = ["atmInspection", "backgroundChecks", "ddosProtection", "deepfakeDetection"];
  for (const id of defenseIds) {
    try {
      const bought = await buyDefense(testUserId, id);
      console.log(`Bought ${id}:`, bought);
    } catch (err) {
      console.error(`Error buying ${id}:`, err.message);
    }
  }

  // Test upgrading
  // const id = "inputValidation" // make sure you can't upgrade a defense you don't own
  for (const id of defenseIds) {
    try {
      const upgraded = await upgradeDefense(testUserId, id);
      console.log(`Upgraded ${id}:`, upgraded);
    } catch (err) {
      console.error(`Error upgrading ${id}:`, err.message);
    }
  }

  const balance = await getUserBalance(testUserId);
  console.log("Final balance:", balance);

  const userDefenses = await getAllDefenses(testUserId);
  console.log("Owned defenses:", userDefenses.filter(d => d.owned));
}

run().catch(console.error);
