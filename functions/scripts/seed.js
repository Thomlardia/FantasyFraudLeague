// Main seed script that handles database seeding operations via Command Line
// Usage: node scripts/seed.js [command] [subCommand] [options]

// Import seeding functions from database module
import { getAllUsers } from '../src/infra/db/seeds/index.js';

// Import user seeding function specifically for authentication users
import {
  seedUsersFromAuth,
  seedAllUsersDefenses,
  seedUserDefenses,
  getUserDefenses,
  updateAllUsersDefensesSummary,
  updateUserDefensesSummary,
  clearUserDefensesSummaries
} from '../src/infra/db/seeds/users.js';
import { environment } from '../src/infra/db/index.js';

const args = process.argv.slice(2); // retrieves the arguments after functions/scripts/seed.js
const command = args[0];            // Main command (seed, clear, list)
const subCommand = args[1];         // SUb command for more specific operations

// Retrieves the flags for pushing to production
const flags = {
  force: args.includes('--force') || args.includes('-f'),
  production: args.includes('--production') || args.includes('-p')
};

// Set production environment if flag is passed
if (flags.production) {
  process.env.USE_PRODUCTION = 'true';
  process.env.NODE_ENV = 'production';
}

// Helper function to extract user ID from arguments
const getUserId = () => {
  const userIdIndxex = args.findIndex(arg => arg === '--user');
  return userIdIndxex !== -1 ? args[userIdIndxex+1]: null;
};

// Main function that orchestrates all seeding operations
const main = async () => {
  console.log(`Target Environment: ${environment}`);
  console.log(`Command: ${command} ${subCommand}`);
  
  //  Safety check: require force flag for production operations
  if (flags.production && !flags.force) {
    console.error('Production operations require --force flag for safety');
    console.error('Example: node scripts/seed.js --production --force');
    process.exit(1);
  }

  try {
    // Command routing based on user input
    switch (command) {
      case 'seed':
        // Seed operations for different scenarios
        if (subCommand === 'user-defenses') {
          const userId = getUserId();
          await seedUserDefenses(userId, {force: flags.force});
        } else if (subCommand === 'all-users-defenses') {
          await seedAllUsersDefenses({ force: flags.force });
        } else if (subCommand === 'users-from-auth') {
          await seedUsersFromAuth({ force: flags.force})
        } else {
          console.log('Running complete seeding: users from auth + all user defenses');
          await seedUsersFromAuth({ force: flags.force});
          await seedAllUsersDefenses({ force: flags.force });
        }
        break;

      case 'update':
        // Update operations for user defense summaries
        if (subCommand === 'user-defense-summary') {
          const userId = getUserId();
          await updateUserDefensesSummary(userId, {force: flags.force});
        } else if (subCommand === 'all-users-defense-summaries') {
          await updateAllUsersDefensesSummary({ force: flags.force });
        }
        break;
        
      case 'clear':
        // Clear operations for different data types
        if (subCommand === 'user-defenses') {
          const userId = getUserId();
          await clearUserDefensesSummaries(userId, {force: flags.force});
        }
        break;

      case 'list':
        // List operations for viewing data
        if (subCommand === 'users') {
          const users = await getAllUsers();
          console.log(`Found ${users.length} users:`);
          users.forEach(user => {
            console.log(`  - ${user.id} - ${user.name} (${user.email})`);
            console.log(`   Balance: $${user.currentBalance?.toLocaleString() || 0}`);
            console.log(`   Type: ${user.userType}`);
          });
        } else if (subCommand === 'user-defenses') {
          const userId = getUserId();
          const defenses = await getUserDefenses(userId);

          const ownedDefenses = defenses.filter(defense => defense.owned === true);
          console.log(`Found ${ownedDefenses.length} defenses for user ${userId}:`)
          ownedDefenses.forEach(defense => {
            console.log(`  - ${defense.defenseId} - $${defense.buyCost?.toLocaleString()} (Level ${defense.level})`);
            if (defense.owned) {
              console.log(`   [OWNED]`);
            }
            if (defense.defendsAgainst) {
              const attacks = Object.entries(defense.defendsAgainst)
                .map(([attack, percentage]) => `${attack}: ${percentage}`)
                .join(', ');
              console.log(`   Defends against: ${attacks}`);
            }
          });
          if (ownedDefenses.length === 0) {
            console.log(`User ${userId} doesn't own any defenses yet.`);
          }
        }
        break;

      default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }
    
    console.log('Operation completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Operation failed:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

main();