
// Simple manual test for wallet functions
import { getUserBalance, updateUserBalance, updateUserNetWorth } from "./src/domains/wallet/service.js";

async function run() {
  const testUserId = "testuser1";
  console.log("Testing wallet functions for user:", testUserId);

  // Set balance and netWorth
  await updateUserBalance(testUserId, 500000);
  console.log("Set balance to 500000");
  
  await updateUserNetWorth(testUserId, 1000000);
  console.log("Set netWorth to 1000000");

  // Get balance
  const balance = await getUserBalance(testUserId);
  console.log("Current balance:", balance);

  // Update balance
  await updateUserBalance(testUserId, 1000000);
  console.log("Updated balance to 1000000");

  // Get updated balance
  const newBalance = await getUserBalance(testUserId);
  console.log("New balance:", newBalance);
}

run().catch(console.error);
