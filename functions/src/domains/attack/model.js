export class Attack {
  constructor(baseDamage, dangerLevel, attackId) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

export const attacks = [                       // Danger level justifications (levels still needs to be refined):
  new Attack(47500, 4, "accAndInvFraud"),           // Large-scale, high impact
  new Attack(45000, 4, "accountTakeover"),          // Catastrophic for individuals/orgs
  new Attack(27500, 2, "skimming"),                 // moderate
  new Attack(32500, 3, "authorizedPushPayments"),   // Growing, but not always devastating
  new Attack(20000, 1, "bruteForce"),               // Common, but often blocked
  new Attack(50000, 4, "bec"),                      // big losses, high profile
  new Attack(12500, 1, "cryptojacking"),            // rarely critical
  new Attack(35000, 3, "ddos"),                     // can be severe, but often mitigated
  new Attack(30000, 2, "deepfakeFraud"),            // Emerging, but not always high impact
  new Attack(45000, 4, "insiderFraud"),             // Hard to detect, high risk
  new Attack(35000, 3, "investmentScams"),          // can be big, but not always
  new Attack(27500, 2, "mitm"),                     // Serious, but less common
  new Attack(27500, 3, "phishing"),                 // Widespread, moderate to high
  new Attack(55000, 4, "ransomware"),               // Catastrophic, especially for orgs
  new Attack(30000, 2, "simSwap"),                  // bad for individuals
  new Attack(40000, 3, "sqlInjection"),             // Can be devastating if unprotected
  new Attack(30000, 2, "syntheticIdentity"),        // Growing, but not always high impact
  new Attack(20000, 1, "vishing"),                  // Common, but usually low impact
  new Attack(15000, 1, "xss"),                      // rarely critical
  new Attack(60000, 4, "zeroDay")                   // rare, but can be catastrophic
];
