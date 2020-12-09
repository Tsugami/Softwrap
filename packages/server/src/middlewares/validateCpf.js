const CPF_REGEX = /([0-9]{3})\.?([0-9]{3})\.?([0-9]{3})-?([0-9]{2})/

const validateCPF = optional => (req, res, next) => {
  const { cpf } = req.body
  if ((!cpf && !optional) || (cpf && !CPF_REGEX.test(cpf))) {
    return res.status(400).json({
      message: 'CPF INVALID.'
    })
  }
  return next()
}

module.exports = validateCPF
