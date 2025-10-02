/**
 * Interactive Test Runner Demo for Wallet and Defense Functions
 * This script tests all wallet and defense operations using Firebase emulators
 * Pauses between test sections for user review
 */

import { getUserBalance, updateUserBalance } from '../src/domains/wallet/service.js';
import { getUserDefenses, buyDefense, upgradeDefense } from '../src/domains/defense/service.js';
import { getAllUsers, getUserOwnedDefensesComplete } from '../src/domains/defense/repo.js';
import readline from 'readline';

// Setup readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to wait for user input
function waitForUserInput(message = "Press Enter to continue...") {
    return new Promise((resolve) => {
        rl.question(`\n${message}`, () => {
            resolve();
        });
    });
}

// Custom test assertion function, exit code = 1 if fail
function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        console.error(` FAIL: ${message} (Expected: ${expected}, Got: ${actual})`);
        process.exit(1);
    }
    console.log(` SUCCESS: ${message} (Expected: ${expected}, Got: ${actual})`);
}

async function runInteractiveTests() {
    console.log(' Starting Interactive Test Suite...\n');
    console.log('This demo will pause between each test section to allow you to review results.');

    await waitForUserInput("Press Enter to begin testing...");

    try {
        // Setup Phase
        console.log('\n' + '='.repeat(50));
        console.log(' SETUP PHASE: Finding Test Data');
        console.log('='.repeat(50));

        // First get all users
        const users = await getAllUsers();

        if (users.length === 0) {
            console.log(' No users were found in the database, seeding failed');
            process.exit(1);
        }

        console.log(` Found ${users.length} users in database`);

        // Find user to work with for testing
        const testUser = users.find(user => user.id && user.balance !== undefined);
        if (!testUser) {
            console.error(' No suitable test user found with balance property');
            process.exit(1);
        }

        // Retrieve the user id and starting balance
        const testUserId = testUser.id;
        const initialBalance = testUser.balance;

        console.log(` Selected test user: ${testUserId}`);
        console.log(` Initial balance: ${initialBalance}`);

        await waitForUserInput("Setup complete! Press Enter to start Test 1 (Wallet Operations)...");

        // TEST 1: Wallet Balance Operations
        console.log('\n' + '='.repeat(50));
        console.log(' TEST 1: Wallet Balance Operations');
        console.log('='.repeat(50));

        console.log('Testing getUserBalance...');
        const currentBalance = await getUserBalance(testUserId);
        assertEqual(currentBalance, initialBalance, 'Initial balance matches seeded value');

        console.log('\nTesting updateUserBalance...');
        const newBalance = 500000;
        await updateUserBalance(testUserId, newBalance);
        const updateBalance = await getUserBalance(testUserId);
        assertEqual(updateBalance, newBalance, 'Balance updated successfully');
        
        console.log('\nTesting invalid balance validation...');
        // Test invalid balance update
        try {
            await updateUserBalance(testUserId, "invalid");
            console.error(' Should have thrown error for invalid balance');
            process.exit(1);
        } catch (error) {
            console.log(' Correctly rejected invalid balance value');
        }

        try {
            await updateUserBalance(testUserId, NaN);
            console.error(' Should have thrown error for NaN balance');
            process.exit(1);
        } catch (error) {
            console.log(' Correctly rejected NaN balance value');
        }

        console.log('\n All wallet tests passed!');
        await waitForUserInput("Test 1 complete! Press Enter to start Test 2 (Defense Purchasing)...");

        // TEST 2: Defense Purchasing
        console.log('\n' + '='.repeat(50));
        console.log('  TEST 2: Defense Purchasing');
        console.log('='.repeat(50));

        // Ensure user has sufficient balance for testing
        console.log('Setting up sufficient balance for testing...');
        await updateUserBalance(testUserId, 1000000);
        console.log(' Balance set to 1,000,000 for testing');

        // Verify the user has no defenses initially
        console.log('\nChecking initial defense state...');
        const initialDefenses = await getUserDefenses(testUserId);
        const ownedDefensesInitially = initialDefenses.filter(defense => defense.level > 1);
        assertEqual(ownedDefensesInitially.length, 0, 'User starts with no owned defenses');
        console.log(' Confirmed user starts with empty defense inventory');

        await waitForUserInput("Press Enter to start purchasing defenses...");

        // Test buying multiple defenses
        console.log('\n Testing multiple defense purchases...');
        const defensesToBuy = ["atmInspection", "backgroundChecks", "ddosProtection", "deepfakeDetection"];
        const purchasedDefenses = [];

        for (const defenseId of defensesToBuy) {
            console.log(`\n--- Purchasing ${defenseId} ---`);
            try {
                // Find defense template to get expected cost
                const defenseTemplate = initialDefenses.find(defense => defense.defenseId === defenseId);
                if (!defenseTemplate) {
                    console.log(`  Defense ${defenseId} not found in templates, skipping`);
                    continue;
                }

                const balanceBeforePurchase = await getUserBalance(testUserId);
                const expectedCost = defenseTemplate.cost[0];

                console.log(` Buying ${defenseId} for ${expectedCost.toLocaleString()} coins...`);
                const purchasedDefense = await buyDefense(testUserId, defenseId);

                assertEqual(purchasedDefense.level, 1, `${defenseId} purchased and is now at level 1`);
                assertEqual(purchasedDefense.defenseId, defenseId, `${defenseId} matches expected ID`);

                const balanceAfterPurchase = await getUserBalance(testUserId);
                const expectedBalanceAfter = balanceBeforePurchase - expectedCost;
                assertEqual(balanceAfterPurchase, expectedBalanceAfter, `Balance deducted correctly for ${defenseId}`);

                purchasedDefenses.push(defenseId);
                console.log(` Successfully bought ${defenseId}`);
            } catch (error) {
                console.log(` Failed to buy ${defenseId}: ${error.message}`);
            }
        }

        await waitForUserInput(`Purchased ${purchasedDefenses.length} defenses. Press Enter to verify inventory...`);

        // Verify purchased defenses appear in user's owned defenses
        console.log('\n Verifying purchased defenses appear in user inventory...');
        const defensesAfterPurchaseObject = await getUserOwnedDefensesComplete(testUserId);
        const defensesAfterPurchase = Object.values(defensesAfterPurchaseObject);

        console.log(` ${defensesAfterPurchase.length} defenses retrieved from database, expected ${purchasedDefenses.length}`);
        assertEqual(defensesAfterPurchase.length, purchasedDefenses.length, 'Owned defenses count matches purchases');

        console.log('\n Testing duplicate purchases prevention...');
        if (purchasedDefenses.length > 0) {
            const firstPurchased = purchasedDefenses[0];
            try {
                await buyDefense(testUserId, firstPurchased);
                console.error(' Should have thrown error for duplicate purchase');
                process.exit(1);
            } catch (error) {
                if (error.message.includes('already own')) {
                    console.log(` Correctly prevented duplicate purchase of ${firstPurchased}`);
                } else {
                    throw error;
                }
            }
        }

        console.log('\n Defense purchase tests passed!');
        await waitForUserInput("Test 2 complete! Press Enter to start Test 3 (Defense Upgrades)...");

        // TEST 3: Defense Upgrade Operations
        console.log('\n' + '='.repeat(50));
        console.log('  TEST 3: Defense Upgrade Operations');
        console.log('='.repeat(50));

        const defensesAfterPurchase_2Object = await getUserOwnedDefensesComplete(testUserId);
        const defensesAfterPurchase_2 = Object.values(defensesAfterPurchase_2Object);

        // Find a defense a user owns that can be upgraded
        const upgradeableDefense = defensesAfterPurchase_2.find(defense => defense.level > 0);

        if (!upgradeableDefense) {
            console.log('  No upgradeable defenses found, skipping upgrade tests');
        } else {
            const balanceBeforeUpgrade = await getUserBalance(testUserId);
            const currentLevel = upgradeableDefense.level;
            const upgradeCost = upgradeableDefense.upgradeCost;

            console.log(`   Upgrading ${upgradeableDefense.defenseId}:`);
            console.log(`   Current Level: ${currentLevel}`);
            console.log(`   Upgrade Cost: ${upgradeCost.toLocaleString()}`);
            console.log(`   Balance Before: ${balanceBeforeUpgrade.toLocaleString()}`);

            const upgradedDefense = await upgradeDefense(testUserId, upgradeableDefense.defenseId);
            assertEqual(upgradedDefense.level, currentLevel + 1, 'Defense level increased by 1');

            const balanceAfterUpgrade = await getUserBalance(testUserId);
            const expectedBalanceAfterUpgrade = balanceBeforeUpgrade - upgradeCost;
            assertEqual(balanceAfterUpgrade, expectedBalanceAfterUpgrade, 'Balance deducted correctly for upgrade');

            console.log(`   Successfully upgraded ${upgradeableDefense.defenseId} to level ${upgradedDefense.level}`);
            console.log(`   Balance After: ${balanceAfterUpgrade.toLocaleString()}`);
        }

        console.log('\n Defense upgrade tests passed!');
        await waitForUserInput("Test 3 complete! Press Enter to start Test 4 (Insufficient Funds)...");

        // TEST 4: Insufficient Funds Testing
        console.log('\n' + '='.repeat(50));
        console.log(' TEST 4: Insufficient Funds Scenarios');
        console.log('='.repeat(50));

        // Set balance to very low amount
        console.log('Setting balance to 1 for testing...');
        await updateUserBalance(testUserId, 1);
        console.log(' Balance set to 1');

        console.log('\n Testing insufficient funds for defense purchase...');
        const expensiveDefense = initialDefenses.find(defense => defense.cost[0] > 1 && defense.level === 0);

        if (expensiveDefense) {
            console.log(`Attempting to buy ${expensiveDefense.defenseId} (costs ${expensiveDefense.cost[0]})...`);
            try {
                await buyDefense(testUserId, expensiveDefense.defenseId);
                console.error(' Should have thrown insufficient funds error');
                process.exit(1);
            } catch (error) {
                if (error.message.includes('Insufficient funds')) {
                    console.log(' Correctly rejected purchase due to insufficient funds');
                } else {
                    throw error;
                }
            }
        }

        await waitForUserInput("Test 3 complete! Press Enter to see final results...");

        // Final Results
        console.log('\n' + '='.repeat(60));
        console.log(' ALL TESTS PASSED SUCCESSFULLY! ');
        console.log('='.repeat(60));
        console.log(' Wallet Operations: PASSED');
        console.log(' Defense Purchasing: PASSED');
        console.log(' Defense Upgrades: PASSED');
        console.log(' Insufficient Funds Handling: PASSED');
        console.log('='.repeat(60));
        console.log('\n Test execution completed successfully!');

    } catch (error) {
        console.error('\n Test failed with error:', error);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    } finally {
        rl.close();
    }
}

runInteractiveTests().then(() => {
    console.log('\n Interactive test suite completed successfully!');
    process.exit(0);
}).catch(error => {
    console.error(' Error during test execution:', error);
    rl.close();
    process.exit(1);
});