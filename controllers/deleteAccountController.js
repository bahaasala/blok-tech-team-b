const { db } = require("../schemas/connect")
const User = require("../schemas/User")
const Review = require("../schemas/Review")

const deleteAccountController = async (req, res, next) => {
  try {
    // Haal de gebruikersnaam op uit de sessie
    const userId = req.session.userId

    // Verwijder de gebruiker uit de database
    await User.deleteOne({ username: username })

    // Delete all reviews from user
    await Review.deleteMany({ user: userId })

    // Verwijder de sessiegegevens
    delete req.session.isLoggedIn
    delete req.session.username
    delete req.session.userId

    res.redirect("/")
  } catch (err) {
    next(err)
  }
}

module.exports = deleteAccountController
