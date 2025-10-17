// defenses.js
// Structured defense data for Firestore seeding

export const defenses = {
  applicationSandboxing: {
    defenseId: "applicationSandboxing",
    level: 1,
    cost: [130000, 85000, 120000],
    defendsAgainst: {
      ransomware: [80, 90, 99],
      zeroDay: [80, 90, 99],
    },
  },
  atmInspection: {
    defenseId: "atmInspection",
    level: 1,
    cost: [55000, 35000, 50000],
    defendsAgainst: {
      skimming: [60, 75, 95],
    },
  },
  automatedBackups: {
    defenseId: "automatedBackups",
    level: 1,
    cost: [120000, 80000, null],
    defendsAgainst: {
      ransomware: [80, 95, 99],
      insiderFraud: [0, 40, 70],
    },
  },
  backgroundChecks: {
    defenseId: "backgroundChecks",
    level: 1,
    cost: [50000, 30000, 40000],
    defendsAgainst: {
      insiderFraud: [60, 85, 95],
      syntheticIdentity: [70, 85, 95],
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
      bec: [40, 70, 99],
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
      xss: [80, 95, 99],
    },
  },
  keepSoftwareUpdated: {
    defenseId: "keepSoftwareUpdated",
    level: 1,
    cost: [45000, 30000, 40000],
    defendsAgainst: {
      ransomware: [70, 90, 95],
      xss: [75, 85, 95],
      zeroDay: [50, 75, 90],
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
      cryptojacking: [55, 70, 80],
      ddos: [40, 50, 55],
      bruteForce: [30, 45, 50],  // can detect not prevent
      insiderFraud: [0, 15, 25], // can detect suspicious patterns/ behaviours but not all
    },
  },
  regularPasswordChanges: {
    defenseId: "regularPasswordChanges",
    level: 1,
    cost: [20000, 15000, 25000],
    defendsAgainst: {
      accountTakeover: [70, 85, 95],
      bruteForce: [60, 75, 95],
      syntheticIdentity: [50, 75, 99],
    },
  },
  principleOfLeastPrivilege: {
    defenseId: "principleOfLeastPrivilege",
    level: 1,
    cost: [60000, 35000, 55000],
    defendsAgainst: {
      insiderFraud: [65, 70, 75],
      accAndInvFraud: [70, 60, 99],
      sqlInjection: [40, 50, 60],
    },
  },
  regularAudits: {
    defenseId: "regularAudits",
    level: 1,
    cost: [60000, 35000, 50000],
    defendsAgainst: {
      accAndInvFraud: [65, 80, 99],
      insiderFraud: [65, 80, 99],
      bec: [65, 80, 99],
    },
  },
  segregationOfDuties: {
    defenseId: "segregationOfDuties",
    level: 1,
    cost: [75000, 40000, 65000],
    defendsAgainst: {
      insiderFraud: [90, 90, 90],
      accAndInvFraud: [70, 95, 95],
      bec: [60, 80, 99],
    },
  },
  trafficFiltering: {
    defenseId: "trafficFiltering",
    level: 1,
    cost: [65000, 40000, null],
    defendsAgainst: {
      ddos: [40, 60, 60],
      bruteForce: [60, 70, 85],
    },
  },
  userEducation: {
    defenseId: "userEducation",
    level: 1,
    cost: [40000, 25000, 35000],
    defendsAgainst: {
      phishing: [50, 70, 95],
      vishing: [50, 70, 95],
      investmentScams: [50, 75, 95],
    },
  },
  verificationProtocols: {
    defenseId: "verificationProtocols",
    level: 1,
    cost: [90000, 60000, 90000],
    defendsAgainst: {
      authorizedPushPayments: [60, 75, 90],
      vishing: [80, 90, 99],
      simSwap: [60, 75, 99],
      deepfakeFraud: [50, 60, 80],
    },
  },
  vpnUsage: {
    defenseId: "vpnUsage",
    level: 1,
    cost: [30000, null, null],
    defendsAgainst: {
      mitm: [90, 90, 90],
    },
  },
};
