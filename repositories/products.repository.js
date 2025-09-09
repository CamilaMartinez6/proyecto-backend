const productsDAO = require('../dao/products.dao');

class ProductsRepository {
  async createProduct(data) {
    return await productsDAO.create(data);
  }

  async getAll() {
    return await productsDAO.findAll();
  }

  async getById(id) {
    return await productsDAO.findById(id);
  }

  async updateProduct(id, data) {
    return await productsDAO.update(id, data);
  }

  async deleteProduct(id) {
    return await productsDAO.delete(id);
  }
}

module.exports = new ProductsRepository();
