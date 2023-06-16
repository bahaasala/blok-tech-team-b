const { db } = require("../connect")

const addReviewController = async (req, res, next) => {
  try {
    // Route voor het ontvangen van het formulier en verwerken van de ingediende gegevens
    app.post("/submitReview", async function (req, res) {
      const reviewDescriptionData = req.body.reviewDescription
      const reviewPlaceData = req.body.reviewPlace

      // Gegevens opslaan in een object
      const reviewFormData = {
        reviewDescriptionData,
        reviewPlaceData
      }

      console.log(reviewFormData)

      // Voer hier eventuele verdere verwerking van de gegevens uit, zoals opslaan in de database

      // Stuur een antwoord naar de client
      res.send("Formulier succesvol ontvangen")
    })
  } catch (err) {
    next(err)
  }
}

module.exports = addReviewController
