const Booking = require("../schemas/Booking")
const Review = require("../schemas/Review")

const addReviewController = async (req, res, next) => {
  try {
    const reviewDescriptionSelector = req.body.reviewDescription
    const reviewCountrySelector = req.body.reviewPlace
    const reviewRatingSelector = req.body.reviewStars

    const bookingId = req.params.bookingId

    const currentBooking = await Booking.findOne({
      _id: bookingId
    })

    const reviewFormData = {
      reviewDescriptionSelector,
      reviewCountrySelector,
      reviewRatingSelector
    }

    console.log(reviewFormData)

    const run = async () => {
      try {
        const reviewSchema = await Review.create({
          description: reviewDescriptionSelector,
          country: reviewCountrySelector,
          rating: reviewRatingSelector,
          booking: bookingId,
          trip: currentBooking.trip,
          user: currentBooking.user
        })

        console.log("Review created:", reviewSchema)
      } catch (error) {
        console.error("Error creating review:", error)
      }
    }
    await run()
    res.render("booking_details.ejs", {
      title: "Single Booking",
      bookingId: bookingId
    })
  } catch (err) {
    next(err)
  }
}

module.exports = addReviewController
