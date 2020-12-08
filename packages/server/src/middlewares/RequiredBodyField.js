const Util = require('../util/Util')

const RequiredBodyField = (fields) => {
  return (req, res, next) => {
    const invalidField = Util.checkFields(fields, req.body)
    if (invalidField) {
      return res.status(400).json({
        message: `Body invalid: ${invalidField.name} does not exists or is not ${invalidField.type} type.`
      })
    }

    next()
  }
}

module.exports = RequiredBodyField
