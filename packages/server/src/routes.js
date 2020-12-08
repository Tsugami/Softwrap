const { Router } = require('express')
const RequiredBodyField = require('./middlewares/RequiredBodyField')
const validateCpf = require('./middlewares/validateCpf')
const validateCity = require('./middlewares/validateCity')
const validateCivilState = require('./middlewares/validateCivilState')
const checkUserExists = require('./middlewares/checkUserExists')
const UserController = require('./controllers/UserController')

const router = Router()

const UserBodymiddleware = RequiredBodyField({
  name: 'string',
  age: 'number',
  civilState: 'string',
  cpf: 'string',
  stateUf: 'string',
  city: 'string'
})

router.post('/users',
  UserBodymiddleware,
  validateCpf(false),
  validateCivilState(false),
  validateCity(false),
  UserController.create
)

router.put('/users/:userId',
  checkUserExists,
  validateCpf(true),
  validateCivilState(true),
  validateCity(true),
  UserController.update
)

router.get('/users', UserController.find)
router.get('/users/:userId', checkUserExists, UserController.findById)
router.delete('/users/:userId', checkUserExists, UserController.delete)

module.exports = router
