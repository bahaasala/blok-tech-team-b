const Booking = require("../schemas/Booking")

const deleteBookingController = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId

    await Booking.deleteOne({ _id: bookingId })

    res.redirect("/bookings")
  } catch (err) {
    next(err)
  }
}

module.exports = deleteBookingController
