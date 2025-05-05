const fs = require('fs')
const path = require('path')

const pathProducts = path.join(__dirname, 'products.json')

function getProducts() {
    const products = fs.readFileSync(pathProducts, 'utf-8')
    return JSON.parse(products);
}

function getProductById(pid) {
    const products = getProducts()
    return products.find(products => products.id === pid)
}

function addProduct(product) {
    const products = getProducts()
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1
    product.id = newId
    products.push(product)
    fs.writeFileSync(pathProducts, JSON.stringify(products, null, 2))
}

function updateProduct(pid, updated) {
    const products = getProducts();
    products[pid - 1] = updated;
    fs.writeFileSync(pathProducts, JSON.stringify(products))
}

function deleteProduct(pid) {
    let products = getProducts()
    const idToDelete = Number(pid)
    products = products.filter(product => product.id !== idToDelete)
    fs.writeFileSync(pathProducts, JSON.stringify(products, null, 2))
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}