const express = require("express")
const router = express.Router()

const userBookingsController = require("../controllers/userBookingsController")
const singleBookingController = require("../controllers/singleBookingController")
const addReviewController = require("../controllers/addReviewController")
const deleteBookingController = require("../controllers/deleteBookingController")

router.get("/", userBookingsController)
router.get("/:bookingId", singleBookingController)
router.post("/:bookingId/submitReview", addReviewController)
router.post("/:bookingId/delete", deleteBookingController)

module.exports = router
