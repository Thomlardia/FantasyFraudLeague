// Test for getUserAttackLogs function
import { getUserAttackLogs } from "./src/domains/attack/repo.js";
import { attackDeduction, getHardWave } from "./src/domains/attack/service.js";

async function testAttackLogs() {
  const testUserId = "testuser1";
  
  console.log("=== TESTING getUserAttackLogs FUNCTION ===");

  
  //  test retrieving the logs
  console.log("\n2. Testing getUserAttackLogs function...");
  try {
    // Get the last 3 attack logs for the test user
    const attackLogs = await getUserAttackLogs(testUserId, 3);
    console.log(`✓ Found ${attackLogs.length} attack logs for user ${testUserId}`);
    
    if (attackLogs.length > 0) {
      console.log("\n=== STORED ATTACK LOGS FROM DATABASE ===");
      
      attackLogs.forEach((log, logIndex) => {
        console.log(`\n--- Attack Log ${logIndex + 1} ---`);
        console.log(`Timestamp: ${log.timestamp?.toDate?.() || log.timestamp || 'Unknown'}`);
        console.log(`Log ID: ${log.id || 'Unknown'}`);
        
        console.log("\n=== FORMATTED ATTACK LOG SUMMARY ===");
        console.log(`Old Balance: $${log.oldBalance || 0}`);
        console.log(`New Balance: $${log.newBalance || 0}`);
        console.log(`Total Damage Taken: $${log.totalDamage || 0}`);
        
        if (log.attacks && log.attacks.length > 0) {
          const totalDamagePrevented = log.attacks.reduce((sum, attack) => sum + (attack.damageReduced || 0), 0);
          console.log(`Total Damage Prevented: $${totalDamagePrevented}`);
          
          console.log("\nAttack Details:");
          log.attacks.forEach((attack, index) => {
            console.log(`\n  Attack ${index + 1}: ${attack.attackName || attack.attackId || 'Unknown'}`);
            console.log(`    Original Damage: $${attack.originalDamage || 0}`);
            console.log(`    Final Damage: $${attack.finalDamage || 0}`);
            console.log(`    Damage Reduced: $${attack.damageReduced || 0} (${attack.reductionPercent || 0}%)`);
            
            if (attack.defensesApplied && attack.defensesApplied.length > 0) {
              console.log(`    Defenses Applied:`);
              attack.defensesApplied.forEach(defense => {
                console.log(`      - ${defense.defenseName || 'Unknown'} (Level ${defense.level || 1}): ${defense.reductionPercent || 0}% reduction`);
                console.log(`        Damage: $${Math.round(defense.damageBeforeDefense || 0)} → $${Math.round(defense.damageAfterDefense || 0)}`);
              });
            } else {
              console.log(`    No defenses applied`);
            }
          });
        } else {
          console.log("    No attack details available");
        }
        
        if (logIndex < attackLogs.length - 1) {
          console.log("\n" + "=".repeat(50));
        }
      });
      
      // Test getting all logs (no limit)
      console.log("\n3. Testing getUserAttackLogs without limit...");
      const allLogs = await getUserAttackLogs(testUserId);
      console.log(`✓ Total attack logs in database: ${allLogs.length}`);
      
      // Show summary of all logs
      if (allLogs.length > 0) {
        console.log("\n=== SUMMARY OF ALL ATTACK LOGS ===");
        allLogs.forEach((log, index) => {
          const logDate = log.timestamp?.toDate?.() || log.timestamp || new Date();
          const totalDamage = log.totalDamage || 0;
          const attackCount = log.attacks?.length || 0;
          console.log(`Log ${index + 1}: ${logDate.toLocaleString()} - $${totalDamage} damage from ${attackCount} attacks`);
        });
      }
      
    } else {
      console.log("No attack logs found in database for this user.");
      console.log("This might be the first time running the test or attack logs were not saved properly.");
    }
    
  } catch (error) {
    console.error("Error testing getUserAttackLogs:", error.message);
    console.error("Full error:", error);
  }
  
  console.log("\n=== TEST COMPLETED ===");
}

testAttackLogs().catch(console.error);
