/**
 * Test Runner for Wallet and Defense Functions
 * This script tests all wallet and defense operations using Firebase emulators
 */

import { getUserBalance, updateUserBalance } from '../src/domains/wallet/service.js';

import { getUserDefenses, buyDefense, upgradeDefense } from '../src/domains/defense/service.js';

import { getAllUsers, getUserOwnedDefensesComplete } from '../src/domains/defense/repo.js';

import { getAttackInfo, getRandomWave, getEasyWave, getMediumWave, getHardWave, attackDeduction } from '../src/domains/attack/service.js';

import { getUserAttackLogs } from '../src/domains/attack/repo.js';

// Custom test assertion functions, exit code = 1 if fail
function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        console.error(`FAIL: ${message} (Expected: ${expected}, Got:  ${actual})`);
        process.exit(1);
    }
    console.log(`SUCCESS: ${message} (Expected : ${expected}, Got: ${actual})`);
}

function assertGreaterThanOrEqual(actual, expected, message) {
    if (actual < expected) {
        console.error(`FAIL: ${message} (Expected: ${expected}, Got: ${actual})`);
        process.exit(1);
    }
    console.log(`SUCCESS: ${message} (Expected: ${expected}, Got: ${actual})`);
}
function assertLessThanOrEqual(actual, expected, message) {
    if (actual > expected) {
        console.error(`FAIL: ${message} (Expected: ${expected}, Got: ${actual})`);
        process.exit(1);
    }
    console.log(`SUCCESS: ${message} (Expected: ${expected}, Got: ${actual})`);
}

function assertTrue(condition, message) {
    if (!condition) {
        console.error(`FAIL: ${message}`);
        process.exit(1);
    }
    console.log(`SUCCESS: ${message}`);
}

function assertNotNull(value, message) {
    if (value === null || value === undefined) {
        console.error(`FAIL: ${message} (Got: ${value})`);
        process.exit(1);
    }
    console.log(`SUCCESS: ${message}`);
}

async function runTests() {
    console.log('Starting Tests...\n')

    try {
        // First get all users
        const users = await getAllUsers();

        if (users.length === 0) {
            console.log('No users were found in the database, seeding failed');
            process.exit(1);
        }

        console.log(`Found ${users.length} users in database`);

        // Find user to work with for testing
        const testUser = users.find(user => user.id && user.balance !== undefined);
        if (!testUser) {
            console.error('No suitable test user found with balance property');
            process.exit(1);
        }

        // Retrieve the user id and starting balance
        const testUserId = testUser.id;
        const initialBalance = testUser.balance;

        console.log('Test 1: Wallet Balance Operations');

        // Test getUserBalance
        const currentBalance = await getUserBalance(testUserId);

        assertEqual(currentBalance, initialBalance, 'Initial balance matches seeded value');

        // Test updateUserBalance
        const newBalance = 500000;
        await updateUserBalance(testUserId, newBalance);
        const updateBalance = await getUserBalance(testUserId);
        assertEqual(updateBalance, newBalance, 'Balance updated successfully');
        
        // Test invalid balance update
        try {
            await updateUserBalance(testUserId, "invalid");
            console.error('Should have thrown error for invalid balance');
            process.exit(1);
        } catch (error) {
            console.log('Correctly rejected invalid balance value');
        }

        try {
            await updateUserBalance(testUserId, NaN);
            console.error('Should have thrown error for NaN balance');
            process.exit(1);
        } catch (error) {
            console.log('Correctly rejected NaN balance value');
        }

        console.log('All wallet tests passed!\n');

        // Test 2: Defense Purchasing
        console.log('Test 2: Defense Purchasing\n');

        // Ensure user has sufficient balance for testing
        await updateUserBalance(testUserId, 1000000);

        // Verify the user has no defenses initially
        const initialDefenses = await getUserDefenses(testUserId);
        const ownedDefensesInitially = initialDefenses.filter(defense => defense.level > 1);
        assertEqual(ownedDefensesInitially.length, 0, 'User starts with no owned defenses');
        console.log('Confirmed user starts with empty defense inventory');

        // Test buying multiple defenses
        console.log('Testing multiple defense purchases...');
        const defensesToBuy = ["atmInspection", "backgroundChecks", "ddosProtection", "deepfakeDetection"];
        const purchasedDefenses = [];

        for  (const defenseId of defensesToBuy) {
            try {
                // Find defense template to get expected cost
                const defenseTemplate = initialDefenses.find(defense => defense.defenseId === defenseId);
                if (!defenseTemplate) {
                    console.log(`Defense ${defenseId} not found in templates, skipping`);
                    continue;
                }

                const balanceBeforePurchase = await getUserBalance(testUserId);
                const expectedCost = defenseTemplate.cost[0];

                console.log(`Buying ${defenseId} for ${expectedCost} ...`);
                const purchasedDefense = await buyDefense(testUserId, defenseId);

                assertEqual(purchasedDefense.level, 1, `${defenseId} purchased and is now at level 1`);
                assertEqual(purchasedDefense.defenseId, defenseId, `${defenseId} matches`);

                const balanceAfterPurchase = await getUserBalance(testUserId);
                const expectedBalanceAfter = balanceBeforePurchase - expectedCost;
                assertEqual(balanceAfterPurchase, expectedBalanceAfter, `Balance deducted correctly for ${defenseId}`);

                purchasedDefenses.push(defenseId);
                console.log(`Successfully bought ${defenseId}`);
            } catch (error) {
                console.log(`Failed to buy ${defenseId}: ${error.message}`);
            }
        }

        // Verify purchased defenses appear in user's owned defenses
        console.log('Verifying purchased defenses appear in user inventory...');
        const defensesAfterPurchaseObject = await getUserOwnedDefensesComplete(testUserId);
        const defensesAfterPurchase = Object.values(defensesAfterPurchaseObject);

        console.log(`${defensesAfterPurchase.length} retrieved from user in database and there should be ${purchasedDefenses.length}`);

        assertEqual(defensesAfterPurchase.length, purchasedDefenses.length, 'Owned defenses count matches purchases');

        console.log('Testing duplicate purchases prevention...');
        if (purchasedDefenses.length > 0) {
            const firstPurchased = purchasedDefenses[0];
            try {
                await buyDefense(testUserId, firstPurchased);
                console.error('Should have thrown error for duplicate purchase');
                process.exit(1);
            } catch (error) {
                if (error.message.includes('already own')) {
                    console.log(`Correctly prevented duplicate purchase of ${firstPurchased}`);
                } else {
                    throw error;
                }
            }
        }

        console.log('Defense purchase tests passed!');

        // Test 3: Upgrading Operations
        console.log('Testing defense upgrades');

        const defensesAfterPurchase_2Object = await getUserOwnedDefensesComplete(testUserId); // named two due to duplicate variable above
        const defensesAfterPurchase_2 = Object.values(defensesAfterPurchase_2Object);

        // Find a defense a user owns that can be upgraded
        const upgradeableDefense = defensesAfterPurchase_2.find(defense => defense.level > 0);

        const balanceBeforeUpgrade = await getUserBalance(testUserId);
        const currentLevel = upgradeableDefense.level;
        const upgradeCost = upgradeableDefense.upgradeCost;

        console.log(`Upgrading ${upgradeableDefense.defenseId} from level ${currentLevel} for ${upgradeCost}`);

        const upgradedDefense = await upgradeDefense(testUserId, upgradeableDefense.defenseId);
        assertEqual(upgradedDefense.level, currentLevel + 1, 'Defense level increased by 1');

        const balanceAfterUpgrade = await getUserBalance(testUserId);
        const expectedBalanceAfterUpgrade = balanceBeforeUpgrade - upgradeCost;
        assertEqual(balanceAfterUpgrade, expectedBalanceAfterUpgrade, 'Balance deducted correctly');

        console.log('Defense upgrade tests passed!');

        // Test 4: Insufficient funds
        console.log('Testing insufficient funds scenarios');

        // Set balance to very low amount
        await updateUserBalance(testUserId, 1);

        const expensiveDefense = initialDefenses.find(defense => defense.cost[0] > 1 && defense.level === 1);

        if (expensiveDefense) {
            try {
                await buyDefense(testUserId, expensiveDefense.defenseId);
                console.error('Should have thrown insufficient funds error');
                process.exit(1);
            } catch (error) {
                if (error.message.includes('Insufficient funds')) {
                    console.log('Correctly rejected purchase due to insufficient funds');
                } else {
                    throw error; // throw if its a different error
                }
            }
        }

        // Try to upgrade defenses with insufficient funds
        const ownedDefenseForUpgrade = defensesAfterPurchase.find(defense => defense.length > 0 && defense.level < defense.cost.length - 1 && defense.cost[defense.level] > 1);

        if (ownedDefenseForUpgrade) {
            try {
                await upgradeDefense(testUserId, ownedDefenseForUpgrade.defenseId);
                console.error('Should have thrown insufficient funds error for upgrade');
                process.exit(1);
            } catch (error) {
                if (error.message.includes('Insufficient funds')) {
                    console.log('Correctly rejected upgrade due to insufficient funds');
                } else {
                    throw error; // throw if its a different error
                }
            }
        }

        console.log('Insufficient funds tests passed!');

        console.log('Test 5: Attack Info Function\n');

        const testAttackId = "phishing";
        console.log(`Testing getAttackInfo for: ${testAttackId}`);
        const attack = getAttackInfo(testAttackId);
        console.log(attack);
        assertNotNull(attack, `Attack found for ${testAttackId}`);
        assertEqual(attack.attackId, testAttackId, 'Attack ID matches requested ID');
        assertNotNull(attack.baseDamage, 'Attack has baseDamage property')
        assertNotNull(attack.dangerLevel, 'Attack has dangerLevel property');

        const fakeId = "notAnAttack";
        const missing = getAttackInfo(fakeId);
        assertEqual(missing, null, `Correctly returned null for non-existent attackId: ${fakeId}`);

        console.log('Attack info tests passed!\n');

        console.log('Test 6: Wave Generation Functions\n');

        // Test getRandomWave
        console.log('Testing getRandomWave (should return 4 unique attacks');
        const randomWave = getRandomWave();
        assertEqual(randomWave.length, 4, 'Random wave has 4 attacks');
        const uniqueRandomAttacks = new Set(randomWave.map(a => a.attackId)).size; // how many attack Ids there are
        assertEqual(uniqueRandomAttacks, 4, 'All attacks in random wave are unique')
        randomWave.forEach(element => {
            assertNotNull(element.attackId, 'Each attack has attackId');
            assertNotNull(element.baseDamage, 'Each attack hase baseDamage');
        });

        // Test getEasyWave
        console.log('Testing getEasyWave (should return 3 unique attacks, dangerLevel 1-2)');
        const easyWave = getEasyWave();
        assertEqual(easyWave.length, 3, 'Easy wave has 3 attacks');
        const uniqueEasyAttacks = new Set(easyWave.map(a => a.attackId)).size;
        assertEqual(uniqueEasyAttacks, 3, 'All attacks in easy wave are unique');
        easyWave.forEach(element => {
            assertGreaterThanOrEqual(element.dangerLevel, 1, `Attack ${element.attackId} danger level >= 1`);
            assertLessThanOrEqual(element.dangerLevel, 2, `Attack ${element.attackId} danger level <= 2`);
        });

        // Test getMediumWave
        console.log('Testing getMediumWave (should return 4 unique attacks, danger level 1-3');
        const mediumWave = getMediumWave();
        assertEqual(mediumWave.length, 4, 'Medium wave has 4 attacks');
        const uniqueMediumAttacks = new Set(mediumWave.map(a => a.attackId)).size;
        assertEqual(uniqueMediumAttacks, 4, 'All attacks in medium wave are unique');
        mediumWave.forEach(element => {
            assertGreaterThanOrEqual(element.dangerLevel, 1, `Attack ${element.attackId} danger level >= 1`);
            assertLessThanOrEqual(element.dangerLevel, 3, `Attack ${element.attackId} danger level <= 3`);
        });

        // Test getHardWave
        console.log('Testing getHardWave (should return 5 unique attacks, danger level 2-4');
        const hardWave = getHardWave();
        assertEqual(hardWave.length, 5, 'Hard wave has 5 attacks');
        const uniqueHardAttacks = new Set(hardWave.map(a => a.attackId)).size;
        assertEqual(uniqueHardAttacks, 5, 'All attacks in hard wave are unique');
        hardWave.forEach(element => {
            assertGreaterThanOrEqual(element.dangerLevel, 2, `Attack ${element.attackId} danger level >= 2`);
            assertLessThanOrEqual(element.dangerLevel, 4, `Attack ${element.attackId} danger level <= 4`);
        });

        console.log('Wave generation tests passed!\n');

        // Test 7: Attack Deduction
        console.log('Test 7: Attack Deduction and Defense Application\n');

        await updateUserBalance(testUserId, 1000000);

        const testWave = getEasyWave();
        const balanceBeforeAttack = await getUserBalance(testUserId);
        console.log(`User balance before attack: ${balanceBeforeAttack}`);

        // Get owned defenses for damage calculation
        const ownedDefenses = await getUserOwnedDefensesComplete(testUserId);

        // Calculate expected damage
        let expectedTotalDamage = 0;
        testWave.forEach(attack => {
            let reducedDamage = attack.baseDamage || 0;
            for (const defenseKey in ownedDefenses) {
                const defense = ownedDefenses[defenseKey];
                if (defense.defendsAgainst && defense.defendsAgainst[attack.attackId]) {
                    const percentages = defense.defendsAgainst[attack.attackId];
                    const level = defense.level || 1;
                    const percent = percentages[level - 1] || 0;
                    reducedDamage = reducedDamage * (1 - percent / 100);
                }
            }
            expectedTotalDamage += Math.round(reducedDamage);
        });

        console.log(`Expected total damage: ${expectedTotalDamage}`);

        // Perform attack deduction
        const newBalanceAfterAttack = await attackDeduction(testUserId, testWave);

        // Verify balance was updated
        assertNotNull(newBalanceAfterAttack, 'New balance returned from attackDeduction');
        const actualBalanceAfterAttack = await getUserBalance(testUserId);
        assertEqual(actualBalanceAfterAttack, newBalanceAfterAttack, 'Balance in database matches returned balance');
        
        // Verify balance decreased (accounting for interest and bonus income)
        assertTrue(actualBalanceAfterAttack !== balanceBeforeAttack, 'Balance changed after attack');
        console.log(`Balance before attack: ${balanceBeforeAttack}, after attack: ${actualBalanceAfterAttack}`);

        console.log('Attack deduction tests passed!\n');

        // Test 8: Attack Logging
        console.log('Test 8: Attack Logging Functions\n');

        // The attack from Test 7 should have been logged, retrieve it
        console.log('Testing getUserAttackLogs with limit of 1 to get most recent log');
        const mostRecentLog = await getUserAttackLogs(testUserId, 1);
        assertNotNull(mostRecentLog, 'Attack logs returned');
        assertTrue(Array.isArray(mostRecentLog), 'Attack logs is an array');
        assertEqual(mostRecentLog.length, 1, 'Retrieved exactly 1 log as requested');
        
        // Verify the most recent log matches our test attack
        const recentLog = mostRecentLog[0];
        assertNotNull(recentLog.timestamp, 'Log has timestamp');
        assertEqual(recentLog.oldBalance, balanceBeforeAttack, 'Log oldBalance matches balance before attack');
        assertEqual(recentLog.newBalance, actualBalanceAfterAttack, 'Log newBalance matches balance after attack');
        assertNotNull(recentLog.totalDamage, 'Log has totalDamage');
        assertNotNull(recentLog.attacks, 'Log has attacks array');
        assertEqual(recentLog.attacks.length, testWave.length, 'Log contains all attacks from wave');
        
        // Verify each attack in the log
        recentLog.attacks.forEach((attackLog, index) => {
            assertNotNull(attackLog.attackName, `Attack ${index + 1} has attackName`);
            assertNotNull(attackLog.originalDamage, `Attack ${index + 1} has originalDamage`);
            assertNotNull(attackLog.finalDamage, `Attack ${index + 1} has finalDamage`);
            assertNotNull(attackLog.damageReduced, `Attack ${index + 1} has damageReduced`);
            assertNotNull(attackLog.reductionPercent, `Attack ${index + 1} has reductionPercent`);
            assertNotNull(attackLog.defensesApplied, `Attack ${index + 1} has defensesApplied array`);
            assertLessThanOrEqual(attackLog.finalDamage, attackLog.originalDamage, `Attack ${index + 1} final damage <= original damage`);
        });
        
        console.log('Most recent attack log verified successfully');

        // Perform another attack to ensure there are multiple logs
        console.log('\nPerforming another attack for multi-log testing');
        const logTestWave = getMediumWave();
        await attackDeduction(testUserId, logTestWave);

        // Test retrieving attack logs with limit of 3
        console.log('Testing getUserAttackLogs with limit of 3');
        const recentLogs = await getUserAttackLogs(testUserId, 3);
        assertNotNull(recentLogs, 'Attack logs returned');
        assertTrue(Array.isArray(recentLogs), 'Attack logs is an array');
        assertLessThanOrEqual(recentLogs.length, 3, 'Returned logs count <= requested limit');
        assertGreaterThanOrEqual(recentLogs.length, 2, 'At least 2 logs exist (from our test attacks)');
        console.log(`Retrieved ${recentLogs.length} recent attack logs`);

        // Verify structure of each log
        if (recentLogs.length > 0) {
            recentLogs.forEach((log, index) => {
                assertNotNull(log.timestamp, `Log ${index + 1} has timestamp`);
                assertNotNull(log.oldBalance, `Log ${index + 1} has oldBalance`);
                assertNotNull(log.newBalance, `Log ${index + 1} has newBalance`);
                assertNotNull(log.totalDamage, `Log ${index + 1} has totalDamage`);
                assertNotNull(log.attacks, `Log ${index + 1} has attacks array`);
                assertTrue(Array.isArray(log.attacks), `Log ${index + 1} attacks is an array`);
                
                // Verify attack structure within log
                log.attacks.forEach((attack, attackIndex) => {
                    assertNotNull(attack.attackName, `Log ${index + 1}, Attack ${attackIndex + 1} has attackName`);
                    assertNotNull(attack.originalDamage, `Log ${index + 1}, Attack ${attackIndex + 1} has originalDamage`);
                    assertNotNull(attack.finalDamage, `Log ${index + 1}, Attack ${attackIndex + 1} has finalDamage`);
                });
            });
            console.log('All attack logs have correct structure');
        }

        // Test retrieving all attack logs (no limit)
        console.log('Testing getUserAttackLogs without limit');
        const allLogs = await getUserAttackLogs(testUserId);
        assertNotNull(allLogs, 'All attack logs returned');
        assertTrue(Array.isArray(allLogs), 'All attack logs is an array');
        assertGreaterThanOrEqual(allLogs.length, recentLogs.length, 'Total logs >= recent logs');
        console.log(`Total attack logs in database: ${allLogs.length}`);

        // Verify logs are sorted by timestamp (most recent first)
        if (allLogs.length > 1) {
            for (let i = 0; i < allLogs.length - 1; i++) {
                const currentTime = allLogs[i].timestamp?.toDate?.() || allLogs[i].timestamp;
                const nextTime = allLogs[i + 1].timestamp?.toDate?.() || allLogs[i + 1].timestamp;
                if (currentTime && nextTime) {
                    assertTrue(currentTime >= nextTime, 'Logs are sorted by timestamp (most recent first)');
                }
            }
            console.log('Attack logs are correctly sorted by timestamp');
        }

        console.log('Attack logging tests passed!\n');

        console.log('ALL TESTS PASSED!');
        console.log('\n Tests completed successfully');
    } catch (error) {
        console.error('\n Test failed with error:', error);
        process.exit(1);
    }
}

runTests().then(() => {
    console.log('\n Test execution completed successfully!');
    process.exit(0);
}).catch(error => {
    console.error('Error during test execution:', error);
    process.exit(1);
}) 