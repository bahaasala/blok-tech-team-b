const { db } = require("../connect")
const bcrypt = require("bcrypt")
const User = require("../schemas/User")

const loginController = async (req, res, next) => {
  try {
    res.render("login.ejs", {
      title: "Login",
      loginFailed: req.session.loginFailed || ""
    })
    req.session.loginFailed = null // Clear the login failed message
  } catch (err) {
    next(err)
  }
}

module.exports = loginController
