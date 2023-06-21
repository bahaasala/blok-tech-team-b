const Booking = require("../schemas/Booking")
const Review = require("../schemas/Review")

const addReviewController = async (req, res, next) => {
  try {
    const reviewDescriptionSelector = req.body.reviewDescription
    const reviewCountrySelector = req.body.reviewPlace
    const reviewRatingSelector = req.body.reviewStars

    const bookingId = req.params.bookingId
    const booking = await Booking.findOne({ _id: bookingId }).populate("trip")

    const reviewFormData = {
      reviewDescriptionSelector,
      reviewCountrySelector,
      reviewRatingSelector
    }

    const run = async () => {
      try {
        const reviewSchema = await Review.create({
          description: reviewDescriptionSelector,
          country: reviewCountrySelector,
          rating: reviewRatingSelector,
          booking: booking.id,
          trip: booking.trip,
          user: booking.user
        })

        console.log("Review created:", reviewSchema)
      } catch (error) {
        console.error("Error creating review:", error)
      }
    }
    await run()
    // Redirect back to the single booking page
    res.redirect(`/bookings/${bookingId}`)
  } catch (err) {
    next(err)
  }
}

module.exports = addReviewController
