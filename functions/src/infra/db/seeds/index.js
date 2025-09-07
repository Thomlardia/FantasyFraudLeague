import { db, createBatch, getCollection, isEmulator, environment } from '../index.js';
import { defenses as defensesObject} from './defenses.js';

export const defenses = Object.values(defensesObject);

// Runs seeding commands 
export const seedDefenses = async (options = {}) => {
    const { force = false } = options;
    console.log(`Seeding defenses in ${environment} environment`);
    console.log(`Found ${defenses.length} defenses to seed`);

    if (!isEmulator && !force) {
        throw new Error('Production seeding requires explicity --force flag for safety');
    }

    const batch = createBatch();
    const defensesCollection = getCollection('defenses');

    // Add the defenses to the collection
    defenses.forEach(defense => {
        const docRef = defensesCollection.doc(defense.defenseId);
        batch.set(docRef, {
            ...defense
        }, { merge: true}); // Avoid overwriting existing data
    });

    try {
        await batch.commit();
        console.log(`Successfully seeded ${defenses.length} defenses`);
        return {
            success: true,
            message: `Seeded ${defenses.length} defense`,
            environment
        };
    } catch (error) {
        console.error('Error seeding defenses:', error);
        throw error;
    }
};

// Makes call to seedDefenses, can be expanded for whatever else needs to be added to db
export const seedAll = async (options = {}) => {
  console.log('Starting full database seed...');
  
  try {
    const results = {
      defenses: await seedDefenses(options)
    };
    
    console.log('Database seeding completed successfully!');
    return results;
  } catch (error) {
    console.error('Database seeding failed:', error.message);
    throw error;
  }
};

// Get all defenses from database
export const getAllDefenses = async () => {
  const defensesCollection = getCollection('defenses');
  const snapshot = await defensesCollection.get();
  
  const defenses = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    defenses.push({ id: doc.id, ...data });
  });
  
  return defenses;
};

// Clear all defenses
export const clearDefenses = async (options = {}) => {
  const { force = false } = options;
  
  if (!isEmulator && !force) {
    throw new Error('Clearing production data requires explicit --force flag');
  }
  
  console.log(`Clearing defenses in ${environment} environment`);
  
  const defensesCollection = getCollection('defenses');
  const snapshot = await defensesCollection.get();
  
  const batch = createBatch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  
  await batch.commit();
  console.log(`Cleared ${snapshot.docs.length} defenses`);
  
  return { success: true, deletedCount: snapshot.docs.length };
};