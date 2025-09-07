export const DEFENSE_CONFIG = {
  atmInspection: {
    name: "ATM Inspection",
    buyCost: 100,
    defendsAgainst: { skimming: 80 },
    upgradesTo: {
      level: 2,
      name: "Tamper Proof Seals",
      defendsAgainst: { skimming: 90, tampering: 70 },
      upgradeCost: 50,
    }
  },
  networkMonitoring: {
    name: "Network Monitoring",
    buyCost: 150,
    defendsAgainst: { ddos: 70 }
    // no upgrade
  }
};
