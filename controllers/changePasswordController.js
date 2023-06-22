const { db } = require("../schemas/connect")
const User = require("../schemas/User")
const bcrypt = require("bcrypt")

const changePasswordController = async (req, res, next) => {
  const username = req.session.username
  const currentPassword = req.body.currentPassword
  const newPassword = req.body.newPassword

  try {
    const user = await User.findOne({ username: username })

    if (!user) {
      throw new Error("User not found")
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password)

    if (!passwordMatch) {
      res.render("account.ejs", {
        title: "My account",
        passwordFailed: "Incorrect current password",
        user: user
      })
      return
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    await user.save()

    res.redirect("/account")
  } catch (err) {
    next(err)
  }
}

module.exports = changePasswordController
