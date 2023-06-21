const { db } = require("../connect")
const User = require("../schemas/User")

const accountController = async (req, res, next) => {
  try {
    const isLoggedIn = req.session.isLoggedIn
    const username = req.session.username
    const user = await User.findOne({ username: username })

    console.log(user)

    res.render("account.ejs", {
      title: "My account",
      isLoggedIn,
      username,
      user: user
    })
  } catch (err) {
    next(err)
  }
}

module.exports = accountController
