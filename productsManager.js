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
    const products = getProducts();
    products.push(product);
    fs.writeFileSync(pathProducts, JSON.stringify(products))
}

function updateProduct(pid, updated) {
    const products = getProducts();
    products[pid - 1] = updated;
    fs.writeFileSync(pathProducts, JSON.stringify(products))
}

function deleteProduct(pid) {
    let products = getProducts();
    products = products.filter(product => product.id !== pid)
    fs.writeFileSync(pathProducts, JSON.stringify(products))
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}