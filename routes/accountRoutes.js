const express = require("express")
const router = express.Router()

const accountController = require("../controllers/accountController")
const changeAccountController = require("../controllers/changeAccountController")

router.get("/", accountController)
router.post("/update", changeAccountController)

module.exports = router
