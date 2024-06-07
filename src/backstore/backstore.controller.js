const service = require('./backstore.service');

async function readAll(_, res) {
  const items = await service.readAll()
  res.send(items)
}

async function readById(req, res) {
  const id = req.params.id

  const item = await service.readById(id)

  if (!item) {
    return res.status(404).send('Item não encontrado.')
  }

  res.send(item)
}

async function create(req, res) {
  const newItem = req.body

  if (!newItem || !newItem.name) {
    return res.status(400).send('Corpo da requisição deve conter a propriedade `name`.')
  }

  await service.create(newItem)
  res.status(201).send(newItem)
}

async function updateById(req, res) {
  const id = req.params.id

  const newItem = req.body

  if (!newItem || !newItem.name) {
    return res.status(400).send('Corpo da requisição deve conter a propriedade `name`.')
  }

  await service.updateById(id, newItem)
  res.send(newItem)
}

async function deleteById(req, res) {
  const id = req.params.id

  await service.deleteById(id)
  res.send('Item removido com sucesso: ' + id)
}

async function saleById(req, res) {
  const id = req.params.id;
  const { quantity } = req.body;

  if (quantity == null) {
    return res.status(400).send('Corpo da requisição deve conter a propriedade `quantity`.');
  }

  try {
    const updatedItem = await service.saleById(id, quantity);
    if (!updatedItem) {
      return res.status(404).send('Item não encontrado ou quantidade insuficiente.');
    }
    res.send(updatedItem);
  } catch (error) {
    res.status(500).send('Erro ao processar a venda.');
  }
}

module.exports = {
  readAll,
  readById,
  create,
  updateById,
  deleteById,
  saleById
}