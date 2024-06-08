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

  app.use(function (err, _, res, _) {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo deu errado!' })
  })

  app.use('*', (_, res) => {
    res.status(404).send({ error: 'Endpoint não encontrado.' })
  })

  app.listen(3000, function () {
    console.log('Servidor rodando em http://localhost:3000')
  })
}

main();