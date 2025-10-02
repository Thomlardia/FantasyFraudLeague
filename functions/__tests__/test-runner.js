/**
 * Test Runner for Wallet and Defense Functions
 * This script tests all wallet and defense operations using Firebase emulators
 */

import { getUserBalance, updateUserBalance } from '../src/domains/wallet/service.js';

import { getUserDefenses, buyDefense, upgradeDefense } from '../src/domains/defense/service.js';

import { getAllUsers, getUserOwnedDefensesComplete } from '../src/domains/defense/repo.js';

// Custom test assertion function, exit code = 1 if fail
function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        console.error(`FAIL: ${message} (Expected: ${expected}, Got:  ${actual})`);
        process.exit(1);
    }
    console.log(`SUCCESS: ${message} (Expected : ${expected}, Got: ${actual})`);
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