export class Attack {
  constructor(baseDamage, dangerLevel, attackId) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

export const attacks = [                       // Danger level justifications (levels still needs to be refined):
  new Attack(95, 4, "accAndInvFraud"),           // Large-scale, high impact
  new Attack(90, 4, "accountTakeover"),          // Catastrophic for individuals/orgs
  new Attack(55, 2, "atmSkimming"),              // moderate
  new Attack(65, 3, "authPushPayments"),         // Growing, but not always devastating
  new Attack(40, 1, "bruteForce"),               // Common, but often blocked
  new Attack(100, 4, "businessEmailCompromise"), // big losses, high profile
  new Attack(25, 1, "cryptoJacking"),            // rarely critical
  new Attack(70, 3, "ddos"),                     // can be severe, but often mitigated
  new Attack(60, 2, "deepfake"),                 // Emerging, but not always high impact
  new Attack(90, 4, "insiderFraud"),             // Hard to detect, high risk
  new Attack(70, 3, "investmentScam"),           // can be big, but not always
  new Attack(55, 2, "manInTheMiddle"),           // Serious, but less common
  new Attack(55, 3, "phishing"),                 // Widespread, moderate to high
  new Attack(110, 4, "ransomware"),              // Catastrophic, especially for orgs
  new Attack(60, 2, "simSwap"),                  // bad for individuals
  new Attack(80, 3, "sqlInjection"),             // Can be devastating if unprotected
  new Attack(60, 2, "syntIdentityTheft"),        // Growing, but not always high impact
  new Attack(40, 1, "vishing"),                  // Common, but usually low impact
  new Attack(30, 1, "xss"),                      // rarely critical
  new Attack(120, 4, "zeroDayExploit")           // rare, but can be catastrophic
];
