const { db } = require("../connect")
const bcrypt = require("bcrypt")
const User = require("../schemas/User")

const loginController = async (req, res, next) => {
  try {
    // const test = req.body
    console.log("test222")
    res.render("login.ejs", {
      title: "Login",
      loginFailed: "Invalid username and/or password!"
    })
  } catch (err) {
    next(err)
  }
}

module.exports = loginController

// Function for displaying the login page
// exports.getLoginPage = (req, res) => {
//   res.render("login", { loginFailed: "" })
// }

// Function for handling the login request
// exports.login = async (req, res) => {
//   const { username, password } = req.body

//   try {
//     const user = await User.findOne({ username })

//     if (user) {
//       const match = await bcrypt.compare(password, user.password)
//       if (match) {
//         req.session.isLoggedIn = true
//         req.session.username = username
//         return res.redirect("/user")
//       }
//     }

//     res.render("login.ejs", {
//       loginFailed: "Invalid username and/or password!"
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("An error occurred while logging in")
//   }
// }
