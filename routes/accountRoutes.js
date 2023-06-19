const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const User = require("../schemas/User")

const accountController = require("../controllers/accountController")
const changeUsernameController = require("../controllers/changeUsernameController")
const changePasswordController = require("../controllers/changePasswordController")
const logoutController = require("../controllers/logoutController")
const startpageController = require("../controllers/startpageController.js")
const deleteAccountController = require("../controllers/deleteAccountController")

router.get("/", accountController)
router.post("/update-username", changeUsernameController)
router.post("/update-password", changePasswordController)
router.post("/logout", logoutController)
router.post("/delete", deleteAccountController)

module.exports = router
