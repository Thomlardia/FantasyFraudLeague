// defenses.js
// Structured defense data for Firestore seeding

export const defenses = {
  atmInspection: {
    defenseId: "atmInspection",
    owned: false,
    level: 1,
    buyCost: 55000,
    upgradeCost: 35000,
    defendsAgainst: {
      skimming: 40,        
      tampering: 40,
    },
  },
  backgroundChecks: {
    defenseId: "backgroundChecks",
    owned: false,
    level: 1,
    buyCost: 50000,
    upgradeCost: 30000,
    defendsAgainst: {
      insiderFraud: 60,
    },
  },
  ddosProtection: {
    defenseId: "ddosProtection",
    owned: false,
    level: 1,
    buyCost: 150000,
    upgradeCost: 125000,
    defendsAgainst: {
      ddos: 60,
    },
  },
  deepfakeDetection: {
    defenseId: "deepfakeDetection",
    owned: false,
    level: 1,
    buyCost: 95000,
    upgradeCost: 65000,
    defendsAgainst: {
      deepfakeFraud: 70,
    },
  },
  emailFiltering: {
    defenseId: "emailFiltering",
    owned: false,
    level: 1,
    buyCost: 80000,
    upgradeCost: 50000,
    defendsAgainst: {
      phishing: 80,
    },
  },
  httpsEncryption: {
    defenseId: "httpsEncryption",
    owned: false,
    level: 1,
    buyCost: 100000,
    upgradeCost: 0,
    defendsAgainst: {
      mitm: 95,
    },
  },
  inputValidation: {
    defenseId: "inputValidation",
    owned: false,
    level: 1,
    buyCost: 70000,
    upgradeCost: 45000,
    defendsAgainst: {
      sqlInjection: 85,
    },
  },
  keepSoftwareUpdated: {
    defenseId: "keepSoftwareUpdated",
    owned: false,
    level: 1,
    buyCost: 45000,
    upgradeCost: 30000,
    defendsAgainst: {
      ransomware: 70,
    },
  },
  mfa: {
    defenseId: "mfa",
    owned: false,
    level: 1,
    buyCost: 150000,
    upgradeCost: 100000,
    defendsAgainst: {
      accountTakeover: 80,
      bruteForce: 80,
      phishing: 80,
    },
  },
  networkMonitoring: {
    defenseId: "networkMonitoring",
    owned: false,
    level: 1,
    buyCost: 110000,
    upgradeCost: 70000,
    defendsAgainst: {
      cryptojacking: 70,
      ddos: 70,
    },
  },
  principleOfLeastPrivilege: {
    defenseId: "principleOfLeastPrivilege",
    owned: false,
    level: 1,
    buyCost: 60000,
    upgradeCost: 35000,
    defendsAgainst: {
      insiderFraud: 65,
    },
  },
  regularAudits: {
    defenseId: "regularAudits",
    owned: false,
    level: 1,
    buyCost: 60000,
    upgradeCost: 35000,
    defendsAgainst: {
      accountingFraud: 60,
    },
  },
  passwordPolicies: {
    defenseId: "passwordPolicies",
    owned: false,
    level: 1,
    buyCost: 20000,
    upgradeCost: 15000,
    defendsAgainst: {
      accountTakeover: 40,
    },
  },
  automatedBackups: {
    defenseId: "automatedBackups",
    owned: false,
    level: 1,
    buyCost: 120000,
    upgradeCost: 80000,
    defendsAgainst: {
      ransomware: 60,
    },
  },
  segregationOfDuties: {
    defenseId: "segregationOfDuties",
    owned: false,
    level: 1,
    buyCost: 75000,
    upgradeCost: 40000,
    defendsAgainst: {
      insiderFraud: 90,
    },
  },
  trafficFiltering: {
    defenseId: "trafficFiltering",
    owned: false,
    level: 1,
    buyCost: 65000,
    upgradeCost: 40000,
    defendsAgainst: {
      ddos: 40,
      bruteForce: 80,
    },
  },
  userEducation: {
    defenseId: "userEducation",
    owned: false,
    level: 1,
    buyCost: 40000,
    upgradeCost: 25000,
    defendsAgainst: {
      phishing: 50,
      vishing: 50,
    },
  },
  verificationProtocols: {
    defenseId: "verificationProtocols",
    owned: false,
    level: 1,
    buyCost: 90000,
    upgradeCost: 60000,
    defendsAgainst: {
      authorizedPushPayments: 90,
    },
  },
  vpnUsage: {
    defenseId: "vpnUsage",
    owned: false,
    level: 1,
    buyCost: 30000,
    upgradeCost: 0,
    defendsAgainst: {
      mitm: 99,
    },
  },
  applicationSandboxing: {
    defenseId: "applicationSandboxing",
    owned: false,
    level: 1,
    buyCost: 130000,
    upgradeCost: 85000,
    defendsAgainst: {
      ransomware: 85,
    },
  },
};
