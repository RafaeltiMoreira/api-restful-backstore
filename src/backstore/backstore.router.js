const express = require('express');
const controller = require('./backstore.controller');

const router = express.Router()

router.get('/', controller.readAll)
router.get('/:id', controller.readById)
router.post('/', controller.create)
router.put('/:id', controller.updateById)
router.delete('/:id', controller.deleteById)
router.patch('/:id/sale', controller.saleById)

module.exports = router