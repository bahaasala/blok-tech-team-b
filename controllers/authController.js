const { db } = require("../connect")
const bcrypt = require("bcrypt")
const User = require("../schemas/User")

const authController = async (req, res, next) => {
  try {
    console.log("check on user and pass")
    res.render("login.ejs", {
      title: "Login",
      loginFailed: "Invalid username and/or password!"
    })
  } catch (err) {
    next(err)
  }
}

module.exports = authController
