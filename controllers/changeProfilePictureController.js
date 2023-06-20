const { db } = require("../schemas/connect")
const User = require("../schemas/User")
const multer = require("multer")
const fs = require("fs")
const sharp = require("sharp")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
}).single("profilePicture")

const compressImage = async (source, destination, quality) => {
  await sharp(source)
    .jpeg({ quality: quality })
    .png({ quality: quality })
    .jpeg({ quality: quality })
    .toFile(destination)
}
const compressProfilePicture = async (source, destination) => {
  await compressImage(source, destination, 80)
}

const changeProfilePictureController = async (req, res, next) => {
  try {
    const { username } = req.session
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

    upload(req, res, async (err) => {
      if (err) {
        throw new Error("Upload failed.")
      }

      const imageUrl = req.file.filename

      const sourcePath = `public/images/${imageUrl}`
      const destinationPath = `public/compressed/${imageUrl}`

      await compressProfilePicture(sourcePath, destinationPath)

      await User.findOneAndUpdate({ username }, { image_url: imageUrl })

      res.redirect("/account")
    })
  } catch (err) {
    next(err)
  }
}

module.exports = changeProfilePictureController
