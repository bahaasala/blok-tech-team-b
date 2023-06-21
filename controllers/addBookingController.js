const Booking = require("../schemas/Booking")
const Review = require("../schemas/Review")
const Trip = require("../schemas/Trip")
const User = require("../schemas/User")
const { formattedDateToValidDate } = require("../utils/general/dates")

const addBookingController = async (req, res, next) => {
  const user = await User.findOne({ username: req.session.username })
  const tripSlug = req.params.trip
  const trip = await Trip.findOne({ slug: tripSlug })

  const newBooking = {
    user: user._id,
    trip: trip._id,
    date_range: {
      start_date: formattedDateToValidDate(req.body.date_range.split(" - ")[0]), // "2021-05-01 - 2021-05-08" => ["2021-05-01", "2021-05-08"]
      end_date: formattedDateToValidDate(req.body.date_range.split(" - ")[1])
    },
    room: {
      type: req.body.room.split(" ")[0],
      gender: req.body.room.split(" ")[1],
      price: req.body.room.split(" ")[2]
    }
  }
  const booking = await Booking.findOne({ user: user._id, trip: trip._id })
  if (booking) {
    const reviews = await Review.find({ trip: trip._id }).populate("user")
    if (!trip) {
      res.status(404).render("not_found.ejs")
      return
    }
    return res.render("trip_details.ejs", {
      title: trip.destination,
      user: user,
      trip: trip,
      reviews: reviews,
      duplicate: true
    })
  }
  const savedBooking = await Booking.create(newBooking)
  res.redirect("/trips/" + tripSlug + "/book/confirmed/" + savedBooking._id)
}

module.exports = addBookingController
