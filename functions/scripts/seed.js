// scripts/seed.js
import { seedAll, seedDefenses, clearDefenses, getAllDefenses } from '../src/infra/db/seeds/index.js';
import { environment } from '../src/infra/db/index.js';

const args = process.argv.slice(2); // retrieves the arguments after functions/scripts/seed.js
const command = args[0];

// retrieves the flags for pushing to production
const flags = {
  force: args.includes('--force') || args.includes('-f'),
  production: args.includes('--production') || args.includes('-p')
};

// Set production environment if flag is passed
if (flags.production) {
  process.env.USE_PRODUCTION = 'true';
  process.env.NODE_ENV = 'production';
}

const main = async () => {
  console.log(`Target Environment: ${environment}`);
  console.log(`Command: ${command}`);
  
  if (flags.production && !flags.force) {
    console.error('Production operations require --force flag for safety');
    console.error('Example: node scripts/seed.js --production --force');
    process.exit(1);
  }

  try {
    switch (command) {
      case 'seed':
        await seedAll({ force: flags.force });
        break;
        
      case 'clear':
        await clearDefenses({ force: flags.force });
        break;

      case 'list':
        const defenses = await getAllDefenses();
        console.log(`Found ${defenses.length} defenses:`);
        defenses.forEach(defense => {
          console.log(`  - ${defense.defenseId} - $${defense.buyCost} (Level ${defense.level})`);
          if (defense.owned) {
            console.log(`    [OWNED]`);
          }
        });
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