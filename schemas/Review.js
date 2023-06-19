const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
  reviewDescriptionData: String,
  reviewPlaceData: String,
  reviewRatingData: Number,
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true
  }
})

module.exports = mongoose.model("reviews", reviewSchema)
