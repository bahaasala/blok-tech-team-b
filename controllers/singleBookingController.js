const Booking = require("../schemas/Booking")

const singleBookingController = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId
    const booking = await Booking.findOne({ _id: bookingId }).populate("trip")

    res.render("booking_details.ejs", {
      title: "Single Booking",
      booking: booking
    })
  } catch (err) {
    next(err)
  }
}

module.exports = singleBookingController
