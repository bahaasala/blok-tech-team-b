const userBookingsController = async (req, res, next) => {
  try {
    res.render("bookings.ejs", { title: "My bookings" })
  } catch (err) {
    next(err)
  }
}

module.exports = userBookingsController
