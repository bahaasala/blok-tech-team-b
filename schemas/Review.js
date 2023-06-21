const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
  description: String,
  country: String,
  rating: Number,
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  created_at: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updated_at: {
    type: Date,
    default: () => Date.now()
  }
})

reviewSchema
  .post("save", function (doc, next) {
    this.updated_at = Date.now()
    console.log("A review was saved to the database.")
    next()
  })
  .post("remove", function (doc, next) {
    console.log("A review was removed from the database.")
    next()
  })

module.exports = mongoose.model("reviews", reviewSchema)
