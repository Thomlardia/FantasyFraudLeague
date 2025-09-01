// FraudAttack model file
// Each class represents a different fraud attack with a single attribute: damageDone

class AccAndInvFraud {
  constructor(baseDamage, dangerLevel = 3, attackId = "accAndInvFraud") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class AccountTakeover {
  constructor(baseDamage, dangerLevel = 3, attackId = "accountTakeover") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class AtmSkimming {
  constructor(baseDamage, dangerLevel = 2, attackId = "atmSkimming") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class AuthPushPayments {
  constructor(baseDamage, dangerLevel = 2, attackId = "authPushPayments") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class BruteForce {
  constructor(baseDamage, dangerLevel = 2, attackId = "bruteForce") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class BusinessEmailCompromise {
  constructor(baseDamage, dangerLevel = 3, attackId = "businessEmailCompromise") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class CryptoJacking {
  constructor(baseDamage, dangerLevel = 1, attackId = "cryptoJacking") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class Ddos {
  constructor(baseDamage, dangerLevel = 2, attackId = "ddos") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class Deepfake {
  constructor(baseDamage, dangerLevel = 2, attackId = "deepfake") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class InsiderFraud {
  constructor(baseDamage, dangerLevel = 3, attackId = "insiderFraud") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class InvestmentScam {
  constructor(baseDamage, dangerLevel = 2, attackId = "investmentScam") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class ManInTheMiddle {
  constructor(baseDamage, dangerLevel = 2, attackId = "manInTheMiddle") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class Phishing {
  constructor(baseDamage, dangerLevel = 2, attackId = "phishing") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class Ransomware {
  constructor(baseDamage, dangerLevel = 3, attackId = "ransomware") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class SimSwap {
  constructor(baseDamage, dangerLevel = 2, attackId = "simSwap") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class SqlInjection {
  constructor(baseDamage, dangerLevel = 2, attackId = "sqlInjection") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class SyntIdentityTheft {
  constructor(baseDamage, dangerLevel = 2, attackId = "syntIdentityTheft") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class Vishing {
  constructor(baseDamage, dangerLevel = 2, attackId = "vishing") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class Xss {
  constructor(baseDamage, dangerLevel = 1, attackId = "xss") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

class ZeroDayExploit {
  constructor(baseDamage, dangerLevel = 3, attackId = "zeroDayExploit") {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
    this.attackId = attackId;
  }
}

module.exports = {
  AccAndInvFraud,
  AccountTakeover,
  AtmSkimming,
  AuthPushPayments,
  BruteForce,
  BusinessEmailCompromise,
  CryptoJacking,
  Ddos,
  Deepfake,
  InsiderFraud,
  InvestmentScam,
  ManInTheMiddle,
  Phishing,
  Ransomware,
  SimSwap,
  SqlInjection,
  SyntIdentityTheft,
  Vishing,
  Xss,
  ZeroDayExploit
};
