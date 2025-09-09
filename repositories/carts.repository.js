const cartsDAO = require('../dao/carts.dao');

class CartsRepository {
  async createCart(data) {
    return await cartsDAO.create(data);
  }

  async getById(id) {
    return await cartsDAO.findById(id);
  }

  async updateCart(id, data) {
    return await cartsDAO.update(id, data);
  }

  async deleteCart(id) {
    return await cartsDAO.delete(id);
  }
}

module.exports = new CartsRepository();
