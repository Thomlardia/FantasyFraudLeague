// simple manual tests for attack info functions.
import { getAttackInfo, getRandomWave, getEasyWave, getMediumWave, getHardWave, attackDeduction } from "./src/domains/attack/service.js";
import { updateUserBalance, getUserBalance } from "./src/domains/wallet/service.js";
import { getUserOwnedDefensesComplete } from "./src/domains/defense/repo.js";

async function run() {
  // Setup test user

  const testUserId = "testuser1";
  const testUser2Id = "gTXVXDqXyUjWt6KNHCHN7OHVEnnQ";
  // await updateUserBalance(testUserId, 125000); // Set initial balance

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
  // Test attackDeduction
  console.log("\nTesting attackDeduction with a random wave:");
  const wave = getHardWave();
  const beforeBalance = await getUserBalance(testUserId);
  console.log("User balance before wave:", beforeBalance);

  // Calculate and log reduction for each attack ---
  const ownedDefenses = await getUserOwnedDefensesComplete(testUserId);
  const reductionResults = wave.map(attack => {
    let reducedDamage = attack.baseDamage || 0;
    let totalPercent = 0;
    let percentDetails = [];
    for (const defenseKey in ownedDefenses) {
      const defense = ownedDefenses[defenseKey];
      if (defense.defendsAgainst && defense.defendsAgainst[attack.attackId || attack.type]) {
        const percentages = defense.defendsAgainst[attack.attackId || attack.type];
        const level = defense.level || 1;
        const percent = percentages[level - 1] || 0;
        percentDetails.push({defense: defenseKey, level, percent});
        // Each defense applies multiplicatively
        reducedDamage = reducedDamage * (1 - percent / 100);
        totalPercent = 100 - (reducedDamage / (attack.baseDamage || 1)) * 100;
      }
    }
    return {
      attackId: attack.attackId,
      baseDamage: attack.baseDamage,
      reducedDamage: Math.round(reducedDamage),
      percentDetails,
      totalPercent: Math.round(totalPercent * 100) / 100
    };
  });
  console.log("Attack reduction details:");
  reductionResults.forEach(r => {
    console.log(`Attack: ${r.attackId}, Base: ${r.baseDamage}, Reduced: ${r.reducedDamage}, Total reduction: ${r.totalPercent}%`);
    if (r.percentDetails.length > 0) {
      r.percentDetails.forEach(d => {
        console.log(`  Defense: ${d.defense}, Level: ${d.level}, Reduction: ${d.percent}%`);
      });
    } else {
      console.log("  No applicable defenses.");
    }
  });

  const newBalance = await attackDeduction(testUserId, wave);
  // Show total reduced damage after all reductions
  const totalReducedDamage = reductionResults.reduce((sum, r) => sum + r.reducedDamage, 0);
  console.log("Total damage after all reductions:", totalReducedDamage);
  console.log("User balance after wave:", newBalance);
}

run().catch(console.error);
