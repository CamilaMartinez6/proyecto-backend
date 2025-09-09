const usersDAO = require('../dao/users.dao');

class UsersRepository {
  createUser(data) { return usersDAO.create(data); }
  getByEmail(email) { return usersDAO.findByEmail(email); }
  getById(id) { return usersDAO.findById(id); }
  updatePassword(id, hash) { return usersDAO.updatePassword(id, hash); }
}
module.exports = new UsersRepository();
