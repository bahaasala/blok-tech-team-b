const { db } = require("../connect")
const Booking = require("../schemas/Booking")

const addReviewController = async (req, res, next) => {
  try {
    // Route voor het ontvangen van het formulier en verwerken van de ingediende gegevens
    const reviewDescriptionData = req.body.reviewDescription
    const reviewPlaceData = req.body.reviewPlace
    const reviewRatingData = req.body.reviewStars

    // Gegevens opslaan in een object
    const bookingId = req.params.bookingId

    const reviewFormData = {
      reviewDescriptionData,
      reviewPlaceData,
      reviewRatingData
    }

    console.log(reviewFormData)
  } catch (err) {
    next(err)
  }
}

run()
async function run() {
  const reviewSchema = new Booking({
    reviewDescriptionData: "Test Mongoose",
    reviewPlaceData: "Test Mongoose",
    reviewRatingData: 1
  })
  await reviewSchema.save()
  console.log("Test Mongoose saved")
}

module.exports = addReviewController
