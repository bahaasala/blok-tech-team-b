const express = require("express")
const router = express.Router()

const userBookingsController = require("../controllers/userBookingsController")
const singleBookingController = require("../controllers/singleBookingController")

router.get("/", userBookingsController)
router.get("/:bookingId", singleBookingController)

module.exports = router
