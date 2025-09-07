import { buyDefense, upgradeDefense } from "./src/domains/defense/service.js";
import { getUserBalance, updateUserBalance } from "./src/domains/wallet/service.js";

async function run() {
  const testUserId = "testuser456";
  console.log("Testing defenses for user:", testUserId);

  // give the user some balance first
  await updateUserBalance(testUserId, 500);
  console.log("Set user balance to 500");

  // try buying a defense
  try {
    const defense = await buyDefense(testUserId, "atmInspection");
    console.log("Bought defense:", defense);
  } catch (err) {
    console.error("Error buying defense:", err.message);
  }

  // check user balance after purchase
  const balanceAfterBuy = await getUserBalance(testUserId);
  console.log("Balance after buying defense:", balanceAfterBuy);

  // try upgrading the defense
  try {
    const upgraded = await upgradeDefense(testUserId, "atmInspection");
    console.log("Upgraded defense:", upgraded);
  } catch (err) {
    console.error("Error upgrading defense:", err.message);
  }

  // final balance after upgrade
  const finalBalance = await getUserBalance(testUserId);
  console.log("Final balance after upgrade:", finalBalance);
}

run().catch(console.error);
