export class Attack {
  constructor(baseDamage, dangerLevel, attackId) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

export const attacks = [                       // Danger level justifications (levels still needs to be refined):
  new Attack(9500, 4, "accAndInvFraud"),           // Large-scale, high impact
  new Attack(9000, 4, "accountTakeover"),          // Catastrophic for individuals/orgs
  new Attack(5500, 2, "atmSkimming"),              // moderate
  new Attack(6500, 3, "authPushPayments"),         // Growing, but not always devastating
  new Attack(4000, 1, "bruteForce"),               // Common, but often blocked
  new Attack(10000, 4, "businessEmailCompromise"), // big losses, high profile
  new Attack(2500, 1, "cryptoJacking"),            // rarely critical
  new Attack(7000, 3, "ddos"),                     // can be severe, but often mitigated
  new Attack(6000, 2, "deepfake"),                 // Emerging, but not always high impact
  new Attack(9000, 4, "insiderFraud"),             // Hard to detect, high risk
  new Attack(7000, 3, "investmentScam"),           // can be big, but not always
  new Attack(5500, 2, "manInTheMiddle"),           // Serious, but less common
  new Attack(5500, 3, "phishing"),                 // Widespread, moderate to high
  new Attack(11000, 4, "ransomware"),              // Catastrophic, especially for orgs
  new Attack(6000, 2, "simSwap"),                  // bad for individuals
  new Attack(8000, 3, "sqlInjection"),             // Can be devastating if unprotected
  new Attack(6000, 2, "syntIdentityTheft"),        // Growing, but not always high impact
  new Attack(4000, 1, "vishing"),                  // Common, but usually low impact
  new Attack(3000, 1, "xss"),                      // rarely critical
  new Attack(12000, 4, "zeroDayExploit")           // rare, but can be catastrophic
];
