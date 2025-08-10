const passport = require("passport")
const local = require("passport-local")
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt")
const User = require("../models/User")
const { crearHash, contrasenaValida } = require("../utils/hash")
const jwt = require("jsonwebtoken")

const LocalStrategy = local.Strategy;

const iniciarPassport = () => {

  passport.use("register", new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name, age } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) return done(null, false, { message: "el usuario ya existe" })

        const newUser = await User.create({
          first_name,
          last_name,
          email,
          age,
          password: crearHash(password)
        });
        console.log('Usuario creado:', newUser);
        return done(null, newUser)
      } catch (err) {
        return done(err)
      }
    }
  ))

  passport.use("login", new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) return done(null, false, { message: "usuario no encontrado" })
        if (!contrasenaValida(user, password))
          return done(null, false, { message: "contraseña incorrecta" })

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  ))

  passport.use("jwt", new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      secretOrKey: "jwt_secret_key"
    },
    async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload)
      } catch (err) {
        return done(err, false)
      }
    }
  ))
}

module.exports = { iniciarPassport }