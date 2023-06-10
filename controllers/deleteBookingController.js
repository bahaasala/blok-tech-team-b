const { ObjectId } = require("mongodb")
const { db } = require("../connect")

const deleteBookingController = async (req, res, next) => {
  const bookingId = req.params.bookingId

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

    await db.collection("bookings").deleteOne({ _id: new ObjectId(bookingId) })

    res.redirect("/trips")
  } catch (err) {
    next(err)
  }
}

module.exports = deleteBookingController
