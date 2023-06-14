const express = require("express")
const router = express.Router()
const loginController = require("../controllers/loginController.js")

router.get("/login", loginController)
router.post("/login", loginController)

module.exports = router
