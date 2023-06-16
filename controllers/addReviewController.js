const { db } = require("../connect")
const Booking = require("../schemas/Booking")

const addReviewController = async (req, res, next) => {
  try {
    const reviewDescriptionSelector = req.body.reviewDescription
    const reviewPlaceSelector = req.body.reviewPlace
    const reviewRatingSelector = req.body.reviewStars

    const bookingId = req.params.bookingId

    const reviewFormData = {
      reviewDescriptionSelector,
      reviewPlaceSelector,
      reviewRatingSelector
    }

    console.log(reviewFormData)

    const run = async () => {
      try {
        const reviewSchema = await Booking.create({
          reviewDescriptionData: reviewDescriptionSelector,
          reviewPlaceData: reviewPlaceSelector,
          reviewRatingData: reviewRatingSelector,
          bookingId: bookingId
        })

        console.log("Review created:", reviewSchema)
      } catch (error) {
        console.error("Error creating review:", error)
      }
    }
    run()
  } catch (err) {
    next(err)
  }
}

module.exports = addReviewController
