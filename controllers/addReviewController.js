const { db } = require("../connect")

const addReviewController = async (req, res, next) => {
  try {
    // Route voor het ontvangen van het formulier en verwerken van de ingediende gegevens
    const reviewDescriptionData = req.body.reviewDescription
    const reviewPlaceData = req.body.reviewPlace
    const reviewRatingOneData = req.body.reviewStarsOne
    const reviewRatingTwoData = req.body.reviewStarsTwo
    const reviewRatingThreeData = req.body.reviewStarsThree
    const reviewRatingFourData = req.body.reviewStars
    const reviewRatingDataFive = req.body.reviewStarsFive

    // Gegevens opslaan in een object
    const bookingId = req.params.bookingId

    const reviewFormData = {
      reviewDescriptionData,
      reviewPlaceData,
      reviewRatingOneData,
      reviewRatingTwoData,
      reviewRatingThreeData,
      reviewRatingFourData,
      reviewRatingDataFive
    }

    console.log(reviewFormData)

    // Voer hier eventuele verdere verwerking van de gegevens uit, zoals opslaan in de database

    // Stuur een antwoord naar de client
  } catch (err) {
    next(err)
  }
}

module.exports = addReviewController
