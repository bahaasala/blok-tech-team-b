const Trip = require("../schemas/Trip")
const User = require("../schemas/User")

const manageSingleTripController = async (req, res, next) => {
  try {
    const contentType = req.headers["content-type"]
    const user = await User.findOne({
      _id: "648e1e13e28b0df229c66ae3"
    }).populate("seenTrips")
    const trip = await Trip.findOne({ slug: req.params.trip })
    let action

    if (user.savedTrips.includes(req.body.tripId)) {
      user.savedTrips.pull(req.body.tripId)
      action = "remove"
    } else {
      user.savedTrips.push(req.body.tripId)
      action = "add"
    }
    await user.save()

    if (contentType === "application/json") {
      return res.json({ success: true, action: action })
    }
    return res.redirect(`/trips/${trip.slug}`)
  } catch (err) {
    next(err)
  }
}

module.exports = manageSingleTripController
