const UserRepo = require('../database/repositories/UserRepo')

module.exports = async (req, res, next) => {
  const { userId } = req.params

  req.user = userId && await UserRepo.findOne(userId)

  if (!req.user) {
    return res.status(404).json({ message: 'USER ID NOT EXISTS.' })
  }

  return next()
}
