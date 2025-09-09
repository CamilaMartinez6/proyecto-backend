const crypto = require('crypto');
const bcrypt = require('bcrypt');
const transporter = require('../config/mailer');
const usersRepo = require('../repositories/users.repository');
const resetRepo = require('../repositories/resetTokens.repository');

const HASH_TOKEN_SALT_ROUNDS = 10;

async function sendPasswordReset(email) {
  const user = await usersRepo.getByEmail(email);
  if (!user) return;

  // token aleatorio seguro
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = bcrypt.hashSync(rawToken, bcrypt.genSaltSync(HASH_TOKEN_SALT_ROUNDS));
  const expiresAt = new Date(Date.now() + 60*60*1000);

  await resetRepo.create({
    userId: user._id,
    tokenHash,
    expiresAt,
    used: false
  });

  const link = `${process.env.BASE_URL}/api/sessions/reset-password?token=${rawToken}&uid=${user._id}`;

  await transporter.sendMail({
    from: `Soporte <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: 'Restablecer contraseña',
    html: `
      <p>Solicitaste restablecer tu contraseña(expira en 1h)</p>
      <a href="${link}">Restablecer contraseña</a>
    `
  });
}

async function resetPassword(userId, rawToken, newPassword) {
  const record = await resetRepo.findValidByUser(userId);
  if (!record) throw new Error('Token inválido o expirado');
  if (record.used) throw new Error('Token ya utilizado');
  if (record.expiresAt < new Date()) throw new Error('Token expirado');

  const match = bcrypt.compareSync(rawToken, record.tokenHash);
  if (!match) throw new Error('Token inválido');

  const user = await usersRepo.getById(userId);
  const sameAsOld = bcrypt.compareSync(newPassword, user.password);
  if (sameAsOld) throw new Error('La nueva contraseña no puede ser igual a la anterior');

  const newHash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
  await usersRepo.updatePassword(userId, newHash);
  await resetRepo.markUsed(record._id);
}

module.exports = { sendPasswordReset, resetPassword };
