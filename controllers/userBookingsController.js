const User = require("../schemas/User")
const Booking = require("../schemas/Booking")

const userBookingsController = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    const bookings = await Booking.find({ user: user._id }).populate("trip")

    console.log(bookings)

    res.render("bookings.ejs", {
      title: "My bookings",
      user: user,
      bookings: bookings
    })
  } catch (err) {
    next(err)
  }
}

module.exports = userBookingsController
