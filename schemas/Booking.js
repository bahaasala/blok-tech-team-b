const mongoose = require("mongoose")

const availabilitySchema = new mongoose.Schema({
  start_date: Date,
  end_date: Date
})

const roomSchema = new mongoose.Schema({
  type: String,
  gender: String,
  price: Number
})

const bookingSchema = new mongoose.Schema({
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
  },
  date_range: availabilitySchema,
  room: roomSchema,
  price: Number,
  destination: {
    type: String,
    required: true
  }
})

bookingSchema
  .post("save", function (doc, next) {
    this.updated_at = Date.now()
    console.log("A trip was saved to the database.")
    next()
  })
  .post("remove", function (doc, next) {
    console.log("A trip was removed from the database.")
    next()
  })

module.exports = mongoose.model("Booking", bookingSchema)

const reviewSchema = new mongoose.Schema({
  reviewDescriptionData: String,
  reviewPlaceData: String,
  reviewRatingData: Number
})

module.exports = mongoose.model("reviews", reviewSchema)
