const { ObjectId } = require('mongodb');
const { getDatabase } = require("../db/database-connection")

function getCollection() {
  return getDatabase().collection('backstore')
}

function readAll() {
  return getCollection().find().toArray()
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
function readById(id) {
  return getCollection().findOne({ _id: new ObjectId(id) })
}

function create(newItem) {
  return getCollection().insertOne(newItem)
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
function updateById(id, updateItem) {
  return getCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: updateItem }
  )
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
function deleteById(id) {
  return getCollection().deleteOne({ _id: new ObjectId(id) })
}

async function saleById(id, quantity) {
  const product = await readById(id);
  if (!product || product.quantity < quantity) {
    return null;
  }
  const newQuantity = product.quantity - quantity;
  await updateById(id, { quantity: newQuantity });
  return readById(id);
}

module.exports = {
  readAll,
  readById,
  create,
  updateById,
  deleteById,
  saleById
}