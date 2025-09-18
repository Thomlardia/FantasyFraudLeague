/**
 * This class definition for Defense represents a defense object in a system.
 * 
 */
export class Defense { 
/**
 * Creates a new Defense object.
 * 
 * @param {Object} options - An object containing the options for the Defense object.
 * @param {string} options.userId - The user ID that owns the defense.
 * @param {string} options.defenseId - The unique identifier for the defense.
 * @param {boolean} [options.owned=false] - Whether the defense is currently owned by the user.
 * @param {number} [options.level=1] - The current level of the defense.
 * @param {number} [options.buyCost=0] - The cost of buying the defense.
 * @param {number} [options.upgradeCost=0] - The cost of upgrading the defense.
 * @param {Array} [options.defendsAgainst=[]] - An array of the attack types that the defense can defend against.
 */
  constructor({ 
    userId, 
    defenseId,       // unique id like "firewall", "atmInspection"
    owned = false, 
    level = 1,
    buyCost = 0, 
    upgradeCost = 0, 
    defendsAgainst = [] 
  }) {
    this.userId = userId;
    this.defenseId = defenseId;
    this.owned = owned;
    this.level = level;
    this.buyCost = buyCost;
    this.upgradeCost = upgradeCost;
    this.defendsAgainst = defendsAgainst;
  }

  
  /**
   * Used to convert an instance of the class into a plain object that can be saved to Firestore
   * 
   * @returns {Object} A JSON object representing the Defense object.
   */
  toJSON() {
    return {
      userId: this.userId,
      defenseId: this.defenseId,
      owned: this.owned,
      level: this.level,
      buyCost: this.buyCost,
      upgradeCost: this.upgradeCost,
      defendsAgainst: this.defendsAgainst
    };
  }
}
