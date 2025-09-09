const ticketsDAO = require('../dao/tickets.dao');

class TicketsRepository {
  async createTicket(data) {
    return await ticketsDAO.create(data);
  }

  async getById(id) {
    return await ticketsDAO.findById(id);
  }

  async getByCode(code) {
    return await ticketsDAO.findByCode(code);
  }
}

module.exports = new TicketsRepository();
