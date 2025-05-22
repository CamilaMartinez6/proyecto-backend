const CartModel = require('../models/Cart.model.js')

const createCart = async (req, res) => {
  const newCart = await CartModel.create({})
  res.status(201).json({ status: 'success', cart: newCart })
};

const getCartById = async (req, res) => {
  const { cid } = req.params
  const cart = await CartModel.findById(cid).populate('products.product')
  if (!cart) {
    return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' })
  }
  res.json({ status: 'success', cart })
}

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params
  const cart = await CartModel.findById(cid)
  if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' })

  const existingProduct = cart.products.find(p => p.product.toString() === pid)
  if (existingProduct) {
    existingProduct.quantity++
  } else {
    cart.products.push({ product: pid })
  }

  await cart.save()
  res.json({ status: 'success', cart })
}

module.exports = {
  createCart,
  getCartById,
  addProductToCart
}