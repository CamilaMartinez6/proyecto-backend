const jwt = require('jsonwebtoken');
const UserDTO = require('../dto/user.dto');
const { sendPasswordReset, resetPassword } = require('../services/auth.service');

const login = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '24h' }
  );
  res.json({ status:'success', token });
};

const current = (req, res) => {
  const dto = new UserDTO(req.user);
  res.json({ status:'success', user: dto });
};

const forgotPassword = async (req, res) => {
  await sendPasswordReset(req.body.email);
  res.json({ status:'success', message:'Si el email existe, se envió un enlace' });
};

const getResetPassword = (req, res) => {
  // Si usas vistas, renderiza formulario; si es API, devuelve ok
  res.json({ status:'ok', message:'Proveer newPassword vía POST a /reset-password' });
};

const postResetPassword = async (req, res) => {
  const { uid, token, newPassword } = req.body;
  try {
    await resetPassword(uid, token, newPassword);
    res.json({ status:'success', message:'Contraseña actualizada' });
  } catch (e) {
    res.status(400).json({ status:'error', message: e.message });
  }
};

module.exports = { login, current, forgotPassword, getResetPassword, postResetPassword };
