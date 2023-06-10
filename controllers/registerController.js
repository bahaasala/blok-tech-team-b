const { db } = require("../connect")

const registerController = async (req, res, next) => {
  try {
    res.render("register.ejs", { title: "Register" })
  } catch (err) {
    next(err)
  }
}

module.exports = registerController
