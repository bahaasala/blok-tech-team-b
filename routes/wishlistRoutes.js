const express = require("express")
const router = express.Router()

const wishlistController = require("../controllers/wishlistController")
const manageWishlistController = require("../controllers/manageWishlistController")

router.get("/", wishlistController)
router.post("/", manageWishlistController)

module.exports = router
