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

const imageSchema = new mongoose.Schema({
  url: String,
  alt: String
})

const tripSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  description: {
    type: String,
    required: true
  },
  image_url: String,
  created_at: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updated_at: {
    type: Date,
    default: () => Date.now()
  },
  duration: Number,
  availability: [availabilitySchema],
  rooms: [roomSchema],
  price: Number,
  destination: {
    type: String,
    required: true
  },
  images: [imageSchema],
  booked_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

tripSchema
  .post("save", function (doc, next) {
    this.updated_at = Date.now()
    console.log("A trip was saved to the database.")
    next()
  })
  .post("remove", function (doc, next) {
    console.log("A trip was removed from the database.")
    next()
  })

module.exports = mongoose.model("Trip", tripSchema)
