const Trip = require("../schemas/Trip")
const User = require("../schemas/User")

const singleTripController = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: "648e1e13e28b0df229c66ae3" })
    const tripSlug = req.params.trip
    const trip = await Trip.findOne({ slug: tripSlug })
    if (!trip) {
      res.status(404).render("not_found.ejs")
      return
    }
    res.render("trip_details.ejs", {
      title: trip.destination,
      user: user,
      trip: trip
    })
  } catch (err) {
    next(err)
  }
}

module.exports = singleTripController
