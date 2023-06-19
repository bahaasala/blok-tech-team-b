const { db } = require("../connect")
const bcrypt = require("bcrypt")
const User = require("../schemas/User")

const addUserController = async (req, res, next) => {
  const { username, password, confirmPassword } = req.body // Get the username, password, and confirmed password from the request body
  if (password !== confirmPassword) {
    return res.render("register", {
      title: "Register",
      registrationFailed: "Passwords do not match!", // Display error message on the registration page
      successMessage: "" // Clear success message
    })
  }
  try {
    const existingUser = await User.findOne({ username: username }) // Check if the user already exists in the database

    if (existingUser) {
      return res.render("register", {
        title: "Register",
        registrationFailed: "Username already exists!", // Display error message on the registration page
        successMessage: "" // Clear success message
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10) // Hash the password

    const newUser = new User({
      username: username,
      password: hashedPassword
    })

    await newUser.save() // Save the new user to the database

    res.render("login", {
      title: "Login",
      loginFailed: "", // Clear login failed message
      successMessage: "Registration successful!" // Display success message on the login page
    })
  } catch (err) {
    console.error(err)
    res.status(500).send("An error occurred while registering the user")
  }
}

module.exports = addUserController
