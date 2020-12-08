class Util {
  static removeNullFields (obj) {
    const newObj = {}
    for (const key in obj) {
      if (obj[key]) newObj[key] = obj[key]
    }

    return newObj
  }

  static validateCPF (cpf) {
    const CPF_REGEX = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/
    return CPF_REGEX.test(cpf)
  }

  /**
   *  Check that the body has all approved fields
   * @details types cannot to be object or array
   * @param {Record<fieldName, fieldTypeof>} fields
   */
  static checkFields (requiredFields, obj = {}) {
    for (const field in requiredFields) {
      // eslint-disable-next-line valid-typeof
      if (!obj[field] || typeof obj[field] !== requiredFields[field]) {
        return { name: field, type: requiredFields[field] }
      }
    }
  }
}

module.exports = Util
