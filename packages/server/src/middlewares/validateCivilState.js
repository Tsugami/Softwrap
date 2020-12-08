const { CIVIL_STATES } = require('../Constants')

module.exports = (optional) => (req, res, next) => {
  const { civilState } = req.body
  if ((!civilState && !optional) || (civilState && CIVIL_STATES.includes(civilState?.toLowerCase()))) {
    return res.status(400).json({
      message: 'Civil state invalid.'
    })
  }
  next()
}
