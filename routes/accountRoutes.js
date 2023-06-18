const express = require("express")
const router = express.Router()

const accountController = require("../controllers/accountController")
const changeAccountController = require("../controllers/changeAccountController")
const changePasswordController = require("../controllers/changePasswordController")

router.get("/", accountController)
router.post("/update-username", changeAccountController)
router.post("/update-password", changePasswordController)

module.exports = router
