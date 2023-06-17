const { db } = require("../schemas/connect")
const User = require("../schemas/User")

const changeAccountController = async (req, res, next) => {
  const username = req.session.username
  const newUsername = req.body.newUsername

  try {
    console.log(username)
    await User.updateOne(
      { username: username },
      { $set: { username: newUsername } }
    )
    console.log(req.body.newUsername)
    req.session.username = newUsername

    res.redirect("/account")
  } catch (err) {
    next(err)
  }
}

module.exports = changeAccountController
