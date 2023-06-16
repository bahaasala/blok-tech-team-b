const { db } = require("../connect")

const addReviewController = async (req, res, next) => {
  const createdReview = await db.collection("reviews").insertOne(reviewData)
  res.redirect("/bookings/")
}

module.exports = addReviewController

// Formulier gegevens naar de database sturen
