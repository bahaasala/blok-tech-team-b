const User = require("../schemas/User")

const manageTripsController = async (req, res, next) => {
  try {
    const contentType = req.headers["content-type"]
    const index = parseInt(req.body.groupIndex)
    const user = await User.findOne({
      _id: "648c78ed9e24939393449647"
    }).populate("seenTrips")

    if (req.body.action === "wishlist") {
      user.savedTrips.push(req.body.tripId)
      await user.save()
    } else if (req.body.action === "skip") {
      let seenTripIds
      if (contentType === "application/json") {
        seenTripIds = req.body.sortedIds[index]
      } else {
        seenTripIds = JSON.parse(decodeURIComponent(req.body.sortedIds))[0]
      }
      user.seenTrips.push(...seenTripIds)
      await user.save()
    }

    if (contentType === "application/json") {
      return res.json({ success: true, body: req.body })
    }
    return res.redirect("/trips")
  } catch (err) {
    next(err)
  }
}

module.exports = manageTripsController
