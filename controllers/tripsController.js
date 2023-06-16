const Trip = require("../schemas/Trip")
const User = require("../schemas/User")
const { generateFakeTrips } = require("../utils/commands/generate-fake-trips")
const { generateFakeUsers } = require("../utils/commands/generate-fake-users")

const tripsController = async (req, res, next) => {
  try {
    await Trip.deleteMany().then(() => {
      console.log("Deleted all trips.")
    })
    await Trip.create(generateFakeTrips(12))
    const user = await User.findOne({ _id: "64897eacdc14bf160eb8f20b" })

    const trips = await Trip.find({ _id: { $nin: user.seenTrips } })
    const filteredTrips = trips.filter(
      (trip) => !user.seenTrips.includes(trip._id)
    )
    console.log(
      trips.map((trip) => trip._id),
      user.seenTrips
    )
    const sortedTrips = []
    for (let i = 0; i < filteredTrips.length; i += 4) {
      const group = filteredTrips.slice(i, i + 4)
      sortedTrips.push(group)
    }
    const sortedIds = sortedTrips.map((innerArray) =>
      innerArray.map((obj) => obj._id)
    )

    res.render("trips.ejs", {
      title: "Trips",
      user: user,
      sortedTrips: sortedTrips,
      sortedIds: sortedIds
    })
  } catch (err) {
    next(err)
  }
}

module.exports = tripsController
