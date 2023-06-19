const { db } = require("../schemas/connect")
const User = require("../schemas/User")
const multer = require("multer")
const fs = require("fs")

// Configuratie voor Multer om de bestanden op te slaan
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images") // Pad naar de map waar je de afbeeldingen wilt opslaan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix) // Bestandsnaam genereren
  }
})

// Middleware voor het uploaden van het bestand
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
}).single("profilePicture")

const changeProfilePictureController = async (req, res, next) => {
  try {
    // Afbeelding uploaden
    upload(req, res, async (err) => {
      if (err) {
        throw new Error("Upload failed.")
      }

      const { username } = req.session
      const imageUrl = req.file.filename // Bestandsnaam verkrijgen van Multer

      // Verwijder de oude profielfoto als deze niet de standaardfoto is
      const user = await User.findOne({ username })
      if (user.image_url !== "default-user.png") {
        const path = `public/images/${user.image_url}`
        fs.unlink(path, (err) => {
          if (err) {
            console.error("Error deleting previous profile photo:", err)
          } else {
            console.log("Previous profile photo successfully deleted.")
          }
        })
      }

      // Update de image_url van de gebruiker in de database
      await User.findOneAndUpdate({ username }, { image_url: imageUrl })

      res.redirect("/account")
    })
  } catch (err) {
    next(err)
  }
}

module.exports = changeProfilePictureController
