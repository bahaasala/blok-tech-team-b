const { db } = require("../schemas/connect")
const User = require("../schemas/User")

const updateProfilePictureController = async (req, res, next) => {
  const username = req.session.username
  const profilePicture = req.file // De profielfoto is beschikbaar via req.file

  try {
    // Logica om de profielfoto bij te werken in de database
    // Je kunt de ontvangen profielfoto opslaan op de gewenste locatie en de URL ervan in de gebruikersdatabase bijwerken

    res.redirect("/account")
  } catch (err) {
    next(err)
  }
}

module.exports = updateProfilePictureController
