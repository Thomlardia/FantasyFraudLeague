// structure for Defense

export class Defense{ 
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
  };
}
