const { db } = require("../connect")
const Trip = require("../schemas/Trip")
const { generateFakeTrips } = require("../utils/commands/generate-fake-trips")

const tripsController = async (req, res, next) => {
  try {
    Trip.create(generateFakeTrips(10))

    const user = await db.collection("users").findOne({ first_name: "Bahaa" })
    const trips = await db.collection("trips").find().toArray()
    res.render("trips.ejs", {
      title: "Trips",
      user: user,
      trips: trips
    })
  } catch (err) {
    next(err)
  }
}

module.exports = tripsController
