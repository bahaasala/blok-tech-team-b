const { db } = require("../connect")
const User = require("../schemas/User")

const userBookingsController = async (req, res, next) => {
  try {
    const user = await User.findOne({ first_name: "Bahaa" })
    // console.log(user)
    res.render("bookings.ejs", { title: "My bookings" })
  } catch (err) {
    next(err)
  }
}

module.exports = userBookingsController
