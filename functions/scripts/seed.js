// Main seed script that handles database seeding operations via Command Line
// Usage: node scripts/seed.js [command] [subCommand] [options]

import { seedGlobalDefenses } from '../src/infra/db/seeds/index.js'

// Import user seeding functions specifically for authentication users
import {
  seedUsersFromAuth,
  updateAllUsersDefensesSummary,
  getAllAuthenticatedUsers
} from '../src/infra/db/seeds/users.js';

import { seedTestUsers, clearTestUsers } from '../src/infra/db/seeds/testUsers.js';

// Emulator or Production
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
        if (subCommand === 'global-defenses') {
          await seedGlobalDefenses({force: flags.force});
        } else if (subCommand === 'users-from-auth') {
          await seedUsersFromAuth({ force: flags.force})
        } else if (subCommand === 'test-users') {
          await seedTestUsers();
        } else {
          console.log('Running complete seeding: users from auth + all user defenses');
          await seedUsersFromAuth({ force: flags.force});
          await seedGlobalDefenses({ force: flags.force });
        }
        break;

      case 'update':
        // Update operations for user defense summaries
        if (subCommand === 'all-users-defense-summaries') {
          await updateAllUsersDefensesSummary({ force: flags.force });
        }
        break;

      case 'list':
        // List operations for viewing data
        if (subCommand === 'users') {
          const users = await getAllAuthenticatedUsers();
          console.log(`Found ${users.length} users:`);
          users.forEach(user => {
            console.log(`  - ${user.uid} - Name: ${user.displayName} email: (${user.email})`);
            console.log(`   Balance: $${user.balance?.toLocaleString() || 0}`);
          });
        }
        break;
      case 'clear':
        if (subCommand === 'users') {
          await clearTestUsers();
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
