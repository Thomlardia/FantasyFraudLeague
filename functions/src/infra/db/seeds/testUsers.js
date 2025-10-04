import { db, createBatch } from '../index.js'

const testUsers = [
  {
    id: "tester1",
    email: "tester1@gmail.com",
    name: "Tester1",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
    totalSpent: 0,
    netWorth: 1_000_000,
  },
  {
    id: "tester2",
    email: "tester2@gmail.com",
    name: "Tester2",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
    totalSpent: 0,
    netWorth: 1_000_000,
  },
  {
    id: "tester3",
    email: "tester3@gmail.com",
    name: "Tester3",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
    totalSpent: 0,
    netWorth: 1_000_000,
  },
    {
    id: "tester4",
    email: "tester4@gmail.com",
    name: "Tester4",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
    totalSpent: 0,
    netWorth: 1_000_000,
  },
  {
    id: "tester5",
    email: "tester5@gmail.com",
    name: "Tester5",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
    totalSpent: 0,
    netWorth: 1_000_000,
  },
  {
    id: "tester6",
    email: "tester6@gmail.com",
    name: "Tester6",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
    totalSpent: 0,
    netWorth: 1_000_000,
  },  {
    id: "tester7",
    email: "tester7@gmail.com",
    name: "Tester7",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
    totalSpent: 0,
    netWorth: 1_000_000,
  },
  {
    id: "tester8",
    email: "tester8@gmail.com",
    name: "Tester8",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
    totalSpent: 0,
    netWorth: 1_000_000,
  },
  {
    id: "tester9",
    email: "tester9@gmail.com",
    name: "Tester9",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
    totalSpent: 0,
    netWorth: 1_000_000,
  },  {
    id: "tester10",
    email: "tester10@gmail.com",
    name: "Tester10",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
    totalSpent: 0,
    netWorth: 1_000_000,
  },
  {
    id: "tester11",
    email: "tester11@gmail.com",
    name: "Tester11",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
    totalSpent: 0,
    netWorth: 1_000_000,
  },
  {
    id: "tester12",
    email: "tester12@gmail.com",
    name: "Tester12",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
    totalSpent: 0,
    netWorth: 1_000_000,
  },
];

export async function seedTestUsers() {
  console.log("Seeding test users...");
  
  try {
    const batch = createBatch();
    for (const user of testUsers) {
      const userRef = db.collection("users").doc(user.id)
      batch.set(userRef, user, {merge: true});
    }

    await batch.commit();
    console.log(`Successfully seeded ${testUsers.length} test users`);
    return testUsers;
  
  } catch (error) {
    console.error("Error seeding test users", error);
    throw error;
  }
}

export async function clearTestUsers() {
  console.log("Deleting test users...");
  
  try {
    const batch = createBatch();
    for (const user of testUsers) {
      const userRef = db.collection("users").doc(user.id);
      batch.delete(userRef);
    }
    await batch.commit();
    console.log(`Successfully deleted ${testUsers.length} test users`);

  } catch (error) {
    console.error("Error deleting test users", error);
    throw error;
  } 
}

export { testUsers };