const express = require('express');
const controller = require('./backstore.controller');
const { validateObjectId } = require('../db/database.helper');

const router = express.Router()

router.get('/', controller.readAll)
router.get('/:id', validateObjectId, controller.readById)
router.post('/', controller.create)
router.put('/:id', validateObjectId, controller.updateById)
router.delete('/:id', validateObjectId, controller.deleteById)
router.patch('/:id/sale', validateObjectId, controller.saleById)

module.exports = router