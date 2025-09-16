// simple manual tests for attack info functions.
import { getAttackInfo } from "./src/domains/attack/service.js";

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
}

run().catch(console.error);
