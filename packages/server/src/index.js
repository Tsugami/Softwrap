const express = require('express')
const cors = require('cors')
const createConnection = require('./database/createConnection')
const UserRepo = require('./database/repositories/UserRepo')

const PORT = process.env.PORT || 3333

const app = express()

app.use(cors())
app.use(express.json())

const start = async () => {
  await createConnection()
  // await UserRepo.create('user_320age', {
  //   name: 'davi',
  //   age: 20,
  //   civilState: 'solteiro',
  //   cpf: 'cpf',
  //   state: 'GOAIS',
  //   city: 'x'
  // })
  const x = await UserRepo.find({
    name: 'pedro'
  })
  console.log(x)
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
}

start()
