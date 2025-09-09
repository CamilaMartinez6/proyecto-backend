const ResetDAO = require('../dao/resetTokens.dao');

class ResetTokensRepository {
  create(data) { return ResetDAO.create(data); }
  findValidByUser(userId) { return ResetDAO.findValidByUser(userId); }
  markUsed(id) { return ResetDAO.markUsed(id); }
}

module.exports = new ResetTokensRepository();

