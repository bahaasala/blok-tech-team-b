const User = require("../schemas/User")

const manageTripsController = async (req, res, next) => {
  try {
    const contentType = req.headers["content-type"]
    const index = parseInt(req.body.groupIndex)
    const user = await User.findOne({
      _id: "648e1e13e28b0df229c66ae3"
    }).populate("seenTrips")
    let action
    if (req.body.action === "wishlist") {
      if (user.savedTrips.includes(req.body.tripId)) {
        user.savedTrips.pull(req.body.tripId)
        action = "remove"
      } else {
        user.savedTrips.push(req.body.tripId)
        action = "add"
      }
      await user.save()
    } else if (req.body.action === "skip") {
      let seenTripIds
      action = "skip"
      if (contentType === "application/json") {
        seenTripIds = req.body.sortedIds[index]
      } else {
        seenTripIds = JSON.parse(decodeURIComponent(req.body.sortedIds))[0]
      }
      user.seenTrips.push(...seenTripIds)
      await user.save()
    }

    if (contentType === "application/json") {
      return res.json({ success: true, action: action })
    }
    return res.redirect("/trips")
  } catch (err) {
    next(err)
  }
}

module.exports = manageTripsController
