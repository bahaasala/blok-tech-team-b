const { db } = require("../connect")
const bcrypt = require("bcrypt")
const User = require("../schemas/User")

const loginController = async (req, res, next) => {
  try {
    const successMessage = req.session.successMessage || ""
    req.session.successMessage = null // Clear session variable

    res.render("login.ejs", {
      title: "Login",
      loginFailed: req.session.loginFailed || "",
      successMessage: successMessage
    })
  } catch (err) {
    next(err)
  }
}

module.exports = loginController
