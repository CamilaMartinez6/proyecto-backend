const productsManager = require('.productsManager.js')
const cartManager = require('./cartManager.js')

console.log(productsManager.getProducts())

const crearCarrito = cartManager.createCart()
console.log(crearCarrito)
