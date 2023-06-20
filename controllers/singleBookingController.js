const Booking = require("../schemas/Booking")
const { formatDate } = require("../utils/general/dates")

const singleBookingController = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId
    const booking = await Booking.findOne({ _id: bookingId }).populate("trip")

    res.render("booking_details.ejs", {
      title: "Single Booking",
      booking: booking,
      dates: ` ${formatDate(booking.date_range.start_date)} - ${formatDate(
        booking.date_range.end_date
      )}`
    })
  } catch (err) {
    next(err)
  }
}

module.exports = singleBookingController
