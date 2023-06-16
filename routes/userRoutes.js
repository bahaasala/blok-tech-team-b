const express = require("express")
const router = express.Router()

const startpageController = require("../controllers/startpageController.js")
const authController = require("../controllers/authController.js")
const addUserController = require("../controllers/addUserController.js")
const loginController = require("../controllers/loginController.js")
const registerController = require("../controllers/registerController.js")
const tripsController = require("../controllers/tripsController.js")

router.post("/register", addUserController)
router.post("/login", authController)

router.get("/", startpageController)
router.get("/login", loginController)
router.get("/trips", tripsController)
router.get("/register", registerController)

module.exports = router
