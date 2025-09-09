const ResetModel = require('./models/PasswordResetToken');

class ResetTokensDAO {
  create(data) { return ResetModel.create(data); }
  async findValidByUser(userId) {
    return ResetModel.findOne({ userId, used:false }).sort({ createdAt: -1 });
  }
  markUsed(id) { return ResetModel.findByIdAndUpdate(id, { used:true }); }
}
module.exports = new ResetTokensDAO();
