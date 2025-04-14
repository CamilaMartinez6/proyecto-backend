const productsManager = require('./productsManager.js')
const cartManager = require('./cartManager.js')

console.log(productsManager.getProducts())

const crearCarrito = cartManager.createCart()
console.log(crearCarrito)

cartManager.addProductToCart(nuevoCarrito.id, 1)

const carritoActual = cartManager.getCartById(nuevoCarrito.id)
console.log(carritoActual)