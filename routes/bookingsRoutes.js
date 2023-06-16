const express = require("express")
const router = express.Router()

const userBookingsController = require("../controllers/userBookingsController")
const singleBookingController = require("../controllers/singleBookingController")

router.get("/", userBookingsController)
router.get("/:bookingId", singleBookingController)
router.post("/:bookingId/addReview", singleBookingController)

module.exports = router
