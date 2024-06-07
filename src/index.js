require('dotenv').config();
const express = require('express');
const { connectToDatabase } = require('./db/database-connection');
const cors = require('cors');
const backstoreRouter = require('./backstore/backstore.router');

async function main() {
  await connectToDatabase()

  const app = express()
  app.use(express.json())
  app.use(cors())

  app.get('/', function (_, res) {
    res.send('Hello World!')
  })

  app.use('/backstore', backstoreRouter)

  app.listen(3000, function () {
    console.log('Servidor rodando em http://localhost:3000')
  })
}

main();