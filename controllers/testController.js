const { db } = require("../connect")
const bcrypt = require("bcrypt")
const User = require("../schemas/User")

const testController = async (req, res, next) => {
  try {
    // const test = req.body
    console.log("logged in")
    res.render("login.ejs", {
      title: "Login",
      loginFailed: "Invalid username and/or password!"
    })
  } catch (err) {
    next(err)
  }
}

module.exports = testController
