const { ObjectId } = require("mongodb")
const { db } = require("../connect")
const Trip = require("../schemas/Trip")
const Booking = require("../schemas/Booking")
const User = require("../schemas/User")
const { formatDate } = require("../utils/general/dates")

const confirmedController = async (req, res, next) => {
  const tripSlug = req.params.trip
  const trip = await Trip.findOne({ slug: tripSlug })
  const bookingId = req.params.bookingId

  // Validate bookingId format
  if (!ObjectId.isValid(bookingId)) {
    return res.status(400).render("not_found.ejs", {
      title: "Invalid Booking ID",
      message: "The booking ID provided is invalid."
    })
  }

  try {
    const booking = await Booking.findOne({ _id: bookingId })

    if (!booking) {
      return res.status(404).render("not_found.ejs", {
        title: "Booking Not Found",
        message: "The booking does not exist."
      })
    }
    const user = await User.findOne({ _id: booking.user })

    if (!user) {
      return res.status(403).render("not_found.ejs", {
        title: "Access Denied",
        message: "You are not authorized to view this booking."
      })
    }

    res.render("confirmed.ejs", {
      title: "Booking Confirmed",
      user: user,
      trip: trip,
      booking: booking,
      dates: ` ${formatDate(booking.date_range.start_date)} - ${formatDate(
        booking.date_range.end_date
      )}`
    })
  } catch (err) {
    next(err)
  }
}

module.exports = confirmedController
