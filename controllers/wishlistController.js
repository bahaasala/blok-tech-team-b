const wishlistController = async (req, res, next) => {
  try {
    res.render("wishlist.ejs", { title: "My wishlist" })
  } catch (err) {
    next(err)
  }
}

module.exports = wishlistController
