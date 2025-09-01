// FraudAttack model file
// Each class represents a different fraud attack with a single attribute: damageDone

class AccAndInvFraud {
  constructor(baseDamage, dangerLevel = 3) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class AccountTakeover {
  constructor(baseDamage, dangerLevel = 3) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class AtmSkimming {
  constructor(baseDamage, dangerLevel = 2) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class AuthPushPayments {
  constructor(baseDamage, dangerLevel = 2) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class BruteForce {
  constructor(baseDamage, dangerLevel = 2) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class BusinessEmailCompromise {
  constructor(baseDamage, dangerLevel = 3) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class CryptoJacking {
  constructor(baseDamage, dangerLevel = 1) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class Ddos {
  constructor(baseDamage, dangerLevel = 2) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class Deepfake {
  constructor(baseDamage, dangerLevel = 2) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class InsiderFraud {
  constructor(baseDamage, dangerLevel = 3) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class InvestmentScam {
  constructor(baseDamage, dangerLevel = 2) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class ManInTheMiddle {
  constructor(baseDamage, dangerLevel = 2) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class Phishing {
  constructor(baseDamage, dangerLevel = 2) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class Ransomware {
  constructor(baseDamage, dangerLevel = 3) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class SimSwap {
  constructor(baseDamage, dangerLevel = 2) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class SqlInjection {
  constructor(baseDamage, dangerLevel = 2) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class SyntIdentityTheft {
  constructor(baseDamage, dangerLevel = 2) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class Vishing {
  constructor(baseDamage, dangerLevel = 2) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class Xss {
  constructor(baseDamage, dangerLevel = 1) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
  }
}

class ZeroDayExploit {
  constructor(baseDamage, dangerLevel = 3) {
    this.baseDamage = baseDamage;
    this.dangerLevel = dangerLevel;
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
