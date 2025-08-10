const express = require("express")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post("/register", passport.authenticate("register", { session: false }), (req, res) => {
  res.json({ status: "success", message: "Usuario registrado" })
})

router.post("/login", passport.authenticate("login", { session: false }), (req, res) => {
  const user = req.user

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "jwt_secret_key",
    { expiresIn: "1h" }
  )

  res.json({ status: "success", token })
})

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ status: "success", user: req.user })
  }
)

module.exports = router
