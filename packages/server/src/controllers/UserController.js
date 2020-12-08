const UserRepo = require('../database/repositories/UserRepo')

class UserController {
  static async create (req, res) {
    const {
      name,
      age,
      civilState,
      cpf,
      stateUf,
      city
    } = req.body

    const userId = await UserRepo.create({
      name,
      age,
      civilState,
      cpf,
      stateUf,
      city
    })

    return res.status(201).json({ user_id: userId })
  }

  static async delete (req, res) {
    await UserRepo.remove(req.params.userId)
    return res.status(200).json({ deleted: true })
  }

  static async findById ({ user }, res) {
    return res.status(200).json(user)
  }

  static async find (req, res) {
    const {
      minAge,
      maxAge,
      city,
      civilState,
      name,
      stateUf,
      limit,
      page
    } = req.query

    const LIMIT_MAX = 100

    const limitParsed = !limit || Number(limit) > LIMIT_MAX ? LIMIT_MAX : Number(limit)

    const users = await UserRepo.find({
      minAge: Number(minAge),
      maxAge: Number(maxAge),
      city,
      civilState,
      name,
      stateUf,
      skip: Number(page)
    }, limitParsed)

    return res.status(200).json(users)
  }

  static async update (req, res) {
    const { userId } = req.params

    const {
      name,
      age,
      civilState,
      cpf,
      stateUf,
      city
    } = req.body

    const user = await UserRepo.update(userId, {
      name,
      age,
      civilState,
      cpf,
      stateUf,
      city
    })

    return res.status(200).json(user)
  }
}

module.exports = UserController
