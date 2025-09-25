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
  },
  {
    id: "tester2",
    email: "tester2@gmail.com",
    name: "Tester2",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
  },
  {
    id: "tester3",
    email: "tester3@gmail.com",
    name: "Tester3",
    balance: 1_000_000,
    userType: "player",
    ownedDefenses: {},
    totalDefensesOwned: 0,
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