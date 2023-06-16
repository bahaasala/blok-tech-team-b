const express = require("express")
const router = express.Router()

const accountController = require("../controllers/accountController")
// Definieer de /profile route
router.get("/", accountController)
router.get("/account", accountController)

module.exports = router
