const axios = require('axios')

class IBGEUtil {
  static async validateCity (stateUf, city) {
    const IBGE_URL = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateUf}/municipios`
    const cities = await axios.get(IBGE_URL).catch(() => null)

    if (!cities) return

    return cities.data.some(c => c.nome?.toLowerCase() === city.toLowerCase())
  }
}

module.exports = IBGEUtil
