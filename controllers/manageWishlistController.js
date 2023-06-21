const User = require("../schemas/User")

const manageWishlistController = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.session.username
    }).populate("savedTrips")

    user.savedTrips.pull(req.body.tripId)
    await user.save()

    res.render("wishlist.ejs", {
      title: "My wishlist",
      user: user
    })
  } catch (err) {
    next(err)
  }
}

module.exports = manageWishlistController
