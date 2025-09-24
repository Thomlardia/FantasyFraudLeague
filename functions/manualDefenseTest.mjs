import { buyDefense, upgradeDefense, getUserDefenses, clearDefenseCache } from "./src/domains/defense/service.js";
import { getUserBalance, updateUserBalance } from "./src/domains/wallet/service.js";

async function testDefenses() {
  const testUserId = "SYj5FUHKk7dYWSw7xeDot7u3T4sg";
  
  console.log("Starting Defense Domain Tests...\n");
  
  try {
    // clear cache to ensure fresh data
    clearDefenseCache();
    
    // give user starting balance
    await updateUserBalance(testUserId, 1000000);
    console.log("Seeded balance to 1,000,000");
    
    // test getting user defenses (should show all available defenses with user's levels)
    console.log("\n Getting user defenses...");
    const userDefenses = await getUserDefenses(testUserId);
    console.log(`Found ${userDefenses.length} defense templates`);
    console.log("First defense:", userDefenses[0]);
    
    // test buying defenses
    console.log("\n Testing buying defenses...");
    const defenseIds = ["atmInspection", "backgroundChecks", "ddosProtection", "deepfakeDetection"];
    
    for (const id of defenseIds) {
      try {
        const bought = await buyDefense(testUserId, id);
        console.log(`Bought ${id} at level ${bought.level}`);
      } catch (err) {
        console.error(`Error buying ${id}:`, err.message);
      }
    }
    
    // test duplicate buying (should fail)
    console.log("\nTesting duplicate purchase...");
    try {
      await buyDefense(testUserId, defenseIds[0]);
      console.error("Should have failed - duplicate purchase allowed!");
    } catch (err) {
      console.log("Correctly prevented duplicate purchase:", err.message);
    }
    
    // test upgrading defenses
    console.log("\nTesting defense upgrades...");
    for (const id of defenseIds) {
      try {
        const upgraded = await upgradeDefense(testUserId, id);
        console.log(`Upgraded ${id} to level ${upgraded.level}`);
      } catch (err) {
        console.error(`Error upgrading ${id}:`, err.message);
      }
    }
    
    // test upgrading a defense we don't own (should fail)
    console.log("\nTesting upgrade of unowned defense...");
    try {
      await upgradeDefense(testUserId, "inputValidation");
      console.error("Should have failed - upgraded unowned defense!");
    } catch (err) {
      console.log("Correctly prevented upgrade of unowned defense:", err.message);
    }
    
    // test concurrent purchases (I'm not sure how to test this yet)
    console.log("\nTesting concurrent operations...");
    const concurrentPromises = [
      buyDefense(testUserId, "automatedBackups"),
      buyDefense(testUserId, "mfa"),
    ];
    
    try {
      const results = await Promise.all(concurrentPromises);
      console.log("Concurrent purchases completed successfully");
      results.forEach((result, i) => {
        console.log(`   Purchase ${i + 1}: ${result.defenseId}`);
      });
    } catch (err) {
      console.log("One concurrent purchase failed (expected):", err.message);
    }
    
    // check final balance
    const finalBalance = await getUserBalance(testUserId);
    console.log(`\nFinal balance: ${finalBalance}`);
    
    // test cache performance (second call should be faster)
    console.log("\nTesting cache performance...");
    console.time("First getUserDefenses call");
    await getUserDefenses(testUserId);
    console.timeEnd("First getUserDefenses call");
    
    console.time("Second getUserDefenses call (cached)");
    await getUserDefenses(testUserId);
    console.timeEnd("Second getUserDefenses call (cached)");
    
    // test cache clearing
    clearDefenseCache();
    console.log("Cache cleared");
    
    console.log("\nAll tests completed!");
    
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testDefenses().catch(console.error);