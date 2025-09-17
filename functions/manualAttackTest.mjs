// simple manual tests for attack info functions.
import { getAttackInfo, getRandomWave } from "./src/domains/attack/service.js";

async function run() {
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
  console.log("\nTesting getRandomWave (should return 5 unique attacks):");
  const wave = getRandomWave();
  console.log(wave);
  if (wave.length === 5 && new Set(wave.map(a => a.attackId)).size === 5) {
    console.log("Random wave test passed.");
  } else {
    console.log("random wave test failed.");
  }
}

run().catch(console.error);
