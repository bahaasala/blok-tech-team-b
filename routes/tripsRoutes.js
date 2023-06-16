const express = require("express")
const router = express.Router()

const tripsController = require("../controllers/tripsController")
const singleTripController = require("../controllers/singleTripController")
const bookingController = require("../controllers/bookingController")
const addBookingController = require("../controllers/addBookingController")
const confirmedController = require("../controllers/confirmedController")
const deleteBookingController = require("../controllers/deleteBookingController.js")
const manageTripsController = require("../controllers/manageTripsController")

router.get("/", tripsController)
router.post("/", manageTripsController)
router.get("/:trip", singleTripController)
router.get("/:trip/book", bookingController)
router.post("/:trip/book", addBookingController)
router.get("/:trip/book/confirmed/:bookingId", confirmedController)
router.post("/:trip/book/confirmed/:bookingId/delete", deleteBookingController)

module.exports = router
