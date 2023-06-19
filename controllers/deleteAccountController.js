const { db } = require("../schemas/connect")
const User = require("../schemas/User")

const deleteAccountController = async (req, res, next) => {
  try {
    // Haal de gebruikersnaam op uit de sessie
    const username = req.session.username

    // Verwijder de gebruiker uit de database
    await User.deleteOne({ username: username })

    // Verwijder de sessiegegevens
    delete req.session.isLoggedIn
    delete req.session.username

    res.redirect("/")
  } catch (err) {
    next(err)
  }
}

module.exports = deleteAccountController
