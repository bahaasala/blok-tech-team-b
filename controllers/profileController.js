const { db } = require("../connect")

const profileController = async (req, res, next) => {
  try {
    res.render("profile", { title: "My profile" })
  } catch (err) {
    next(err)
  }
}

module.exports = profileController
