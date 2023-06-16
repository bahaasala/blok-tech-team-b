const { db } = require("../connect")
const Booking = require("../schemas/Booking")

const addReviewController = async (req, res, next) => {
  try {
    // Route voor het ontvangen van het formulier en verwerken van de ingediende gegevens
    const reviewDescriptionSelector = req.body.reviewDescription
    const reviewPlaceSelector = req.body.reviewPlace
    const reviewRatingSelector = req.body.reviewStars

    // Gegevens opslaan in een object
    const bookingId = req.params.bookingId

    const reviewFormData = {
      reviewDescriptionSelector,
      reviewPlaceSelector,
      reviewRatingSelector
    }

    console.log(reviewFormData)

    run()
    async function run() {
      const reviewSchema = await Booking.create({
        reviewDescriptionData: reviewDescriptionSelector,
        reviewPlaceData: reviewPlaceSelector,
        reviewRatingData: reviewRatingSelector,
        bookingIdData: bookingId
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = addReviewController
