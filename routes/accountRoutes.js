const express = require("express")
const router = express.Router()

const accountController = require("../controllers/accountController")
const changeUsernameController = require("../controllers/changeUsernameController")
const changePasswordController = require("../controllers/changePasswordController")
const logoutController = require("../controllers/logoutController")
const deleteAccountController = require("../controllers/deleteAccountController")
const changeProfilePictureController = require("../controllers/changeProfilePictureController")

router.get("/", accountController)
router.post("/update-username", changeUsernameController)
router.post("/update-password", changePasswordController)
router.post("/logout", logoutController)
router.post("/delete", deleteAccountController)
router.post("/update-profile-picture", changeProfilePictureController)

module.exports = router
