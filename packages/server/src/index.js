const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const createConnection = require('./database/createConnection')

const PORT = process.env.PORT || 3333

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

const start = async () => {
  await createConnection()
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
}

start()
