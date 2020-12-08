const IBGEUtil = require('../util/IBGEUtil')

const validateStateAndCity = (optional) => async (req, res, next) => {
  const { stateUf, city } = req.body
  if ((!optional && (!stateUf || !city)) || (stateUf && city && !(await IBGEUtil.validateCity(stateUf, city)))) {
    return res.status(400).json({
      message: 'State UF or City invalid.'
    })
  }
  return next()
}

module.exports = validateStateAndCity
