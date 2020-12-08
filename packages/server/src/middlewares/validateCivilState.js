const { CIVIL_STATES } = require('../Constants')

module.exports = (req, res, next) => {
  if (CIVIL_STATES.includes(req.body?.civilState.toLowerCase())) {
    return res.status(400).json({
      message: 'Civil state invalid.'
    })
  }
  next()
}
