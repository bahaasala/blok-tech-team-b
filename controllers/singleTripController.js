const Trip = require("../schemas/Trip")
const User = require("../schemas/User")
const Review = require("../schemas/Review")

const singleTripController = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    const tripSlug = req.params.trip
    const trip = await Trip.findOne({ slug: tripSlug })
    const reviews = await Review.find({ trip: trip._id }).populate("user")
    if (!trip) {
      res.status(404).render("not_found.ejs")
      return
    }
    res.render("trip_details.ejs", {
      title: trip.destination,
      user: user,
      trip: trip,
      reviews: reviews
    })
  } catch (err) {
    next(err)
  }
}

module.exports = singleTripController
