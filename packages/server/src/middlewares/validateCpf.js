const Util = require('../util/Util')

const validateCPF = (req, res, next) => {
  if (!(req.body?.cpf && Util.validateCPF(req.body?.cpf))) {
    return res.status(400).json({
      message: 'CPF INVALID.'
    })
  }
  return next()
}

module.exports = validateCPF
