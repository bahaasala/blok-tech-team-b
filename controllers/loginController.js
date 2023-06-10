const { db } = require("../connect")

const loginController = async (req, res, next) => {
  try {
    res.render("login.ejs", { title: "Login" })
  } catch (err) {
    next(err)
  }
}

module.exports = loginController
