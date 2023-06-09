const bcrypt = require("bcrypt")
const User = require("../schemas/User")

const authController = async (req, res, next) => {
  const { username, password } = req.body // username en password ophalen uit het aanvraaglichaam

  try {
    const user = await User.findOne({ username: username }) // De user opzoeken in de database

    if (user) {
      const match = await bcrypt.compare(password, user.password) // Het ingevoerde password vergelijken met de gehashte versie in de database

      if (match) {
        req.session.isLoggedIn = true // Sessie markeren als ingelogdc
        req.session.username = username // username opslaan in de sessie
        req.session.userId = user._id // userId opslaan in de sessie

        req.session.save(() => {
          // Retrieve the stored redirect URL from the session
          const redirectUrl = req.session.redirectUrl || "/login"

          // Clear the stored redirect URL from the session
          delete req.session.redirectUrl
          res.redirect(redirectUrl === "/login" ? "/trips" : redirectUrl) // Doorsturen naar de userspagina
        })
        return //Stop de functie uitvoering na redirect
      }
    }

    res.render("login", {
      title: "Login",
      loginFailed: "Invalid username and/or password!", // Foutbericht weergeven op de loginpagina
      successMessage: req.session.successMessage,
      isLoggedIn: req.session.isLoggedIn
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = authController
