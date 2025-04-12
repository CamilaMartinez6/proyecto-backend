const fs = require('fs')
const path = require('path')

const pathCarts = path.join(__dirname, 'carts.json')

function getCarts() {
    const data = fs.readFileSync(pathCarts, 'utf-8')
    return data ? JSON.parse(data) : []
}

function getCartById(cid) {
    const carts = getCarts();
    return carts.find(cart => cart.id === cid)
}

function createCart() {
    const carts = getCarts()
    const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1
    const newCart = {
        id: newId,
        products: []
    };
    carts.push(newCart);
    fs.writeFileSync(pathCarts, JSON.stringify(carts, null, 2))
    return newCart
}

function addProductToCart(cid, pid) {
    const carts = getCarts()
    const cartIndex = carts.findIndex(cart => cart.id === cid)
    if (cartIndex === -1) return null

    const cart = carts[cartIndex]
    const prodInCart = cart.products.find(p => p.product === pid)

    if (prodInCart) {
        prodInCart.quantity++
    } else {
        cart.products.push({ product: pid, quantity: 1 })
    }

    carts[cartIndex] = cart
    fs.writeFileSync(pathCarts, JSON.stringify(carts, null, 2))
    return cart
}

module.exports = {
    getCarts,
    getCartById,
    createCart,
    addProductToCart
}