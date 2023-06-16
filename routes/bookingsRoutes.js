const express = require("express")
const router = express.Router()

const userBookingsController = require("../controllers/userBookingsController")
const singleBookingController = require("../controllers/singleBookingController")
const addReviewController = require("../controllers/addReviewController")

router.get("/", userBookingsController)
router.get("/:bookingId", singleBookingController)
router.post("/:bookingId/submitReview", addReviewController)

module.exports = router
