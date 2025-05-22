const express = require('express')
const router = express.Router()
const cartController = require('../controllers/carts.controller.js')

router.post('/', cartController.createCart)
router.get('/:cid', cartController.getCartById)
router.post('/:cid/products/:pid', cartController.addProductToCart)

module.exports = router