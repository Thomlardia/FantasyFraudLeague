export class Attack {
  constructor(baseDamage, dangerLevel, attackId) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

export const attacks = [
  new Attack(100, 3, "accAndInvFraud"),
  new Attack(90, 3, "accountTakeover"),
  new Attack(60, 2, "atmSkimming"),
  new Attack(70, 2, "authPushPayments"),
  new Attack(50, 2, "bruteForce"),
  new Attack(120, 3, "businessEmailCompromise"),
  new Attack(30, 1, "cryptoJacking"),
  new Attack(80, 2, "ddos"),
  new Attack(75, 2, "deepfake"),
  new Attack(110, 3, "insiderFraud"),
  new Attack(85, 2, "investmentScam"),
  new Attack(65, 2, "manInTheMiddle"),
  new Attack(60, 2, "phishing"),
  new Attack(130, 3, "ransomware"),
  new Attack(70, 2, "simSwap"),
  new Attack(90, 2, "sqlInjection"),
  new Attack(80, 2, "syntIdentityTheft"),
  new Attack(55, 2, "vishing"),
  new Attack(40, 1, "xss"),
  new Attack(140, 3, "zeroDayExploit")
];
