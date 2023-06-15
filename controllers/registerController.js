const { db } = require("../connect")
const bcrypt = require("bcrypt")
const User = require("../schemas/User")

const registerController = async (req, res, next) => {
  try {
    res.render("register.ejs", {
      title: "Register",
      registrationFailed: req.session.registrationFailed || "",
      successMessage: req.session.successMessage || ""
    })
    req.session.registrationFailed = req.session.successMessage = null
  } catch (err) {
    next(err)
  }
}

module.exports = registerController
