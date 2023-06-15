const { db } = require("../connect")
const bcrypt = require("bcrypt")
const User = require("../schemas/User")

const authController = async (req, res, next) => {
  const { username, password } = req.body // username en password ophalen uit het aanvraaglichaam

  try {
    const collection = db.collection("usertest") // Verwijzing naar de userscollectie in MongoDB
    const user = await collection.findOne({ username }) // De user opzoeken in de database

    if (user) {
      const match = await bcrypt.compare(password, user.password) // Het ingevoerde password vergelijken met de gehashte versie in de database
      if (match) {
        req.session.isLoggedIn = true // Sessie markeren als ingelogdc
        req.session.username = username // username opslaan in de sessie
        return res.redirect("/profile") // Doorsturen naar de userspagina
      }
    }

    res.render("login", {
      title: "Login",
      loginFailed: "Invalid username and/or password!" // Foutbericht weergeven op de loginpagina
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = authController
