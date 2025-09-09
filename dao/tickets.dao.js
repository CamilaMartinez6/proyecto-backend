const Ticket = require('./models/Ticket');

class TicketsDAO {
  create(data) { 
    return Ticket.create(data); 
  }

  findById(id) { 
    return Ticket.findById(id); 
  }

  findByCode(code) { 
    return Ticket.findOne({ code }); 
  }
}

module.exports = new TicketsDAO();
