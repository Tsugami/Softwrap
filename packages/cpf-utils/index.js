const CPF_REGEX = /([0-9]{3})\.?([0-9]{3})\.?([0-9]{3})-?([0-9]{2})/

class CpfUtil {
  static validate (cpf) {
    return CPF_REGEX.test(cpf)
  }

  static parse (cpf) {
    return cpf.replace(CPF_REGEX, (_cpf, n1, n2, n3, n4) => `${n1}.${n2}.${n3}-${n4}`)
  }
}

module.exports = CpfUtil
