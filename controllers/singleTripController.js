const { db } = require("../connect")

const singleTripController = async (req, res, next) => {
  try {
    const user = await db.collection("users").findOne({ first_name: "Bahaa" })
    const tripSlug = req.params.trip
    const trip = await db.collection("trips").findOne({ slug: tripSlug })
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
