const { db } = require("../connect")

const bookingController = async (req, res, next) => {
  try {
    const user = await db.collection("users").findOne({ first_name: "Bahaa" })
    const tripSlug = req.params.trip
    const trip = await db.collection("trips").findOne({ slug: tripSlug })

    // format date
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")

      return `${day}-${month}-${year}`
    }
    trip.availability.forEach((available) => {
      if (available.start_date) {
        available.start_date = formatDate(available.start_date)
      }
      if (available.end_date) {
        available.end_date = formatDate(available.end_date)
      }
    })

    if (!trip) {
      res.status(404).render("not_found.ejs", { title: "404 Not found" })
      return
    }
    res.render("book.ejs", {
      title: trip.destination + " - Book",
      user: user,
      trip: trip
    })
  } catch (err) {
    next(err)
  }
}

module.exports = bookingController
