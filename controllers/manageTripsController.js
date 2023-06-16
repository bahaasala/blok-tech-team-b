const User = require("../schemas/User")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const manageTripsController = async (req, res, next) => {
  try {
    const contentType = req.headers["content-type"]
    const index = req.body.groupIndex
    const user = await User.findOne({
      _id: "64897eacdc14bf160eb8f20b"
    }).populate("seenTrips")

    let seenTripIds
    if (contentType === "application/json") {
      seenTripIds = req.body.sortedIds[parseInt(index)]
      console.log("axios post")
      console.log(mongoose.Types.ObjectId.isValid(seenTripIds[0]))
    } else {
      console.log("form post")
      seenTripIds = JSON.parse(decodeURIComponent(req.body.sortedIds))[0]
      console.log(mongoose.Types.ObjectId.isValid(seenTripIds[0]))
    }

    if (req.body.action === "wishlist") {
      user.savedTrips.push(req.body.tripId)
      await user.save()
    } else if (req.body.action === "skip") {
      console.log(seenTripIds)
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
