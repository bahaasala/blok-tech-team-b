const Trip = require("../schemas/Trip")
const User = require("../schemas/User")
const { formatDate } = require("../utils/general/dates")

const bookingController = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    const tripSlug = req.params.trip
    const trip = await Trip.findOne({ slug: tripSlug })

    const availabilityOptions = []
    trip.availability.forEach((available) => {
      const dateRange = {
        start_date: formatDate(available.start_date),
        end_date: formatDate(available.end_date)
      }
      availabilityOptions.push(dateRange)
    })

    if (!trip) {
      res.status(404).render("not_found.ejs", { title: "404 Not found" })
      return
    }
    res.render("book.ejs", {
      title: trip.destination + " - Book",
      user: user,
      trip: trip,
      availabilityOptions: availabilityOptions
    })
  } catch (err) {
    next(err)
  }
}

module.exports = bookingController
