const { ObjectId } = require("mongodb")
const { db } = require("../connect")

const confirmedController = async (req, res, next) => {
  const tripSlug = req.params.trip
  const trip = await db.collection("trips").findOne({ slug: tripSlug })
  const bookingId = req.params.bookingId

  // Validate bookingId format
  if (!ObjectId.isValid(bookingId)) {
    return res.status(400).render("not_found.ejs", {
      title: "Invalid Booking ID",
      message: "The booking ID provided is invalid."
    })
  }

  try {
    const booking = await db
      .collection("bookings")
      .findOne({ _id: new ObjectId(bookingId) })

    if (!booking) {
      return res.status(404).render("not_found.ejs", {
        title: "Booking Not Found",
        message: "The booking does not exist."
      })
    }

    const user = await db.collection("users").findOne({
      first_name: booking.first_name,
      last_name: booking.last_name,
      email: booking.email
    })

    if (!user) {
      return res.status(403).render("not_found.ejs", {
        title: "Access Denied",
        message: "You are not authorized to view this booking."
      })
    }

    res.render("confirmed.ejs", {
      title: "Booking Confirmed",
      user: user,
      trip: trip,
      booking: booking
    })
  } catch (err) {
    next(err)
  }
}

module.exports = confirmedController
