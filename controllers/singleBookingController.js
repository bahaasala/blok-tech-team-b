const Booking = require("../schemas/Booking")
const Review = require("../schemas/Review")
const { formatDate } = require("../utils/general/dates")
const path = require("path")

const singleBookingController = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId
    const booking = await Booking.findOne({ _id: bookingId }).populate("trip")
    const reviews = await Review.find({ trip: booking.trip._id }).populate(
      "user"
    )
    const invalidPaths = ["/login", `/bookings${req.url}`]
    const referer = req.get("Referer")
    const refererUrl = new URL(referer)
    const previousPath = refererUrl.pathname + refererUrl.search
    if (
      path.extname(req.originalUrl) === "" &&
      !invalidPaths.includes(previousPath)
    ) {
      req.session.redirectUrl = previousPath
    }
    res.render("booking_details.ejs", {
      title: "Single Booking",
      booking: booking,
      reviews: reviews,
      dates: ` ${formatDate(booking.date_range.start_date)} - ${formatDate(
        booking.date_range.end_date
      )}`,
      prevPage: req.session.redirectUrl
    })
  } catch (err) {
    next(err)
  }
}

module.exports = singleBookingController
