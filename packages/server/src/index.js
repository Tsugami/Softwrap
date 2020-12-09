require('express-async-errors')

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const ErrorHandle = require('./middlewares/ErrorHandle')
const createConnection = require('./database/createConnection')

const PORT = process.env.PORT || 3333

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(routes)
app.use(ErrorHandle)

const start = async () => {
  await createConnection()
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
}

start()
