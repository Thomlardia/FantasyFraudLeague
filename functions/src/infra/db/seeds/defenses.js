// defenses.js
// Structured defense data for Firestore seeding

export const defenses = {
  atmInspection: {
    defenseId: "atmInspection",
    level: 1,
    cost: [55000, 35000, 50000],
    defendsAgainst: {
      skimming: [40, 75, 95],
      tampering: [40, 75, 95],
    },
  },
  backgroundChecks: {
    defenseId: "backgroundChecks",
    level: 1,
    cost: [50000, 30000, 40000],
    defendsAgainst: {
      insiderFraud: [60, 85, 95],
    },
  },
  ddosProtection: {
    defenseId: "ddosProtection",
    level: 1,
    cost: [150000, 125000, 175000],
    defendsAgainst: {
      ddos: [60, 90, 99],
    },
  },
  deepfakeDetection: {
    defenseId: "deepfakeDetection",
    level: 1,
    cost: [95000, 65000, 95000],
    defendsAgainst: {
      deepfakeFraud: [70, 90, 99],
      vishing: [0, 90, 99],
    },
  },
  emailFiltering: {
    defenseId: "emailFiltering",
    level: 1,
    cost: [80000, 50000, 70000],
    defendsAgainst: {
      phishing: [80, 90, 99],
      bec: [0, 0, 99],
    },
  },
  httpsEncryption: {
    defenseId: "httpsEncryption",
    level: 1,
    cost: [100000, null, null],
    defendsAgainst: {
      mitm: [95, 95, 95],
    },
  },
  inputValidation: {
    defenseId: "inputValidation",
    level: 1,
    cost: [70000, 45000, 65000],
    defendsAgainst: {
      sqlInjection: [85, 95, 99],
      xss: [0, 95, 99],
    },
  },
  keepSoftwareUpdated: {
    defenseId: "keepSoftwareUpdated",
    level: 1,
    cost: [45000, 30000, 40000],
    defendsAgainst: {
      ransomware: [70, 90, 95],
    },
  },
  mfa: {
    defenseId: "mfa",
    level: 1,
    cost: [150000, 100000, 150000],
    defendsAgainst: {
      accountTakeover: [80, 95, 99],
      bruteForce: [80, 95, 99],
      phishing: [80, 95, 99],
      simSwap: [0, 95, 99],
    },
  },
  networkMonitoring: {
    defenseId: "networkMonitoring",
    level: 1,
    cost: [110000, 70000, 110000],
    defendsAgainst: {
      cryptojacking: [70, 70, 70],
      ddos: [70, 70, 70],
      bruteForce: [0, 90, 90],
      insiderFraud: [0, 0, 95],
    },
  },
  principleOfLeastPrivilege: {
    defenseId: "principleOfLeastPrivilege",
    level: 1,
    cost: [60000, 35000, 55000],
    defendsAgainst: {
      insiderFraud: [65, 65, 65],
      accAndInvFraud: [0, 90, 90],
      accountTakeover: [0, 0, 99],
    },
  },
  regularAudits: {
    defenseId: "regularAudits",
    level: 1,
    cost: [60000, 35000, 50000],
    defendsAgainst: {
      accAndInvFraud: [60, 60, 60],
      insiderFraud: [0, 85, 85],
      bec: [0, 0, 95],
    },
  },
  passwordPolicies: {
    defenseId: "passwordPolicies",
    level: 1,
    cost: [20000, 15000, 25000],
    defendsAgainst: {
      accountTakeover: [40, 40, 40],
      bruteForce: [0, 80, 80],
      syntheticIdentity: [0, 0, 99],
    },
  },
  automatedBackups: {
    defenseId: "automatedBackups",
    level: 1,
    cost: [120000, 80000, null],
    defendsAgainst: {
      ransomware: [60, 99, 99],
      insiderFraud: [0, 99, 99],
    },
  },
  segregationOfDuties: {
    defenseId: "segregationOfDuties",
    level: 1,
    cost: [75000, 40000, 65000],
    defendsAgainst: {
      insiderFraud: [90, 90, 90],
      accAndInvFraud: [0, 95, 95],
      bec: [0, 0, 99],
    },
  },
  trafficFiltering: {
    defenseId: "trafficFiltering",
    level: 1,
    cost: [65000, 40000, null],
    defendsAgainst: {
      ddos: [40, 60, 60],
      bruteForce: [80, 95, 95],
    },
  },
  userEducation: {
    defenseId: "userEducation",
    level: 1,
    cost: [40000, 25000, 35000],
    defendsAgainst: {
      phishing: [50, 50, 85],
      vishing: [50, 50, 85],
      investmentScams: [0, 75, 75],
    },
  },
  verificationProtocols: {
    defenseId: "verificationProtocols",
    level: 1,
    cost: [90000, 60000, 90000],
    defendsAgainst: {
      authorizedPushPayments: [90, 90, 90],
      vishing: [0, 95, 95],
      simSwap: [0, 0, 99],
    },
  },
  vpnUsage: {
    defenseId: "vpnUsage",
    level: 1,
    cost: [30000, null, null],
    defendsAgainst: {
      mitm: [99, 99, 99],
    },
  },
  applicationSandboxing: {
    defenseId: "applicationSandboxing",
    level: 1,
    cost: [130000, 85000, 120000],
    defendsAgainst: {
      ransomware: [85, 85, 85],
      zeroDay: [0, 95, 99],
    },
  },
};