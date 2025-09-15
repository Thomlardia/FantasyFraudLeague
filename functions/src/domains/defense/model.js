// model.js
export class Defense { 
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

  // convert instance to plain object for Firestore
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
