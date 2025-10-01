
// Simple manual test for wallet functions
import { getUserBalance, updateUserBalance } from "./src/domains/wallet/service.js";

async function run() {
  const testUserId = "fDY8Q8kRDhFU0ttBv4pMwXeqC6Af";
  console.log("Testing wallet functions for user:", testUserId);

  // Set balance
  await updateUserBalance(testUserId, 100);
  console.log("Set balance to 100");

  // Get balance
  const balance = await getUserBalance(testUserId);
  console.log("Current balance:", balance);

  // Update balance
  await updateUserBalance(testUserId, 1100000);
  console.log("Updated balance to 50");

  // Get updated balance
  const newBalance = await getUserBalance(testUserId);
  console.log("New balance:", newBalance);
}

run().catch(console.error);
