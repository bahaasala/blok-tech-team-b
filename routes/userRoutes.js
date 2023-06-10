const express = require("express")
const router = express.Router()

const startpageController = require("../controllers/startpageController.js")
const loginController = require("../controllers/loginController.js")
const registerController = require("../controllers/registerController.js")
const profileController = require("../controllers/profileController.js")

router.get("/", startpageController)
router.get("/login", loginController)
router.get("/register", registerController)
router.get("/profile", profileController)

module.exports = router
