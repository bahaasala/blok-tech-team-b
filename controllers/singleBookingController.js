const singelBookingController = async (req, res, next) => {
  try {
    res.render("booking_details.ejs", { title: "Single Booking" })
  } catch (err) {
    next(err)
  }
}

module.exports = singelBookingController
