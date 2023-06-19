const { db } = require("../schemas/connect")
const User = require("../schemas/User")

const logoutController = (req, res, next) => {
  delete req.session.isLoggedIn
  delete req.session.username

  res.redirect("/")
}

module.exports = logoutController
