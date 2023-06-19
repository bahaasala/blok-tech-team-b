const { db } = require("../connect")
const User = require("../schemas/User")

const accountController = async (req, res, next) => {
  try {
    const isLoggedIn = req.session.isLoggedIn
    const username = req.session.username

    res.render("account.ejs", { title: "My account", isLoggedIn, username })
  } catch (err) {
    next(err)
  }
}

module.exports = accountController
