const { db } = require("../connect")
const bcrypt = require("bcrypt")
const User = require("../schemas/User")

const registerController = async (req, res, next) => {
  try {
    const registrationFailed = req.session.registrationFailed || ""
    req.session.registrationFailed = null // Clear session variable

    res.render("register.ejs", {
      title: "Register",
      registrationFailed: registrationFailed
    })
  } catch (err) {
    next(err)
  }
}

module.exports = registerController
