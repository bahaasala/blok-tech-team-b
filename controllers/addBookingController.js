const { db } = require("../connect")

const addBookingController = async (req, res, next) => {
  const user = await db.collection("users").findOne({ first_name: "Bahaa" })
  const tripSlug = req.params.trip
  const trip = await db.collection("trips").findOne({ slug: tripSlug })
  const currentDate = new Date()
  const offsetInMilliseconds = currentDate.getTimezoneOffset() * 60 * 1000
  const created_at = new Date(currentDate.getTime() - offsetInMilliseconds)

  const data = {
    destination: trip.destination,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    ...req.body,
    created_at
  }

  const booking = await db.collection("bookings").insertOne(data)
  const bookingId = booking.insertedId
  res.redirect("/trips/" + tripSlug + "/book/confirmed/" + bookingId)
}

module.exports = addBookingController
