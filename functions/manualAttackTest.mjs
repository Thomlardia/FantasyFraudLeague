// simple manual tests for attack info functions.
import { getAttackInfo, getRandomWave, getEasyWave, getMediumWave, getHardWave, attackDeduction } from "./src/domains/attack/service.js";
import { updateUserBalance, getUserBalance } from "./src/domains/wallet/service.js";

async function run() {
  // Setup test user
  const testUserId = "testuser456";
  await updateUserBalance(testUserId, 1000); // Set initial balance

  const testAttackId = "phishing";
  console.log("Testing the getAttackInfo for:", testAttackId);

  const attack = getAttackInfo(testAttackId);
  if (attack) {
    console.log("Attack found:", attack);
  } else {
    console.log("Attack not found for id:", testAttackId);
  }

  // Test with a non-existent attack id
  const fakeId = "notAnAttack";
  const missing = getAttackInfo(fakeId);
  if (!missing) {
    console.log("Correctly returned null for non-existent attackId:", fakeId);
  } else {
    console.log("unnexpectedly found attack for id:", fakeId, missing);
  }

  // Test getRandomWave
  console.log("\nTesting getRandomWave (should return 4 unique attacks):");
  const randomWave = getRandomWave();
  console.log(randomWave);
  if (randomWave.length === 4 && new Set(randomWave.map(a => a.attackId)).size === 4) { 
    console.log("Random wave test passed.");
  } else {
    console.log("Random wave test failed.");
  }

  // Test getEasyWave
  console.log("\nTesting getEasyWave (should return 3 unique attacks, dangerLevel 1-2):");
  const easyWave = getEasyWave(); 
  console.log(easyWave);
  if (
    easyWave.length === 3 && // check lenght
    new Set(easyWave.map(a => a.attackId)).size === 3 && // check if all attacks are unique
    easyWave.every(a => a.dangerLevel >= 1 && a.dangerLevel <= 2) // check if attacks have correct dangere level
  ) {
    console.log("Easy wave test passed.");
  } else {
    console.log("Easy wave test failed.");
  }

  // Test getMediumWave
  console.log("\nTesting getMediumWave (should return 4 unique attacks, dangerLevel 1-3):");
  const mediumWave = getMediumWave();
  console.log(mediumWave);
  if (
    mediumWave.length === 4 &&
    new Set(mediumWave.map(a => a.attackId)).size === 4 &&
    mediumWave.every(a => a.dangerLevel >= 1 && a.dangerLevel <= 3)
  ) {
    console.log("Medium wave test passed.");
  } else {
    console.log("Medium wave test failed.");
  }

  // Test getHardWave
  console.log("\nTesting getHardWave (should return 5 unique attacks, dangerLevel 2-4):");
  const hardWave = getHardWave();
  console.log(hardWave);
  if (
    hardWave.length === 5 &&
    new Set(hardWave.map(a => a.attackId)).size === 5 &&
    hardWave.every(a => a.dangerLevel >= 2 && a.dangerLevel <= 4)
  ) {
    console.log("Hard wave test passed.");
  } else {
    console.log("Hard wave test failed.");
  }
  // Test applyWaveDamageToWallet
  console.log("\nTesting attackDeduction with a random wave:");
  const wave = getRandomWave();
  const beforeBalance = await getUserBalance(testUserId);
  console.log("User balance before wave:", beforeBalance);
  const newBalance = await attackDeduction(testUserId, wave);
  console.log("Wave baseDamages:", wave.map(a => a.baseDamage));
  console.log("User balance after wave:", newBalance);
  const expected = Math.max(0, beforeBalance - wave.reduce((sum, a) => sum + (a.baseDamage || 0), 0));
  if (newBalance === expected) {
    console.log("attackDeduction test passed.");
  } else {
    console.log("attackDeduction test failed. Expected:", expected, "but got:", newBalance);
  }
}

run().catch(console.error);
