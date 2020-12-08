const CpfUtil = require('@softwrap/cpf-utils')

const validateCPF = optional => (req, res, next) => {
  const { cpf } = req.body
  if ((!cpf && !optional) || (cpf && !CpfUtil.validate(cpf))) {
    return res.status(400).json({
      message: 'CPF INVALID.'
    })
  }
  return next()
}

module.exports = validateCPF
