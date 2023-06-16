const singleBookingController = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId
    console.log(bookingId)
    res.render("booking_details.ejs", {
      title: "Single Booking",
      bookingId: bookingId
    })
  } catch (err) {
    next(err)
  }
}

module.exports = singleBookingController
