const express = require('express');
const ProductManager = require('../productsManager')

const router = express.Router()

router.get('/', async (req, res) => {
  const products = await ProductManager.getProducts()
  res.render('index', { products })
});

router.get('/realtimeproducts', async (req, res) => {
  res.render('realTimeProducts')
})

module.exports = router