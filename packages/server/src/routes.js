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
  validateCpf,
  validateCivilState,
  validateCity,
  UserController.create
)

router.put('/users/:userId',
  checkUserExists,
  UserBodymiddleware,
  validateCpf,
  validateCivilState,
  validateCity,
  UserController.update
)

router.get('/users', UserController.find)
router.delete('/users/:userId', checkUserExists, UserController.delete)

module.exports = router
