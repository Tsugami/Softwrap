const Util = require('../util/Util')

const validateCPF = optional => (req, res, next) => {
  const { cpf } = req.body
  if ((!cpf && !optional) || (cpf && !Util.validateCPF(cpf))) {
    return res.status(400).json({
      message: 'CPF INVALID.'
    })
  }
  return next()
}

module.exports = validateCPF
