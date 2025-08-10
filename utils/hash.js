const bcrypt = require ('bcrypt')

const crearHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const contrasenaValida = (user, password) =>
  bcrypt.compareSync(password, user.password)

module.exports = {crearHash, contrasenaValida}