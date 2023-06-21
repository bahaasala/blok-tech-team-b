const User = require("../schemas/User")

const wishlistController = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.session.username
    }).populate("savedTrips")

    res.render("wishlist.ejs", {
      title: "My wishlist",
      user: user
    })
  } catch (err) {
    next(err)
  }
}

module.exports = wishlistController
