import { auth } from "../index.js";

// Generate test user data
const generateTestUsers = (count = 20) => {
  const users = [];
  for (let i = 1; i <= count; i++) {
    users.push({
      email: `test${i}@gmail.com`,
      emailVerified: true,
      password: 'test123',
      displayName: `Test User ${i}`,
    });
  }
  return users;
};

// Seed users into Firebase Authentication
export const seedAuthUsers = async (options = {}) => {
  const { count = 10, force = false } = options;
  
  console.log(`\nSeeding ${count} users into Firebase Authentication...`);
  console.log('Environment:', process.env.FIRESTORE_EMULATOR_HOST ? 'Emulator' : 'Production');
  
  const testUsers = generateTestUsers(count);
  const results = {};

  for (const userData of testUsers) {
    try {
      // Create the user
      const userRecord = await auth.createUser(userData);
      console.log(`Created: ${userData.email} (UID: ${userRecord.uid})`);

    } catch (error) {
      console.error(`Error creating ${userData.email}:`, error.message);
    }
  }
  console.log(`   Total: ${testUsers.length}\n`);
  return results;
};

// Clear all test users (emails matching testuser*@example.com pattern)
export const clearAuthTestUsers = async () => {
  console.log('\nClearing test users from Firebase Authentication...');
  
  let deleted = 0;
  let nextPageToken;

  do {
    const listUsersResult = await auth.listUsers(1000, nextPageToken);
    
    for (const user of listUsersResult.users) {
      // Only delete users matching our test pattern
      if (user.email && user.email.match(/^test\d+@gmail\.com$/)) {
        try {
          await auth.deleteUser(user.uid);
          console.log(`Deleted: ${user.email}`);
          deleted++;
        } catch (error) {
          console.error(`Error deleting ${user.email}:`, error.message);
        }
      }
    }
    
    nextPageToken = listUsersResult.pageToken;
  } while (nextPageToken);

  console.log(`\n Deleted ${deleted} test users\n`);
  return deleted;
};
