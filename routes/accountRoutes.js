const express = require("express")
const router = express.Router()

const accountController = require("../controllers/accountController")
const changeUsernameController = require("../controllers/changeUsernameController")
const changePasswordController = require("../controllers/changePasswordController")
const logoutController = require("../controllers/logoutController")
const startpageController = require("../controllers/startpageController.js")

router.get("/", accountController)
router.post("/update-username", changeUsernameController)
router.post("/update-password", changePasswordController)
router.post("/logout", logoutController)
router.get("/", startpageController)

module.exports = router
