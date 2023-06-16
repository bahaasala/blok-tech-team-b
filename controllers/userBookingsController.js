const User = require("../schemas/User")
const Booking = require("../schemas/Booking")

const userBookingsController = async (req, res, next) => {
  try {
    const userId = "64897eacdc14bf160eb8f20a" // Replace with the actual user ID
    const user = await User.findOne({ _id: userId })

    // console.log(user)

    const bookings = await Booking.find({ user: userId })

    console.log(bookings)

    // const newBooking = new Booking({
    //   user: user._id,
    //   date_range: {
    //     start_date: "2021-01-01T00:00:00.000Z",

    //     end_date: "2021-01-01T00:00:00.000Z"
    //   },
    //   room: {
    //     type: "Single",
    //     gender: "Male",
    //     price: 200
    //   },
    //   price: 200,
    //   destination: "Paris"
    // })

    // await newBooking.save()

    // console.log(newBooking)

    // const bookings = await Booking.find({ _id: { $in: user.bookedTrips } })
    // console.log(bookings)

    res.render("bookings.ejs", {
      title: "My bookings",
      user: user,
      bookings: bookings
    })
  } catch (err) {
    next(err)
  }
}

module.exports = userBookingsController
