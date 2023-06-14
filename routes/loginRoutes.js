const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const loginController = require("../controllers/loginController")

router.get("/login", loginController.getLoginPage)
router.post("/login", loginController.login)

module.exports = router
