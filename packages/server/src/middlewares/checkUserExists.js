const UserRepo = require('../database/repositories/UserRepo')

module.exports = async (req, res, next) => {
  const { userId } = req.params

  if (!(await UserRepo.exists(userId))) {
    return res.status(404).json({ message: 'USER ID NOT EXISTS.' })
  }

  return next()
}
