export class Attack {
  constructor(baseDamage, dangerLevel, attackId) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

export const attacks = [                       // Danger level justifications (levels still needs to be refined):
  new Attack(95000, 4, "accAndInvFraud"),           // Large-scale, high impact
  new Attack(90000, 4, "accountTakeover"),          // Catastrophic for individuals/orgs
  new Attack(55000, 2, "atmSkimming"),              // moderate
  new Attack(65000, 3, "authPushPayments"),         // Growing, but not always devastating
  new Attack(40000, 1, "bruteForce"),               // Common, but often blocked
  new Attack(100000, 4, "businessEmailCompromise"), // big losses, high profile
  new Attack(25000, 1, "cryptoJacking"),            // rarely critical
  new Attack(70000, 3, "ddos"),                     // can be severe, but often mitigated
  new Attack(60000, 2, "deepfake"),                 // Emerging, but not always high impact
  new Attack(90000, 4, "insiderFraud"),             // Hard to detect, high risk
  new Attack(70000, 3, "investmentScam"),           // can be big, but not always
  new Attack(55000, 2, "manInTheMiddle"),           // Serious, but less common
  new Attack(55000, 3, "phishing"),                 // Widespread, moderate to high
  new Attack(110000, 4, "ransomware"),              // Catastrophic, especially for orgs
  new Attack(60000, 2, "simSwap"),                  // bad for individuals
  new Attack(80000, 3, "sqlInjection"),             // Can be devastating if unprotected
  new Attack(60000, 2, "syntIdentityTheft"),        // Growing, but not always high impact
  new Attack(40000, 1, "vishing"),                  // Common, but usually low impact
  new Attack(30000, 1, "xss"),                      // rarely critical
  new Attack(120000, 4, "zeroDayExploit")           // rare, but can be catastrophic
];
