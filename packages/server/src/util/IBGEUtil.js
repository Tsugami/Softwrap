const axios = require('axios')

class IBGEUtil {
  static validateCity (stateUf, city) {
    const IBGE_URL = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateUf}/municipios`
    const cities = axios.get(IBGE_URL).catch(() => null)

    if (!cities) return

    return cities.some(c => c.name === city)
  }
}

module.exports = IBGEUtil
