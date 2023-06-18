const { db } = require("../schemas/connect")
const User = require("../schemas/User")

const changeUsernameController = async (req, res, next) => {
  const username = req.session.username
  const newUsername = req.body.newUsername

  try {
    const existingUser = await User.findOne({ username: newUsername })
    if (existingUser) {
      throw new Error("Username already exists")
    }

    await User.updateOne(
      { username: username },
      { $set: { username: newUsername } }
    )
    req.session.username = newUsername

    res.redirect("/account")
  } catch (err) {
    next(err)
  }
}

module.exports = changeUsernameController
